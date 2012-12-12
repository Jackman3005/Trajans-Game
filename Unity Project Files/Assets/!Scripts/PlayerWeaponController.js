#pragma strict

public var currentMainHandWeapon : GameObject = null;
public var currentOffHandWeapon : GameObject = null;
private var currentMainHandWeaponScript : WeaponScript = null;
private var currentOffHandWeaponScript : WeaponScript = null;
private var isHoldingTwoHandedWeapon : boolean = false;

private var timeSinceLastMainHandAttack : double = 0;
private var timeSinceLastOffHandAttack : double = 0;

private var selectedUnequipedWeapon : GameObject = null;

private var player : GameObject;

function Start() {
	player = GameObject.FindGameObjectWithTag("Player");
}

function Update(){
	timeSinceLastMainHandAttack += Time.deltaTime;
	timeSinceLastOffHandAttack += Time.deltaTime;
	if (selectedUnequipedWeapon != null){	
		if (Input.GetMouseButtonDown(0)){
			assignMainHandWeapon(selectedUnequipedWeapon);
		}
		if (Input.GetMouseButtonDown(1)){
			assignOffHandWeapon(selectedUnequipedWeapon);
		}
	}
	
}

function OnGUI(){
	if(selectedUnequipedWeapon != null){
		showEquipWeaponBox();
	}
}

function playAttackSound(){
	player.GetComponent(Player).playRandomAttackSound();
}


function tryToAttackWithMainHandWeapon(enemyAIScript : EnemyAI, distanceToEnemy : double){

	
	if (currentMainHandWeaponScript != null){
		if (timeSinceLastMainHandAttack >= ( 1/ currentMainHandWeaponScript.attacksPerSecond)){
				playAttackSound();
				currentMainHandWeaponScript.useWeapon();
				timeSinceLastMainHandAttack = 0;
			if (distanceToEnemy <= currentMainHandWeaponScript.attackRange && enemyAIScript != null){
				enemyAIScript.addHealth(-currentMainHandWeaponScript.attackDamage);
			}
		}
	}
}

function tryToAttackWithOffHandWeapon(enemyAIScript : EnemyAI, distanceToEnemy : double){
	if (isHoldingTwoHandedWeapon){
		tryToAttackWithMainHandWeapon(enemyAIScript, distanceToEnemy);
	}
	else if (currentOffHandWeaponScript != null){
		if (timeSinceLastOffHandAttack >= ( 1/ currentOffHandWeaponScript.attacksPerSecond)){
				playAttackSound();
				currentOffHandWeaponScript.useWeapon();
				timeSinceLastOffHandAttack = 0;
			if (distanceToEnemy <= currentOffHandWeaponScript.attackRange && enemyAIScript != null){
				enemyAIScript.addHealth(-currentOffHandWeaponScript.attackDamage);
			}
		}
	}
}	


function assignMainHandWeapon (weapon : GameObject){
	if (currentMainHandWeapon == null && weapon != null){
		
		currentMainHandWeaponScript = weapon.GetComponent(WeaponScript);
		if (currentMainHandWeaponScript.isTwoHanded){
			if (currentOffHandWeapon == null){
				currentMainHandWeapon = weapon;
				mountMainHandWeapon(weapon);
				isHoldingTwoHandedWeapon = currentMainHandWeaponScript.isTwoHanded;
			}
			else{
				currentMainHandWeaponScript = null;
			}
		}
		else{
			currentMainHandWeapon = weapon;
			mountMainHandWeapon(weapon);
			isHoldingTwoHandedWeapon = currentMainHandWeaponScript.isTwoHanded;
		}
		
		timeSinceLastMainHandAttack = 0;
	}
	selectedUnequipedWeapon = null;
}

function assignOffHandWeapon (weapon : GameObject){
	if (currentOffHandWeapon == null && !isHoldingTwoHandedWeapon && weapon != null){
		currentOffHandWeaponScript = weapon.GetComponent(WeaponScript);
		if (currentOffHandWeaponScript.isTwoHanded && currentMainHandWeapon == null){
			//If the weapon to be picked up is two-handed and we don't already have a mainhand weapon
			//Then instead equip the two hander to the main hand.
			currentMainHandWeapon = weapon;
			mountMainHandWeapon(weapon);
			currentMainHandWeaponScript = currentOffHandWeaponScript;
			currentOffHandWeaponScript = null;
			isHoldingTwoHandedWeapon = true;
			timeSinceLastMainHandAttack = 0;
		}
		else {
			//If the weapon is not a two-handed weapon then equip it.
			currentOffHandWeapon = weapon;
			mountOffHandWeapon(weapon);
			timeSinceLastOffHandAttack = 0;
		}
	}
	selectedUnequipedWeapon = null;
}

function equipTwoHander (weapon : GameObject){

}

function mountMainHandWeapon(weapon : GameObject){
	weapon.transform.parent = player.transform;
	//Move weapon to Main Hand Location
	weapon.transform.localPosition = new Vector3(-.3,1.1,.7);
	//Reset weapon rotation to character rotation
	weapon.transform.rotation = Quaternion.identity;
	//Rotate weapon to holding spot
	weapon.transform.Rotate(new Vector3(15,180,-20),Space.Self );
}

function mountOffHandWeapon(weapon : GameObject){
	weapon.transform.parent = player.transform;
	//Move weapon to Main Hand Location
	weapon.transform.localPosition = new Vector3(.3,1.1,.7);
	//Reset weapon rotation to character rotation
	weapon.transform.rotation = Quaternion.identity;
	//Rotate weapon to holding spot
	weapon.transform.Rotate(new Vector3(15,180,-20),Space.Self );
}

function alertPlayerThatWeaponCanBePickedUp(weapon : GameObject){
	if (weapon != currentOffHandWeapon && weapon != currentMainHandWeapon){
		selectedUnequipedWeapon = weapon;	
	}
}

function weaponHasLeftPickupRange(weapon : GameObject){
	if (weapon == selectedUnequipedWeapon){
		selectedUnequipedWeapon = null;
	}
}

function showEquipWeaponBox(){
	var weaponScript : WeaponScript = selectedUnequipedWeapon.GetComponent(WeaponScript);
	GUI.Label(Rect((Screen.width/2)-50,Screen.height-500,(Screen.width/2)-200,Screen.height-175),
	"Equip " + weaponScript.weaponName + "?\n\nLeft Click for MainHand Equip\nRight Click for OffHand Equip");
}


function dropMainHandWeapon (){
	currentMainHandWeapon = null;
	currentMainHandWeaponScript = null;
	if (isHoldingTwoHandedWeapon){
		isHoldingTwoHandedWeapon = false;
	}
}

function dropOffHandWeapon (){
	currentOffHandWeapon = null;
	currentOffHandWeaponScript = null;
}

function getMainHandWeaponTexture(){
	if (currentMainHandWeaponScript != null){
		return currentMainHandWeaponScript.weaponImage;
	}
	return null;
}

function getOffHandWeaponTexture(){
	if (isHoldingTwoHandedWeapon){
		return currentMainHandWeaponScript.weaponImage;
	}
	if (currentOffHandWeaponScript != null){
		return currentOffHandWeaponScript.weaponImage;
	}
	return null;
}



function canAttackWithMainHandWeapon(distToEnemy : double){
	if (currentMainHandWeaponScript != null){
		return distToEnemy <= currentMainHandWeaponScript.attackRange;
	}
	return false;
}
function canAttackWithOffHandWeapon(distToEnemy : double){
	if (isHoldingTwoHandedWeapon){
		return canAttackWithMainHandWeapon(distToEnemy);
	}
	if (currentOffHandWeaponScript != null){
		return distToEnemy <= currentOffHandWeaponScript.attackRange;
	}
	return false;
}

function getCooldownPercentageForMainHand(){
	if (currentMainHandWeaponScript != null){
		var cooldownPercent : double = timeSinceLastMainHandAttack / (1/currentMainHandWeaponScript.attacksPerSecond);
		if (cooldownPercent > 1){
			cooldownPercent = 1;
		}
		return cooldownPercent;
	}
	return 1;
}

function getCooldownPercentageForOffHand(){
	if (currentOffHandWeaponScript != null){
		var cooldownPercent : double = timeSinceLastOffHandAttack / (1/currentOffHandWeaponScript.attacksPerSecond);
		if (cooldownPercent > 1){
			cooldownPercent = 1;
		}
		return cooldownPercent;
	}
	return 1;
}