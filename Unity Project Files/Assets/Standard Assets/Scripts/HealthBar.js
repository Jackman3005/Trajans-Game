#pragma strict

    //private var theCamera: Camera;
	//private var player:GameObject;
    
	var health:double;
    var maxHealth:double;
    
    function Start()
    {
        //player = GameObject.FindGameObjectWithTag("Player");
        //theCamera = player.camera;
        maxHealth = EnemyAI.maximumHealth;
       
    }

    // Update is called once per frame

    function Update()
    {
      //this.transform.rotation = theCamera.transform.rotation;
      //this.transform.position.z = EnemyAI.self.GetComponent("HealthBar").GetComponent("Anchor").transform.position.z;
      health = EnemyAI.currentHealth;
      
      if(health == maxHealth)
      	 this.transform.localScale.z = 17;
      else if(health <= maxHealth*.9 && health > maxHealth *.8)
      	this.transform.localScale.z = 15;
      else if(health <= maxHealth*.8 && health > maxHealth *.7)
      	this.transform.localScale.z = 13;
      else if(health <= maxHealth*.7 && health > maxHealth *.6)
      	this.transform.localScale.z = 11;
      else if(health <= maxHealth*.6 && health > maxHealth *.5)
      	this.transform.localScale.z = 10;
      else if(health <= maxHealth*.5 && health > maxHealth *.4)
      	this.transform.localScale.z = 8;
      else if(health <= maxHealth*.4 && health > maxHealth *.3)
      	this.transform.localScale.z = 6;
      else if(health <= maxHealth*.3 && health > maxHealth *.2)
      	this.transform.localScale.z = 4;
      else if(health <= maxHealth*.2 && health > maxHealth *.1)
      	this.transform.localScale.z = 2;
      else if(health <= maxHealth*.1 && health > 0)
      	this.transform.localScale.z = 1;
      else
      	this.transform.localScale.z = 0;
    }
