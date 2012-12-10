#pragma strict

public var playerGateway : GameObject;
public var enemyGateway : GameObject;
public var armoryGateway : GameObject;

private var playerGatewayScript : gatewayTrigger;
private var enemyGatewayScript : gatewayTrigger;
private var armoryGatewayScript : gatewayTrigger;


enum GameMode {PreRound, Playing, Paused, Won, Lost};
enum InGameState {NotStarted, ReadyToStart, Starting, InProgress, Over};

private var currentGameMode : GameMode;
private var currentInGameState : InGameState;

function Start () {
	currentGameMode = GameMode.PreRound;
	currentInGameState = InGameState.NotStarted;
	
	playerGatewayScript = playerGateway.GetComponentInChildren(gatewayTrigger);
	enemyGatewayScript = enemyGateway.GetComponentInChildren(gatewayTrigger);
	armoryGatewayScript = armoryGateway.GetComponentInChildren(gatewayTrigger);
}

function Update () {

	switch (currentInGameState){
	case InGameState.NotStarted: notStarted();
		break;
	case InGameState.ReadyToStart: notStarted();
		break;
	case InGameState.Starting:startRound();
		break;
	case InGameState.InProgress:
		break;
	case InGameState.Over:
		break;
	default: print("In Game State could not be identified");
		break;
	}
}

function OnGUI() {
	if (currentInGameState == InGameState.ReadyToStart){
		InGameGUI.guiMode = "ReadyToStart";
		if (GUI.Button(Rect((Screen.width/2)-75,
		(Screen.height/2)-20,150,30),"Begin Round")){
			currentInGameState = InGameState.Starting;
			InGameGUI.guiMode = "InGame";
		}
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
	yield WaitForSeconds(1.5);
	playerScript.playRandomTaunt();
}

function getInGameState(){
	return currentInGameState;
}