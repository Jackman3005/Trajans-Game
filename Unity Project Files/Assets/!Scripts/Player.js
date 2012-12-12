#pragma strict

var currentHealth : int;
var maximumHealth : int = 100;

public var playerTaunts : AudioClip[];
public var attackSounds : AudioClip[];


private var playerAudio : AudioSource;
private var playerIsDead : boolean;

function Start () {
	currentHealth = maximumHealth;
	playerIsDead = false;
	playerAudio = this.gameObject.GetComponents(AudioSource)[1];
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
	playerAudio.PlayOneShot(playerTaunts[randSoundNumber],.6);
	
}

function playRandomAttackSound(){
	var rand : Random = new Random();
	var randSoundNumber : int = Mathf.FloorToInt(rand.value*attackSounds.Length);
	if (randSoundNumber == attackSounds.Length){
		randSoundNumber = attackSounds.Length -1;
	}
	playerAudio.PlayOneShot(attackSounds[randSoundNumber],.4);
	
}