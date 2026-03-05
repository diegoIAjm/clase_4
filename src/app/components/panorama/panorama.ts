import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, createComponent, EnvironmentInjector } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { Login } from '../login/login'; 

@Component({
  selector: 'app-panorama',
  standalone: true,
  templateUrl: './panorama.html',
  styleUrls: ['./panorama.scss']
})
export class Panorama implements AfterViewInit, OnDestroy {
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLDivElement>;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private cssRenderer!: CSS3DRenderer;
  private controls!: OrbitControls;
  private animationId = 0;

  constructor(private injector: EnvironmentInjector) {}

  ngAfterViewInit() {
    this.initThree();
    this.loadPanorama();
    this.addLogin3D(); 
    this.animate();
  }

  private initThree() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 0.1;

    
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);

    
    this.cssRenderer = new CSS3DRenderer();
    this.cssRenderer.setSize(width, height);
    this.cssRenderer.domElement.style.position = 'absolute';
    this.cssRenderer.domElement.style.top = '0';

    
    this.container.nativeElement.appendChild(this.renderer.domElement);
    this.container.nativeElement.appendChild(this.cssRenderer.domElement);

    
    this.controls = new OrbitControls(this.camera, this.cssRenderer.domElement);
    this.controls.enableZoom = false;
    this.controls.enablePan = false;
  }

  private loadPanorama() {
    const loader = new THREE.TextureLoader();
    loader.load('../../../assets/imagen.jpg', (texture: THREE.Texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      const geometry = new THREE.SphereGeometry(500, 60, 40);
      geometry.scale(-1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const sphere = new THREE.Mesh(geometry, material);
      this.scene.add(sphere);
    });
  }

  
  private addLogin3D() {
    const loginRef = createComponent(Login, { environmentInjector: this.injector });
    const element = loginRef.location.nativeElement;

    
    element.style.transform = 'scale(1.2)';
    element.style.pointerEvents = 'auto';

    const cssObject = new CSS3DObject(element);
    cssObject.position.set(0, 0, -300); 
    this.scene.add(cssObject);
  }

  private animate = () => {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    this.cssRenderer.render(this.scene, this.camera);
    this.animationId = requestAnimationFrame(this.animate);
  };

  ngOnDestroy() {
    cancelAnimationFrame(this.animationId);
  }
}