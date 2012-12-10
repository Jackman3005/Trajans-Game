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
var canAttackEnemyColor :Texture2D;
var healthBarBackground :Texture2D;

var moveSize    :int = 52;
var moveBox     :int = 60;
var movex       :int = 56;
var weaponBoxHeight:int = 125;
var weaponBoxWidth :int = 100;
var texturePosition:int = 118;
var textureWidth :int = 86;
var textureHeight:int = 111;
var colorPosition:int = 121;
var colorWidth   :int = 92;
var colorHeight  :int = 117;

static var toDrawLeft :String;
static var toDrawRight:String;

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
	}
		
	//Health Bar Background
	GUI.DrawTexture(new Rect((Screen.width/2)-88, Screen.height-82, 176, 20),healthBarBackground
	,ScaleMode.StretchToFill);
	//Health Bar Red Color
	var healthBarWidth : int = 176 * ((playerScript.currentHealth*1.0) / playerScript.maximumHealth);
	print(healthBarWidth);
	GUI.DrawTexture(new Rect((Screen.width/2)-88, Screen.height-82, healthBarWidth, 20),canAttackEnemyColor
	,ScaleMode.StretchToFill);
	//Health Bar Text
	GUI.Label(new Rect( (Screen.width/2)-88, Screen.height-82, 176, 20)
	,playerScript.currentHealth +"/" + playerScript.maximumHealth , healthGUI);
	

	
//Weapon and Specials Box Displays*********************************************
	GUI.Box(Rect( (Screen.width/2)-190,Screen.height-weaponBoxHeight,weaponBoxWidth,weaponBoxHeight),"");
	
	GUI.Box(Rect( (Screen.width/2)-90 ,Screen.height-moveBox, moveBox, moveBox),"");
	GUI.DrawTexture(new Rect((Screen.width/2)-86,Screen.height-movex, moveSize, moveSize),move1
	,ScaleMode.StretchToFill, true, 100.0F);
	
	GUI.Box(Rect( (Screen.width/2)-30 ,Screen.height-moveBox, moveBox, moveBox),"");
	GUI.DrawTexture(new Rect((Screen.width/2)-26,Screen.height-movex, moveSize, moveSize),move2
	,ScaleMode.StretchToFill, true, 100.0F);
	
	GUI.Box(Rect( (Screen.width/2)+30 ,Screen.height-moveBox, moveBox, moveBox),"");
	GUI.DrawTexture(new Rect((Screen.width/2)+34,Screen.height-movex, moveSize, moveSize),move3
	,ScaleMode.StretchToFill, true, 100.0F);
	
	GUI.Box(Rect( (Screen.width/2)+90 ,Screen.height-weaponBoxHeight,weaponBoxWidth,weaponBoxHeight),"");
	
	
	var mainHandWeaponTexture : Texture2D = playerWeaponControllerScript.getMainHandWeaponTexture();
	var offHandWeaponTexture  : Texture2D = playerWeaponControllerScript.getOffHandWeaponTexture();
	
	if (mainHandWeaponTexture != null){
		if (leftIndicator){
			drawLeftColor();
		}
		drawLeftHand(mainHandWeaponTexture);
	}
	if (offHandWeaponTexture != null){
		if(rightIndicator){
			drawRightColor();	
		}
		drawRightHand(offHandWeaponTexture);
	}
}

function drawLeftHand(chosen : Texture2D)
{
	GUI.DrawTexture(new Rect((Screen.width/2)-183,Screen.height-texturePosition,
	textureWidth, textureHeight), chosen
	,ScaleMode.StretchToFill, true, 100.0F);
}


function drawRightHand(chosen : Texture2D)
{
	GUI.DrawTexture(new Rect( (Screen.width/2)+97 ,Screen.height-texturePosition,
	 textureWidth, textureHeight), chosen
	,ScaleMode.StretchToFill, true, 100.0F);
}

function drawLeftColor()
{
	GUI.DrawTexture(new Rect((Screen.width/2)-186,Screen.height-colorPosition,
	colorWidth, colorHeight), canAttackEnemyColor
	,ScaleMode.StretchToFill, true, 100.0F);
}


function drawRightColor()
{
	GUI.DrawTexture(new Rect( (Screen.width/2)+94 ,Screen.height-colorPosition,
	colorWidth, colorHeight), canAttackEnemyColor
	,ScaleMode.StretchToFill, true, 100.0F);
}

