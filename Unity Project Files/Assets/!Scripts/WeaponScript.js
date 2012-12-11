#pragma strict

public var weaponName : String = "NoName";
public var attacksPerSecond : double = 1;
public var attackDamage : double = 1;
public var attackRange : double = 5;
public var weaponImage : Texture2D;
public var isTwoHanded : boolean = false;

private var startingWeaponRotation : Quaternion;
private var usingWeapon : boolean;
private var timeMovingWeapon : float;

function Start (){ 

}

function Update (){

	if (usingWeapon){
		doWeaponAnimation();
	}
}


function OnTriggerEnter(col:Collider)
{
	if(col.gameObject.tag == "Player")
	{
		var playerWeaponControllerScript : PlayerWeaponController = col.gameObject.GetComponent(PlayerWeaponController);
		playerWeaponControllerScript.alertPlayerThatWeaponCanBePickedUp(this.gameObject);
	}
}

function OnTriggerExit(col:Collider){
	if(col.gameObject.tag == "Player")
	{
		var playerWeaponControllerScript : PlayerWeaponController = col.gameObject.GetComponent(PlayerWeaponController);
		playerWeaponControllerScript.weaponHasLeftPickupRange(this.gameObject);
	}
}

function useWeapon(){
	print("using weapon");
	startingWeaponRotation = transform.localRotation;
	usingWeapon = true;
	timeMovingWeapon = 0;
}

function doWeaponAnimation(){
	print("doing weapon animation");
	var endAngle : Quaternion = Quaternion.Euler(110,0,0);
	timeMovingWeapon += 8*Time.deltaTime;
	if (timeMovingWeapon <=1){
		transform.localRotation = Quaternion.Slerp(startingWeaponRotation, endAngle,timeMovingWeapon);
	}
	else if (1 < timeMovingWeapon && timeMovingWeapon <=2){
		transform.localRotation = Quaternion.Slerp(endAngle,startingWeaponRotation ,timeMovingWeapon-1);
	}
	else{
		transform.localRotation = startingWeaponRotation;
		usingWeapon = false;
	}
}