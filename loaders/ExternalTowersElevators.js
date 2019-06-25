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
