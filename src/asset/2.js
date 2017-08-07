var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
var renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)

$("#WebGL-output").append(renderer.domElement)

// 立方体
var geometry = new THREE.CubeGeometry(1, 1, 5)
var material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true
})
var cube = new THREE.Mesh(geometry, material)



scene.add(cube)
camera.position.z = 5

cube.rotation.x = 10
cube.rotation.y = 50
cube.rotation.z = 100


renderer.render(scene, camera)

console.log(cube.rotation.z)

/*function render() {
    requestAnimationFrame(render)
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    renderer.render(scene, camera)
}

render()
*/
