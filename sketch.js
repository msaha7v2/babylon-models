let settings = {
    path: 'x.obj',
          color: {r:1, g:0, b:0},
          scale: 1,
          positon: {x: 1, y: 1, z: 1},
          rotation: {x: 0, y:0, z: 0}
}
var canvas = document.getElementById("renderCanvas");
var meshlist = []; 
var startRenderLoop = function (engine, canvas) {
    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render();
        }
    });
}

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
var createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 10, 0), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    //importing the object
    
    BABYLON.SceneLoader.ImportMesh(
        null,
         "https://models.babylonjs.com/pirateFort/",
        "pirateFort.gltf",
        scene,
        function (meshes) { 
            meshes[0].rotation.y += Math.PI/2;
            var blueMat = new BABYLON.StandardMaterial('grey', scene);
            blueMat.diffuseColor = new BABYLON.Color3(165/255,42/255,42/255);
            meshes[0].material = blueMat; 
            meshes[0].position = new BABYLON.Vector3(0, 0, 0);
            meshes[0].rotation.x += MATH.PI/2; 
            meshes[0].scaling = new BABYLON.Vector3(0.10, 0.10, 0.10);
                     
    });
    
    return scene;
};
        window.initFunction = async function() {
            var asyncEngineCreation = async function() {
                try {
                return createDefaultEngine();
                } catch(e) {
                console.log("the available createEngine function failed. Creating the default engine instead");
                return createDefaultEngine();
                }
            }

            window.engine = await asyncEngineCreation();
if (!engine) throw 'engine should not be null.';
startRenderLoop(engine, canvas);
window.scene = createScene();};
initFunction().then(() => {sceneToRender = scene
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});
