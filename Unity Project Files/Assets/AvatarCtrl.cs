using UnityEngine;
using System;
using System.Collections;

public class AvatarCtrl : MonoBehaviour {
	
	protected Animator animator;
	
	public float DirectionDampTime = .25f;
	
	// Use this for initialization
	void Start () {
		animator = GetComponent<Animator>();
	}
	
	// Update is called once per frame
	void Update () {
		animator.SetBool("Jump", Input.GetButton("Fire1"));
		
		float h = Input.GetAxis("Horizontal");
		float v = Input.GetAxis ("Vertical");
		
		animator.SetFloat("Speed", h*h+v*v);
		animator.SetFloat("Direction", h, DirectionDampTime, Time.deltaTime);
	}
}
