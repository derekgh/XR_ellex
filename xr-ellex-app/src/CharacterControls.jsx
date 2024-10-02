import * as THREE from 'three';

class CharacterControls {
  constructor(model, mixer, animationsMap, camera, orbitControls, fadeDuration = 0.2) {
    this.model = model;
    this.mixer = mixer;
    this.animationsMap = animationsMap;
    this.camera = camera;
    this.orbitControls = orbitControls;
    this.fadeDuration = fadeDuration;

    this.currentState = 'idle';
    this.runToggle = false;
    this.isMoving = false;

    this.initAnimations();
    this.initKeyListeners();
  }

  initAnimations() {
    // Set default animation
    this.animationsMap.idle.play();
  }

  initKeyListeners() {
    this.keysPressed = {};

    window.addEventListener('keydown', (event) => {
      this.keysPressed[event.key] = true;
      if (event.key === 'Shift') {
        this.runToggle = !this.runToggle;
      }
    });

    window.addEventListener('keyup', (event) => {
      this.keysPressed[event.key] = false;
    });
  }

  update(delta) {
    this.mixer.update(delta);
    this.updateState();
    this.updateMovement(delta);
    this.updateCamera();
  }

  updateState() {
    const { idle, walking, running, jumping, falling } = this.animationsMap;
    const directionPressed = ['w', 'a', 's', 'd'].some((key) => this.keysPressed[key]);

    let newState;
    if (this.keysPressed[' '] && !this.isJumping) {
      newState = 'jumping';
    } else if (directionPressed && this.runToggle) {
      newState = 'running';
    } else if (directionPressed) {
      newState = 'walking';
    } else {
      newState = 'idle';
    }

    if (this.currentState !== newState) {
      this.animationsMap[this.currentState].fadeOut(this.fadeDuration);
      this.animationsMap[newState].reset().fadeIn(this.fadeDuration).play();
      this.currentState = newState;
    }
  }

  updateMovement(delta) {
    const moveSpeed = this.currentState === 'running' ? 6 : 3;
    const directionVector = new THREE.Vector3();

    if (this.keysPressed['w']) directionVector.z -= 1;
    if (this.keysPressed['s']) directionVector.z += 1;
    if (this.keysPressed['a']) directionVector.x -= 1;
    if (this.keysPressed['d']) directionVector.x += 1;

    directionVector.normalize().multiplyScalar(moveSpeed * delta);

    this.model.position.add(directionVector);

    const targetQuaternion = new THREE.Quaternion();
    targetQuaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.atan2(directionVector.x, directionVector.z));
    this.model.quaternion.rotateTowards(targetQuaternion, 0.1);
  }

  updateCamera() {
    this.camera.position.lerp(
      new THREE.Vector3(this.model.position.x, this.model.position.y + 5, this.model.position.z + 10),
      0.1
    );
    this.orbitControls.target.copy(this.model.position);
    this.orbitControls.update();
  }
}

export default CharacterControls;
