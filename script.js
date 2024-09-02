const song1=document.getElementById('song1')
const song2=document.getElementById('song2')
const song3=document.getElementById('song3')
const song4=document.getElementById('song4')
const song5=document.getElementById('song5')
const song6=document.getElementById('song6')
const songs=[song1,song2,song3,song4,song5,song6]
const progressBar=document.getElementById('progressBar')
const nextButton=document.getElementById('next')
const preButton=document.getElementById('previous')
const playButton=document.getElementById('play')

let currentIndex=0
function loadMetaData(index){
    songs[index].onloadedmetadata=function(){
        progressBar.max=songs[index].duration;
        progressBar.value=songs[index].currentTime;
    }
}

playButton.addEventListener('click',function(){
    if(playButton.classList.contains('bx-play')){
        songs[currentIndex].play()
        loadMetaData(currentIndex)
        playButton.classList.remove('bx-play')
        playButton.classList.add('bx-pause')

    }else{
        songs[currentIndex].pause()
        playButton.classList.remove('bx-pause')
        playButton.classList.add('bx-play')
    }
})
progressBar.addEventListener('click', function () {
    songs[currentIndex].currentTime = progressBar.value;
    songs[currentIndex].play();
    playButton.classList.remove('bx-play')
    playButton.classList.add('bx-pause')
});

function updateProgressBar(){
    progressBar.value=songs[currentIndex].currentTime
}
setInterval(() => {
    if (!songs[currentIndex].paused) {
        updateProgressBar()
    }
}, 1000);

// Initial Load
loadMetaData(currentIndex)

nextButton.addEventListener('click',function(){
    songs[currentIndex].pause();
    songs[currentIndex].currentTime=0;
    currentIndex=(currentIndex+1)%songs.length;
    songs[currentIndex].play();
    loadMetaData(currentIndex);
    playButton.classList.remove('bx-play')
    playButton.classList.add('bx-pause')
})
// Previous Button Event
preButton.addEventListener('click', function () {
    songs[currentIndex].pause(); // Pause the current song
    songs[currentIndex].currentTime = 0; // Reset the current time of the current song
    currentIndex = (currentIndex - 1 + songs.length) % songs.length; // Move to the previous song
    songs[currentIndex].play(); // Play the previous song
    loadMetaData(currentIndex); // Load metadata for the previous song
    playButton.classList.remove('bx-play');
    playButton.classList.add('bx-pause');
});