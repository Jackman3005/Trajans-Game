#pragma strict

static var guiMode:String = "InGame";
var EnemiesDefeated:int;
var levelTotal:int;
//var player : GameObject; 
var leftHand:Texture2D;
var move1:Texture;
var move2:Texture;
var move3:Texture;
var rightHand:Texture2D;

function start()
{
	//player = GameObject.FindGameObjectWithTag("Player");
}

function Update()
{
	//pause
	if(Input.GetKeyDown("escape"))
	{
		Time.timeScale = 0;
		guiMode = "Paused";
	}
}

function OnGUI()
{
	GUI.Box(Rect( (Screen.width/2)-190,Screen.height-125,100,125),"");
	GUI.DrawTexture(new Rect((Screen.width/2)-186,Screen.height-121,92, 117),leftHand
	,ScaleMode.StretchToFill, true, 100.0F);
	
	
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
	GUI.DrawTexture(new Rect( (Screen.width/2)+94 ,Screen.height-121, 92, 117),rightHand
	,ScaleMode.StretchToFill, true, 100.0F);
	
	
	if(guiMode == "Paused")
	{
		pausedGui();
	}

	if(guiMode == "Win")
	{
		winGui();
	}
	
	if(guiMode == "Lose")
	{
		loseGui();
	}
}

function pausedGui(){
		//Resume
		if(GUI.Button(Rect((Screen.width/2)-75,
		(Screen.height/2)-20,150,30),"Resume"))
		{//distance from left, distance from top, width, height
		
			Time.timeScale = 1;

			guiMode = "InGame";
			
			
			print("Resume Game");
		}
		
		//Quit
		if(GUI.Button(Rect((Screen.width/2)-75,
		(Screen.height/2)+20,150,30),"Quit to Main Menu"))
		{
			Time.timeScale = 1;
			Application.LoadLevel(0);
			print("Quitting To Main Menu...");
		}
}

function winGui(){

		//Next Level
		if(GUI.Button(Rect((Screen.width/2)-75,
		(Screen.height/2)-20,150,30),"Next Level"))
		{//distance from left, distance from top, width, height
		
			Time.timeScale = 1;
			guiMode = "InGame";
			Application.LoadLevel(Application.loadedLevel+1);
			print("Next Level...");
		}
		
		//Quit
		if(GUI.Button(Rect((Screen.width/2)-75,
		(Screen.height/2)+20,150,30),"Quit to Main Menu"))
		{
			Time.timeScale = 1;
			Application.LoadLevel(0);
			print("Quitting To Main Menu...");
		}
}

function loseGui(){

		//Next Level
		if(GUI.Button(Rect((Screen.width/2)-75,
		(Screen.height/2)-20,150,30),"Retry Level"))
		{//distance from left, distance from top, width, height
		
			Time.timeScale = 1;
			guiMode = "InGame";
			Application.LoadLevel(Application.loadedLevel);
			print("Restarting Level...");
		}
		
		//Quit
		if(GUI.Button(Rect((Screen.width/2)-75,
		(Screen.height/2)+20,150,30),"Quit to Main Menu"))
		{
			Time.timeScale = 1;
			Application.LoadLevel(0);
			print("Quitting To Main Menu...");
		}
}

function EnemyDefeated()
{
	EnemiesDefeated++;
	
	if(EnemiesDefeated == levelTotal)
	{	
		Win();
	}
	
}

function Win()
{
	Time.timeScale = 0;
	print("Level Complete");
	guiMode="Win";
	
	PlayerPrefs.SetInt("PlayerLevel", Application.loadedLevel+1);
}

function Lose()
{
	//delays time freeze for 3 seconds
	yield(WaitForSeconds(3));
	Time.timeScale = 0;
	print("Player Defeated");
	guiMode="Lose";
}