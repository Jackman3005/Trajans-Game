#pragma strict

//Reticle vars
var crosshairTexture : Texture2D;
var position : Rect;
var Reticle:boolean = true;

/*freeze camera
var cam1 = GameObject.FindGameObjectWithTag("MainCamera").camera;
var cam3 = GameObject.FindGameObjectWithTag("3rd Perspective").camera;
var saveMouse;*/

var healthGUI : GUIStyle;
private var playerScript : Player;
private var playerWeaponControllerScript : PlayerWeaponController;

var move1:Texture;
var move2:Texture;
var move3:Texture;

//Textures for weapons
var MedievalBlade:Texture2D;
var Weapon2      :Texture2D;
var Weapon3      :Texture2D;
var Red          :Texture2D;


static var toDrawLeft :String;
static var toDrawRight:String;

//once equipped, can't un-equip- MIGHT CHANGE THIS
static var leftEquipped :boolean = false;
static var rightEquipped:boolean = false;

//for border around weapons
static var leftIndicator :boolean = false;
static var rightIndicator:boolean = false;

function Start (){
	var player : GameObject = GameObject.FindGameObjectWithTag("Player");
	playerScript = player.GetComponent(Player);
	playerWeaponControllerScript = player.GetComponent(PlayerWeaponController);
}

function Update()
{
    position = Rect((Screen.width - crosshairTexture.width) / 2
    , (Screen.height - crosshairTexture.height) /2, crosshairTexture.width
    , crosshairTexture.height);
//*****************************************************************************

//freeze Camera on pause*******************************************************
/* Disables and re-enables camera on pause, but position isn't saved, so always staring at feet
		if(InGameGUI.guiMode =="Paused")
		{
			
			GameObject.FindGameObjectWithTag("MainCamera").GetComponent("MouseLook").camera.enabled = false;
			//saveMouse = Event.current.mousePosition;
		}
		if(InGameGUI.guiMode == "InGame")
		{
		//Event.current.mousePosition = saveMouse;
			GameObject.FindGameObjectWithTag("MainCamera").GetComponent("MouseLook").camera.enabled = true;
		}
*/
//*****************************************************************************

}//end of update

function OnGUI()
{
	//Reticle
	if(Reticle && InGameGUI.guiMode == "InGame")
	{
        GUI.DrawTexture(position, crosshairTexture);
        Screen.showCursor = false; 
	}
	else
		Screen.showCursor = true;
		
	//Health Bar
	GUI.Label(new Rect( (Screen.width/2)-88, Screen.height-82, 176, 20)
	,playerScript.currentHealth +"/" + playerScript.maximumHealth , healthGUI);
	
//Weapon and Specials Box Displays*********************************************
	GUI.Box(Rect( (Screen.width/2)-190,Screen.height-125,100,125),"");
	
	GUI.Box(Rect( (Screen.width/2)-90 ,Screen.height-60,60,60),"");
	GUI.DrawTexture(new Rect((Screen.width/2)-86,Screen.height-56, 52, 52),move1
	,ScaleMode.StretchToFill, true, 100.0F);
	
	GUI.Box(Rect( (Screen.width/2)-30 ,Screen.height-60,60,60),"");
	GUI.DrawTexture(new Rect((Screen.width/2)-26,Screen.height-56, 52, 52),move2
	,ScaleMode.StretchToFill, true, 100.0F);
	
	GUI.Box(Rect( (Screen.width/2)+30 ,Screen.height-60,60,60),"");
	GUI.DrawTexture(new Rect((Screen.width/2)+34,Screen.height-56, 52, 52),move3
	,ScaleMode.StretchToFill, true, 100.0F);
	
	GUI.Box(Rect( (Screen.width/2)+90 ,Screen.height-125,100,125),"");
	
	
	var mainHandWeaponTexture : Texture2D = playerWeaponControllerScript.getMainHandWeaponTexture();
	var offHandWeaponTexture  : Texture2D = playerWeaponControllerScript.getOffHandWeaponTexture();
	
	if(leftIndicator && leftEquipped)
	{
		drawLeftColor();
	}
	
	if(rightIndicator && rightEquipped)
	{
		drawRightColor();	
	}
	
	if (mainHandWeaponTexture != null){
		drawLeftHand(mainHandWeaponTexture);
	}
	if (offHandWeaponTexture != null){
		drawRightHand(offHandWeaponTexture);
	}
}

function drawLeftHand(chosen : Texture2D)
{
	GUI.DrawTexture(new Rect((Screen.width/2)-183,Screen.height-118,86, 111), chosen
	,ScaleMode.StretchToFill, true, 100.0F);
	
	leftEquipped = true;
}

function drawLeftColor()
{
	GUI.DrawTexture(new Rect((Screen.width/2)-186,Screen.height-121,92, 117), Red
	,ScaleMode.StretchToFill, true, 100.0F);
}

function drawRightHand(chosen : Texture2D)
{
	GUI.DrawTexture(new Rect( (Screen.width/2)+97 ,Screen.height-118, 86, 111), chosen
	,ScaleMode.StretchToFill, true, 100.0F);
	
	rightEquipped = true;
}

function drawRightColor()
{
	GUI.DrawTexture(new Rect( (Screen.width/2)+94 ,Screen.height-121, 92, 117), Red
	,ScaleMode.StretchToFill, true, 100.0F);
}