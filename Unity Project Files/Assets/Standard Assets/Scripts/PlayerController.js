#pragma strict

var GUI:InGameGUI;
var player : GameObject;
var threeCam : GameObject;
var AllowMouseMovement:boolean;
var holdW:boolean;
var walking:AudioClip;
var running:AudioClip;
var idle :AudioClip;

function Start () 
{
	AllowMouseMovement = true;
	GUI = GameObject.FindWithTag("GUI").GetComponent(InGameGUI);
	player = GameObject.FindGameObjectWithTag("Player");
	threeCam = GameObject.FindGameObjectWithTag("3rd Perspective");
	threeCam.camera.enabled = true;
	holdW = false;
	player.animation.Play("idle");
	
}

function Update () 
{
	if(Input.GetKeyDown("space"))
	{
		audio.Stop();
		player.animation.Play("jump_pose");
	}
	else if(player.transform.position.y < 51.5 && !Input.GetKey("space"))
	{
 		if(Input.GetKeyDown(KeyCode.Tab))
		{
			threeCam.camera.enabled = !threeCam.camera.enabled;
		}

		if(Input.GetKeyDown("w") || Input.GetKeyDown("a") || Input.GetKeyDown("s") || Input.GetKeyDown("d"))
		{
			audio.clip = walking;
			audio.Play();
			player.animation.Play("walk");
			holdW = true;
		}
		
		if(Input.GetKeyUp("w") || Input.GetKeyUp("a") || Input.GetKeyUp("s") || Input.GetKeyUp("d")
		&& !Input.GetKeyDown(KeyCode.LeftShift) && !Input.GetKeyDown(KeyCode.RightShift))
		{
			holdW = false;
			audio.clip = idle;
			audio.Play();
			player.animation.Play("idle");
		}

		if(Input.GetKeyDown(KeyCode.LeftShift) || Input.GetKeyDown(KeyCode.RightShift))
		{
			audio.clip = running;
			audio.Play();
			player.animation.Play("run");
		}
		
		if(Input.GetKeyUp(KeyCode.LeftShift) || Input.GetKeyUp(KeyCode.RightShift) && holdW)
		{
			audio.clip = walking;
			audio.Play();
			player.animation.Play("walk");
		}

	/*	if(player.transform.position.y > 52 && Input.GetKeyUp("space"))
		{
			audio.Stop();
			player.animation.Play("idle");
		}*/
	}
	else
	{
		
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