import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Component({
  selector: 'app-milestone-ladder',
  templateUrl: './milestone-ladder.component.html',
  styleUrls: ['./milestone-ladder.component.scss']
})
export class MilestoneLadderComponent implements OnInit, AfterViewInit, OnDestroy {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private lady!: THREE.Object3D;
  private mixer!: THREE.AnimationMixer;
  private climbAction!: THREE.AnimationAction;
  private currentTime: number = 0;  // Track current time in the animation
  private animationSpeed: number = 0.1;  // Control how much the animation advances with each click
  private stepHeight: number = 0.5;  // Height for each step
  private maxSteps: number = 5;  // Number of steps the lady will climb
  private currentStep: number = 0;  // Track how many steps the lady has climbed

  constructor() {}

  ngOnInit(): void {
    this.init3D();
  }

  ngAfterViewInit(): void {
    this.animate();
  }

  ngOnDestroy(): void {
    this.cleanup();
  }

  private init3D() {
    // Create the scene
    this.scene = new THREE.Scene();

    // Create the camera
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 1, 5);  // Position the camera a bit further back to view the model

    // Create the renderer and attach it to the DOM
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    // Load the lady model
    const loader = new GLTFLoader();
    loader.load('assets/models/ClimbingLadder.glb', (gltf) => {
      this.lady = gltf.scene;
      this.lady.scale.set(1, 1, 1);  // Adjust scale to make the model larger (try different values if needed)
      this.lady.position.set(0, 0, 0);  // Position the lady in front of the camera
      this.scene.add(this.lady);

      // Load the animation
      if (gltf.animations && gltf.animations.length) {
        // Setup the animation mixer and find the climbing animation
        this.mixer = new THREE.AnimationMixer(this.lady);
        const climbingAnimation = gltf.animations.find((clip) => clip.name === 'Armature|mixamo.com|Layer0');
        if (climbingAnimation) {
          this.climbAction = this.mixer.clipAction(climbingAnimation);
          this.climbAction.loop = THREE.LoopOnce;  // Make sure the animation only plays once
          this.climbAction.clampWhenFinished = true;  // Stop the animation when it finishes
          
          // Set the initial time to the first frame of climbing
          this.climbAction.time = 0; // If the climbing starts at time 0, adjust this if necessary
          this.climbAction.play();  // Play the animation once the model is ready
        }
      }
    });
  }

  private animate() {
    requestAnimationFrame(() => this.animate());

    // Update the animation mixer and render the scene
    if (this.mixer) {
      this.mixer.update(this.animationSpeed);
    }
    this.renderer.render(this.scene, this.camera);
  }

  private cleanup() {
    // Clean up the Three.js resources when the component is destroyed
    this.renderer.dispose();
  }

  // Start climbing animation from the current position (on button click)
  onClimbButtonClick() {
    if (this.climbAction && this.currentStep < this.maxSteps) {
      // Increment the animation time to make the character climb
      this.currentTime += 0.1;  // Adjust this value for faster/slower steps
      if (this.currentTime > this.climbAction.getClip().duration) {
        this.currentTime = this.climbAction.getClip().duration;
      }

      // Set the time for the animation, effectively progressing it step-by-step
      this.climbAction.time = this.currentTime;

      // Reset and play the animation to progress forward
      this.climbAction.reset().play();

      // Move the lady up one step vertically
      this.lady.position.y += this.stepHeight;  // Move up one step

      // Track the number of steps climbed
      this.currentStep++;
    }
  }
}