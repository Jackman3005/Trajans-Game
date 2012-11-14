#pragma strict

var GUI:InGameGUI;
var player : GameObject;
var threeCam : GameObject;
var AllowMouseMovement:boolean;

function Start () 
{
	AllowMouseMovement = true;
	GUI = GameObject.FindWithTag("GUI").GetComponent(InGameGUI);
	player = GameObject.FindGameObjectWithTag("Player");
	threeCam = GameObject.FindGameObjectWithTag("3rd Perspective");
	threeCam.camera.enabled = true;
	player.animation.Play("idle");
	
}

function Update () 
{

	if(Input.GetKeyDown(KeyCode.Tab))
	{
		threeCam.camera.enabled = !threeCam.camera.enabled;
	}

	if(Input.GetKeyDown("space"))
	{
		player.animation.Play("jump_pose");
	}
	else if(player.transform.position.y < 51.5 && !Input.GetKey("space"))
	{
		
		
		if(Input.GetKey("w"))
		{
			player.animation.Play("walk");
		}
		else if (Input.GetKey("a")){
			player.animation.Play("walk");
		}
		else if (Input.GetKey("d")){
			player.animation.Play("walk");
		}
		else if (Input.GetKey("s")){
			player.animation.Play("walk");
		}
		else if(Input.GetKey(KeyCode.LeftShift) || Input.GetKeyDown(KeyCode.LeftShift))
		{
			player.animation.Play("run");
		}
		else {
			player.animation.Play("idle");
		}
		
	}
	else{
		
	}
	
	
	/*if(player.transform.position.y < 52 && Input.anyKeyDown == false)
	{
	//	player.animation.Play("walk");
		player.animation.Play("idle");
	}*/
	

}

function Death()
{
	GUI.Lose();
}