#pragma strict

var selectedWeapon:String;

//variables for weapons, lowercase
var medievalBlade : GameObject;
var weapon2 : GameObject;
var weapon3 : GameObject;

//Textures for weapons uppercase
var MedievalBlade:Texture2D;
var Weapon2:Texture2D;
var Weapon3:Texture2D;

function Start () {
	medievalBlade = GameObject.FindGameObjectWithTag("MedievalBlade");
	weapon2  = GameObject.FindGameObjectWithTag("Weapon2");
	weapon3  = GameObject.FindGameObjectWithTag("Weapon3");
}

function Update () {
	
/*	if(selectedWeapon == "MedievalBlade")
	{
		if(Input.GetKeyDown(KeyCode.Keypad1)||Input.GetKeyDown(KeyCode.Alpha1))
		{
			selectedWeapon = "";
			//this.collider.SendMessage("SwordPickup_LEFT");
			Destroy(gameObject);
			InGameGUI.toDrawLeft = "MedievalBlade";
		}
		else if(Input.GetKeyDown(KeyCode.Keypad5)||Input.GetKeyDown(KeyCode.Alpha5))
		{
			selectedWeapon = "";
			//this.collider.SendMessage("SwordPickup_Right");
			Destroy(gameObject);
			InGameGUI.toDrawRight = "MedievalBlade";
		}
	}*/
	if(selectedWeapon == "MedievalBlade")
	{		
		if(Input.GetKeyDown(KeyCode.Keypad1)||Input.GetKeyDown(KeyCode.Alpha1))
		{
			Destroy(medievalBlade);
			InGameGUI.toDrawLeft = selectedWeapon;
			selectedWeapon = "";
		}
		else if(Input.GetKeyDown(KeyCode.Keypad5)||Input.GetKeyDown(KeyCode.Alpha5))
		{
			Destroy(medievalBlade);
			InGameGUI.toDrawRight = selectedWeapon;
			selectedWeapon = "";
		}
	}
	else if(selectedWeapon == "Weapon2")
	{
		if(Input.GetKeyDown(KeyCode.Keypad1)||Input.GetKeyDown(KeyCode.Alpha1))
		{
			Destroy(weapon2);
			InGameGUI.toDrawLeft = selectedWeapon;
			selectedWeapon = "";
		}
		else if(Input.GetKeyDown(KeyCode.Keypad5)||Input.GetKeyDown(KeyCode.Alpha5))
		{
			Destroy(weapon2);
			InGameGUI.toDrawRight = selectedWeapon;
			selectedWeapon = "";
		}
	}
	else if(selectedWeapon == "Weapon3")
	{
		if(Input.GetKeyDown(KeyCode.Keypad1)||Input.GetKeyDown(KeyCode.Alpha1))
		{
			Destroy(weapon3);
			InGameGUI.toDrawLeft = selectedWeapon;
			selectedWeapon = "";
		}
		else if(Input.GetKeyDown(KeyCode.Keypad5)||Input.GetKeyDown(KeyCode.Alpha5))
		{
			Destroy(weapon3);
			InGameGUI.toDrawRight = selectedWeapon;
			selectedWeapon = "";
		}
	}
}

function OnTriggerEnter(col:Collider)
{
	if(col.gameObject.tag == "Player")
	{
		selectedWeapon = this.tag;
	}
}

function OnGUI(){
	if(selectedWeapon == "MedievalBlade")
	{
		GUI.Label(Rect((Screen.width/2)-50,Screen.height-500,(Screen.width/2)-250,Screen.height-150),
		"         Equip Sword?\n\nPress 1 for LeftHand Equip\nPress 5 for RightHand Equip");
	}
	else if(selectedWeapon == "Weapon2")
	{
		GUI.Label(Rect((Screen.width/2)-50,Screen.height-500,(Screen.width/2)-250,Screen.height-150),
		"         Equip Weapon2?\n\nPress 1 for LeftHand Equip\nPress 5 for RightHand Equip");
	}
	else if(selectedWeapon == "Weapon3")
	{
		GUI.Label(Rect((Screen.width/2)-50,Screen.height-500,(Screen.width/2)-250,Screen.height-150),
		"         Equip Weapon3?\n\nPress 1 for LeftHand Equip\nPress 5 for RightHand Equip");
	}
	else{/*no weapon selected*/}
}