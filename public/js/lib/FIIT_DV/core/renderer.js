/**
 * Created by z on 18.4.2016.
 */

FIIT_DV.Renderer = class {

    constructor ( timer ) {

        this._timer = timer;
        this._timer.addTickListener( this );

        this._el = document.getElementById( "web-gl-canvas" );
        this._scene = new THREE.Scene();
        this._camera = new THREE.PerspectiveCamera( 25, ( this._el.clientWidth-20 ) / ( this._el.clientHeight-20 ), 0.1, 1000 );
        this._renderer = new THREE.WebGLRenderer( { antialias:true } );

        this._scene.fog = new THREE.FogExp2( 0xdddddd, 0.006 );
        this._renderer.setSize( this._el.clientWidth-10, this._el.clientHeight-10 );
        this._renderer.setClearColor( this._scene.fog.color, 1 );
        this._renderer.shadowMapSoft = true;
        this._renderer.shadowMap.enabled = true;
        this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this._el.appendChild( this._renderer.domElement );
        this.canvas = this._renderer.domElement;
        this._clock = new THREE.Clock();

        this._controls = new THREE.OrbitControls( this._camera, this._renderer.domElement );
        //controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)
        this._controls.enableDamping = true;
        this._controls.dampingFactor = 0.25;
        this._controls.enableZoom = false;


        this.initStuff();

        this._angle = 1;

    };

    initStuff () {
        this._camera.position.set( -0, 0, 100 );
        this._camera.lookAt(new THREE.Vector3(0,0,0));

        var light = new THREE.AmbientLight( 0x404040 ); // soft white light
        this.addRenderable( light );
        var lights = [];
        lights[0] = new THREE.SpotLight( 0xd3d3d3 );
        lights[1] = new THREE.SpotLight( 0xd3d3d3 );
        lights[2] = new THREE.SpotLight( 0xd3d3d3 );
        lights[0].position.set( 0, 400, 0 );
        lights[1].position.set( 100, 400, 100 );
        lights[2].position.set( +400, 500, 400 );
        lights[0].castShadow = true;
        lights[1].castShadow = true;
        lights[2].castShadow = true;
        for(var i = 0; i< lights.length; i++){
            lights[i].shadow.bias = 0.0001;
            lights[i].shadow.mapSize.width = 2048;
            lights[i].shadow.mapSize.height = 2048;
        }
        this.addRenderable( lights[0] );
    };

    moveCamera (d) {

        let speed = Math.PI/18;

        this._angle += speed*d;

        this._camera.position.set(
            100*Math.sin(this._angle),
            0,
            100*Math.cos(this._angle)
        );
        this._camera.lookAt(new THREE.Vector3(0,-20,0));
    };

    _render () {

        this._renderer.render( this._scene, this._camera );

    };

    tick ( elapsed ) {

        var d = this._clock.getDelta();
        // THREE.AnimationHandler.update( d ); // deprecated
       // this.moveCamera(d);
        this._render();

    };

    addRenderable ( renderable ) {

        this._scene.add( renderable );

    };

    removeRenderable ( renderable ) {

        this._scene.remove( renderable );

    };
};