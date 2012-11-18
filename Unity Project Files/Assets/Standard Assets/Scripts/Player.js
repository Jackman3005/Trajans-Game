#pragma strict

static var currentHealth : int;
static var maximumHealth : int = 100;

private static var playerIsDead : boolean;

function Start () {
	currentHealth = maximumHealth;
	playerIsDead = false;
	//reduceHealthEachSecond();
}

function reduceHealthEachSecond(){
	while(currentHealth > 0){
		yield WaitForSeconds(1);
		addHealth(-1);
	}
}

function Update () {

	if (currentHealth > maximumHealth){
		currentHealth = maximumHealth;
	}
	if (currentHealth < 0){
		currentHealth = 0;
	}

}

static function addHealth(changeInHealth : int){
	currentHealth = currentHealth + changeInHealth;	
		if(currentHealth <= 0){
			this.playerIsDead = true;
		InGameGUI.guiMode = "Lose";
	}
}

static function isPlayerDead(){
	return playerIsDead;
}