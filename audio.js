const button = document.getElementById("button");

// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add(listener)

// create a global audio source
const sound = new THREE.Audio( listener );


// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();

analyser = new THREE.AudioAnalyser( sound, fft );

const init = () => {
    audioLoader.load( "songs/leave.mp3", buffer => {
        sound.setBuffer( buffer );
        sound.setLoop( true );
        sound.setVolume( 1 );
        sound.play();
    });
    move = true;
}

button.addEventListener("click", init);