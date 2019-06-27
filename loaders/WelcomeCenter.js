//  WelcomeCenter.js (cache first)

//  var TradeCenterAssets = {};
//  var matcapsFolder = "/matcaps/";
//  var tradeCenterGeometriesFolder = "/tradecenter/geometries/";

(async function(){

    var s = 1;  //  scale.
    var WelcomeCenter = new THREE.Group();
    WelcomeCenter.name = "WELCOME CENTER"
    WelcomeCenter.scale.set(s,s,s);
    WelcomeCenter.position.y = 0.7;
    TradeCenterAssets["WelcomeCenter"] = WelcomeCenter;
    scene.add( WelcomeCenter );

    var urlWelcomeCenterBuilding = tradeCenterGeometriesFolder + "welcome_center_building.json";  //  materials: [1].
    var urlWelcomeCenterWindows  = tradeCenterGeometriesFolder + "welcome_center_windows.json";   //  materials: [2].

    await caches.match( urlWelcomeCenterBuilding ).then(function(response){

        if ( !response ) 
            throw response;
        else
            return response;

    }).catch(function(err){

        return fetch( urlWelcomeCenterBuilding );

    }).then(async function(response){

        var cache = await caches.open("geometries")
            .then(function(cache){ return cache; });

    //  Clone is needed because put() consumes the response body.
    //  See: "https://developer.mozilla.org/en-US/docs/Web/API/Cache/put"

        var clone = response.clone();
        await cache.put( urlWelcomeCenterBuilding, clone );
        return response.json();

    }).then(function(json){

        return loadWelcomeCenterAsset( json );

    }).then( function( mesh ){
        mesh.name = "welcome center structure";

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


    await caches.match( urlWelcomeCenterWindows ).then(function(response){

        if ( !response ) 
            throw response;
        else
            return response;

    }).catch(function(err){

        return fetch( urlWelcomeCenterWindows );

    }).then(async function(response){

        var cache = await caches.open("geometries")
            .then(function(cache){ return cache; });

        //  Clone is needed because put() consumes the response body.
        //  See: "https://developer.mozilla.org/en-US/docs/Web/API/Cache/put"

        var clone = response.clone();
        await cache.put( urlWelcomeCenterWindows, clone );
        return response.json();

    }).then(function(json){

        return loadWelcomeCenterAsset( json );

    }).then( function( mesh ){
        mesh.name = "welcome center windows";

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

    function matcapMaterial(mesh, img, index){
        var normal = new THREE.Texture( normalPixel() );
        var canvas = makePowerOfTwo( img, true );
        var matcap = new THREE.Texture( canvas );
        mesh.material.materials[index] =  ShaderMaterial( normal, matcap );
        $(img).remove();
    }

})();
