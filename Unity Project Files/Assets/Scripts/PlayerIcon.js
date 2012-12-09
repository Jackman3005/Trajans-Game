#pragma strict

var player : GameObject; 

function Start () 
{	
	player = GameObject.FindGameObjectWithTag("Player"); 
}

function Update () 
{
	transform.position.x = player.transform.position.x;
	//commenting this out keeps the overhead Over Head
	//transform.position.y = player.transform.position.y;
	transform.position.z = player.transform.position.z;
	
}