#pragma strict

public var currentMainHandWeapon : GameObject = null;
public var currentOffHandWeapon : GameObject = null;
private var currentMainHandWeaponScript : WeaponScript;
private var currentOffHandWeaponScript : WeaponScript;
private var isHoldingTwoHandedWeapon : boolean = false;

private var timeSinceLastMainHandAttack : double = 0;
private var timeSinceLastOffHandAttack : double = 0;

function Start() {
		currentMainHandWeaponScript = currentMainHandWeapon.GetComponent(WeaponScript);
		currentOffHandWeaponScript = currentOffHandWeapon.GetComponent(WeaponScript);
}

function Update(){
	timeSinceLastMainHandAttack += Time.deltaTime;
	timeSinceLastOffHandAttack += Time.deltaTime;
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
	if (currentMainHandWeapon == null){
		
		currentMainHandWeaponScript = weapon.GetComponent(WeaponScript);
		if (currentMainHandWeaponScript.isTwoHanded && currentOffHandWeapon == null){
			currentMainHandWeapon = weapon;
			isHoldingTwoHandedWeapon = currentMainHandWeaponScript.isTwoHanded;
		}
		else{
			currentMainHandWeaponScript = null;
		}
		
		timeSinceLastMainHandAttack = 1 / currentMainHandWeaponScript.attacksPerSecond;
	}
}

function assignOffHandWeapon (weapon : GameObject){
	if (currentOffHandWeapon == null && !isHoldingTwoHandedWeapon){
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
