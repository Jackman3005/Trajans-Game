#pragma strict

var guiMode:String = "InGame";
var EnemiesDefeated:int;
var levelTotal:int;

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
	if(guiMode == "Paused")
	{
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

	if(guiMode == "Win")
	{
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
	
	if(guiMode == "Lose")
	{
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