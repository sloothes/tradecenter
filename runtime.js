//  runtime.js


    $("#water").addClass("render").addClass("update");

    var $renders = $("input[type=hidden].render");
    var $updates = $("input[type=hidden].update");

    var clock = new THREE.Clock();

    function animate(){

        windowAnimationFrameRequestID = requestAnimationFrame( animate );

        for (var i = 0; i < $renders.length; i++){
            $renders[i].render();
        }

    }


    function updates(){

        windowAnimationFrameRequestID = requestAnimationFrame( updates );
        
        var dt = clock.getDelta();
        var time = clock.getElapsedTime();

        for ( var i = 0; i < $updates.length; i++ ){
            $updates[i].update( dt );
        }

    }


//  Settings.

    keyInputControls.On();
    cameraControls.offset.y = 20;
    cameraControls.setLatLon(-23, 270);
    localPlayer.controller.center.x = -380;
    if ( isMobile ) {
        cameraControls.radius = cameraControls.minRadius;
        cameraControls.maxRadius = cameraControls.minRadius;
    }


//  Runtime.

    animate();
    updates();

