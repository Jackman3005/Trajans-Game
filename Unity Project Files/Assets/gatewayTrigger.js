#pragma strict


public var timeToRaiseDoor : double = 2;
public var timeToKeepDoorOpen : double = 3;
private var doorRaising : boolean = false;
private var doorLowering : boolean = false;
private var timeSinceDoorStartOpen : double  = 0;
private var timeSinceDoorEndOpen : double  = 0;


private var origX : double;
private var origY : double;
private var origZ : double;
private var distanceToRaiseDoor : double;

function OnTriggerEnter (col : Collider) {
	if (col.gameObject.tag == "Player" ) {
		doorRaising = true;
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
		doorLowering = true;
		timeSinceDoorStartOpen = 0;
		timeSinceDoorEndOpen = 0;
	}
	timeSinceDoorStartOpen += Time.deltaTime;
}
else{
	if (doorLowering){
		if (timeSinceDoorEndOpen >= timeToKeepDoorOpen){
			transform.position = Vector3(origX,origY,origZ);
			}
		}
	}
}