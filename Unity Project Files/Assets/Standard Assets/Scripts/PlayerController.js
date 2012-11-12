#pragma strict

var GUI:InGameGUI;
var player : GameObject;

function Start () 
{
	GUI = GameObject.FindWithTag("GUI").GetComponent(InGameGUI);
	player = GameObject.FindGameObjectWithTag("Player");
	player.animation.Play("idle");
}

function Update () 
{
	if(Input.GetKeyDown("w"))
	{
		player.animation.Play("walk");
	}
	
	if(Input.GetKeyDown(KeyCode.LeftShift) || Input.GetKeyDown(KeyCode.LeftShift))
	{
		player.animation.Play("run");
	}
	
	if(Input.GetKeyDown("space"))
	{
		player.animation.Play("jump_pose");
	}
	
	if(player.transform.position.y > 52 && Input.GetKeyUp("space"))
	{
		player.animation.Play("idle");
	}
	
	/*if(player.transform.position.y < 52 && Input.anyKeyDown == false)
	{
	//	player.animation.Play("walk");
		player.animation.Play("idle");
	}*/
	
	if(Input.GetKeyUp("w") || 
	   Input.GetKeyUp(KeyCode.LeftShift) || 
	   Input.GetKeyUp(KeyCode.LeftShift)
	  )
	{
		player.animation.Play("walk");
		player.animation.Play("idle");
	}
}

function Death()
{
	GUI.Lose();
}