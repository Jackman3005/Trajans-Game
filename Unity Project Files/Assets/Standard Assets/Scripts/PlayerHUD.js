#pragma strict

var healthGUI : GUIStyle;

var healthBarDistanceFromTop : double;
var healthBarDistanceFromLeft : double;
var healthBarHeight : double;
var healthBarWidth : double;

function OnGUI(){
	GUI.Label(new Rect(Screen.width/healthBarDistanceFromLeft,Screen.height/healthBarDistanceFromTop, Screen.width/healthBarWidth, Screen.height/healthBarHeight),Player.currentHealth +"/" + Player.maximumHealth , healthGUI);

}