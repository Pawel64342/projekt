import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ServiceCurrService } from '../service-curr.service';



@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  posX: any
  posY: any
  posZ: any
  numberPhoto = -1
  previewNumberPhoto = -2
  description = "Galeria"
  descriptionDisplay = false
  positive: any
  negative: any
  plusToggle = false
  minusToggle = false
  constructor(private ServiceCurrService: ServiceCurrService) { }

  ngOnInit(): void {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 45, 30000);
    camera.position.set(900, 0, 900)


    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    let controls = new OrbitControls(camera, renderer.domElement)
    controls.minDistance = 500
    controls.maxDistance = 1700
    let display = (<HTMLInputElement>document.getElementById("displayText"))
    display.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(10000, 10000, 10000);
    
    let materialArray = []
    let textureft = new THREE.TextureLoader().load("../assets/gallery/barren_ft.jpg")
    let texturebk = new THREE.TextureLoader().load("../assets/gallery/barren_bk.jpg")
    let textureup = new THREE.TextureLoader().load("../assets/gallery/barren_up.jpg")
    let texturedn = new THREE.TextureLoader().load("../assets/gallery/barren_dn.jpg")
    let texturert = new THREE.TextureLoader().load("../assets/gallery/barren_rt.jpg")
    let texturelt = new THREE.TextureLoader().load("../assets/gallery/barren_lf.jpg")

    materialArray.push(new THREE.MeshBasicMaterial({ map: textureft }))
    materialArray.push(new THREE.MeshBasicMaterial({ map: texturebk }))
    materialArray.push(new THREE.MeshBasicMaterial({ map: textureup }))
    materialArray.push(new THREE.MeshBasicMaterial({ map: texturedn }))
    materialArray.push(new THREE.MeshBasicMaterial({ map: texturert }))
    materialArray.push(new THREE.MeshBasicMaterial({ map: texturelt }))

    for (let i = 0; i < 6; i++) { materialArray[i].side = THREE.BackSide }

    let skyboxgeo = new THREE.BoxGeometry(10000, 10000, 10000)
 
    const cube = new THREE.Mesh(geometry, materialArray);
    scene.add(cube);

    let materialArray4 = []
    materialArray4.push(new THREE.MeshBasicMaterial({ map: texturebk }))
    materialArray4.push(new THREE.MeshBasicMaterial({ color: 0x563400 }))//map: texturebk }))
    materialArray4.push(new THREE.MeshBasicMaterial({ color: 0x563400 }))
    materialArray4.push(new THREE.MeshBasicMaterial({ color: 0x563400 }))
    materialArray4.push(new THREE.MeshBasicMaterial({ color: 0x563400 }))
    materialArray4.push(new THREE.MeshBasicMaterial({ color: 0x563400 }))

    let texture8 = new THREE.TextureLoader().load("../assets/gallery/foto3.JPG")
    let materialArray8 = []
    materialArray8.push(new THREE.MeshBasicMaterial({ map: texture8 }))
    materialArray8.push(new THREE.MeshBasicMaterial({ color: 0x563400 }))//map: texturebk }))
    materialArray8.push(new THREE.MeshBasicMaterial({ color: 0x563400 }))
    materialArray8.push(new THREE.MeshBasicMaterial({ color: 0x563400 }))
    materialArray8.push(new THREE.MeshBasicMaterial({ color: 0x563400 }))
    materialArray8.push(new THREE.MeshBasicMaterial({ color: 0x563400 }))

    let texture9 = new THREE.TextureLoader().load("../assets/gallery/foto4.JPG")
    let materialArray9 = []
    materialArray9.push(new THREE.MeshBasicMaterial({ map: texture9 }))
    materialArray9.push(new THREE.MeshBasicMaterial({ color: 0x563400 }))//map: texturebk }))
    materialArray9.push(new THREE.MeshBasicMaterial({ color: 0x563400 }))
    materialArray9.push(new THREE.MeshBasicMaterial({ color: 0x563400 }))
    materialArray9.push(new THREE.MeshBasicMaterial({ color: 0x563400 }))
    materialArray9.push(new THREE.MeshBasicMaterial({ color: 0x563400 }))

    let materialArray5 = []
    const numCubes = 8;
    // const cubes = [];
    let textureFoto = new THREE.TextureLoader().load("../assets/gallery/foto1.JPG")
    let textureFoto2 = new THREE.TextureLoader().load("../assets/gallery/foto2.JPG")
    let objects: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial[], THREE.Object3DEventMap>[] | { position: { x: any; }; }[] = []
    for (let i = 0; i < numCubes; i++) {

      let geometry5 = new THREE.BoxGeometry(10, 240, 350)
      let material5
      if (i == 2) {

        materialArray5[0] = new THREE.MeshBasicMaterial({ map: textureFoto2 })
        material5 = materialArray5
      }

      else {
        materialArray4[0] = new THREE.MeshBasicMaterial({ map: textureFoto })
        material5 = materialArray4

      }
      if (i == 5) { material5 = materialArray8 }
      if (i == 6) { material5 = materialArray9 }
      const cube4 = new THREE.Mesh(geometry5, material5);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

      const angle = (i / numCubes) * Math.PI * 2;
      const radius = 500;
      cube4.position.x = Math.cos(angle) * radius;
      cube4.position.z = Math.sin(angle) * radius;
      cube4.rotation.y = -angle;
      objects.push(cube4)
      scene.add(cube4);
    }

    const animate = () => {

      const cameraPosition = camera.position;
      const cameraThreshold = 400;

      const photoPositions = [
        { x: 500, z: 0 },
        { x: 353, z: 353 },
        { x: 3, z: 500 },
        { x: -353, z: 353 },
        { x: -500, z: 6 },
        { x: -353, z: -353 },
        { x: -9, z: -500 },
        { x: 353, z: -353 }
      ];

      for (let i = 0; i < photoPositions.length; i++) {
        const photo = photoPositions[i];
        const distance = Math.sqrt(
          (cameraPosition.x - photo.x) ** 2 + (cameraPosition.z - photo.z) ** 2
        );
        if (distance < cameraThreshold
          && camera.position.y <= 150 && camera.position.y >= -150
          && this.previewNumberPhoto != i) {
          console.log(`Zdjęcie ${i} jest na wprost kamery.`);
          this.makehttp(i)
        }
      }

      requestAnimationFrame(animate);

      this.posX = camera.position.x.toFixed(4)
      this.posY = camera.position.y.toFixed(4)
      this.posZ = camera.position.z.toFixed(4)
      controls.update()
      renderer.render(scene, camera);
    }
    animate();
  }

  makehttp(numbertoGet: number) {
    this.previewNumberPhoto = numbertoGet
    this.plusToggle = false
    this.minusToggle = false
    this.ServiceCurrService.test1().subscribe(post => {
      this.descriptionDisplay = true
      this.numberPhoto = post[numbertoGet].id
      this.description = post[numbertoGet].description
      this.positive = post[numbertoGet].positive
      this.negative = post[numbertoGet].negative

    }
    )
  }


  updateNumber(id: any, notep: string, noten: string, sign: string) {
    let num
    const formData = new FormData();
    formData.append("id", id);
    if (sign == "Plus") {
      num = Number(notep)
      num++
      this.positive++
      let num2 = Number(noten)
      if (this.minusToggle) {
        num2--
        this.negative--
      }
      formData.append("positive", num.toString())
      formData.append("negative", num2.toString())
      this.plusToggle = true
      this.minusToggle = false
    } else {

      num = Number(noten)
      num++
      this.negative++
      let num2 = Number(notep)
      if (this.plusToggle) {
        num2--
        this.positive--
      }
      formData.append("negative", num.toString())
      formData.append("positive", num2.toString())
      this.plusToggle = false
      this.minusToggle = true
    }
    this.ServiceCurrService.test2(formData).subscribe(data => {
      this.descriptionDisplay = true
    });
  }

  setPosX(x: string) {
    this.posX = Number(x)

  }

  setPosY(y: string) {
    this.posY = Number(y)

  }
  setPosZ(z: string) {
    this.posZ = Number(z)
  }


}
