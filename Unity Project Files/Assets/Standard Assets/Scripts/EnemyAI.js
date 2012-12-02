#pragma strict

public var movementSpeed : double = 1;
public var attackSpeed : double = 1;
public var attackDamage : double = 5;
public var attackRange : double = 2;

private var playerIsAttackable : boolean = false;
private var player : GameObject;
private var timeSinceLastAttack : double;
private var controller : CharacterController;
private var rotationDamping : double;

function Awake () {
	controller = GetComponent (CharacterController);
}

function tryToAttackPlayer(){
	timeSinceLastAttack += Time.deltaTime;
	if(playerIsAttackable && timeSinceLastAttack >= attackSpeed){
		Player.addHealth(-attackDamage);
		timeSinceLastAttack = 0;
	}
}



function Start () {
	player = GameObject.FindGameObjectWithTag("Player");
	timeSinceLastAttack = attackSpeed;
}

function Update () {
	var playerX : double = player.transform.position.x;
	var playerY : double = player.transform.position.y;
	var playerZ : double = player.transform.position.z;
	var direction : Vector3 = new Vector3(playerX - transform.position.x,playerY - transform.position.y, playerZ - transform.position.z);
	
//	 var rotation : Quaternion = new Quaternion();
//   	rotation.SetLookRotation(direction);
//	transform.rotation.y = rotation.y;

	var rotation = Quaternion.LookRotation(direction);
	transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * rotationDamping);


	playerIsAttackable = direction.magnitude <= attackRange;
	tryToAttackPlayer();


	
//	if (!playerIsAttackable){
//		transform.position.x += direction.normalized.x * movementSpeed*Time.deltaTime;
//		transform.position.z += direction.normalized.z * movementSpeed*Time.deltaTime;
//	}


	//The pushDownOffset is used to make sure the enemy goes off of cliffs appropriately. Gravity by itself does not make it fall fast enough.
	var pushDownOffset : float = Mathf.Max(controller.stepOffset, Vector3(direction.x, 0, direction.z).magnitude);
	direction -= pushDownOffset * Vector3.up;
	
	controller.Move(direction.normalized*movementSpeed*Time.deltaTime);
	
	
}

