#pragma strict

private var currentLeftWeapon : GameObject;
private var currentRightWeapon : GameObject;
private var isHoldingTwoHandedWeapon : boolean = false;

function tryToAttackWithLeftWeapon(enemyAIScript : EnemyAI, distanceToEnemy : double){
	if (distanceToEnemy < 5){
		enemyAIScript.addHealth(-2);
	}
}

function tryToAttackWithRightWeapon(enemyAIScript : EnemyAI, distanceToEnemy : double){
		enemyAIScript.addHealth(-1);
	
}