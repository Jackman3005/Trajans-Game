#pragma strict

var currentHealth : int;
var maximumHealth : int = 100;

public var playerTaunts : AudioClip[];


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

}

function addHealth(changeInHealth : int){
	currentHealth = currentHealth + changeInHealth;	
	if(currentHealth <= 0){
		this.playerIsDead = true;
		currentHealth = 0;
		InGameGUI.guiMode = "Lose";
	}
}

function isPlayerDead(){
	return playerIsDead;
}

function playRandomTaunt(){
	var rand : Random = new Random();
	var randSoundNumber : int = Mathf.FloorToInt(rand.value*playerTaunts.Length);
	if (randSoundNumber == playerTaunts.Length){
		randSoundNumber = playerTaunts.Length -1;
	}
	audio.clip = playerTaunts[randSoundNumber];
	audio.volume = .5;
	if (!audio.isPlaying)
		audio.Play();
	
}