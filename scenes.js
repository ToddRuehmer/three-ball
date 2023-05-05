// Set up the shared data object
var sharedData = {
	cubeRotationSpeed: 0.01
};

// Set up the first scene
var scene1 = new THREE.Scene();
var camera1 = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 );
camera1.position.z = 20;
var renderer1 = new THREE.WebGLRenderer({ antialias: true });
renderer1.setSize( $('#scene1').width(), $('#scene1').height() );
$('#scene1').append(renderer1.domElement);
var fontLoader1 = new THREE.FontLoader();
fontLoader1.load("https://threejs.org/examples/fonts/helvetiker_regular.typeface.json", function(font) {
    var textGeometry1 = new THREE.TextGeometry("foo", {
        font: font,
        size: 10,
        height: 2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 0.5,
        bevelOffset: 0,
        bevelSegments: 3
    });
    textGeometry1.center();
    var textMaterial1 = new THREE.MeshPhongMaterial({ color: 0x0000ff });
    var textMesh1 = new THREE.Mesh(textGeometry1, textMaterial1);
    scene1.add(textMesh1);

    // Add some ambient light to the scene
    var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene1.add(ambientLight);
  
    // Add a directional light to the scene
    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene1.add(directionalLight);
    function render1() {
        requestAnimationFrame( render1 );
        var rotation = document.getElementById("rotation-slider").value;
        textMesh1.rotation.y = rotation / 100;
        renderer1.render( scene1, camera1 );
    }
    render1();
});

// Set up the second scene
var scene2 = new THREE.Scene();
var camera2 = new THREE.PerspectiveCamera( 15, 1, 0.1, 1000 );
camera2.position.z = 15;
var renderer2 = new THREE.WebGLRenderer({ antialias: true });
renderer2.setSize( $('#scene2').width(), $('#scene2').height() );
$('#scene2').append(renderer2.domElement);
var fontLoader1 = new THREE.FontLoader();
fontLoader1.load("https://threejs.org/examples/fonts/helvetiker_regular.typeface.json", function(font) {
    var textGeometry2 = new THREE.TextGeometry("bar", {
        font: font,
        size: 2,
        height: 1,
        curveSegments: 100,
    });
    textGeometry2.center();
    
    // Load the sphere map texture
    const loader = new THREE.TextureLoader();
    loader.load('https://cdn.polyhaven.com/asset_img/primary/aloe_farm_shade_house.png', (texture)=>{

        console.log('texture');
        texture.mapping = THREE.EquirectangularReflectionMapping;
        console.log(texture);
        // Create the chrome material
        const chromeMaterial = new THREE.MeshLambertMaterial({
            color: 0xffffff,
            envMap: texture
        });
    
        var textMesh2 = new THREE.Mesh(textGeometry2, chromeMaterial);
        scene2.add(textMesh2);
    
        // Add some ambient light to the scene
        var ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene2.add(ambientLight);
      
        // Add a directional light to the scene
        //var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        //directionalLight.position.set(1, 1, 1);
        //scene2.add(directionalLight);

        function render2() {
            requestAnimationFrame( render2 );
            var rotation = document.getElementById("rotation-slider").value;
            textMesh2.rotation.x = rotation / 100;
            renderer2.render( scene2, camera2 );
        }
        render2();
    });
});

// Share data between the scenes
$('#scene1').on('mousemove', function(event) {
	sharedData.cubeRotationSpeed = event.pageX / 10000;
});
