#pragma strict

//negates needing to click play to see the button
//this makes everything happen in the editor, so only really use for gui stuff
@script ExecuteInEditMode()

function OnGUI()
{

	//will only show the Continue button if there has been a save
	if(PlayerPrefs.HasKey("PlayerLevel"))
	{
		if(GUI.Button(Rect((Screen.width/2)-75,(Screen.height/2)-20,150,30),"Continue Game"))
		{
			//Get the Player level and load into it
			Application.LoadLevel(PlayerPrefs.GetInt("PlayerLevel"));
			
			print("Continue Game...");
		}
	}
	
	//distance from left, distance from top, width, height 
	if(GUI.Button(Rect((Screen.width/2)-75,(Screen.height/2)+20,150,30),"New Game"))
	{
		//will reset progress to level 1
		PlayerPrefs.SetInt("PlayerLevel", 1);
		Application.LoadLevel(1);
		print("Starting New Game...");
	}
}