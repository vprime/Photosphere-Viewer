// Generates a rotatable skyphere
// Copyright 2017 Vincent Prime <myself@vincentprime.com>
// Distributed under the MIT Licence 
// https://github.com/vprime/Photosphere-Viewer

var Photosphere = {
    // Scene
    container:{},
    camera:{},
    controls:{},
    scene:{},
    renderer:{},
    animation:{},
    controls:{},

    // FOV
    fov:75,

    // Lighting
    ambient:{},

    // SkySphere Mesh
    skySphere:{},
    skySphereMaterial:{},

    init: function(photosphereURI){

        // Create the canvas container element
        this.container = document.createElement('div');
        this.container.setAttribute("id", "canvas-photosphere");
        document.body.appendChild(this.container);

        // Create the camera
        this.createCamera();

        // Create scene
        this.scene = new THREE.Scene();

        // Load the photosphere onto a sphere mesh
        this.loadMaterial(photosphereURI);
        this.createSkySphere();

        // Create the renderer
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        // Add controls
        this.createControls();

        // Add's the renderer to our canvas container
        this.container.appendChild(this.renderer.domElement);

        // Listens for the window to change size, then redraws the screen.
        window.addEventListener( 'resize', this.onWindoResize.bind(this), false);

        this.animate();
    },

    onWindoResize:function(){
        // Readjust the camera for the new window size
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( window.innerWidth, window.innerHeight);
    },

    createCamera:function(){
        this.camera = new THREE.PerspectiveCamera(this.fov, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.z = 100;
    },

    createControls:function(){
        // Add controlls 
        this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = false;
    },

    loadMaterial:function(textureURI){
        // Load the texture material
        var texture = new THREE.TextureLoader().load(textureURI);

        // Flip the texture since we are viewing from the inside of the sphere and would have a behind the glass view.
        texture.wrapS = THREE.RepeatWrapping;
        texture.repeat.x = -1;

        // Create a material from the texture, and store it in the material container.
        this.skySphereMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.BackSide,
        });
    },

    createSkySphere:function(){
        // Add a gigantic sphere
        var skyGeometry = new THREE.SphereGeometry(900, 32, 32);
        this.skySphere = new THREE.Mesh(skyGeometry, this.skySphereMaterial);
        this.scene.add(this.skySphere);
    },

    animate: function(){
        this.animation = requestAnimationFrame(this.animate.bind(this));

        this.controls.update();

        this.render();
    },
    render: function(){
        this.renderer.render(this.scene, this.camera);
    },
};