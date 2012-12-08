#pragma strict

static var selectedWeapon:String;

//variables for weapons
private var medievalBlade : GameObject;
private var weapon2 : GameObject;
private var weapon3 : GameObject;

//once equipped, can't un-equip- MIGHT CHANGE THIS
static var leftEquipped:boolean = false;
static var rightEquipped:boolean = false;

var weapon=["MedievalBlade","Weapon2","Weapon3"];
private var weaponNum:int;//stores array value

function Start () {
	medievalBlade = GameObject.FindGameObjectWithTag(weapon[0]);
	weapon2       = GameObject.FindGameObjectWithTag(weapon[1]);
	//weapon3       = GameObject.FindGameObjectWithTag(weapon[2]);
}

function Update () {

	if(selectedWeapon == weapon[0])
	{	
		//weaponNum = 0;
		
		if((Input.GetKeyDown(KeyCode.Keypad1)||Input.GetKeyDown(KeyCode.Alpha1))
		&& !leftEquipped)
		{
			/*Destroy(medievalBlade);
			PlayerHUD.toDrawLeft = selectedWeapon;
			selectedWeapon = "";
			leftEquipped = true;*/
			drawWeapons(medievalBlade, true);
		}
		else if((Input.GetKeyDown(KeyCode.Keypad5)||Input.GetKeyDown(KeyCode.Alpha5))
		&& !rightEquipped)
		{
			/*Destroy(medievalBlade);
			PlayerHUD.toDrawRight = selectedWeapon;
			selectedWeapon = "";
			rightEquipped = true;*/
			drawWeapons(medievalBlade, false);
		}
	}
	else if(selectedWeapon == weapon[1])
	{	
		//weaponNum=1;
		
		if((Input.GetKeyDown(KeyCode.Keypad1)||Input.GetKeyDown(KeyCode.Alpha1))
		&& !leftEquipped)
		{
			/*Destroy(weapon2);
			PlayerHUD.toDrawLeft = selectedWeapon;
			selectedWeapon = "";
			leftEquipped = true;*/
			drawWeapons(weapon2, true);
		}
		else if((Input.GetKeyDown(KeyCode.Keypad5)||Input.GetKeyDown(KeyCode.Alpha5))
		&& !rightEquipped)
		{
			/*Destroy(weapon2);
			PlayerHUD.toDrawRight = selectedWeapon;
			selectedWeapon = "";
			rightEquipped = true;*/
			drawWeapons(weapon2, false);
		}
	}
	else if(selectedWeapon == weapon[2])
	{
		//weaponNum=2;
		
		if((Input.GetKeyDown(KeyCode.Keypad1)||Input.GetKeyDown(KeyCode.Alpha1))
		&& !leftEquipped)
		{
			/*Destroy(weapon3);
			PlayerHUD.toDrawLeft = selectedWeapon;
			selectedWeapon = "";
			leftEquipped = true;*/
			drawWeapons(weapon3, true);
		}
		else if((Input.GetKeyDown(KeyCode.Keypad5)||Input.GetKeyDown(KeyCode.Alpha5))
		&& !rightEquipped)
		{
			/*Destroy(weapon3);
			PlayerHUD.toDrawRight = selectedWeapon;
			selectedWeapon = "";
			rightEquipped = true;*/
			drawWeapons(weapon3, false);
		}
	}
}

//left is true for left hand, false for right
function drawWeapons(chosenWeapon:GameObject, left:boolean)
{
	Destroy(chosenWeapon);
	
	if(left)
	{
		PlayerHUD.toDrawLeft = selectedWeapon;
		leftEquipped = true;
	}
	else//righthand equip
	{
		PlayerHUD.toDrawRight = selectedWeapon;
		rightEquipped = true;
	}
			
	selectedWeapon = "";
}

function OnTriggerEnter(col:Collider)
{
	if(col.gameObject.tag == "Player")
	{
		selectedWeapon = this.tag;
		
		if(selectedWeapon == weapon[0])
			weaponNum = 0;
		else if(selectedWeapon == weapon[1])
			weaponNum = 1;
		else//(selectedWeapon == weapon[2])
			weaponNum = 2;
	}
}

function OnTriggerExit(other:Collider){
	if(other.gameObject.tag=="Player")
		selectedWeapon ="";
}

function OnGUI(){
	if(selectedWeapon == weapon[0])
	{
		GUI.Label(Rect((Screen.width/2)-50,Screen.height-500,(Screen.width/2)-250,Screen.height-190),
		"Equip " + weapon[weaponNum] +"?\n\nPress 1 for LeftHand Equip\nPress 5 for RightHand Equip");
	}
	else if(selectedWeapon == weapon[1])
	{
		GUI.Label(Rect((Screen.width/2)-50,Screen.height-500,(Screen.width/2)-250,Screen.height-190),
		"Equip " + weapon[weaponNum] +"?\n\nPress 1 for LeftHand Equip\nPress 5 for RightHand Equip");
	}
	else if(selectedWeapon == weapon[2])
	{
		GUI.Label(Rect((Screen.width/2)-50,Screen.height-500,(Screen.width/2)-250,Screen.height-190),
		"Equip " + weapon[weaponNum] +"?\n\nPress 1 for LeftHand Equip\nPress 5 for RightHand Equip");
	}
	else{/*no weapon selected*/}

}