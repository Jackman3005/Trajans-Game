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
var Red          :Texture2D;


static var toDrawLeft :String;
static var toDrawRight:String;

//Sizes for Textures
var weaponx     :int = Screen.height-118;;
var movex       :int = Screen.height-56;
var weaponColorx:int = Screen.height-123;
var boxx        :int = Screen.height-125;

var boxHeight   :int = 125;
var boxWidth    :int = 100;
var weaponHeight:int = 111;
var weaponWidth :int = 86;
var moveSize    :int = 52;
var moveBoxSize :int = moveBoxSize;
var weaponColorHeight:int = 119;
var weaponColorWidth :int = 94;


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
	GUI.Box(Rect( (Screen.width/2)-190,boxx,boxWidth,boxHeight),"");
	
	GUI.Box(Rect( (Screen.width/2)-90 ,Screen.height-moveBoxSize,moveBoxSize,moveBoxSize),"");
	GUI.DrawTexture(new Rect((Screen.width/2)-86,movex, moveSize, moveSize),move1
	,ScaleMode.StretchToFill, true, 100.0F);
	
	GUI.Box(Rect( (Screen.width/2)-30 ,Screen.height-moveBoxSize,moveBoxSize,moveBoxSize),"");
	GUI.DrawTexture(new Rect((Screen.width/2)-26,movex, moveSize, moveSize),move2
	,ScaleMode.StretchToFill, true, 100.0F);
	
	GUI.Box(Rect( (Screen.width/2)+30 ,Screen.height-moveBoxSize,moveBoxSize,moveBoxSize),"");
	GUI.DrawTexture(new Rect((Screen.width/2)+34,movex, moveSize, moveSize),move3
	,ScaleMode.StretchToFill, true, 100.0F);
	
	GUI.Box(Rect( (Screen.width/2)+90 ,boxx,boxWidth,boxHeight),"");
	
	
	var mainHandWeaponTexture : Texture2D = playerWeaponControllerScript.getMainHandWeaponTexture();
	var offHandWeaponTexture  : Texture2D = playerWeaponControllerScript.getOffHandWeaponTexture();
	
	if (mainHandWeaponTexture != null){
		drawLeftHand(mainHandWeaponTexture);
		if (leftIndicator){
			drawLeftColor();
		}
	}
	if (offHandWeaponTexture != null){
		drawRightHand(offHandWeaponTexture);
		if(rightIndicator){
			drawRightColor();	
		}
	}
}

function drawLeftHand(chosen : Texture2D)
{
	GUI.DrawTexture(new Rect((Screen.width/2)-183,weaponx,weaponWidth, weaponHeight), chosen
	,ScaleMode.StretchToFill, true, 100.0F);
	
	leftEquipped = true;
}

function drawLeftColor()
{
	GUI.DrawTexture(new Rect((Screen.width/2)-188,weaponColorx,weaponColorWidth, weaponColorHeight), Red
	,ScaleMode.StretchToFill, true, 100.0F);
}

function drawRightHand(chosen : Texture2D)
{
	GUI.DrawTexture(new Rect( (Screen.width/2)+97 ,weaponx, weaponWidth, weaponHeight), chosen
	,ScaleMode.StretchToFill, true, 100.0F);
	
	rightEquipped = true;
}

function drawRightColor()
{
	GUI.DrawTexture(new Rect( (Screen.width/2)+92 ,weaponColorx, weaponColorWidth, weaponColorHeight), Red
	,ScaleMode.StretchToFill, true, 100.0F);
}