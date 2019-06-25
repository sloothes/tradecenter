//  ExternalSideTowers.js

//  var TradeCenterAssets = {};
//  var matcapsFolder = "/tradecenter/matcaps/";
//  var tradeCenterGeometriesFolder = "/tradecenter/geometries/";

(async function(){

//  LEFT SIDE TOWER.

    var s = 1;  //  scale.
    var LeftSideTower = new THREE.Group();
    LeftSideTower.name = "LEFT SIDE TOWER";
    LeftSideTower.scale.set(s,s,s);
    LeftSideTower.position.y = 0.7;
    TradeCenterAssets["LeftSideTower"] = LeftSideTower;
    scene.add( LeftSideTower );

    var urlLeftSideTowerBuilding = tradeCenterGeometriesFolder + "external_left_tower_building.js";   //  materials: [1].
    var urlLeftSideTowerDome     = tradeCenterGeometriesFolder + "external_left_tower_dome.js";       //  materials: [1].
    var urlLeftSideTowerWindows  = tradeCenterGeometriesFolder + "external_left_tower_windows.js";    //  materials: [2].

    await fetch(urlLeftSideTowerBuilding)
    .then(function(response){
        return response.json();
    }).then(function(json){
        return loadLeftSideTowerAsset( json );
    }).then( function( mesh ){
        mesh.name = "side tower structure";
        var img = new Image();
        img.crossOrigin = "anonymous";
        $(img).on("load", function(){
            matcapMaterial(mesh, img, 0);
        });
        img.src = matcapsFolder + "env7.jpg";
        return mesh;
    });

    await fetch(urlLeftSideTowerDome)
    .then(function(response){
        return response.json();
    }).then(function(json){
        return loadLeftSideTowerAsset( json );
    }).then( function( mesh ){
        mesh.name = "side tower dome";
        var img = new Image();
        img.crossOrigin = "anonymous";
        $(img).on("load", function(){
            matcapMaterial(mesh, img, 0);
        });
        img.src = matcapsFolder + "ChromeReflect.jpg";
        return mesh;
    });

    await fetch(urlLeftSideTowerWindows)
    .then(function(response){
        return response.json();
    }).then(function(json){
        return loadLeftSideTowerAsset( json );
    }).then( function( mesh ){
        mesh.name = "side tower windows";
        var img = new Image();
        img.crossOrigin = "anonymous";
        $(img).on("load", function(){
            matcapMaterial(mesh, img, 0);
        });
        img.src = matcapsFolder + "ANGMAP11.jpg";
        return mesh;
    }).then( function( mesh ){
        var img = new Image();
        img.crossOrigin = "anonymous";
        $(img).on("load", function(){
            matcapMaterial(mesh, img, 1);
        });
        img.src = matcapsFolder + "ChromeReflect.jpg";
        return mesh;
    });

//  RIGHT SIDE TOWER.

    RightSideTower = LeftSideTower.clone();
    RightSideTower.name = "RIGHT SIDE TOWER";
    RightSideTower.scale.z = -1;   // mirror.
    RightSideTower.position.y = 0.7;
    TradeCenterAssets["RightSideTower"] = RightSideTower;
    scene.add( RightSideTower );


    function loadLeftSideTowerAsset( json ){

        var name = json.name;
        var loader = new THREE.JSONLoader();
        var object = loader.parse( json );

        var geometry = object.geometry;
        geometry.computeFaceNormals();
        geometry.computeVertexNormals();
        geometry.computeBoundingBox();
        geometry.computeBoundingSphere();
        geometry.name = object.geometry.name;

        for (var i=0; i < object.materials.length; i++){
            object.materials[i].side = 2; // THREE.DoubleSide;
        }

        var material = new THREE.MeshFaceMaterial( object.materials );

        var mesh = new THREE.Mesh(geometry, material);

        TradeCenterAssets[ name ] = mesh;
        LeftSideTower.add( TradeCenterAssets[ name ] );
        return TradeCenterAssets[ name ];

    }

    function matcapMaterial(mesh, img, index){
        var normal = new THREE.Texture( normalPixel() );
        var matcap = new THREE.Texture( img );
        mesh.material.materials[index] =  ShaderMaterial( normal, matcap );
        debugMode && console.log( "materials:", mesh.material.materials );
        $(this).remove();
    }

})();
