#pragma strict

public var movementSpeed : double = 1;
public var attackSpeed : double = 1;
public var attackDamage : double = 5;
public var attackRange : double = 2;
public var fieldOfViewInDegrees : float = 60;
public var maxDistEnemyCanSeePlayer : float = 60;
public var distThatEnemyWillAttackPlayerWithoutSeeingThem : float = 5;

private var playerIsAttackable : boolean = false;
private var player : GameObject;
private var timeSinceLastAttack : double;
private var controller : CharacterController;
private var rotationDamping : double;
private var directionOfPlayer : Vector3;

enum EnemyState {patrol,attack};
private var currState : EnemyState = EnemyState.patrol;

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
	directionOfPlayer = player.transform.position - transform.position;	
	playerIsAttackable = directionOfPlayer.magnitude <= attackRange;
	tryToAttackPlayer();
	if (PlayerIsInRangeAndSight()){
		FollowAndLookAtPlayer();
	}
	
}

function PlayerIsInRangeAndSight(){
	var forwardFacingAngle : float = transform.rotation.y;
	var angleTowardsPlayer : float = Vector3.Angle(directionOfPlayer, transform.forward);
	
	var returnValue : boolean = ((forwardFacingAngle - (fieldOfViewInDegrees/2)) < angleTowardsPlayer) && (angleTowardsPlayer < (forwardFacingAngle + (fieldOfViewInDegrees/2)));
	Debug.Log("facing: " + forwardFacingAngle);
	Debug.Log(((forwardFacingAngle - (fieldOfViewInDegrees/2)) < angleTowardsPlayer) + "  " + ((forwardFacingAngle + (fieldOfViewInDegrees/2)) > angleTowardsPlayer));
	Debug.Log("Player: " +angleTowardsPlayer);
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
	
  	 var hit : RaycastHit;
  	 var rayStartPos : Transform = transform;
    if (Physics.Raycast (transform.position, Vector3.forward, hit)) {
        Debug.Log(hit.collider.gameObject.tag);
    }
}