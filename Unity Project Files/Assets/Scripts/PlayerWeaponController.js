#pragma strict

public var currentMainHandWeapon : GameObject = null;
public var currentOffHandWeapon : GameObject = null;
private var currentMainHandWeaponScript : WeaponScript = null;
private var currentOffHandWeaponScript : WeaponScript = null;
private var isHoldingTwoHandedWeapon : boolean = false;

private var timeSinceLastMainHandAttack : double = 0;
private var timeSinceLastOffHandAttack : double = 0;

private var selectedUnequipedWeapon : GameObject = null;

function Start() {
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

function tryToAttackWithMainHandWeapon(enemyAIScript : EnemyAI, distanceToEnemy : double){
	if (currentMainHandWeaponScript != null){
		if (timeSinceLastMainHandAttack >= ( 1/ currentMainHandWeaponScript.attacksPerSecond)){
			if (distanceToEnemy <= currentMainHandWeaponScript.attackRange){
				enemyAIScript.addHealth(-currentMainHandWeaponScript.attackDamage);
				timeSinceLastMainHandAttack = 0;
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
			if (distanceToEnemy <= currentOffHandWeaponScript.attackRange){
				enemyAIScript.addHealth(-currentOffHandWeaponScript.attackDamage);
				timeSinceLastOffHandAttack = 0;
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
				isHoldingTwoHandedWeapon = currentMainHandWeaponScript.isTwoHanded;
			}
			else{
				currentMainHandWeaponScript = null;
			}
		}
		else{
			currentMainHandWeapon = weapon;
			isHoldingTwoHandedWeapon = currentMainHandWeaponScript.isTwoHanded;
		}
		
		timeSinceLastMainHandAttack = 1 / currentMainHandWeaponScript.attacksPerSecond;
	}
}

function assignOffHandWeapon (weapon : GameObject){
	if (currentOffHandWeapon == null && !isHoldingTwoHandedWeapon && weapon != null){
		currentOffHandWeaponScript = weapon.GetComponent(WeaponScript);
		if (currentOffHandWeaponScript.isTwoHanded && currentMainHandWeapon == null){
			//If the weapon to be picked up is two-handed and we don't already have a mainhand weapon
			//Then instead equip the two hander to the main hand.
			currentMainHandWeapon = weapon;
			currentMainHandWeaponScript = currentOffHandWeaponScript;
			currentOffHandWeaponScript = null;
			isHoldingTwoHandedWeapon = true;
			
			timeSinceLastMainHandAttack = 1 / currentMainHandWeaponScript.attacksPerSecond;
		}
		else {
			//If the weapon is not a two-handed weapon then equip it.
			currentOffHandWeapon = weapon;
			timeSinceLastOffHandAttack = 1 / currentOffHandWeaponScript.attacksPerSecond;
		}
	}
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