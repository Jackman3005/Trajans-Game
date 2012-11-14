#pragma strict

var GUI:InGameGUI;
var player : GameObject;
var threeCam : GameObject;
var AllowMouseMovement:boolean;
var walking:AudioClip;
var running:AudioClip;

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
 		if(Input.GetKeyDown(KeyCode.Tab))
		{
			threeCam.camera.enabled = !threeCam.camera.enabled;
		}

		if(Input.GetKeyDown("w") || Input.GetKeyDown("a") || Input.GetKeyDown("s") || Input.GetKeyDown("d"))
		{
			audio.clip = walking;
			audio.Play();
			player.animation.Play("walk");
		}

		if(Input.GetKeyDown(KeyCode.LeftShift) || Input.GetKeyDown(KeyCode.LeftShift))
		{
			audio.clip = running;
			player.animation.Play("run");
		}

		if(Input.GetKeyDown("space"))
		{
			player.animation.Play("jump_pose");
		}

		if(player.transform.position.y > 52 && Input.GetKeyUp("space"))
		{
			audio.Stop();
			player.animation.Play("idle");
		}

		if(Input.GetKeyUp("w") ||
		Input.GetKeyUp(KeyCode.LeftShift) ||
		Input.GetKeyUp(KeyCode.LeftShift)
		)
		{
			audio.Stop();
			player.animation.Play("idle");
		}
		
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