#pragma strict

//Health
private var currentHealth : double;

//private var HealthBar: Transform;//couldn't get referencing to work
//currently using script on the bar itself, which won't work for
//multiple enemies

//Movement and viewing
public var maximumHealth : int = 50;
public var movementSpeed : double = 1;
public var attackSpeed : double = 1;
public var attackDamage : double = 5;
public var attackRange : double = 2;
public var fieldOfViewInDegrees : float = 60;
public var maxDistEnemyCanSeePlayer : float = 60;
public var distThatEnemyWillAttackPlayerWithoutSeeingThem : float = 5;


private var playerIsAttackable : boolean = false;

private var timeSinceLastAttack : double;
private var controller : CharacterController;
private var rotationDamping : double;
private var directionOfPlayer : Vector3;
private var self : GameObject;
private var player : GameObject;
private var playerScript : Player;

function Start () {
	currentHealth = maximumHealth;
	player = GameObject.FindGameObjectWithTag("Player");
	self = GameObject.FindGameObjectWithTag(this.tag);
	playerScript = player.GetComponent(Player);
	timeSinceLastAttack = attackSpeed;

}

enum EnemyState {patrol,attack};
private var currState : EnemyState = EnemyState.patrol;

function Awake () {
	controller = GetComponent (CharacterController);
}

function tryToAttackPlayer(){
	timeSinceLastAttack += Time.deltaTime;
	if(playerIsAttackable && timeSinceLastAttack >= attackSpeed){
		playerScript.addHealth(-attackDamage);
		timeSinceLastAttack = 0;
	}
}

function Update () {
	directionOfPlayer = player.transform.position - transform.position;	
	playerIsAttackable = directionOfPlayer.magnitude <= attackRange;
	tryToAttackPlayer();
	if (PlayerIsInRangeAndSight()){
		FollowAndLookAtPlayer();
	}
	
	if (currentHealth > maximumHealth){
		currentHealth = maximumHealth;
	}//added else, may need to remove if it doesn't work
	else if (currentHealth < 0){
		currentHealth = 0;
	}

}

function PlayerIsInRangeAndSight(){
	var forwardFacingAngle : float = transform.rotation.y;
	var angleTowardsPlayer : float = Vector3.Angle(directionOfPlayer, transform.forward);
	
	var returnValue : boolean = ((forwardFacingAngle - (fieldOfViewInDegrees/2)) < angleTowardsPlayer) && (angleTowardsPlayer < (forwardFacingAngle + (fieldOfViewInDegrees/2)));
	returnValue = (returnValue && directionOfPlayer.magnitude < maxDistEnemyCanSeePlayer) || (directionOfPlayer.magnitude < distThatEnemyWillAttackPlayerWithoutSeeingThem);
	return returnValue;
}

function FollowAndLookAtPlayer(){
	var point : Vector3 = player.transform.position;
	point.y = transform.position.y;
	transform.LookAt(point);

	if (!playerIsAttackable){
		//The pushDownOffset is used to make sure the enemy goes off of cliffs appropriately. Gravity by itself does not make it fall fast enough.
		var pushDownOffset : float = Mathf.Max(controller.stepOffset, Vector3(directionOfPlayer.x, 0, directionOfPlayer.z).magnitude);
		directionOfPlayer -= pushDownOffset * Vector3.up;
		controller.Move(directionOfPlayer.normalized*movementSpeed*Time.deltaTime);
	}
}

function addHealth(changeInHealth : int){
	currentHealth += changeInHealth;	
		if(currentHealth <= 0){
			Destroy(self);//on death, disappear
	}
}

function getCurrentHealth(){
	return currentHealth;
}

function ReduceHealthEachSecond(){
	while(currentHealth > 0){
		yield WaitForSeconds(1);
		addHealth(-2);
	}
}