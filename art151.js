//draw sphere at specified position of specified diameter
function createSphere(x, y, z, diam, scene){
    // babylon built-in 'sphere' shape.
    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: diam, segments: 32}, scene);
    // Move the x, y, z position
    sphere.position = new BABYLON.Vector3(x, y, z);
    return sphere;
}

//draw box at specified position of specified length, width, depth
function createBox(x, y, z, w, h, d, scene){
    // babylon built-in 'sphere' shape.
    var box = BABYLON.MeshBuilder.CreateBox("box", {height:h, width:w, depth: d}, scene);
    // Move the x, y, z position
    box.position = new BABYLON.Vector3(x, y, z);
    return box;
}

//create material from image file
function fileMat(file, scene){
    //create material
    var mat = new BABYLON.StandardMaterial('material', scene);
    mat.diffuseTexture = new BABYLON.Texture(file, scene);
    return mat;
}

//create material from hex color
function hexMat(hex, scene){
    var mat = new BABYLON.StandardMaterial('material', scene);
    mat.diffuseColor = BABYLON.Color3.FromHexString(hex, scene);
    return mat;
}

//recreates p5 lerpColor functionalith with babylon
function babLerpColor(c1, c2, lerp, scene){
    //convert from hex if hashtag present in input
    if(c1.indexOf('#')==0){
        c1 = BABYLON.Color3.FromHexString(c1, scene);
    }
    if(c2.indexOf('#')==0){
        c2 = BABYLON.Color3.FromHexString(c2, scene);
    }
    let c = {};
    //interpolate r g and b  values
    for(let h of ['r', 'g', 'b']){
        c[h] = c1[h]*lerp + c2[h]*(1-lerp);
    }
    return new BABYLON.Color3(c.r, c.g, c.b);
}