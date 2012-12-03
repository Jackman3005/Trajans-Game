#pragma strict

var GUI:InGameGUI;
var player   : GameObject;
static var threeCam : GameObject;
var AllowMouseMovement:boolean;
var walking:AudioClip;
var running:AudioClip;
var idle   :AudioClip;

private var youAreOnTheGround : boolean = true;
private var f_height : double;
private var f_lastY : double;
public var layerMask : LayerMask; 

enum AnimState {idle,walking,running,jumping};
var currAnimState : AnimState = AnimState.idle;
var lastAnimState : AnimState = AnimState.idle;

function Start () 
{
	AllowMouseMovement = true;
	GUI = GameObject.FindWithTag("GUI").GetComponent(InGameGUI);
	player = GameObject.FindGameObjectWithTag("Player");
	threeCam = GameObject.FindGameObjectWithTag("3rd Perspective");
	threeCam.camera.enabled = false;
	//holdW = false;
	player.animation.Play("idle");
	
	
	f_lastY = transform.position.y;
}

function Update () 
{
 	if(Input.GetKeyDown(KeyCode.Tab))
	{
		threeCam.camera.enabled = !threeCam.camera.enabled;
	}
	
	if(Input.GetMouseButtonDown(1))
	{
		threeCam.camera.enabled = false;
	}
	
	if(Input.GetMouseButtonUp(1))
	{
		threeCam.camera.enabled = true;
	}
	


	checkIfOnGround();

	lastAnimState = currAnimState;
	if(youAreOnTheGround){
		if(Input.GetKey(KeyCode.LeftShift) || Input.GetKey(KeyCode.RightShift)){
			if(Input.GetKey("w") || Input.GetKey("a") || Input.GetKey("s") || Input.GetKey("d")){
				currAnimState = AnimState.running;
			}
			else{
				currAnimState = AnimState.idle;
			}
		}
		else if(Input.GetKey("w") || Input.GetKey("a") || Input.GetKey("s") || Input.GetKey("d")){
				currAnimState = AnimState.walking;
		}
		else{
				currAnimState = AnimState.idle;
		}
	}
	else{
		currAnimState = AnimState.jumping;
	}
	if (currAnimState != lastAnimState){
		switch(currAnimState){
			case AnimState.idle:
				audio.clip = idle;
				audio.Play();
				player.animation.Play("idle");
				break;
			case AnimState.walking:
				audio.clip = walking;
				audio.Play();
				player.animation.Play("walk");
				break;
			case AnimState.running:
				audio.clip = running;
				audio.Play();
				player.animation.Play("run");
				break;
			case AnimState.jumping:
				audio.Stop();
				player.animation.Play("jump_pose");
				break;
			default:
				break;
		}
	}
}

function Death()
{
	GUI.Lose();
}

 

public function OnDrawGizmos() : void {

	f_height = 2;  
	var v3_right : Vector3 = new Vector3(transform.position.x + (collider.bounds.size.x*0.2), transform.position.y, transform.position.z);
	var v3_left : Vector3 = new Vector3(transform.position.x - (collider.bounds.size.x*0.2), transform.position.y, transform.position.z);
	Gizmos.color = Color.red;
	Gizmos.DrawRay(transform.position, transform.TransformDirection (-Vector3.up) * (f_height * 0.5));
	Gizmos.DrawRay(v3_right, transform.TransformDirection (-Vector3.up) * (f_height * 0.5));
	Gizmos.DrawRay(v3_left, transform.TransformDirection (-Vector3.up) * (f_height * 0.5));
}

function checkIfOnGround () {
	//Checking Jumping by using Raycast
	var hit : RaycastHit; // in-parameter, used to get information about raycast collisions (if any)
	var v3_hit : Vector3 = transform.TransformDirection (-Vector3.up) * (f_height * 0.5);
	var v3_right : Vector3 = new Vector3(transform.position.x + (collider.bounds.size.x*0.2), transform.position.y, transform.position.z);
	var v3_left : Vector3 = new Vector3(transform.position.x - (collider.bounds.size.x*0.2), transform.position.y, transform.position.z);
	
    if (Physics.Raycast (transform.position, v3_hit, hit, 1.2, layerMask.value)) { // 2.5 = length of the ray
        youAreOnTheGround = true;
    } else if (Physics.Raycast (v3_right, v3_hit, hit, 1.2, layerMask.value)) {
   		if (!youAreOnTheGround) {
        	youAreOnTheGround = true;
        }
    } else if (Physics.Raycast (v3_left, v3_hit, hit,1.2, layerMask.value)) {
        if (!youAreOnTheGround) {
        	youAreOnTheGround = true;
        }
    } else {
		if (youAreOnTheGround) {
	    	if (Mathf.Floor(transform.position.y) == f_lastY) {
	    		youAreOnTheGround = true;
	    	} else {
	    		youAreOnTheGround = false;
	    	}
	    }
	}
    f_lastY = Mathf.Floor(transform.position.y);

}