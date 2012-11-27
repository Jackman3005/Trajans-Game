#pragma strict

var crosshairTexture : Texture2D;
var position : Rect;
static var OriginalOn = true;
static var threeCam : GameObject;

function start()
{
	threeCam = GameObject.FindGameObjectWithTag("3rd Perspective");
}

function Update()
{
	if(Input.GetKeyDown(KeyCode.Tab))
		OriginalOn = !OriginalOn;

    position = Rect((Screen.width - crosshairTexture.width) / 2
    , (Screen.height - crosshairTexture.height) /2, crosshairTexture.width
    , crosshairTexture.height);
}

function OnGUI()
{
    if(OriginalOn)// && !threeCam.camera.enabled)
    {
        GUI.DrawTexture(position, crosshairTexture);
    }
}