//  TradeCenterMain.js

//  var TradeCenterAssets = {};
//  var matcapsFolder = "/tradecenter/matcaps/";
//  var tradeCenterGeometriesFolder = "/tradecenter/geometries/";

(async function(){

    var s = 1;  //  scale.
    var TradeCenterMain = new THREE.Group();
    TradeCenterMain.name = "TRADECENTER MAIN";
    TradeCenterMain.scale.set(s,s,s);
    TradeCenterMain.position.y = 0.7;
    TradeCenterAssets["TradeCenterMain"] = TradeCenterMain;
    scene.add( TradeCenterMain );

    var urlTradeCenterMainBuilding    = tradeCenterGeometriesFolder + "trade_center_main_building.js";           //  materials: [1].
    var urlTradeCenterWindowStructure = tradeCenterGeometriesFolder + "trade_center_main_window_structure.js";   //  materials: [1].
    var urlTradeCenterMainWindows     = tradeCenterGeometriesFolder + "trade_center_main_windows.js";            //  materials: [1].

    await fetch(urlTradeCenterMainBuilding)
    .then(function(response){
        return response.json();
    }).then(function(json){
        return loadWelcomeCenterAsset( json );
    }).then( function( mesh ){
        mesh.name = "trade center main structure";
        var img = new Image();
        img.crossOrigin = "anonymous";
        $(img).on("load", function(){
            matcapMaterial(mesh, img, 0);
        });
        img.src = matcapsFolder + "env7.jpg";
        return mesh;
    });

    await fetch(urlTradeCenterWindowStructure)
    .then(function(response){
        return response.json();
    }).then(function(json){
        return loadWelcomeCenterAsset( json );
    }).then( function( mesh ){
        mesh.name = "trade center main windows";
        var img = new Image();
        img.crossOrigin = "anonymous";
        $(img).on("load", function(){
            matcapMaterial(mesh, img, 0);
        });
        img.src = matcapsFolder + "ChromeReflect.jpg";
        return mesh;
    });

    await fetch(urlTradeCenterMainWindows)
    .then(function(response){
        return response.json();
    }).then(function(json){
        return loadWelcomeCenterAsset( json );
    }).then( function( mesh ){
        mesh.name = "trade center main windows";
        var img = new Image();
        img.crossOrigin = "anonymous";
        $(img).on("load", function(){
            matcapMaterial(mesh, img, 0);
        });
        img.src = matcapsFolder + "ANGMAP11.jpg";
        return mesh;
    });

    function loadTradeCenterMainAsset( json ){

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
        TradeCenterMain.add( TradeCenterAssets[ name ] );
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

