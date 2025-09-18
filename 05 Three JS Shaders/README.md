# Three.js Shaders: A Comprehensive Introduction

## What are Shaders?

Shaders are small programs that run on the GPU (Graphics Processing Unit) and are responsible for determining the final appearance of 3D objects in your scene. They are written in GLSL (OpenGL Shading Language) and execute in parallel for each pixel (fragment shader) or vertex (vertex shader).

## Types of Shaders

### 1. Vertex Shaders
- **Purpose**: Transform 3D coordinates to 2D screen coordinates
- **Input**: Vertex positions, normals, UV coordinates
- **Output**: Transformed vertex positions, varying variables for fragment shader
- **Runs**: Once per vertex

### 2. Fragment Shaders (Pixel Shaders)
- **Purpose**: Calculate the color of each pixel
- **Input**: Interpolated values from vertex shader, textures, uniforms
- **Output**: Final pixel color (RGBA)
- **Runs**: Once per pixel

## Shader Materials in Three.js

Three.js provides several built-in shader materials:

### 1. ShaderMaterial
- **Use**: Custom shaders with full control
- **Features**: Define your own vertex and fragment shaders
- **Best for**: Complex effects, custom lighting, procedural generation

### 2. RawShaderMaterial
- **Use**: Raw GLSL shaders without Three.js uniforms/attributes
- **Features**: No automatic uniforms or attributes
- **Best for**: Performance-critical applications, learning GLSL

### 3. Built-in Materials with Shader Support
- **MeshStandardMaterial**: Physically-based rendering
- **MeshPhongMaterial**: Phong lighting model
- **MeshLambertMaterial**: Lambertian (diffuse) lighting

## GLSL Basics

### Data Types
```glsl
// Scalars
float time = 1.0;
int count = 5;
bool isActive = true;

// Vectors
vec2 uv = vec2(0.5, 0.5);
vec3 position = vec3(1.0, 2.0, 3.0);
vec4 color = vec4(1.0, 0.0, 0.0, 1.0); // RGBA

// Matrices
mat3 rotation = mat3(1.0);
mat4 transform = mat4(1.0);
```

### Built-in Variables
```glsl
// Vertex Shader
attribute vec3 position;    // Vertex position
attribute vec3 normal;      // Vertex normal
attribute vec2 uv;          // UV coordinates

uniform mat4 modelViewMatrix;     // Model-view matrix
uniform mat4 projectionMatrix;    // Projection matrix
uniform mat3 normalMatrix;        // Normal matrix

varying vec3 vPosition;     // Pass to fragment shader
varying vec3 vNormal;       // Pass to fragment shader
varying vec2 vUv;           // Pass to fragment shader

// Fragment Shader
varying vec3 vPosition;     // From vertex shader
varying vec3 vNormal;       // From vertex shader
varying vec2 vUv;           // From vertex shader

uniform float time;         // Custom uniform
uniform vec3 color;         // Custom uniform

gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Output color
```

## Common Shader Patterns

### 1. Flat Color Shader
```glsl
// Fragment Shader
uniform vec3 uColor;

void main() {
    gl_FragColor = vec4(uColor, 1.0);
}
```

### 2. Gradient Shader
```glsl
// Fragment Shader
varying vec2 vUv;

void main() {
    vec3 color1 = vec3(1.0, 0.0, 0.0); // Red
    vec3 color2 = vec3(0.0, 0.0, 1.0); // Blue
    
    vec3 color = mix(color1, color2, vUv.y);
    gl_FragColor = vec4(color, 1.0);
}
```

### 3. Noise-based Effects
```glsl
// Fragment Shader
uniform float uTime;
varying vec2 vUv;

// Simple noise function
float noise(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
    float n = noise(vUv + uTime);
    gl_FragColor = vec4(vec3(n), 1.0);
}
```

## Three.js Shader Implementation

### Basic Setup
```javascript
// Create shader material
const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
        uTime: { value: 0.0 },
        uColor: { value: new THREE.Color(0xff0000) }
    },
    vertexShader: vertexShaderCode,
    fragmentShader: fragmentShaderCode
});

// Apply to mesh
const mesh = new THREE.Mesh(geometry, shaderMaterial);
```

### Updating Uniforms
```javascript
// In animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Update time uniform
    shaderMaterial.uniforms.uTime.value = performance.now() * 0.001;
    
    renderer.render(scene, camera);
}
```

## Performance Considerations

### 1. Minimize Uniform Updates
- Update uniforms only when necessary
- Use `uniformsNeedUpdate` flag for complex materials

### 2. Optimize Shader Code
- Avoid expensive operations in fragment shaders
- Use built-in functions when possible
- Minimize texture lookups

### 3. LOD (Level of Detail)
- Use simpler shaders for distant objects
- Implement shader complexity based on distance

## Debugging Shaders

### 1. Visual Debugging
```glsl
// Debug UV coordinates
gl_FragColor = vec4(vUv, 0.0, 1.0);

// Debug normals
gl_FragColor = vec4(vNormal * 0.5 + 0.5, 1.0);

// Debug positions
gl_FragColor = vec4(vPosition * 0.1, 1.0);
```

### 2. Common Issues
- **Precision**: Use `precision mediump float;` in fragment shaders
- **Varying Variables**: Ensure vertex and fragment shaders match
- **Uniform Types**: Match uniform types between JavaScript and GLSL

## Advanced Techniques

### 1. Multiple Render Targets
- Render to multiple textures simultaneously
- Useful for deferred rendering, post-processing

### 2. Compute Shaders (WebGL 2)
- General-purpose GPU computing
- Particle systems, physics simulations

### 3. Post-Processing
- Screen-space effects
- Bloom, SSAO, motion blur

## Resources and Tools

### Learning Resources
- [WebGL Fundamentals](https://webglfundamentals.org/)
- [Three.js Shader Examples](https://threejs.org/examples/)
- [The Book of Shaders](https://thebookofshaders.com/)

### Development Tools
- [Shader Editor Extensions](https://marketplace.visualstudio.com/items?itemName=slevesque.shader)
- [WebGL Inspector](https://github.com/KhronosGroup/WebGL-Inspector)
- [Spector.js](https://spector.babylonjs.com/)

## Example Implementations

This project includes three shader demonstrations:

1. **Flat Color Shader**: Simple solid color rendering
2. **Gradient Shader**: Smooth color transitions
3. **Kernel Effect Shader**: Procedural pattern generation

Each example shows different aspects of shader programming and can be used as a starting point for more complex effects.

## Getting Started

1. Open `index.html` in your browser
2. Click the "Enter Fullscreen" button to see the shader demonstrations
3. Use mouse controls to orbit around the scene
4. Press Escape to exit fullscreen mode

The spheres in the scene demonstrate the three different shader effects, showing how shaders can dramatically change the visual appearance of 3D objects.