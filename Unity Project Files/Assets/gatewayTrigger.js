#pragma strict


public var timeToRaiseDoor : double = 2;
public var timeToKeepDoorOpen : double = 3;
private var doorRaising : boolean = false;
private var doorLowering : boolean = false;
private var timeSinceDoorStartOpen : double  = 0;
private var timeSinceDoorStartClose : double  = 0;
public var move : AudioClip;

private var origX : double;
private var origY : double;
private var origZ : double;
private var distanceToRaiseDoor : double;

function OnTriggerEnter (col : Collider) {
	if (col.gameObject.tag == "Player" ) {
		doorRaising = true;
		audio.clip = move;
		audio.Play();
	}
}

function Start () {
		origX = transform.position.x;
		origY = transform.position.y;
		origZ = transform.position.z;
		distanceToRaiseDoor = 9 / timeToRaiseDoor;
}

function Update () {
	if (doorRaising){
	
		if (timeSinceDoorStartOpen < timeToRaiseDoor){
			transform.position = Vector3(origX,origY+ distanceToRaiseDoor*timeSinceDoorStartOpen,origZ);
			}
		else if (timeSinceDoorStartOpen >= timeToRaiseDoor){
			doorRaising = false;
			timeSinceDoorStartOpen = 0;
			audio.Stop();
			WaitThenLowerDoor();
			}
		timeSinceDoorStartOpen += Time.deltaTime;
	}
	else{
		if (doorLowering && timeSinceDoorStartClose <= timeToRaiseDoor){
			var newDoorYPosition : double = origY + (distanceToRaiseDoor * timeToRaiseDoor) - (distanceToRaiseDoor*timeSinceDoorStartClose);
					
			transform.position = Vector3(origX,newDoorYPosition,origZ);
			
			timeSinceDoorStartClose += Time.deltaTime;
		}
	}
}


function WaitThenLowerDoor(){
		yield WaitForSeconds(2);
		audio.Play();
		doorLowering = true;
		timeSinceDoorStartClose = 0;
}