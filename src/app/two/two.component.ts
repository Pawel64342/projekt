import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ServiceCurrService } from '../service-curr.service';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';


@Component({
  selector: 'app-two',
  templateUrl: './two.component.html',
  styleUrls: ['./two.component.css']
})
export class TwoComponent implements OnInit {

  code = [];
  currencyTab: any;
  curr1Name: string | undefined;
  curr1Code: any;
  // curr1Days = [];
  // curr1Mid = [];
  val1 = [];
  average = 0
  DisplayLength = 0
  cubeHights: any
  CurrCodesandNames = [["THB", "bat (Tajlandia)"], ["USD", "dolar amerykański"], ["AUD", "dolar australijski"], ["HKD", "dolar Hongkongu"],
  ["CAD", "dolar kanadyjski"], ["NZD", "dolar nowozelandzki"],
  ["SGD", "dolar singapurski"], ["EUR", "euro"], ["HUF", "forint (Węgry)"],
  ["CHF", "frank szwajcarski"], ["GBP", "funt szterling"], ["UAH", "hrywna (Ukraina)"],
  ["JPY", "jen (Japonia)"], ["CZK", "korona czeska"], ["DKK", "korona duńska"], ["ISK", "korona islandzka"],
  ["NOK", "korona norweska"], ["SEK", "korona szwedzka"], ["HRK", "kuna (Chorwacja)"],
  ["RON", "lej rumuński"], ["BGN", "lew (Bułgaria)"], ["TRY", "lira turecka"],
  ["ILS", "nowy izraelski szekel"], ["CLP", "peso chilijskie"], ["PHP", "peso filipińskie"],
  ["MXN", "peso meksykańskie"], ["ZAR", "rand (RPA)]"], ["BRL", "real (Brazylia)"],
  ["MYR", "ringgit (Malezja)"], ["RUB", "rubel rosyjski"], ["IDR", "rupia indonezyjska"],
  ["INR", "rupia indyjska"], ["KRW", "won południowokoreański"], ["CNY", "yuan renminbi (Chiny)]"],
  ["XDR", "SDR (MFW)"]];

  constructor(private ServiceCurrService: ServiceCurrService) { }

  ngOnInit(): void {
    this.klik2("CHF")


  }

  klik(code: any) {
    let display = (<HTMLInputElement>document.getElementById("displayText"))
    display.innerHTML = ""
    this.klik2(code)
  }

  klik2(code: any) {

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const colorYellow = new THREE.Color('hsl(40,100%,60%)')
    const colorBlue = new THREE.Color('hsl(240, 100%, 27%)')
    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
   

    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    let controls = new OrbitControls(camera, renderer.domElement)
    controls.minDistance = 8
    controls.maxDistance = 18

    controls.minPolarAngle = Math.PI / 4
    controls.maxPolarAngle = Math.PI / 2;

    controls.minAzimuthAngle = -Math.PI / 4
    controls.maxAzimuthAngle = Math.PI / 4

    let display = (<HTMLInputElement>document.getElementById("displayText"))

    display.appendChild(renderer.domElement);

    const texture = new THREE.TextureLoader().load("../assets/Space.jpg")

    let material = new THREE.MeshPhongMaterial({
      color: colorYellow,
      shininess: 80,
      map: texture
    })
    let materialMax = new THREE.MeshPhongMaterial({
      // color: new THREE.Color('hsl(0, 0%, 100%)'),//367ff4
      color: new THREE.Color('hsl(0.59, 0.793, 0.651)'),
      emissive: new THREE.Color('hsl(0, 0%, 100%)'),
      shininess: 80,
    })

   ;

    let materialMin = new THREE.MeshPhongMaterial({
      color: colorBlue,
      shininess: 80,
    })

    //wykres http
    var curr1Days: any[]=[]
    var curr1Mid=[]
    var hights: any[]=[]
    this.ServiceCurrService.getCurrencyOne1(code).subscribe(post => {
      let curr = post;
      this.curr1Code = curr.code;
      this.curr1Name = curr.currency;
  
      for (let i = 0; i < curr.rates.length; i++) {
        curr1Days[i] = curr.rates[i].effectiveDate;
        curr1Mid[i] = curr.rates[i].mid;
        hights[i]=curr.rates[i].mid;
      }
      let maxValue1 = Math.max(...hights)
      let minValue1 = Math.min(...hights)

      let curr1DaysMax = curr1Days[curr1Days.length-1]
      let curr1DaysMin = curr1Days[0]
      
    
        const loaderText = new FontLoader();
        loaderText.load('../assets/Inter_Regular.json', function (font) {
    
          const tgeometry = new TextGeometry(code, {
            font: font,
            size: 2,
            height: 0.3,
          });
          let textMesh = new THREE.Mesh(tgeometry, [
            new THREE.MeshBasicMaterial({ color: 0xffffff }),//0xD2E2FF }),
            new THREE.MeshNormalMaterial()
          ])
          textMesh.position.set(-2, -2, 2);
          scene.add(textMesh)
        });
    
        let cubeHight2 = []
        for (let i = 0; i < hights.length; i++) {
          let cubeHight = (hights[i]);
          cubeHight2[i] = cubeHight
         var cubeGeometry = new THREE.BoxGeometry(0.4, cubeHight, 1);
          
          let color7 = 0xD2E2FF
          let material7 = new THREE.MeshPhongMaterial({
            color: color7,
            shininess: 80,
            map: texture
          })
    
          let cube = new THREE.Mesh(cubeGeometry, material7);
          let text = hights[i].toString()
          if (hights[i] == maxValue1) {
            cube = new THREE.Mesh(cubeGeometry, materialMax);
            text = curr1Days[i].toString()+"\nMAX: \n" + hights[i].toString()
          }
          if (hights[i] == minValue1) {
            cube = new THREE.Mesh(cubeGeometry, materialMin);
            text = curr1Days[i].toString()+"\nMIN: \n" + hights[i].toString()
          }
    
          cube.position.set(-10 + i / 2, cubeHight / 2 - 2, 1);
          scene.add(cube);
          if (i % 2 == 0 || hights[i] == maxValue1 || hights[i] == minValue1) {
            loaderText.load('../assets/Inter_Regular.json', function (font) {
              const tgeometry = new TextGeometry(text, {
                font: font,
                size: 0.13,
                height: 0.12,
              });
              let textMesh1 = new THREE.Mesh(tgeometry, [
                new THREE.MeshBasicMaterial({ color: 0xffffff }),
                new THREE.MeshNormalMaterial()
              ])
              if (hights[i] == maxValue1 || hights[i] == minValue1) {
                textMesh1.position.set(-10 + i / 2 - 0.3, cubeHight - 1.4, 1.25);
              } else { textMesh1.position.set(-10 + i / 2 - 0.28, cubeHight - 2, 1.25); }
              scene.add(textMesh1)
            });
          }
    
        }
    
        let sum1 = 0;
        hights.forEach((num: any) => {
          sum1 += Number(num);
        })
        const avg = sum1 / hights.length
    
        const arr = hights
        let avgText = avg
        const geometryAv = new THREE.PlaneGeometry(hights.length * 0.5, 0.1);
        const materialAv = new THREE.MeshBasicMaterial(
          { color: 0x222fff, side: THREE.DoubleSide });
        const planeAv = new THREE.Mesh(geometryAv, materialAv);
        planeAv.position.set(1, avg - 2, 1.7);
    
        planeAv.rotation.x = Math.PI / 2
        scene.add(planeAv);
        let textAvg;
        loaderText.load('../assets/Inter_Regular.json', function (font) {
          const tgeometry = new TextGeometry("Średnia " + avg.toFixed(4), {
            font: font,
            size: 0.2,
            height: 0.1,
          });
          textAvg = new THREE.Mesh(tgeometry, [
            new THREE.MeshBasicMaterial({ color: 0x222fff }),
            new THREE.MeshNormalMaterial()
          ])
          textAvg.position.set(-10, avg -1.2, 1.7);
          scene.add(textAvg);
        });
        let textDates
        loaderText.load('../assets/Inter_Regular.json', function (font) {// daty
          const tgeometry = new TextGeometry(
            "Wykres kursów waluty w okresie "+
            curr1DaysMin.toString()+" - " +  curr1DaysMax.toString(), {
            font: font,
            size: 0.3,
            height: 0.1,
          });
          textDates = new THREE.Mesh(tgeometry, [
            new THREE.MeshBasicMaterial({ color: 0xffffff }),
            new THREE.MeshNormalMaterial()
          ])
          textDates.position.set(-5, - 2, 4.5);
          scene.add(textDates);
        });

        let flag
        if (code == "CHF" || code == "CZK" || code == "DKK" || code == "EUR" || code == "GBP"
          || code == "USD") { flag = code + ".jpg" }
        else { flag = "F0.jpg" }
    
        const textureP = new THREE.TextureLoader().load("../assets/flags/" + flag)
        const geometryP = new THREE.PlaneGeometry(10, 3);
        const materialP = new THREE.MeshBasicMaterial(
          { color: 0xffffff, map: textureP });
    
        const plane = new THREE.Mesh(geometryP, materialP);
        plane.position.set(1, -2, 3);
        plane.rotation.x = Math.PI / -2
        scene.add(plane); 
      
    });// koniec http

    var mixer: any
    const loader = new GLTFLoader();

    camera.position.z = 10;
    let hemilight = new THREE.HemisphereLight(0xffffff, 0x000000, 2)
    scene.add(hemilight)

    const light = new THREE.PointLight(colorYellow, 2)

    light.position.z = 20
    light.position.y = -20
    light.position.x = -40

    scene.add(light)

    controls.update()

    const clock = new THREE.Clock()
    var animate = function () {
      requestAnimationFrame(animate);
      const delta = clock.getDelta()
      if (mixer) { mixer.update(delta) }
      renderer.render(scene, camera);
    };

    animate();

  }
}
