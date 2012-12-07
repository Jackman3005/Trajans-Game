#pragma strict

//Health
static var currentHealth : double;
static var maximumHealth : int = 50;
//private var HealthBar: Transform;//couldn't get referencing to work
//currently using script on the bar itself, which won't work for
//multiple enemies

//Movement and viewing
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
private static var self : GameObject;

function Start () {
	currentHealth = maximumHealth;
	player = GameObject.FindGameObjectWithTag("Player");
	self = GameObject.FindGameObjectWithTag(this.tag);
	timeSinceLastAttack = attackSpeed;
	
	//DRAINING HEALTH TO PROVE BAR
	ReduceHealthEachSecond();
	
	//HealthBar = this.transform.FindChild("HealthBar").transform.FindChild("Anchor").transform.FindChild("Bar").transform;
}

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

//Health Bar Shrinking attempt*************************************************
/*	  if(currentHealth == maximumHealth)
      	 HealthBar.localScale.z = 17;
      else if(currentHealth <= maximumHealth*.9 && currentHealth > maximumHealth *.8)
      	HealthBar.localScale.z = 15;
      else if(currentHealth <= maximumHealth*.8 && currentHealth > maximumHealth *.7)
      	HealthBar.localScale.z = 13;
      else if(currentHealth <= maximumHealth*.7 && currentHealth > maximumHealth *.6)
      	HealthBar.localScale.z = 11;
      else if(currentHealth <= maximumHealth*.6 && currentHealth > maximumHealth *.5)
      	HealthBar.localScale.z = 10;
      else if(currentHealth <= maximumHealth*.5 && currentHealth > maximumHealth *.4)
      	HealthBar.localScale.z = 8;
      else if(currentHealth <= maximumHealth*.4 && currentHealth > maximumHealth *.3)
      	HealthBar.localScale.z = 6;
      else if(currentHealth <= maximumHealth*.3 && currentHealth > maximumHealth *.2)
      	HealthBar.localScale.z = 4;
      else if(currentHealth <= maximumHealth*.2 && currentHealth > maximumHealth *.1)
      	HealthBar.localScale.z = 2;
      else if(currentHealth <= maximumHealth*.1 && currentHealth > 0)
      	HealthBar.localScale.z = 1;
      else
      	HealthBar.localScale.z = 0;
*/
//*****************************************************************************
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

static function addHealth(changeInHealth : int){
	currentHealth = currentHealth + changeInHealth;	
		if(currentHealth <= 0){
			Destroy(self);//on death, disappear
	}
}

function ReduceHealthEachSecond(){
	while(currentHealth > 0){
		yield WaitForSeconds(1);
		addHealth(-2);
	}
}