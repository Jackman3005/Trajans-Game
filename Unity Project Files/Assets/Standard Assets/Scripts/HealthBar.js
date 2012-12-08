#pragma strict

    private var enemyAIScript : EnemyAI;
    private var maxHealthBarWidth : double;
    
    
    function Start()
    {

       var enemy : GameObject = GameObject.Find(transform.root.name);
       enemyAIScript = enemy.GetComponent(EnemyAI);
       
       maxHealthBarWidth = transform.renderer.bounds.size.z;
       
    }

    // Update is called once per frame

    function Update()
    {
      var maxHealth : double = enemyAIScript.maximumHealth;
      var currHealth : double = enemyAIScript.currentHealth;
      
      var healthPercentage : double = currHealth / maxHealth;
      
      transform.localScale.z = healthPercentage;
      
      transform.localPosition.z = (maxHealthBarWidth - (maxHealthBarWidth * healthPercentage))/2;
      
    }
