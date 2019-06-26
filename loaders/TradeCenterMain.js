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
        return loadTradeCenterMainAsset( json );
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

    await caches.match( urlTradeCenterWindowStructure ).then(function(response){

        if ( !response ) 
            throw response;
        else
            return response;

    }).catch(function(err){

        return fetch( urlTradeCenterWindowStructure );

    }).then(async function(response){

        var cache = await caches.open("geometries")
            .then(function(cache){ return cache; });

    //  Clone is needed because put() consumes the response body.
    //  See: "https://developer.mozilla.org/en-US/docs/Web/API/Cache/put"

        var clone = response.clone();
        await cache.put( urlTradeCenterWindowStructure, clone );
        return response.json();

    }).then(function(json){

        return loadTradeCenterMainAsset( json );

    }).then( function( mesh ){
        mesh.name = "trade center window structure";

        var url = matcapsFolder + "ChromeReflect.jpg";
        caches.match( url ).then(function(response){

            if ( !response ) 
                throw response;
            else
                return response;

        }).catch(function(err){

        //  We use cors origin mode to avoid
        //  texture tainted canvases, images.
            return fetch( url, {
                mode: "cors",
                method: "GET",
            });

        }).then(async function(response){

            var cache = await caches.open("textures")
                .then(function(cache){ return cache; });

        //  Clone is needed because put() consumes the response body.
        //  See: "https://developer.mozilla.org/en-US/docs/Web/API/Cache/put"

            var clone = response.clone();
            await cache.put( url, clone );
            return response.blob();

        }).then(function(blob){

            var img = new Image();
            img.crossOrigin = "anonymous";

            $(img).on("load", function(){
                matcapMaterial(mesh, img, 0);
            });

        //  Get dataURL from blob.

            var reader = new FileReader();
            reader.onload = function() {
                img.src = reader.result;
            };

            reader.readAsDataURL(blob);

        });

    //  return mesh;

    });


    await fetch(urlTradeCenterMainWindows)
    .then(function(response){
        return response.json();
    }).then(function(json){
        return loadTradeCenterMainAsset( json );
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
        var canvas = makePowerOfTwo( img, true );
        var matcap = new THREE.Texture( canvas );
        mesh.material.materials[index] =  ShaderMaterial( normal, matcap );
        debugMode && console.log( "materials:", mesh.material.materials );
        $(this).remove();
    }

})();

