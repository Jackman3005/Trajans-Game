#pragma strict

public var movementSpeed : double = 1;
public var attackSpeed : double = 1;
public var attackDamage : double = 5;
public var attackRange : double = 2;

private var playerIsAttackable : boolean = false;
private var player : GameObject;
private var timeSinceLastAttack : double;



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
	
	var rotation = transform.rotation;
	rotation.SetLookRotation(player.transform.position);
	transform.rotation.y = rotation.y;

	playerIsAttackable = direction.magnitude <= attackRange;
	tryToAttackPlayer();


	
	if (!playerIsAttackable){
		transform.position.x += direction.normalized.x * movementSpeed*Time.deltaTime;
		transform.position.z += direction.normalized.z * movementSpeed*Time.deltaTime;
	}
	
	
}

