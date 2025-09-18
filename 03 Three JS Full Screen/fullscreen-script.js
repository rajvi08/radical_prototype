// Fullscreen Three.js Scene - Optimized
let fullscreenScene, fullscreenCamera, fullscreenRenderer, fullscreenControls;
let fullscreenCube;
let fullscreenContainer;
let animationId;

function initFullscreen() {
    // Create fullscreen container
    fullscreenContainer = document.createElement('div');
    fullscreenContainer.className = 'fullscreen-canvas';
    fullscreenContainer.style.display = 'none';
    document.body.appendChild(fullscreenContainer);

    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'fullscreen-threejs-canvas';
    fullscreenContainer.appendChild(canvas);

    // Create back button
    const backButton = document.createElement('button');
    backButton.className = 'back-button';
    backButton.textContent = '← Back to Main';
    backButton.onclick = exitFullscreen;
    fullscreenContainer.appendChild(backButton);

    // Scene
    fullscreenScene = new THREE.Scene();
    fullscreenScene.background = new THREE.Color(0x222222);
    
    // Camera
    fullscreenCamera = new THREE.PerspectiveCamera(
        75, 
        window.innerWidth / window.innerHeight, 
        0.1,
        1000
    );
    fullscreenCamera.position.set(5, 5, 5);
    
    // Renderer - Optimized settings
    fullscreenRenderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        antialias: false, // Disable for better performance
        powerPreference: "high-performance"
    });
    fullscreenRenderer.setSize(window.innerWidth, window.innerHeight);
    fullscreenRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
    fullscreenRenderer.shadowMap.enabled = true;
    fullscreenRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Orbit Controls
    fullscreenControls = new THREE.OrbitControls(fullscreenCamera, fullscreenRenderer.domElement);
    fullscreenControls.enableDamping = true;
    fullscreenControls.dampingFactor = 0.1;
    fullscreenControls.enableZoom = true;
    fullscreenControls.enablePan = true;
    
    // Simple grid helper
    const gridHelper = new THREE.GridHelper(10, 10, 0x888888, 0x444444);
    fullscreenScene.add(gridHelper);
    
    // Create simple cube
    createSimpleCube();
    
    // Add basic lighting
    addBasicLighting();
    
    // Start animation loop
    animateFullscreen();
    
    // Handle window resize
    window.addEventListener('resize', onFullscreenWindowResize);
}

function createSimpleCube() {
    // Red cube with standard material for lighting
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xff0000 // Red
    });
    fullscreenCube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    fullscreenCube.position.set(0, 0.5, 0);
    fullscreenCube.castShadow = true;
    fullscreenScene.add(fullscreenCube);
}

function addBasicLighting() {
    // Ambient light for overall illumination
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    fullscreenScene.add(ambientLight);
    
    // Simple directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    fullscreenScene.add(directionalLight);
}

function animateFullscreen() {
    animationId = requestAnimationFrame(animateFullscreen);
    
    // Simple rotation for the cube
    if (fullscreenCube) {
        fullscreenCube.rotation.x += 0.01;
        fullscreenCube.rotation.y += 0.01;
    }
    
    // Update controls
    fullscreenControls.update();
    
    // Render
    fullscreenRenderer.render(fullscreenScene, fullscreenCamera);
}

function onFullscreenWindowResize() {
    fullscreenCamera.aspect = window.innerWidth / window.innerHeight;
    fullscreenCamera.updateProjectionMatrix();
    fullscreenRenderer.setSize(window.innerWidth, window.innerHeight);
}

function enterFullscreen() {
    if (!fullscreenContainer) {
        initFullscreen();
    }
    
    fullscreenContainer.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Focus the canvas for keyboard controls
    const canvas = document.getElementById('fullscreen-threejs-canvas');
    canvas.focus();
}

function exitFullscreen() {
    if (fullscreenContainer) {
        fullscreenContainer.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Stop animation loop to save resources
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    }
}

function disposeFullscreenResources() {
    // Clean up Three.js resources
    if (fullscreenScene) {
        fullscreenScene.clear();
    }
    
    if (fullscreenRenderer) {
        fullscreenRenderer.dispose();
    }
    
    if (fullscreenControls) {
        fullscreenControls.dispose();
    }
    
    // Remove event listeners
    window.removeEventListener('resize', onFullscreenWindowResize);
}

// Initialize fullscreen functionality when the page loads
window.addEventListener('load', function() {
    // Add event listener to the fullscreen button
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', enterFullscreen);
    }
    
    // Add keyboard support for exiting fullscreen
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && fullscreenContainer && fullscreenContainer.style.display === 'block') {
            exitFullscreen();
        }
    });
});
