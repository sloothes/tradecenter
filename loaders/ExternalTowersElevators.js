//  ExternalTowersElevators.js

var ElevatorAssets = {};
var TradeCenterAssets = {};
var matcapsFolder = "/matcaps/";
var tradeCenterGeometriesFolder = "/tradecenter/geometries/";

(async function(){

    localPlayer.controller.maxSlopeGradient = 0.001;

    var ascnHeight = 35;
    var descHeight = 20;
    var slowHeight = 10;
    var stopHeight =  5;

    var timeScale   = 0.5;
    var floorslength =  6;
    var roofHeight   = 40;
    var floorHeight  = 55;
    var elevatAdjust = -1.5;

    var key = {
        "time":0.0, 
        "pos":[0,0,0],
        "rot":[0,0,0], 
        "scl":[1,1,1]
    };

    var elevatorData = {
        "name"      : "elevator",
        "fps"       : 25,
        "length"    : 0,
        "hierarchy" : [{
            "parent" : -1,
            "keys":[]
        }]
    };

    elevatorData.hierarchy[0].keys.push( { "time":key.time, "pos":key.pos, "rot":key.rot, "scl":key.scl } );

//  Ascent.

    for ( var i = 0; i < floorslength; i++ ) {

        key.time += 1; key.pos[1] += 10; 
        var position = [ key.pos[0], key.pos[1], key.pos[2] ];
        elevatorData.hierarchy[0].keys.push({ "time":key.time, "pos":position, "rot":key.rot, "scl":key.scl });

        key.time += 1; key.pos[1] += 20; 
        var position = [ key.pos[0], key.pos[1], key.pos[2] ];
        elevatorData.hierarchy[0].keys.push({ "time":key.time, "pos":position, "rot":key.rot, "scl":key.scl });

        key.time += 1; key.pos[1] += 20; 
        var position = [ key.pos[0], key.pos[1], key.pos[2] ];
        elevatorData.hierarchy[0].keys.push({ "time":key.time, "pos":position, "rot":key.rot, "scl":key.scl });

        key.time += 1; key.pos[1] += 5; 
        var position = [ key.pos[0], key.pos[1], key.pos[2] ];
        elevatorData.hierarchy[0].keys.push({ "time":key.time, "pos":position, "rot":key.rot, "scl":key.scl });

        key.time += 1;
        var position = [ key.pos[0], key.pos[1], key.pos[2] ];
        elevatorData.hierarchy[0].keys.push({ "time":key.time, "pos":position, "rot":key.rot, "scl":key.scl });
    }

    elevatorData.length = key.time;

//  Descent.

    for ( k = i; k > 0; k-- ) {

        key.time += 1; key.pos[1] -= 10;
        var position = [ key.pos[0], key.pos[1], key.pos[2] ];
        elevatorData.hierarchy[0].keys.push({ "time":key.time, "pos":position, "rot":key.rot, "scl":key.scl });

        key.time += 1; key.pos[1] -= 20;
        var position = [ key.pos[0], key.pos[1], key.pos[2] ];
        elevatorData.hierarchy[0].keys.push({ "time":key.time, "pos":position, "rot":key.rot, "scl":key.scl });

        key.time += 1; key.pos[1] -= 20;
        var position = [ key.pos[0], key.pos[1], key.pos[2] ];
        elevatorData.hierarchy[0].keys.push({ "time":key.time, "pos":position, "rot":key.rot, "scl":key.scl });

        key.time += 1; key.pos[1] -= 5;
        var position = [ key.pos[0], key.pos[1], key.pos[2] ];
        elevatorData.hierarchy[0].keys.push({ "time":key.time, "pos":position, "rot":key.rot, "scl":key.scl });

        key.time += 1;
        var position = [ key.pos[0], key.pos[1], key.pos[2] ];
        elevatorData.hierarchy[0].keys.push({ "time":key.time, "pos":position, "rot":key.rot, "scl":key.scl });

    }

    elevatorData.length = key.time;

//  ELEVATORS.

    var elevatorCabineUrl = tradeCenterGeometriesFolder + "elevator-cabin.json";          //  materials: [6].
    var elevatorOctreeUrl = tradeCenterGeometriesFolder + "elevator-octree.json";         //  materials: [1].
    var elevatorDoorFrameUrl = tradeCenterGeometriesFolder + "elevator-doorframe.json";   //  materials: [6].
    var elevatorDoorLeaf1Url = tradeCenterGeometriesFolder + "elevator-doorleaf1.json";   //  materials: [1].
    var elevatorDoorLeaf2Url = tradeCenterGeometriesFolder + "elevator-doorleaf2.json";   //  materials: [1].

    await caches.match( elevatorDoorFrameUrl ).then(function(response){

        if ( !response ) 
            throw response;
        else
            return response;

    }).catch(function(err){

        return fetch( elevatorDoorFrameUrl );

    }).then(async function(response){

        var cache = await caches.open("geometries")
            .then(function(cache){ return cache; });

    //  Clone is needed because put() consumes the response body.
    //  See: "https://developer.mozilla.org/en-US/docs/Web/API/Cache/put"

        var clone = response.clone();
        await cache.put( elevatorDoorFrameUrl, clone );
        return response.json();

    }).then(function(json){

        return loadElevatorAsset( json );

    }).then( function( mesh ){

        var url = tradeCenterGeometriesFolder + "elevator-door.jpg";
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
                var canvas = makePowerOfTwo( img, true );
                var texture = new THREE.Texture( canvas );
                mesh.material.materials[1] = new THREE.MeshStandardMaterial({ 
                    emissive: 0xffffff, 
                    emissiveMap: texture,
                    bumpMap: texture,
                    bumpScale: -0.05,
                    shading: THREE.SmoothShading,
                });
                mesh.material.materials[1].emissiveMap.needsUpdate = true;
                mesh.material.materials[1].bumpMap.needsUpdate = true;
                $(img).remove();
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

        var url = tradeCenterGeometriesFolder + "elevator-door.jpg";
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
                var canvas = makePowerOfTwo( img, true );
                var texture = new THREE.Texture( canvas );
                mesh.material.materials[2] = new THREE.MeshStandardMaterial({ 
                    color: 0xffffff, 
                    map: texture,
                    shading: THREE.SmoothShading,
                });
                mesh.material.materials[2].map.needsUpdate = true;
                $(img).remove();
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

        mesh.name = "elevator frame";
        mesh.position.set( -30, 0, -160); 
        mesh.rotation.y = THREE.Math.degToRad( 90 );

        for ( var i=0; i < mesh.material.materials.length; i++) {
            mesh.material.materials.side = 2;
        }

        scene.add( mesh );
        TradeCenterAssets["elevator_frame"] = mesh;
        return mesh;

    }).then( function( mesh ){

        var mesh = mesh.clone();
        mesh.position.set( -30, 0, 160);
        mesh.rotation.y = THREE.Math.degToRad( -90 );
        scene.add( mesh );
        return mesh;

    });


//  Elevator cambine.

    await caches.match( elevatorCabineUrl ).then(function(response){

        if ( !response ) 
            throw response;
        else
            return response;

    }).catch(function(err){

        return fetch( elevatorCabineUrl );

    }).then(async function(response){

        var cache = await caches.open("geometries")
            .then(function(cache){ return cache; });

    //  Clone is needed because put() consumes the response body.
    //  See: "https://developer.mozilla.org/en-US/docs/Web/API/Cache/put"

        var clone = response.clone();
        await cache.put( elevatorCabineUrl, clone );
        return response.json();

    }).then(function(json){

        return loadElevatorAsset( json );

    }).then( function( mesh ){

        var geometry = new THREE.BoxGeometry(30,53,30, 1,1,1);
        var material = new THREE.MeshStandardMaterial({transparent:true, opacity:0.5, side:1});

        var box = new THREE.Mesh(geometry, material);
        box.position.set(-30, 26.5, -175);
        scene.add( box );

        var box = box.clone();
        box.position.set(-30, 26.5, 175);
        scene.add( box );

        return mesh;

    }).then( function( mesh ){

    //  Camera rigid objects.
        var geometry = new THREE.BoxGeometry(120,350,30, 1,1,1);
        var material = new THREE.MeshLambertMaterial({visible:false});

        box = new THREE.Mesh(geometry, material);
        box.position.set(-30, 230, -120);
        scene.add(box);

        cameraControls.rigidObjects.push( box );

        var box = box.clone();
        box.position.set(-30, 230, 120);
        scene.add(box);

        cameraControls.rigidObjects.push( box );

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
                var normal = new THREE.Texture( normalPixel() );
                var canvas = makePowerOfTwo( img, true );
                var matcap = new THREE.Texture( canvas );
                mesh.material.materials[0] = ShaderMaterial( normal, matcap );
                $(img).remove();
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

        var url = matcapsFolder + "silver_tinman.png";
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
                var normal = new THREE.Texture( normalPixel() );
                var canvas = makePowerOfTwo( img, true );
                var matcap = new THREE.Texture( canvas );
                mesh.material.materials[3] = ShaderMaterial( normal, matcap );
                mesh.material.materials[5] = ShaderMaterial( normal, matcap );
                $(img).remove();
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

        var url = tradeCenterGeometriesFolder + "elevator.jpg";
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
                var canvas = makePowerOfTwo( img, true );
                var texture = new THREE.Texture( canvas );
                mesh.material.materials[1] = new THREE.MeshStandardMaterial({ 
                    emissive: 0xffffff, 
                    emissiveMap: texture,
                    bumpMap: texture,
                    bumpScale: -0.05,
                    shading: THREE.SmoothShading,
                });
                mesh.material.materials[1].emissiveMap.needsUpdate = true;
                mesh.material.materials[1].bumpMap.needsUpdate = true;
                $(img).remove();
            });

        //  Get dataURL from blob.

            var reader = new FileReader();
            reader.onload = function() {
                img.src = reader.result;
            };

            reader.readAsDataURL(blob);

        });

        return mesh;

    }).then( async function( mesh ){

        mesh.name = "elevator cabine";
        mesh.position.set( -30, 0, -175);
        mesh.rotation.y = THREE.Math.degToRad( 90 );
        cameraControls.rigidObjects.push( mesh );
        TradeCenterAssets["left_cabine"] = mesh;
        scene.add( mesh );

        await caches.match( elevatorOctreeUrl ).then(function(response){

            if ( !response ) 
                throw response;
            else
                return response;

        }).catch(function(err){

            return fetch( elevatorOctreeUrl );

        }).then(async function(response){

            var cache = await caches.open("geometries")
                .then(function(cache){ return cache; });

        //  Clone is needed because put() consumes the response body.
        //  See: "https://developer.mozilla.org/en-US/docs/Web/API/Cache/put"

            var clone = response.clone();
            await cache.put( elevatorOctreeUrl, clone );
            return response.json();

        }).then(function(json){

            return loadElevatorAsset( json );

        }).then( function( elevator ){

            elevator.name = "left elevator";
            var elevuuid = elevator.geometry.uuid;
            elevator.position.copy( mesh.position );
            octree.importThreeMesh( elevator );

            ElevatorAssets["elevator_left"] = elevator;

            var animator = new THREE.Object3D();
            animator.position.copy( mesh.position );
            var animation = new THREE.Animation( animator, elevatorData );
            animation.timeScale = timeScale;
            animation.play(animation.data.length * 0.75);

            var updatesSelector = "#updates";
            var elevatorSelector = "#elevator-left";
            var elevatorUpdater = $(`<input type="hidden" id="elevator-left">`).get(0);
            $("#updates").append(elevatorUpdater);

            elevatorUpdater.update = () => {
                var contactInfo = localPlayer.controller.contactInfo;

                function contactInfoFind( item ){ return item.face.meshID == elevuuid; }
                function contactInfoFilter( item ){ return item.face.meshID == elevuuid; }

                if ( contactInfo.length == 0 || !!contactInfo.find(contactInfoFilter) ) {
                    animation.timeScale = timeScale;
                } else {
                    animation.timeScale = 4 * timeScale;
                }

                if (animator.position.y < 50) mesh.rotation.y = THREE.Math.degToRad( 90 );
                if (animator.position.y > 50) mesh.rotation.y = THREE.Math.degToRad( -90 );

            //  Update elevator.
                mesh.position.y = animator.position.y;
                elevator.position.y = animator.position.y + elevatAdjust;

            //  Update octree.
                octree.removeThreeMesh( elevuuid );
                octree.importThreeMesh( elevator );
            };

            $(elevatorSelector).addClass("update");
            $updates = $("input[type=hidden].update");

            elevator.start = () => {
                animation.timeScale = timeScale;
                $(elevatorSelector).addClass("update");
                $updates = $("input[type=hidden].update");
            };

            elevator.stop = () => {
                animation.timeScale = 0;
                $(elevatorSelector).removeClass("update");
                $updates = $("input[type=hidden].update");
            };

        });

        return mesh;

    }).then( async function( mesh ){

        var mesh = mesh.clone();
        mesh.position.set( -30, 0, 175);
        mesh.rotation.y = THREE.Math.degToRad( -90 );
        cameraControls.rigidObjects.push( mesh );
        TradeCenterAssets["right_cabine"] = mesh;
        scene.add( mesh );

        await caches.match( elevatorOctreeUrl ).then(function(response){

            if ( !response ) 
                throw response;
            else
                return response;

        }).catch(function(err){

            return fetch( elevatorOctreeUrl );

        }).then(async function(response){

            var cache = await caches.open("geometries")
                .then(function(cache){ return cache; });

        //  Clone is needed because put() consumes the response body.
        //  See: "https://developer.mozilla.org/en-US/docs/Web/API/Cache/put"

            var clone = response.clone();
            await cache.put( elevatorOctreeUrl, clone );
            return response.json();

        }).then(function(json){

            return loadElevatorAsset( json );

        }).then( function( elevator ){

            elevator.name = "right elevator";
            var elevuuid = elevator.geometry.uuid;
            elevator.position.copy( mesh.position );
            octree.importThreeMesh( elevator );

            ElevatorAssets["elevator_right"] = elevator;

            var animator = new THREE.Object3D();
            animator.position.copy( mesh.position );
            var animation = new THREE.Animation( animator, elevatorData );
            animation.timeScale = timeScale;
            animation.play(animation.data.length * 0.75);

            var updatesSelector = "#updates";
            var elevatorSelector = "#elevator-right";
            var elevatorUpdater = $(`<input type="hidden" id="elevator-right">`).get(0);
            $("#updates").append(elevatorUpdater);

            elevatorUpdater.update = () => {

                if (animator.position.y < 50) mesh.rotation.y = THREE.Math.degToRad( -90 );
                if (animator.position.y > 50) mesh.rotation.y = THREE.Math.degToRad( 90 );

            //  Update elevator.
                mesh.position.y = animator.position.y;
                elevator.position.y = animator.position.y + elevatAdjust;

            //  Update octree.
                octree.removeThreeMesh( elevuuid );
                octree.importThreeMesh( elevator );
            };

            $(elevatorSelector).addClass("update");
            $updates = $("input[type=hidden].update");

            elevator.start = () => {
                animation.timeScale = timeScale;
                $(elevatorSelector).addClass("update");
                $updates = $("input[type=hidden].update");
            };

            elevator.stop = () => {
                animation.timeScale = 0;
                $(elevatorSelector).removeClass("update");
                $updates = $("input[type=hidden].update");
            };

        });

        return mesh;

    });

    function loadElevatorAsset( json ){

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

        ElevatorAssets[ name ] = mesh;
        return ElevatorAssets[ name ];

    }

})();
