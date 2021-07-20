
// variables for Camera Perspective
const fov = 75;
const aspect = 2;  // the canvas default
const near = 0.1;
const far = 5;
// variables for the scene
const color = 0xFFFFFF;
const intensity = 1;
// variables for the Cube
const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;


function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
    });
  
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;
  
    const scene = new THREE.Scene();
  
    {
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(-1, 2, 4);
      scene.add(light);
    }
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
  
    function makeInstance(geometry, color, x) {
      const material = new THREE.MeshPhongMaterial({color});
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
  
      cube.position.x = x;
  
      return cube;
    }
  
    const cube = makeInstance(geometry, 0x44aa88,  0)
  
    function resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }
  
    function render(time) {
      time *= 0.001;
  
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }
  
        const speed = 1;
        const rot = time * speed;
        cube.rotation.x = rot;
        cube.rotation.y = rot;
  
      renderer.render(scene, camera);
  
      requestAnimationFrame(render);
    }
  
    requestAnimationFrame(render);
  }
  
  main();