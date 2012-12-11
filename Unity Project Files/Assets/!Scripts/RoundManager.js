#pragma strict

public var playerGateway : GameObject;
public var enemyGateway : GameObject;
public var armoryGateway : GameObject;

private var playerGatewayScript : gatewayTrigger;
private var enemyGatewayScript : gatewayTrigger;
private var armoryGatewayScript : gatewayTrigger;


enum GameMode {Playing, Paused, Won, Lost};
enum InGameState {NotStarted, ReadyToStart, Starting, InProgress, Over};

private static var currentGameMode : GameMode;
private static var currentInGameState : InGameState;

private var playerScript : Player;

private var nextTimeToCheckForEndOfRound : float = 0;

function Start () {
	currentGameMode = GameMode.Playing;
	currentInGameState = InGameState.NotStarted;
	
	playerGatewayScript = playerGateway.GetComponentInChildren(gatewayTrigger);
	enemyGatewayScript = enemyGateway.GetComponentInChildren(gatewayTrigger);
	armoryGatewayScript = armoryGateway.GetComponentInChildren(gatewayTrigger);
	
	playerScript = GameObject.FindGameObjectWithTag("Player").GetComponent(Player);
}

function Update () {

	switch (currentInGameState){
	case InGameState.NotStarted: notStarted();
		break;
	case InGameState.ReadyToStart: notStarted();
		break;
	case InGameState.Starting:startRound();
		break;
	case InGameState.InProgress: checkPlayerProgress();
		break;
	case InGameState.Over: print("ROUND HAS ENDED WOOO");
		break;
	default: print("In Game State could not be identified");
		break;
	}
}

function OnGUI() {
	if (currentInGameState == InGameState.ReadyToStart){
		if (GUI.Button(Rect((Screen.width/2)-75,
		(Screen.height/2)-20,150,30),"Begin Round")){
			currentInGameState = InGameState.Starting;
			InGameGUI.guiMode = "InGame";
		}
	}
}

function checkPlayerProgress(){

	if (Time.time >= nextTimeToCheckForEndOfRound){
		var allEnemiesDefeated : boolean = GameObject.FindGameObjectsWithTag("Enemy").Length == 0;	
		
		if (allEnemiesDefeated){
			currentInGameState = InGameState.Over;
			currentGameMode = GameMode.Won;
		}
		else if (playerScript.currentHealth <= 0){
			currentInGameState = InGameState.Over;
			currentGameMode = GameMode.Lost;
		}
		nextTimeToCheckForEndOfRound = Time.time + .5;
	}
	
}

function notStarted(){
	if(playerGatewayScript.isPlayerNearDoor()){
		currentInGameState = InGameState.ReadyToStart;
	}
	else{
		currentInGameState = InGameState.NotStarted;
	}
}

function startRound(){
	var playerScript : Player = GameObject.FindGameObjectWithTag("Player").GetComponent(Player);
	
	playerGatewayScript.setDoorState(DoorMode.open);
	currentInGameState = InGameState.InProgress;
	currentGameMode = GameMode.Playing;
	yield WaitForSeconds(1.5);
	playerScript.playRandomTaunt();
}

static function getInGameState(){
	return currentInGameState;
}
static function getGameMode(){
	return currentGameMode;
}

static function setGameMode(newGameMode : GameMode){
	currentGameMode = newGameMode;
}