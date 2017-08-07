var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
$("#WebGL-output").append(renderer.domElement);
//创建几何体
var geometry = new THREE.Geometry();
//创建线条的材质并定义两种颜色
var material = new THREE.LineBasicMaterial({ vertexColors: true }, 5);
var color1 = new THREE.Color(0x0000ff),
    color2 = new THREE.Color(0xff0000);
//线的颜色可以由2点的颜色决定
var p1 = new THREE.Vector3(-2, 0, -2);
var p2 = new THREE.Vector3(2, 0, 2);
//将点加到几何体的顶点集合内
geometry.vertices.push(p1);
geometry.vertices.push(p2);
//为几何体上色
geometry.colors.push(color1, color2);

var planeGeometry = new THREE.PlaneGeometry(3, 5, 1, 1);
var planeMaterial = new THREE.MeshBasicMaterial({
    color: 0x0000cc
});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.2 * Math.PI;
plane.position.x = 0;
plane.position.y = 0;
plane.position.z = 0;
scene.add(plane);


camera.position.z = 5;


renderer.render(scene, camera);
