#pragma strict

static var guiMode:String = "InGame";
var EnemiesDefeated:int;
var levelTotal:int;
//var player : GameObject; 


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
		RoundManager.setGameMode(GameMode.Paused);
	}
}

function OnGUI()
{		
	switch(RoundManager.getGameMode()){
	case GameMode.Playing:
		break;
	case GameMode.Paused:pausedGui();
		break;
	case GameMode.Won:winGui();
		break;
	case GameMode.Lost:loseGui();
		break;
	default:
		print("eRoRr: Game mode cannot be determinded in InGameGUI");
	}
}

function pausedGui(){

		//Display Game Paused
		var guiStyle : GUIStyle = new GUIStyle();
		guiStyle.fontSize = 50;
		GUI.Label(Rect((Screen.width/2)-160,
		(Screen.height/2)-120,150,30),"Game Paused", guiStyle);
		//Resume
		if(GUI.Button(Rect((Screen.width/2)-75,
		(Screen.height/2)-20,150,30),"Resume"))
		{//distance from left, distance from top, width, height
		
			Time.timeScale = 1;

			RoundManager.setGameMode(GameMode.Playing);
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
		//Display You Won!
		var guiStyle : GUIStyle = new GUIStyle();
		guiStyle.fontSize = 50;
		GUI.Label(Rect((Screen.width/2)-110,
		(Screen.height/2)-120,150,30),"You Won!", guiStyle);
	
		Time.timeScale = 0;
		//Next Level
		if(GUI.Button(Rect((Screen.width/2)-75,
		(Screen.height/2),150,30),"Next Level"))
		{//distance from left, distance from top, width, height
		
			Time.timeScale = 1;
			RoundManager.setGameMode(GameMode.Playing);
			Application.LoadLevel(Application.loadedLevel+1);
			print("Next Level...");
		}
		
		//Quit
		if(GUI.Button(Rect((Screen.width/2)-75,
		(Screen.height/2)+40,150,30),"Quit to Main Menu"))
		{
			Time.timeScale = 1;
			Application.LoadLevel(0);
			print("Quitting To Main Menu...");
		}
}

function loseGui(){
		//Display You Lost
		var guiStyle : GUIStyle = new GUIStyle();
		guiStyle.fontSize = 50;
		GUI.Label(Rect((Screen.width/2)-110,
		(Screen.height/2)-120,150,30),"You Lost", guiStyle);

		Time.timeScale = 0;
		//Next Level
		if(GUI.Button(Rect((Screen.width/2)-75,
		(Screen.height/2),150,30),"Retry Level"))
		{//distance from left, distance from top, width, height
			Time.timeScale = 1;
			RoundManager.setGameMode(GameMode.Playing);
			Application.LoadLevel(Application.loadedLevel);
			print("Restarting Level...");
		}
		
		//Quit
		if(GUI.Button(Rect((Screen.width/2)-75,
		(Screen.height/2)+40,150,30),"Quit to Main Menu"))
		{
			Time.timeScale = 1;
			Application.LoadLevel(0);
			print("Quitting To Main Menu...");
		}
}
