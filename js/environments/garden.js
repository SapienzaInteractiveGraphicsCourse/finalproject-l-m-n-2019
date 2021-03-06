var camera;
var renderer;
var scene;
function garden(){

var loadedV = [];
loadedV[0] = false;
loadedV[1] = false;
loadedV[2] = false;
loadedV[3] = false;
loadedV[4] = false;
loaded = false;
var robotLookingAt = new THREE.Vector3( 0, 0, 1 ).normalize();
var clicking = false;

var checkWizardHat;
var wizardHat = null;

  //Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffffff );

  //Camera
   camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.set(17,14,-12);
  camera.up = new THREE.Vector3(0,1,0);
  camera.lookAt(new THREE.Vector3(0,0,0));

  //Renderer
   renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  if(document.querySelector('canvas') != undefined ){
      document.body.replaceChild( renderer.domElement, document.getElementsByTagName('canvas')[0] );
      document.querySelector('canvas').setAttribute('hidden','true');
  }
  else{
      document.body.appendChild( renderer.domElement );
      document.querySelector('canvas').setAttribute('hidden','true');
  }

  //Light
  var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
  hemiLight.position.set(0, 14, 0);
  scene.add(hemiLight);

  //Room
  var path = './img/garden/';
  var format = '.jpg';
  var geometry = new THREE.BoxGeometry(35, 15, 35);
  var cubeMaterials = [
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(path + 'px' + format),
            side: THREE.DoubleSide
        }), //front
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(path + 'nx' + format),
            side: THREE.DoubleSide
        }), //behind
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(path + 'py' + format),
            side: THREE.DoubleSide
        }), //roof
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(path + 'ny' + format),
            side: THREE.DoubleSide
        }), //floor
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(path + 'pz' + format),
            side: THREE.DoubleSide
        }), //right
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(path + 'nz' + format),
            side: THREE.DoubleSide
        }) //left
  ];
  var ground = new THREE.Mesh(geometry,cubeMaterials);
  ground.position.y=7.5;
  scene.add(ground);

  //Fountain
  var loader = new THREE.GLTFLoader();
  loader.load('models/garden/fountain/scene.gltf',
	function ( gltf ) {
  var model = gltf.scene;
  model.traverse( function ( object ) {
      if ( object.isMesh ){
          object.castShadow = true;
          object.geometry.scale(1,1,1);
      }
  });
  model.position.set(0,-0.2,0);
  scene.add(model);
  loadedV[0] = true;
  },
  function ( xhr ) {
	console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded: fountain' );
  if(!isNaN(xhr.loaded) && !isNaN(xhr.total) && !isNaN(xhr.loaded / xhr.total * 100 ) ){
      if( !(getCookie('hat') == 'yes') && (xhr.loaded / xhr.total) > 0.90  ){

      }
  }else{
      alert('the loading utility is currently down, please wait the models load before starting to play.');
      loadedV[0] = true;
  }
	},
	function ( error ) {
  console.log( 'An error happened' );
  });
  var boxModelFountain = new THREE.Mesh(
      new THREE.SphereGeometry( 5, 32, 32 ),
      new THREE.MeshStandardMaterial( {opacity: 0 , transparent: true} )
  );
  scene.add(boxModelFountain);

  //Gazebo
  var loader = new THREE.GLTFLoader();
  loader.load('models/garden/gazebo/scene.gltf',
  function ( gltf ) {
  var model = gltf.scene;
  model.traverse( function ( object ) {
      if ( object.isMesh ){
          object.castShadow = true;
          object.geometry.scale(1.5,1.5,1.5);
          object.geometry.rotateZ(0.785398);
      }
  });
  model.position.set(-10,0,10);
  scene.add(model);
  loadedV[1] = true;
  },
  function ( xhr ) {
  console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded: gazebo' );
  if(!isNaN(xhr.loaded) && !isNaN(xhr.total) && !isNaN(xhr.loaded / xhr.total * 100 ) ){
      if( !(getCookie('hat') == 'yes') && (xhr.loaded / xhr.total) > 0.90  ){

      }
  }else{
      alert('the loading utility is currently down, please wait the models load before starting to play.');
      loadedV[1] = true;
  }},
  function ( error ) {
  console.log( 'An error happened' );
  });
  var boxModelGazebo = new THREE.Mesh(
      new THREE.SphereGeometry( 5, 32, 32 ),
      new THREE.MeshStandardMaterial( {opacity: 0 , transparent: true} )
  );
  boxModelGazebo.position.set(-10,2.3,10);
  scene.add(boxModelGazebo);

  //Chair
  var loader = new THREE.GLTFLoader();
  loader.load('models/garden/chair/scene.gltf',
	function ( gltf ) {
  var model = gltf.scene;
  model.traverse( function ( object ) {
      if ( object.isMesh ){
          object.castShadow = true;
          object.geometry.scale(0.02,0.02,0.02);
          object.geometry.rotateX(3.14159);
          object.geometry.rotateY(3.14159);
        }
    });
    model.position.set(-9,0,-7);
    scene.add(model);
    loadedV[2] = true;
    },
  function ( xhr ) {
	console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded: chair' );
  if(!isNaN(xhr.loaded) && !isNaN(xhr.total) && !isNaN(xhr.loaded / xhr.total * 100 ) ){
      if( !(getCookie('hat') == 'yes') && (xhr.loaded / xhr.total) > 0.90  ){

      }
  }else{
      alert('the loading utility is currently down, please wait the models load before starting to play.');
      loadedV[2] = true;
	}},
	function ( error ) {
  console.log( 'An error happened' );
  });

  //Tree
  var loader = new THREE.GLTFLoader();
  loader.load('models/garden/tree/OrangeTree.gltf',
  function ( gltf ) {
  var model = gltf.scene;
  model.traverse( function ( object ) {
      if ( object.isMesh ){
          object.castShadow = true;
        }
    });
    model.position.set(10,0,10);
    scene.add(model);
    loadedV[3] = true;
    },
  function ( xhr ) {
  console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded: tree' );
  if(!isNaN(xhr.loaded) && !isNaN(xhr.total) && !isNaN(xhr.loaded / xhr.total * 100 ) ){
      if( !(getCookie('hat') == 'yes') && (xhr.loaded / xhr.total) > 0.90  ){

      }
  }else{
      alert('the loading utility is currently down, please wait the models load before starting to play.');
      loadedV[3] = true;
  }},
  function ( error ) {
  console.log( 'An error happened' );
  });
  var boxModelTree = new THREE.Mesh(
        new THREE.CubeGeometry( 5, 5, 5 ),
        new THREE.MeshStandardMaterial( {opacity: 0 , transparent: true} )
    );
  boxModelTree.position.set(10,7.8,10);
  boxModelTree.scale.set(0.15,3.99,0.15);
  scene.add(boxModelTree);

  //Robot
  var modelChar, box, checkWizardHat, checkGlasses;
  var wizardHat = null;
  var glasses = null;
  var glassesAreLoaded = false;
  var wizardHatAreLoaded = false;
  var rootBone = [];
  var robotSkeleton;
  var invisibleBox;
  var loaderChar = new THREE.GLTFLoader();
  loaderChar.load('models/character/robot1/RobotExpressive.glb',
  function ( gltf ) {
     modelChar = gltf.scene;
     modelChar.traverse( function ( object ) {
     if ( object.isMesh ){
       object.castShadow = true;
     }
     if( object.name == 'RobotArmature'){
          rootBone.push(object.children[0]);
     }
     if(object.name == 'FootL' || object.name == 'FootR' ){
          object.visible = false;
     }});
     modelChar.position.set(0,-3,0);
     scene.add( modelChar );
     loadedV[4] = true;
     robotSkeleton = new THREE.Skeleton( rootBone );
     var size = new THREE.Box3().setFromObject(modelChar).getSize();
     invisibleBox = new THREE.Mesh(new THREE.CubeGeometry(size.x/2-0.8,size.y,size.z-0.1),
                                   new THREE.MeshStandardMaterial( {opacity: 0,transparent: true}));
     invisibleBox.position.set(0,3,-7);
     scene.add(invisibleBox);
     invisibleBox.add(modelChar);

     if( getCookie('glasses') == 'yes'){
     glasses = drawGlasses();
     checkGlasses = setInterval(function(){
     if(glasses == null){
     }else{
        clearInterval(checkGlasses);
        glassesAreLoaded = true;
        var box = new THREE.Box3().setFromObject( modelChar );
        glasses.scale.set(0.1,0.15,0.15);
        glasses.position.x -= 0.01 ;
        glasses.position.z -= box.getSize().z -4.3;
        glasses.position.y += box.getSize().y -0.75 ;
        modelChar.add(glasses);
      }
     }, 500);}

     if( getCookie('wizard-hat') == 'yes'){
       console.log("wizard-hat is TRUE");
         wizardHat = drawWizardHat();
         checkWizardHat = setInterval(function(){
             if(wizardHat == null){
             }else{  
                 clearInterval(checkWizardHat);
                 wizardHatAreLoaded = true;
                 var box = new THREE.Box3().setFromObject( modelChar );
                 wizardHat.scale.set(0.11,0.15,0.15);

                 wizardHat.position.z += box.getSize().z/2 ;
                 wizardHat.position.y = box.getSize().y -0.5 ;
                 wizardHat.position.x += -0.1 ;
                 modelChar.add(wizardHat);
             }
         }, 500);
     }

   },
   function ( xhr ) {
   console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded: robot' );
   if(!isNaN(xhr.loaded) && !isNaN(xhr.total) && !isNaN(xhr.loaded / xhr.total * 100 ) ){
       if( !(getCookie('hat') == 'yes') && (xhr.loaded / xhr.total) > 0.90  ){

       }
   }else{
       alert('the loading utility is currently down, please wait the models load before starting to play.');
       loadedV[4] = true;
   }},
   function ( error ) {
      console.log( 'An error happened' );
      console.log(error);
   });

   //Extra animations
   document.getElementById("hello").onclick = function(e){
     e.stopPropagation();
     clicking=true;
     console.log("animation hello executing..");
     helloanimation(robotSkeleton,glasses,wizardHat,"garden");
       clicking=false; //reset the animation
   };

   document.getElementById("dabdance").onclick = function(e){
     e.stopPropagation();
     clicking=true;
     console.log("animation dabdance executing..");
     dabdanceanimation(robotSkeleton, glasses,wizardHat,"garden");
     clicking=false; //reset the animation
   };

   document.getElementById("affermative_movement").onclick = function(e){
     e.stopPropagation();
     clicking=true;
     console.log("animation affermative movement executing..");
     affermativeanimation(robotSkeleton,glasses,wizardHat,"garden");
     clicking=false; //reset the animation
   };


  //Raycaster - Robot movement
  var alerted = false;
  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();
  var collidableMeshList = [];
  collidableMeshList.push(ground);
  collidableMeshList.push(boxModelTree);
  collidableMeshList.push(boxModelFountain);
  collidableMeshList.push(boxModelGazebo);
  function onMouseClick( event ) {
          mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
          mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
          raycaster.setFromCamera( mouse, camera );
          var intersects = raycaster.intersectObjects( scene.children );
          var point = intersects[intersects.length -1].point;
          if(modelChar != null){
            if ( ! isNaN( invisibleBox.position.angleTo(point) ) ){

                //Definire il vettore nella direzione che va dal personaggio al punto da raggiungere
                var newLookingAt = new THREE.Vector3( );
                newLookingAt = newLookingAt.subVectors( point, invisibleBox.position ).normalize();  //direction from 2nd param to 1st param, namley from char to clicked point
                //CALCOLARE L'ANGOLO TRA LE DUE DIREZIONI
                var angleOfRotation = robotLookingAt.angleTo(newLookingAt);
                //RUOTARE PERSONAGGIO E VETTORE robotLookingAt
                invisibleBox.rotation.y += angleOfRotation;
                //update robotLookingAt
                var axis = new THREE.Vector3( 0, 1, 0 ); //axis deve essere l'asse intorno cui ruotare lookat (l'asse che va verso l'alto)
                robotLookingAt.applyAxisAngle( axis, angleOfRotation );

            }
              var mainB = robotSkeleton.bones;
              var armL = mainB[0].children[1].children[2].children[0].children[0].children[1];
              var armR = mainB[0].children[1].children[2].children[0].children[0].children[2];
              var head = mainB[0].children[1].children[2].children[0].children[0].children[0].children[0];
              var legL = mainB[0].children[1].children[0];
              var legR = mainB[0].children[1].children[1];
              var INITIALVALUE_LEG = 2.7;
              var rootInit = { x : invisibleBox.position.x , z : invisibleBox.position.z };
              var rootFinal = { x : point.x , z : point.z };
              var tween = new TWEEN.Tween(rootInit).to(rootFinal, 1500).onComplete(function() {
                  tweenHEAD1.stop();
                  tweenLEGR1.stop();
                  tweenLEGL1.stop();
                  tweenARMR1.stop();
                  tweenARML1.stop();
                  tweenHEAD2.stop();
                  tweenLEGR2.stop();
                  tweenLEGL2.stop();
                  tweenARMR2.stop();
                  tweenARML2.stop();
                  //-----------------------------
                  if( legL.rotation.x != INITIALVALUE_LEG
                    && legR.rotation.x != INITIALVALUE_LEG ) {
                    console.log('char in movement, hence stop its!');

                    var DELAY_STOP_MOVEMENT = 400;

                    var finish_tlegl = new TWEEN.Tween(legL.rotation).to({
                        x: 2.7,
                        y: -0.16,
                        z: -0.075
                    }, DELAY_STOP_MOVEMENT).start();
                    finish_tlegl.easing(TWEEN.Easing.Cubic.InOut);

                    var finish_tlegr = new TWEEN.Tween(legR.rotation).to({
                        x: 2.7,
                        y: 0.25,
                        z: 0.12
                    }, DELAY_STOP_MOVEMENT).start();
                    finish_tlegr.easing(TWEEN.Easing.Cubic.InOut);

                    var finish_head = new TWEEN.Tween(head.rotation).to({
                        x: -0.086,
                        y: -0.031,
                        z: -0.055
                    }, DELAY_STOP_MOVEMENT).start();
                    finish_head.easing(TWEEN.Easing.Cubic.InOut);

                    var finish_armL = new TWEEN.Tween(armL.rotation).to({
                        x: -0.11,
                        y: 0,
                        z: -2.7
                    }, DELAY_STOP_MOVEMENT).start();
                    finish_armL.easing(TWEEN.Easing.Cubic.InOut);

                    var finish_armR = new TWEEN.Tween(armR.rotation).to({
                      x: -0.11,
                      y: 0,
                      z: 2.7
                    }, DELAY_STOP_MOVEMENT).start();
                    finish_armR.easing(TWEEN.Easing.Cubic.InOut);

            }
                  //----------------------------
              });
              tween.onUpdate(function(){
                  invisibleBox.position.x = rootInit.x;
                  invisibleBox.position.z = rootInit.z;

                  var originPoint = invisibleBox.position.clone();

                  for (var vertexIndex = 0; vertexIndex < invisibleBox.geometry.vertices.length; vertexIndex++)
                  {
                    var localVertex = invisibleBox.geometry.vertices[vertexIndex].clone();
                    var globalVertex = localVertex.applyMatrix4( invisibleBox.matrix );
                    var directionVector = globalVertex.sub( invisibleBox.position );

                    var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
                    var collisionResults = ray.intersectObjects( collidableMeshList );
                    if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ){
                        console.log("Game Over");
                     window.location.replace("gameover.html");
                      if(!alerted){
                      //alert("Game Over\nThe Robot Collided in garden");
                      alerted = true;
                    }
                    }
                  }
              });
              tween.start();
              var tweenLEGL1 = new TWEEN.Tween(legL.rotation).to({
                x: 1,
                y: 0,
                z: 0.2
              }, 300);

              var tweenLEGL2 = new TWEEN.Tween(legL.rotation).to({
                x: 2.7,
                y: -0.16,
                z: -0.075
              }, 300);

              var tweenLEGR1 = new TWEEN.Tween(legR.rotation).to({
                x: 4,
                y: 0,
                z: 0.2
              }, 300);

              var tweenLEGR2 = new TWEEN.Tween(legR.rotation).to({
                x: 2.7,
                y: 0.25,
                z: 0.12
              }, 300);

              var tweenHEAD1 = new TWEEN.Tween(head.rotation).to({
                x: -0.3,
                y: -0.031,
                z: 0.055
              }, 300);

              var tweenHEAD2 = new TWEEN.Tween(head.rotation).to({
                x: -0.086,
                y: -0.031,
                z: 0.055
              }, 300);

              var tweenARML1 = new TWEEN.Tween(armL.rotation).to({
                x: -0.9,
                y: 0,
                z: -2.7
              }, 300);

              var tweenARML2 = new TWEEN.Tween(armL.rotation).to({
                x: -0.11,
                y: 0,
                z: -2.7
              }, 300);

              var tweenARMR1 = new TWEEN.Tween(armR.rotation).to({
                x: -0.9,
                y: 0,
                z: 2.7
              }, 300);

              var tweenARMR2 = new TWEEN.Tween(armR.rotation).to({
                x: -0.11,
                y: 0,
                z: 2.7
              }, 300);

              tweenHEAD1.chain(tweenHEAD2);
              tweenLEGR1.chain(tweenLEGR2);
              tweenLEGL1.chain(tweenLEGL2);
              tweenARML1.chain(tweenARML2);
              tweenARMR1.chain(tweenARMR2);
              tweenHEAD2.chain(tweenHEAD1);
              tweenLEGR2.chain(tweenLEGR1);
              tweenLEGL2.chain(tweenLEGL1);
              tweenARML2.chain(tweenARML1);
              tweenARMR2.chain(tweenARMR1);
              tweenHEAD1.start();
              tweenLEGR1.start();
              tweenLEGL1.start();
              tweenARMR1.start();
              tweenARML1.start();
      }
  }
  window.addEventListener( 'click', onMouseClick, false );


  //Animation
  function animate() {
      renderer.render( scene, camera );
      TWEEN.update();
      requestAnimationFrame( animate );
      if((loadedV[0] == true) && (loadedV[1] == true) && (loadedV[2] == true) && (loadedV[3] == true) && (loadedV[4] == true)){
        loaded = true;
      }
  }
  animate();

}
