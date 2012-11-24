#pragma strict

var healthGUI : GUIStyle;

var move1:Texture;
var move2:Texture;
var move3:Texture;

//Textures for weapons
var MedievalBlade:Texture2D;
var Weapon2:Texture2D;
var Weapon3:Texture2D;

static var toDrawLeft:String;
static var toDrawRight:String;

//once equipped, can't un-equip- MIGHT CHANGE THIS
static var leftEquipped:boolean = false;
static var rightEquipped:boolean = false;

function OnGUI()
{
	//Health Bar
	GUI.Label(new Rect( (Screen.width/2)-88, Screen.height-82, 176, 20)
	,Player.currentHealth +"/" + Player.maximumHealth , healthGUI);
	
//Weapon and Specials Display******************************************************************
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
	
//Draw Weapons*********************************************************************************
	if(toDrawLeft == "MedievalBlade")
	{
		GUI.DrawTexture(new Rect((Screen.width/2)-186,Screen.height-121,92, 117), MedievalBlade
		,ScaleMode.StretchToFill, true, 100.0F);
		
		leftEquipped = true;
	}
	else if(toDrawRight == "MedievalBlade")
	{
		GUI.DrawTexture(new Rect( (Screen.width/2)+94 ,Screen.height-121, 92, 117), MedievalBlade
		,ScaleMode.StretchToFill, true, 100.0F);
		
		rightEquipped = true;
	}
	
	if(toDrawLeft == "Weapon2")
	{
		GUI.DrawTexture(new Rect((Screen.width/2)-186,Screen.height-121,92, 117), Weapon2
		,ScaleMode.StretchToFill, true, 100.0F);
		
		leftEquipped = true;
	}
	else if(toDrawRight == "Weapon2")
	{
		GUI.DrawTexture(new Rect( (Screen.width/2)+94 ,Screen.height-121, 92, 117), Weapon2
		,ScaleMode.StretchToFill, true, 100.0F);
		
		rightEquipped = true;
	}
	
	if(toDrawLeft == "Weapon3")
	{
		GUI.DrawTexture(new Rect((Screen.width/2)-186,Screen.height-121,92, 117), Weapon3
		,ScaleMode.StretchToFill, true, 100.0F);
		
		leftEquipped = true;
	}
	else if(toDrawRight == "Weapon3")
	{
		GUI.DrawTexture(new Rect( (Screen.width/2)+94 ,Screen.height-121, 92, 117), Weapon3
		,ScaleMode.StretchToFill, true, 100.0F);
		
		rightEquipped = true;
	}
	
//Draw Moves**************************************************************************************

}