//Script for playing sound on events done.

var StepSound : AudioClip;

function Update() {

if (Input.GetKey (KeyCode.W)) {   //Checks for button press W

audio.loop = true;
audio.clip = StepSound;
audio.Play();


           } 
           
           audio.Stop();

} 