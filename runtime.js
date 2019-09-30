//  runtime.js


    $("#water").addClass("render update");

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
    localPlayer.controller.center.x = 68;
    localPlayer.controller.center.z = 635;

    cameraControls.offset.y = 20;
    cameraControls.setLatLon(-16.218, 6.129);
    cameraControls.radius = cameraControls.minRadius;
    if ( isMobile ) cameraControls.maxRadius = cameraControls.minRadius;


//  Runtime.

    animate();
    updates();

