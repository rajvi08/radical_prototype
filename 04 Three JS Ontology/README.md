# Three.js Foundations

## What is Three.js?

Three.js is a popular JavaScript library that makes it easy to create and display animated 3D computer graphics in a web browser using WebGL. It provides a high-level API that abstracts away the complexity of WebGL programming, making 3D graphics accessible to web developers.

## Core Concepts

### 1. Scene
The **Scene** is the container that holds all the 3D objects, lights, and cameras. Think of it as the world where your 3D content exists.

```javascript
const scene = new THREE.Scene();
```

### 2. Camera
The **Camera** defines the viewpoint from which the scene is rendered. Three.js provides two main camera types:

- **PerspectiveCamera**: Mimics human vision with perspective projection
- **OrthographicCamera**: Provides parallel projection without perspective distortion

```javascript
// Perspective camera
const camera = new THREE.PerspectiveCamera(
    75,                    // Field of view (FOV)
    window.innerWidth / window.innerHeight,  // Aspect ratio
    0.1,                   // Near clipping plane
    1000                   // Far clipping plane
);
```

### 3. Renderer
The **Renderer** is responsible for drawing the scene from the camera's perspective onto the canvas. It uses WebGL to perform the actual rendering.

```javascript
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
```

### 4. Geometry
**Geometry** defines the shape and structure of 3D objects. It contains vertices, faces, and other geometric data.

```javascript
// Box geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);

// Sphere geometry
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
```

### 5. Material
**Material** defines how the surface of a 3D object appears, including color, texture, transparency, and other visual properties.

```javascript
// Basic material
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

// Standard material with lighting
const material = new THREE.MeshStandardMaterial({ 
    color: 0x00ff00,
    metalness: 0.5,
    roughness: 0.5
});
```

### 6. Mesh
A **Mesh** combines geometry and material to create a visible 3D object that can be added to the scene.

```javascript
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
```

## Essential Components

### Lights
Lighting is crucial for realistic 3D rendering. Three.js provides several light types:

- **AmbientLight**: Provides uniform lighting from all directions
- **DirectionalLight**: Simulates sunlight (parallel rays)
- **PointLight**: Emits light in all directions from a single point
- **SpotLight**: Emits light in a cone shape

```javascript
// Ambient light
const ambientLight = new THREE.AmbientLight(0x404040, 0.5);

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);

scene.add(ambientLight);
scene.add(directionalLight);
```

### Animation Loop
To create animated scenes, you need an animation loop that continuously renders the scene:

```javascript
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate the cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    
    // Render the scene
    renderer.render(scene, camera);
}

animate();
```

## Basic Setup Template

Here's a minimal Three.js setup:

```javascript
// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000
);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Geometry and Material
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Position camera
camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();
```

## Key Features

### 1. Cross-browser Compatibility
Three.js handles WebGL compatibility across different browsers and devices.

### 2. Rich Geometry Library
Pre-built geometries for common shapes:
- BoxGeometry, SphereGeometry, CylinderGeometry
- PlaneGeometry, TorusGeometry, ConeGeometry
- And many more...

### 3. Material System
Various material types for different visual effects:
- MeshBasicMaterial (no lighting)
- MeshLambertMaterial (diffuse lighting)
- MeshPhongMaterial (specular highlights)
- MeshStandardMaterial (physically-based rendering)
- MeshPhysicalMaterial (advanced PBR)

### 4. Loaders
Built-in loaders for importing 3D models and textures:
- GLTFLoader, OBJLoader, FBXLoader
- TextureLoader, CubeTextureLoader
- And many more...

### 5. Controls
Camera controls for interactive scenes:
- OrbitControls (mouse/touch camera control)
- FlyControls, FirstPersonControls
- PointerLockControls

## Getting Started

1. **Include Three.js**: Add the library to your HTML
   ```html
   <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
   ```

2. **Create a container**: Add a canvas element or let Three.js create one

3. **Set up the basic scene**: Scene, camera, and renderer

4. **Add objects**: Create geometries, materials, and meshes

5. **Add lighting**: Essential for realistic rendering

6. **Animate**: Use requestAnimationFrame for smooth animation

## Best Practices

1. **Performance**: Use instancing for repeated objects
2. **Memory Management**: Dispose of geometries and materials when no longer needed
3. **Responsive Design**: Handle window resize events
4. **Error Handling**: Check for WebGL support
5. **Optimization**: Use appropriate level of detail (LOD) for complex scenes

## Resources

- [Official Three.js Documentation](https://threejs.org/docs/)
- [Three.js Examples](https://threejs.org/examples/)
- [Three.js Editor](https://threejs.org/editor/)
- [WebGL Fundamentals](https://webglfundamentals.org/)

## Next Steps

Once you understand these foundations, explore:
- Advanced materials and shaders
- 3D model loading and animation
- Post-processing effects
- Physics integration
- VR/AR applications
- Performance optimization techniques

Three.js opens up a world of possibilities for creating immersive 3D web experiences!
