import {
    Scene,
    Color,
    PerspectiveCamera,
    BoxGeometry,
    MeshBasicMaterial,
    MeshLambertMaterial,
    MeshStandardMaterial,
    Mesh,
    WebGLRenderer,
    DirectionalLight,
    PointLight,
    SpotLight,
    RectAreaLight,
    AmbientLight,
    HemisphereLight,
    Clock,
    MathUtils,
    TextureLoader,
    PlaneGeometry,
    SphereGeometry,
    Group,
    AxesHelper,
    GridHelper
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// 创建场景
const scene = new Scene()

scene.background = new Color('skyblue')

const fov = 35;
const aspect = window.innerWidth / window.innerHeight
const near = 0.1
const far = 100

// 创建摄像机
const camera = new PerspectiveCamera(fov, aspect, near, far)
camera.position.set(0, 10, 20)

const axesHelper = new AxesHelper()
const gridHelper = new GridHelper(10, 10)

// 创建平面几何体
const planeGeometry = new BoxGeometry(10, 0.2, 10)

const planeTexture = new TextureLoader().load('/public/assets/images/img1.jpg')

const planeMaterial = new MeshBasicMaterial({
    map: planeTexture
})

const plane = new Mesh(planeGeometry, planeMaterial)
plane.position.y = -1


// 创建几何体
const geometry = new BoxGeometry(2, 2, 2)

// 创建纹理
const textureLoader = new TextureLoader()
const texture = textureLoader.load('/public/assets/images/img2.png')

// 创建材质
const material = new MeshStandardMaterial({ 
    map: texture
})

// 创建网格
const cube = new Mesh(geometry, material)
cube.position.x = 4
cube.rotation.set(-0.5, -0.1, 0.8)

// 创建灯光
const light = new SpotLight('white', 0.5)
light.position.set(10, 10, 5)
const light2 = new HemisphereLight('white', 'darkslategrey', 1)


const group = new Group()
const sphereGeometry = new SphereGeometry(0.25, 16, 16)
const sphereMaterial = new MeshStandardMaterial({
    color: 'indigo'
})
const protoSphere = new Mesh(sphereGeometry, sphereMaterial)
group.add(protoSphere)

for (let i = 0; i < 1; i+=0.05) {
    const sphere = protoSphere.clone()
    sphere.position.x = Math.cos(2 * Math.PI * i)
    sphere.position.y = Math.sin(2 * Math.PI * i)
    sphere.scale.multiplyScalar(0.01 + i)
    group.add(sphere)
}
group.scale.multiplyScalar(2)
group.position.y = 4

const radiansPerSecond = MathUtils.degToRad(30)



scene.add(axesHelper)
scene.add(gridHelper)
scene.add(light)
scene.add(light2)
scene.add(cube)
scene.add(plane)
scene.add(group)

const clock = new Clock()


const renderer = new WebGLRenderer({
    antialias: true // 开启抗锯齿
})

renderer.setAnimationLoop(() => {
    const delta = clock.getDelta()
    cube.rotation.x += radiansPerSecond * delta
    cube.rotation.y += radiansPerSecond * delta
    cube.rotation.z += radiansPerSecond * delta
    group.rotation.z += radiansPerSecond * delta
    controls.update()
    renderer.render(scene, camera)
})

renderer.setSize(window.innerWidth, window.innerHeight)

// 设置渲染器设备屏幕的像素比
renderer.setPixelRatio(window.devicePixelRatio)

document.body.appendChild(renderer.domElement)



// 创建控制器
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

// renderer.render(scene, camera)

// function animate() {
//     requestAnimationFrame(animate)
//     controls.update()
//     renderer.render(scene, camera)
// }
// animate()


