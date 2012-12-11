#pragma strict

private var GUI:InGameGUI;
private var player   : GameObject;
private var threeCam : GameObject;
private var firstPersonCam : GameObject;
private var currentlyIn3rdPerson : boolean;
var walking:AudioClip;
var running:AudioClip;
var idle   :AudioClip;

private var weaponControllerScript : PlayerWeaponController;

private var youAreOnTheGround : boolean = true;
private var f_height : double;
private var f_lastY  : double;
public var layerMask : LayerMask; 

private var animator: Animator;
private var DirectionDampTime:float = .25f;

enum AnimState {idle,walking,running,jumping};
var currAnimState : AnimState = AnimState.idle;
var lastAnimState : AnimState = AnimState.idle;


function Start () 
{
	animator = this.GetComponent(Animator);
	GUI = GameObject.FindWithTag("GUI").GetComponent(InGameGUI);
	player = GameObject.FindGameObjectWithTag("Player");
	threeCam = GameObject.FindGameObjectWithTag("3rd Perspective");
	firstPersonCam = GameObject.FindGameObjectWithTag("MainCamera");
	weaponControllerScript = player.GetComponent(PlayerWeaponController);
	
	currentlyIn3rdPerson = false;
	threeCam.camera.enabled = currentlyIn3rdPerson;
	
	
	f_lastY = transform.position.y;
	
}

function checkIfLookingAtEnemyAndAttackIfMouseClicked(){

	var layerMaskForAttacking = 1 << 11;
	layerMaskForAttacking = ~layerMaskForAttacking;
	
	var ray : Ray; 
    // Do a raycast
    var hit : RaycastHit;
//RayCaster For Reticle********************************************************
	if (threeCam.camera.enabled){
		ray = threeCam.camera.ViewportPointToRay(Vector3(0.5,0.5,0));
	}
	else{
		ray = firstPersonCam.camera.ViewportPointToRay (Vector3(0.5,0.5,0));
	}
    if (Physics.Raycast (ray, hit,Mathf.Infinity,layerMaskForAttacking)){
    	print(hit.transform.name);
    	
    	var distanceToEnemy : double = 0;
    	var lookingAtEnemy : boolean = false;
    	var enemyAIScript : EnemyAI = null;
    	
        if(hit.transform.tag.Equals("Enemy")){
        	lookingAtEnemy = true;
        	enemyAIScript = hit.transform.gameObject.GetComponent(EnemyAI);
        	distanceToEnemy = (hit.transform.position - transform.position).magnitude;
        }
    	
    	PlayerHUD.leftIndicator  = lookingAtEnemy && weaponControllerScript.canAttackWithMainHandWeapon(distanceToEnemy);
		PlayerHUD.rightIndicator = lookingAtEnemy && weaponControllerScript.canAttackWithOffHandWeapon(distanceToEnemy);
		
		if (Input.GetMouseButtonDown(0)){
    		weaponControllerScript.tryToAttackWithMainHandWeapon(enemyAIScript, distanceToEnemy);
    	}
    	if (Input.GetMouseButtonDown(1)){
    		weaponControllerScript.tryToAttackWithOffHandWeapon(enemyAIScript, distanceToEnemy);
    	}
    }
        

}

function Update ()
{
    checkIfLookingAtEnemyAndAttackIfMouseClicked();
    
//*****************************************************************************
	animator.SetBool("Jump",    Input.GetButton("Fire1"));
	animator.SetBool("Running", Input.GetButton("Fire2")||Input.GetButton("Fire2")&&Input.GetKeyDown(KeyCode.W));
	
	var h:float = Input.GetAxis ("Horizontal");
	var v:float = Input.GetAxis ("Vertical");
		
	animator.SetFloat("Speed", h*h+v*v);
	animator.SetFloat("Direction", h, DirectionDampTime, Time.deltaTime);
//*****************************************************************************

 	if(Input.GetKeyDown(KeyCode.Tab))
	{
		currentlyIn3rdPerson = !currentlyIn3rdPerson;
		threeCam.camera.enabled = !threeCam.camera.enabled;
	}
	if (currentlyIn3rdPerson){
		if(Input.GetKeyDown(KeyCode.LeftControl))
		{
			threeCam.camera.enabled = false;
		}
		
		if(Input.GetKeyUp(KeyCode.LeftControl))
		{
			threeCam.camera.enabled = true;
		}
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
				//player.animation.Play("idle");
				break;
			case AnimState.walking:
				audio.clip = walking;
				audio.Play();
				//player.animation.Play("walk");
				break;
			case AnimState.running:
				audio.clip = running;
				audio.Play();
				//player.animation.Play("run");
				break;
			case AnimState.jumping:
				audio.Stop();
				//player.animation.Play("jump_pose");
				//animator.SetBool("Running", Input.GetButton("Fire2"));
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