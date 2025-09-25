// Three.js Ontological Diagram
let scene, camera, renderer, controls;
let entities = {};
let connections = [];

    // Entity definitions with increased distances and orange color
    const entityData = {
        'Generator': { pos: [-12, 6, -4], type: 'Power Source', domain: 'Energy', color: 0xfb5607 },
        'Transmission Line': { pos: [-8, 2, -2], type: 'Transmission', domain: 'Energy', color: 0xfb5607 },
        'Substation': { pos: [-4, 4, 0], type: 'Distribution', domain: 'Energy', color: 0xfb5607 },
        'Home': { pos: [0, 0, 0], type: 'Consumption', domain: 'Both', color: 0xfb5607 },
        'Appliances': { pos: [-2, 6, 2], type: 'Device', domain: 'Energy', color: 0xfb5607 },
        'Humans': { pos: [2, 2, -2], type: 'User', domain: 'Both', color: 0xfb5607 },
        'Gadgets': { pos: [6, 0, 4], type: 'Device', domain: 'Data', color: 0xfb5607 },
        'Modem': { pos: [10, 4, 2], type: 'Router', domain: 'Data', color: 0xfb5607 },
        'Cell Tower': { pos: [14, 8, -2], type: 'Telecom Node', domain: 'Data', color: 0xfb5607 },
        'ISP': { pos: [18, 2, 0], type: 'Internet Provider', domain: 'Data', color: 0xfb5607 },
        'Fiber Optics': { pos: [22, 6, 4], type: 'Network Medium', domain: 'Data', color: 0xfb5607 },
        'IXP': { pos: [26, 0, -4], type: 'Exchange Point', domain: 'Data', color: 0xfb5607 },
        'Data Center Server': { pos: [30, 4, 2], type: 'Storage', domain: 'Data', color: 0xfb5607 }
    };

// Connection definitions
const connectionData = [
    ['Generator', 'Transmission Line'],
    ['Transmission Line', 'Substation'],
    ['Substation', 'Home'],
    ['Home', 'Appliances'],
    ['Home', 'Humans'],
    ['Humans', 'Gadgets'],
    ['Gadgets', 'Modem'],
    ['Modem', 'Cell Tower'],
    ['Cell Tower', 'ISP'],
    ['ISP', 'Fiber Optics'],
    ['Fiber Optics', 'IXP'],
    ['IXP', 'Data Center Server'],
    ['Generator', 'Data Center Server'] // Direct energy connection to data centers
];

function init() {
    // Get canvas element
    const canvas = document.getElementById('threejs-canvas');
    
    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xff006e); // Pink background
    
    // Camera
    camera = new THREE.PerspectiveCamera(
        50, 
        canvas.clientWidth / canvas.clientHeight, 
        0.1,
        1000
    );
    camera.position.set(0, 5, 20);
    
    // Renderer
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        antialias: true 
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Orbit Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.enablePan = true;
    
    // Grid removed for cleaner look
    
    // Create entities
    createEntities();
    
    // Create connections
    createConnections();
    
    // Add lighting
    addLighting();
    
    // Start animation loop
    animate();
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
}

function createEntities() {
    Object.keys(entityData).forEach(entityName => {
        const data = entityData[entityName];
        
        // All entities are now spheres
        const geometry = new THREE.SphereGeometry(0.8, 16, 16);
        
        // Create material
        const material = new THREE.MeshStandardMaterial({ 
            color: data.color,
            metalness: 0.1,
            roughness: 0.3
        });
        
        // Create mesh
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(data.pos[0], data.pos[1], data.pos[2]);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        
        // Add label
        const label = createTextLabel(entityName, data.type, data.domain);
        label.position.set(data.pos[0], data.pos[1] + 1.5, data.pos[2]);
        
        // Store entity
        entities[entityName] = { mesh, label, data };
        scene.add(mesh);
        scene.add(label);
    });
}

function createTextLabel(name, type, domain) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 64;
    
    context.fillStyle = '#ff006e';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    context.fillStyle = '#000000';
    context.font = '12px Arial';
    context.textAlign = 'center';
    context.fillText(name, canvas.width/2, 20);
    context.fillText(type, canvas.width/2, 35);
    context.fillText(domain, canvas.width/2, 50);
    
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(4, 1, 1);
    
    return sprite;
}

function createConnections() {
    connectionData.forEach(([from, to]) => {
        if (entities[from] && entities[to]) {
            const fromPos = entities[from].mesh.position;
            const toPos = entities[to].mesh.position;
            
            // Calculate distance and direction
            const distance = fromPos.distanceTo(toPos);
            const direction = new THREE.Vector3().subVectors(toPos, fromPos).normalize();
            
            // Create cylindrical pipe
            const pipeGeometry = new THREE.CylinderGeometry(0.1, 0.1, distance, 8);
            const pipeMaterial = new THREE.MeshStandardMaterial({ 
                color: 0xffbe0b,
                metalness: 0.2,
                roughness: 0.4
            });
            
            const pipe = new THREE.Mesh(pipeGeometry, pipeMaterial);
            
            // Position pipe between the two spheres
            const midPoint = new THREE.Vector3().addVectors(fromPos, toPos).multiplyScalar(0.5);
            pipe.position.copy(midPoint);
            
            // Orient pipe to connect the spheres
            pipe.lookAt(toPos);
            pipe.rotateX(Math.PI / 2);
            
            pipe.castShadow = true;
            pipe.receiveShadow = true;
            
            scene.add(pipe);
            connections.push(pipe);
        }
    });
}

function addLighting() {
    // Ambient light for overall illumination
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);
    
    // Static directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    scene.add(directionalLight);
    
    // Static point light for additional illumination
    const pointLight = new THREE.PointLight(0xffffff, 0.6, 100);
    pointLight.position.set(-3, 8, 3);
    scene.add(pointLight);
}

function animate() {
    requestAnimationFrame(animate);
    
    // Primitives are now static - no rotation
    
    // Update controls
    controls.update();
    
    // Render
    renderer.render(scene, camera);
}

function onWindowResize() {
    const canvas = document.getElementById('threejs-canvas');
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
}

// Initialize the scene when the page loads
window.addEventListener('load', init);
  