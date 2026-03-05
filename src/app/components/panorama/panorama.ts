import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-panorama',
  standalone: true,
  templateUrl: './panorama.html',
  styleUrl: './panorama.scss'
})
export class PanoramaComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private animationId = 0;

  ngAfterViewInit() {
    this.initThree();
    this.loadPanorama();
    this.animate();
  }

  private initThree() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 0.1;

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas.nativeElement });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private loadPanorama() {
    const loader = new THREE.TextureLoader();
    loader.load('assets/imagen.jpg', (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      const geometry = new THREE.SphereGeometry(500, 60, 40);
      geometry.scale(-1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const sphere = new THREE.Mesh(geometry, material);
      this.scene.add(sphere);
    });
  }

  private animate = () => {
    this.scene.rotation.y += 0.0008;
    this.renderer.render(this.scene, this.camera);
    this.animationId = requestAnimationFrame(this.animate);
  };

  ngOnDestroy() {
    cancelAnimationFrame(this.animationId);
  }
}