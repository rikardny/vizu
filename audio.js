const fileButton = document.getElementById("file");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const sampleButton = document.getElementById("sample");

// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add(listener)

// create a global audio source
const audio = document.getElementById("audio");
const sound = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();

analyser = new THREE.AudioAnalyser( sound, fft );

const play = (file) => {
    audioLoader.load(file, buffer => {
        sound.setBuffer( buffer );
        sound.setLoop( true );
        sound.setVolume( 0.8 );
        sound.play();
    })
    isPlaying = true;
}

document.addEventListener("dragover", event => event.preventDefault());

document.addEventListener("drop", (event) => {
    event.preventDefault();
    if (sound.isPlaying) {
        sound.stop();
    }
    play(event.dataTransfer.files[0].path);
})

fileButton.addEventListener("change", event => {
    if (sound.isPlaying) {
        sound.stop();
    }
    play(event.target.files[0].path);
})

playButton.addEventListener("click", event => {
    if (sound.isPlaying) {
        sound.stop();
    }
    sound.play();
})

pauseButton.addEventListener("click", event => {
    sound.pause();
})

sampleButton.addEventListener("click", e => {
    e.preventDefault();
    if (sound.isPlaying) {
        sound.stop();
    }
    play("./songs/Electric\ Swing\ Circus\ -\ Bella\ Belle\ \(Keizan\ remix\).mp3");
})