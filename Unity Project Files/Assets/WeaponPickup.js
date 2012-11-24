#pragma strict

static var selectedWeapon:String;

//variables for weapons
var medievalBlade : GameObject;
var weapon2 : GameObject;
var weapon3 : GameObject;

//once equipped, can't un-equip- MIGHT CHANGE THIS
static var leftEquipped:boolean = false;
static var rightEquipped:boolean = false;

var weapon=["Medieval Blade","Weapon2","Weapon3"];
var weaponNum:int;//stores array value

function Start () {
	medievalBlade = GameObject.FindGameObjectWithTag("MedievalBlade");
	weapon2       = GameObject.FindGameObjectWithTag("Weapon2");
	weapon3       = GameObject.FindGameObjectWithTag("Weapon3");
}

function Update () {
	
	if(selectedWeapon == "MedievalBlade")
	{	
		weaponNum=0;
		
		if((Input.GetKeyDown(KeyCode.Keypad1)||Input.GetKeyDown(KeyCode.Alpha1))
		&& !leftEquipped)
		{
			Destroy(medievalBlade);
			PlayerHUD.toDrawLeft = selectedWeapon;
			selectedWeapon = "";
			leftEquipped = true;
		}
		else if((Input.GetKeyDown(KeyCode.Keypad5)||Input.GetKeyDown(KeyCode.Alpha5))
		&& !rightEquipped)
		{
			Destroy(medievalBlade);
			PlayerHUD.toDrawRight = selectedWeapon;
			selectedWeapon = "";
			rightEquipped = true;
		}
	}
	else if(selectedWeapon == "Weapon2")
	{	
		weaponNum=1;
		
		if((Input.GetKeyDown(KeyCode.Keypad1)||Input.GetKeyDown(KeyCode.Alpha1))
		&& !leftEquipped)
		{
			Destroy(weapon2);
			PlayerHUD.toDrawLeft = selectedWeapon;
			selectedWeapon = "";
			leftEquipped = true;
		}
		else if((Input.GetKeyDown(KeyCode.Keypad5)||Input.GetKeyDown(KeyCode.Alpha5))
		&& !rightEquipped)
		{
			Destroy(weapon2);
			PlayerHUD.toDrawRight = selectedWeapon;
			selectedWeapon = "";
			rightEquipped = true;
		}
	}
	else if(selectedWeapon == "Weapon3")
	{
		weaponNum=3;
		
		if((Input.GetKeyDown(KeyCode.Keypad1)||Input.GetKeyDown(KeyCode.Alpha1))
		&& !leftEquipped)
		{
			Destroy(weapon3);
			PlayerHUD.toDrawLeft = selectedWeapon;
			selectedWeapon = "";
			leftEquipped = true;
		}
		else if((Input.GetKeyDown(KeyCode.Keypad5)||Input.GetKeyDown(KeyCode.Alpha5))
		&& !rightEquipped)
		{
			Destroy(weapon3);
			PlayerHUD.toDrawRight = selectedWeapon;
			selectedWeapon = "";
			rightEquipped = true;
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

function OnTriggerExit(other:Collider){
	if(other.gameObject.tag=="Player")
		selectedWeapon ="";
}

function OnGUI(){
	if(selectedWeapon == "MedievalBlade")
	{
		GUI.Label(Rect((Screen.width/2)-50,Screen.height-500,(Screen.width/2)-250,Screen.height-150),
		"Equip " + weapon[weaponNum] +"?\n\nPress 1 for LeftHand Equip\nPress 5 for RightHand Equip");
	}
	else if(selectedWeapon == "Weapon2")
	{
		GUI.Label(Rect((Screen.width/2)-50,Screen.height-500,(Screen.width/2)-250,Screen.height-150),
		"Equip " + weapon[weaponNum] +"?\n\nPress 1 for LeftHand Equip\nPress 5 for RightHand Equip");
	}
	else if(selectedWeapon == "Weapon3")
	{
		GUI.Label(Rect((Screen.width/2)-50,Screen.height-500,(Screen.width/2)-250,Screen.height-150),
		"Equip " + weapon[weaponNum] +"?\n\nPress 1 for LeftHand Equip\nPress 5 for RightHand Equip");
	}
	else{/*no weapon selected*/}

}