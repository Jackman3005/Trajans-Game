#pragma strict

private var currentMainHandWeapon : GameObject = null;
private var currentOffHandWeapon : GameObject = null;
private var currentMainHandWeaponScript : WeaponScript = null;
private var currentOffHandWeaponScript : WeaponScript = null;
private var isHoldingTwoHandedWeapon : boolean = false;

function tryToAttackWithLeftWeapon(enemyAIScript : EnemyAI, distanceToEnemy : double){
	if (distanceToEnemy < 5){
		enemyAIScript.addHealth(-2);
	}
}

function tryToAttackWithRightWeapon(enemyAIScript : EnemyAI, distanceToEnemy : double){
		enemyAIScript.addHealth(-1);
}

function assignMainHandWeapon (weapon : GameObject){
	if (currentMainHandWeapon == null){
		currentMainHandWeapon = weapon;
		currentMainHandWeaponScript = weapon.GetComponent(WeaponScript);
		isHoldingTwoHandedWeapon = currentMainHandWeaponScript.isTwoHanded;
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
		}
		else {
			//If the weapon is not a two-handed weapon then equip it.
			currentOffHandWeapon = weapon;
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