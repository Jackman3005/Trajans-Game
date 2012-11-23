#pragma strict


public var move : AudioClip;

private var totalHeightToRaiseDoor : double = 9;
private var maxDoorY : double;
public var secondsToOpenDoor : double;

enum DoorMode {closed,closing,open,opening};
private var currDoorState : DoorMode;

private var origX : double;
private var origY : double;
private var origZ : double;

function OnTriggerEnter (col : Collider) {
	if (col.gameObject.tag == "Player" ) {
		currDoorState = DoorMode.opening;
		audio.clip = move;
		audio.Play();
	}
}

function Start () {
		origX = transform.position.x;
		origY = transform.position.y;
		origZ = transform.position.z;
		maxDoorY = totalHeightToRaiseDoor + origY;
		currDoorState = DoorMode.closed;
}

function Update () {

	var newY :double = transform.position.y;
	switch (currDoorState){
	case DoorMode.closing: 
		newY = transform.position.y - ((totalHeightToRaiseDoor/secondsToOpenDoor) * Time.deltaTime);
		if (newY <= origY ){
		 newY = origY;
		 currDoorState = DoorMode.closed;
		}
		break;
	case DoorMode.opening: 
		newY = transform.position.y + ((totalHeightToRaiseDoor/secondsToOpenDoor) * Time.deltaTime);
		if (newY >= maxDoorY){
		 newY = maxDoorY;
		 currDoorState = DoorMode.open;
		 WaitThenLowerDoor();
		}
		break;
	case DoorMode.closed:
	case DoorMode.open: 
		break;
	}	
	transform.position.y = newY;


	
}


function WaitThenLowerDoor(){
		currDoorState = DoorMode.open;
		yield WaitForSeconds(2);
		currDoorState = DoorMode.closing;
		audio.Play();
}