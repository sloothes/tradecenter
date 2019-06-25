//  ExternalTowersElevators.js

//  var TradeCenterAssets = {};
//  var matcapsFolder = "/tradecenter/matcaps/";
//  var tradeCenterGeometriesFolder = "/tradecenter/geometries/";

(async function(){

    var ElevatorAssets = {};

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

    var elevatorCabineUrl = tradeCenterGeometriesFolder + "elevator-cabin.js";          //  materials: [6].
    var elevatorOctreeUrl = tradeCenterGeometriesFolder + "elevator-octree.js";         //  materials: [1].
    var elevatorDoorFrameUrl = tradeCenterGeometriesFolder + "elevator-doorframe.js";   //  materials: [6].
    var elevatorDoorLeaf1Url = tradeCenterGeometriesFolder + "elevator-doorleaf1.js";   //  materials: [1].
    var elevatorDoorLeaf2Url = tradeCenterGeometriesFolder + "elevator-doorleaf2.js";   //  materials: [1].

    await fetch(elevatorDoorFrameUrl)
    .then(function(response){
        return response.json();
    }).then(function(json){
        return loadElevatorAsset( json );
    }).then( function( mesh ){
        var img = new Image();
        img.crossOrigin = "anonymous";
        $(img).on("load", function(){
            var texture = new THREE.Texture( img );
            mesh.material.materials[1] = new THREE.MeshStandardMaterial({ 
                color: 0xffffff, 
                map: texture,
                bumpMap: texture,
                bumpScale: -0.03,
                shading: THREE.SmoothShading,
            });
            mesh.material.materials[1].map.needsUpdate = true;
            mesh.material.materials[1].bumpMap.needsUpdate = true;
            $(this).remove();
        });
        img.src = tradeCenterGeometriesFolder + "elevator-door.jpg";
        return mesh;
    }).then( function( mesh ){
        var img = new Image();
        img.crossOrigin = "anonymous";
        $(img).on("load", function(){
            var texture = new THREE.Texture( img );
            mesh.material.materials[2] = new THREE.MeshStandardMaterial({ 
                color: 0xffffff, 
                map: texture,
                shading: THREE.SmoothShading,
            });
            mesh.material.materials[2].map.needsUpdate = true;
            $(this).remove();
        });
        img.src = tradeCenterGeometriesFolder + "elevator-door.jpg";
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

    await fetch(elevatorCabineUrl)
    .then(function(response){
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
        var img = new Image();
        img.crossOrigin = "anonymous";
        $(img).on("load", function(){
            var normal = new THREE.Texture( normalPixel() );
            var matcap = new THREE.Texture( img );
            mesh.material.materials[0] = new ShaderMaterial( normal, matcap );
            $(this).remove();
        });
        img.src = matcapsFolder + "ChromeReflect.jpg";
        return mesh;
    }).then( function( mesh ){
        var img = new Image();
        img.crossOrigin = "anonymous";
        $(img).on("load", function(){
            var normal = new THREE.Texture( normalPixel() );
            var matcap = new THREE.Texture( img );
            mesh.material.materials[3] = new ShaderMaterial( normal, matcap );
            mesh.material.materials[5] = new ShaderMaterial( normal, matcap );
            $(this).remove();
        });
        img.src = matcapsFolder + "silver_tinman.png";
        return mesh;
    }).then( function( mesh ){
        var img = new Image();
        img.crossOrigin = "anonymous";
        $(img).on("load", function(){
            var texture = new THREE.Texture( img );
            mesh.material.materials[1] = new THREE.MeshStandardMaterial({ 
                color: 0xffffff, 
                map: texture,
                bumpMap: texture,
                bumpScale: -0.03,
                shading: THREE.SmoothShading,
            });
            mesh.material.materials[1].map.needsUpdate = true;
            mesh.material.materials[1].bumpMap.needsUpdate = true;
            $(this).remove();
        });
        img.src = tradeCenterGeometriesFolder + "elevator.jpg";
        return mesh;

    }).then( async function( mesh ){

        mesh.name = "elevator cabine";
        mesh.position.set( -30, 0, -175);
        mesh.rotation.y = THREE.Math.degToRad( 90 );
        cameraControls.rigidObjects.push( mesh );
        TradeCenterAssets["left_cabine"] = mesh;
        scene.add( mesh );

        await fetch(elevatorOctreeUrl)
        .then(function(response){
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

    }).then( function( mesh ){

        var mesh = mesh.clone();
        mesh.position.set( -30, 0, 175);
        mesh.rotation.y = THREE.Math.degToRad( -90 );
        cameraControls.rigidObjects.push( mesh );
        TradeCenterAssets["right_cabine"] = mesh;
        scene.add( mesh );

        await fetch(elevatorOctreeUrl)
        .then(function(response){
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
