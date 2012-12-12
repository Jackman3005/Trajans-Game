#pragma strict

static var guiMode:String = "InGame";
var EnemiesDefeated:int;
var levelTotal:int;
var readStory:boolean;
//var player : GameObject; 
var introStory:String;
	introStory = "Your homeland has been invaded by Emperor Trajan's forces. "+
	"They came seeking slaves to fuel their war-machine as they pursue global conquest. "+
	"As the nations have fallen, the emperor has sought new forms of entertainment "+
	"for himself and his patrons. "+
	"You have been given the chance to spare your land and kin from slavery, "+
	"provided you will fight in Trajan's Arena Games. If you can defeat his "+
	"current champion, you and your village will be spared.\n\n"+
	"                            Your struggle begins now";

function start()
{
	//player = GameObject.FindGameObjectWithTag("Player");

	readStory = false;
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
	if(Application.loadedLevel == 1 && !readStory)
	{
		RoundManager.setInGameState(InGameState.Intro);
		var guiStyle : GUIStyle = new GUIStyle();
		guiStyle.fontSize = 16;
		guiStyle.normal.textColor = Color.white;
		guiStyle.wordWrap = true;
		
		//Display Introduction
		Time.timeScale = 0;//freeze time
		
		GUI.Box(Rect(  (Screen.width/2)-205,
		(Screen.height/4)-5,405,205),"");
		
		GUI.Label(Rect((Screen.width/2)-200,
		(Screen.height/4),400,200),introStory, guiStyle);
		
		//Begin
		if(GUI.Button(Rect((Screen.width/2)-75,
		(Screen.height/2)+100,150,30),"Begin"))
		{//distance from left, distance from top, width, height
			
			RoundManager.setInGameState(InGameState.NotStarted);
			Time.timeScale = 1;//resume time
			readStory = true;
		}
	}
	
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
		guiStyle.normal.textColor = Color.white;
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
		guiStyle.normal.textColor = Color.white;
		
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
