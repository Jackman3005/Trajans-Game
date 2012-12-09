#pragma strict

public var weaponName : String = "NoName";
public var attacksPerSecond : double = 1;
public var attackDamage : double = 1;
public var attackRange : double = 5;
public var weaponImage : Texture2D;
public var isTwoHanded : boolean = false;

function Start (){ 
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