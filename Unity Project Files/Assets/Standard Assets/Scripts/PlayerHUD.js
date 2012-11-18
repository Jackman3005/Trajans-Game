#pragma strict

var healthGUI : GUIStyle;

function OnGUI(){
	GUI.Label(new Rect( (Screen.width/2)-88, Screen.height-82, 176, 20)
	,Player.currentHealth +"/" + Player.maximumHealth , healthGUI);

}