var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
var renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
$("#WebGL-output").append(renderer.domElement)
//创建几何体
var geometry = new THREE.Geometry()
//创建线条的材质并定义两种颜色
var material = new THREE.LineBasicMaterial({ vertexColors: true }, 5)
var color1 = new THREE.Color(0x0000ff),
    color2 = new THREE.Color(0xff0000)
//线的颜色可以由2点的颜色决定
var p1 = new THREE.Vector3(-2, 0, -2)
var p2 = new THREE.Vector3(2, 0, 2)
//将点加到几何体的顶点集合内
geometry.vertices.push(p1)
geometry.vertices.push(p2)
//为几何体上色
geometry.colors.push(color1, color2)
//定义一条线段，并添加到场景里
var line = new THREE.Line(geometry, material, THREE.LinePieces)
scene.add(line)
camera.position.z = 5
renderer.render(scene, camera)
