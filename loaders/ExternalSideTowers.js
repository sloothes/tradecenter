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

    await caches.match( urlLeftSideTowerBuilding ).then(function(response){

        if ( !response ) 
            throw response;
        else
            return response;

    }).catch(function(err){

        return fetch( urlLeftSideTowerBuilding );

    }).then(async function(response){

        var cache = await caches.open("geometries")
            .then(function(cache){ return cache; });

    //  Clone is needed because put() consumes the response body.
    //  See: "https://developer.mozilla.org/en-US/docs/Web/API/Cache/put"

        var clone = response.clone();
        await cache.put( urlLeftSideTowerBuilding, clone );
        return response.json();

    }).then(function(json){

        return loadLeftSideTowerAsset( json );

    }).then( function( mesh ){
        mesh.name = "side tower structure";

        var url = matcapsFolder + "env7.jpg";
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


    await caches.match( urlLeftSideTowerDome ).then(function(response){

        if ( !response ) 
            throw response;
        else
            return response;

    }).catch(function(err){

        return fetch( urlLeftSideTowerDome );

    }).then(async function(response){

        var cache = await caches.open("geometries")
            .then(function(cache){ return cache; });

    //  Clone is needed because put() consumes the response body.
    //  See: "https://developer.mozilla.org/en-US/docs/Web/API/Cache/put"

        var clone = response.clone();
        await cache.put( urlLeftSideTowerDome, clone );
        return response.json();

    }).then(function(json){

        return loadLeftSideTowerAsset( json );

    }).then( function( mesh ){
        mesh.name = "side tower dome";

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


    await caches.match( urlLeftSideTowerWindows ).then(function(response){

        if ( !response ) 
            throw response;
        else
            return response;

    }).catch(function(err){

        return fetch( urlLeftSideTowerWindows );

    }).then(async function(response){

        var cache = await caches.open("geometries")
            .then(function(cache){ return cache; });

    //  Clone is needed because put() consumes the response body.
    //  See: "https://developer.mozilla.org/en-US/docs/Web/API/Cache/put"

        var clone = response.clone();
        await cache.put( urlLeftSideTowerWindows, clone );
        return response.json();

    }).then(function(json){

        return loadLeftSideTowerAsset( json );

    }).then( function( mesh ){
        mesh.name = "side tower windows";

        var url = matcapsFolder + "ANGMAP11.jpg";
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

        return mesh;

    }).then( function( mesh ){

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
                matcapMaterial(mesh, img, 1);
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
        var canvas = makePowerOfTwo( img, true );
        var matcap = new THREE.Texture( canvas );
        mesh.material.materials[index] =  ShaderMaterial( normal, matcap );
        $(img).remove();
    }

})();
