#pragma strict

var gameTime:float=0;
function Start () {

InvokeRepeating("CountDown", 1.0, 2.0);  //  Invokes the method methodName in time seconds. After the first invocation repeats calling that function every repeatRate seconds. 

}

function update()
{
}

function CountDown()
{
gameTime++;

if(gameTime==100)
{
 CancelInvoke("CountDown");

}
}

function OnGUI () {
   // GUI.Label (Rect (10, 10, 100, 20), "Score" + score);
    GUI.Label (Rect (10, 25, 100, 25), "Game Timer" + gameTime);

}