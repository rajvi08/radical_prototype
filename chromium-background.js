// Three.js Chromium Background Effect
let chromiumScene, chromiumCamera, chromiumRenderer;
let chromiumMesh;

function initChromiumBackground() {
    // Create renderer with alpha for transparency
    chromiumRenderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        powerPreference: "high-performance"
    });
    chromiumRenderer.setSize(window.innerWidth, window.innerHeight);
    chromiumRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create canvas element and position it as fixed background
    const canvas = chromiumRenderer.domElement;
    canvas.id = 'chromium-background-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);
    
    // Create scene
    chromiumScene = new THREE.Scene();
    
    // Create camera
    chromiumCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    chromiumCamera.position.set(0, 0, 5);
    
    // Create procedural cube map for environment
    const cubeSize = 512;
    
    // Create 6 canvas textures for cube map faces
    const createCubeFace = function(color1, color2) {
        const canvas = document.createElement('canvas');
        canvas.width = cubeSize;
        canvas.height = cubeSize;
        const ctx = canvas.getContext('2d');
        
        const gradient = ctx.createLinearGradient(0, 0, cubeSize, cubeSize);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, cubeSize, cubeSize);
        
        return canvas;
    };
    
    // Create cube map faces with metallic colors
    const cubeMapImages = [
        createCubeFace('#dfe3e6', '#9ba3a8'), // px
        createCubeFace('#9ba3a8', '#dfe3e6'), // nx
        createCubeFace('#dfe3e6', '#9ba3a8'), // py
        createCubeFace('#9ba3a8', '#dfe3e6'), // ny
        createCubeFace('#dfe3e6', '#9ba3a8'), // pz
        createCubeFace('#9ba3a8', '#dfe3e6')  // nz
    ];
    
    const cubeMap = new THREE.CubeTexture(cubeMapImages);
    cubeMap.needsUpdate = true;
    cubeMap.encoding = THREE.sRGBEncoding;
    
    // Create large plane for chromium surface
    const geometry = new THREE.PlaneGeometry(20, 20, 32, 32);
    
    // Add slight curvature for more realistic reflections
    const positions = geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const z = Math.sin(x * 0.5) * Math.cos(y * 0.5) * 0.1;
        positions.setZ(i, z);
    }
    geometry.computeVertexNormals();
    
    // Use MeshPhysicalMaterial for realistic chromium
    const material = new THREE.MeshPhysicalMaterial({
        metalness: 1.0,
        roughness: 0.0,
        envMap: cubeMap,
        clearcoat: 1.0,
        clearcoatRoughness: 0.0,
        color: 0xdfe3e6,
        side: THREE.DoubleSide
    });
    
    chromiumMesh = new THREE.Mesh(geometry, material);
    chromiumScene.add(chromiumMesh);
    
    // Add subtle rotation animation
    function animate() {
        requestAnimationFrame(animate);
        
        // Subtle rotation for dynamic reflections
        chromiumMesh.rotation.x += 0.0005;
        chromiumMesh.rotation.y += 0.0005;
        
        chromiumRenderer.render(chromiumScene, chromiumCamera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', onChromiumResize);
}

function onChromiumResize() {
    chromiumCamera.aspect = window.innerWidth / window.innerHeight;
    chromiumCamera.updateProjectionMatrix();
    chromiumRenderer.setSize(window.innerWidth, window.innerHeight);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChromiumBackground);
} else {
    initChromiumBackground();
}

