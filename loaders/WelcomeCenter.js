//  WelcomeCenter.js

(async function(){

    var TradeCenterAssets = {};
    var matcapsFolder = "/tradecenter/matcaps/";
    var tradeCenterGeometriesFolder = "/tradecenter/geometries/";

    var s = 1;  //  scale.
    var WelcomeCenter = new THREE.Group();
    WelcomeCenter.name = "WELCOME CENTER"
    WelcomeCenter.scale.set(s,s,s);
    WelcomeCenter.position.y = 0.7;
    TradeCenterAssets["WelcomeCenter"] = WelcomeCenter;

    var urlWelcomeCenterBuilding = tradeCenterGeometriesFolder + "welcome_center_building.js";  //  materials: [1].
    var urlWelcomeCenterWindows  = tradeCenterGeometriesFolder + "welcome_center_windows.js";   //  materials: [2].

    await fetch(urlWelcomeCenterBuilding)
    .then(function(response){
        return response.json();
    }).then(function(json){
        return loadWelcomeCenterAsset( json );
    }).then( function( mesh ){
        mesh.name = "welcome center structure";
        var img = new Image();
        img.crossOrigin = "anonymous";
        $(img).on("load", function(){
            matcapMaterial(img, 0);
        });
        img.src = matcapsFolder + "env7.jpg";
        return mesh;
    });

    await fetch(urlWelcomeCenterWindows)
    .then(function(response){
        return response.json();
    }).then(function(json){
        return loadWelcomeCenterAsset( json );
    }).then( function( mesh ){
        mesh.name = "welcome center windows";
        var img = new Image();
        img.crossOrigin = "anonymous";
        $(img).on("load", function(){
            matcapMaterial(img, 1);
        });
        img.src = matcapsFolder + "ChromeReflect.jpg";
        return mesh;
    });

    scene.add( WelcomeCenter );

    function loadWelcomeCenterAsset( json ){

        var name = json.name;
        var loader = new THREE.JSONLoader();
        var object = loader.parse( json );

        var geometry = object.geometry;
        geometry.computeFaceNormals();
        geometry.computeVertexNormals();
        geometry.computeBoundingBox();
        geometry.computeBoundingSphere();
        geometry.name = object.geometry.name;

        if ( !!object.materials )
            var material = new THREE.MeshFaceMaterial( object.materials );
        else 
            var material = new THREE.MeshFaceMaterial( new THREE.MeshStandardMaterial() );

        var mesh = new THREE.Mesh(geometry, material);

        TradeCenterAssets[ name ] = mesh;
        WelcomeCenter.add( TradeCenterAssets[ name ] );

        return TradeCenterAssets[ name ];
    }

    function matcapMaterial(img, index){
        var normal = new THREE.Texture( normalPixel() );
        var matcap = new THREE.Texture( img );
        mesh.material.materials[index] =  new ShaderMaterial( normal, matcap );
        debugMode && console.log( "materials:", mesh.material.materials );
        $(this).remove();
    }

})();
