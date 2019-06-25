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
