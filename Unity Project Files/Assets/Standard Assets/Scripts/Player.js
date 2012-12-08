#pragma strict

var currentHealth : int;
var maximumHealth : int = 100;

private var playerIsDead : boolean;

function Start () {
	currentHealth = maximumHealth;
	playerIsDead = false;
	//reduceHealthEachSecondForTesting();
}

function reduceHealthEachSecondForTesting(){
	while(currentHealth > 0){
		yield WaitForSeconds(1);
		addHealth(-1);
	}
}

function Update () 
{
	if (currentHealth > maximumHealth){
		currentHealth = maximumHealth;
	}
	if (currentHealth < 0){
		currentHealth = 0;
	}

}

function addHealth(changeInHealth : int){
	currentHealth = currentHealth + changeInHealth;	
		if(currentHealth <= 0){
			this.playerIsDead = true;
		InGameGUI.guiMode = "Lose";
	}
}

function isPlayerDead(){
	return playerIsDead;
}