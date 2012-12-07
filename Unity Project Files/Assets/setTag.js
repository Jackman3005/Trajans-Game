#pragma strict

private var nameTag:String;

function Start () 
{
	nameTag = this.transform.parent.transform.parent.transform.parent.tag;
	this.tag = nameTag + "bar";
}

function Update () {

}