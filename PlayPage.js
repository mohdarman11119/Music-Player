const musicIndex = JSON.parse(localStorage.getItem('musicURLplayPage'));
const playMusic = JSON.parse(localStorage.getItem('songs'));
const musicLinkPlayPage = JSON.parse(localStorage.getItem('link_data'));

document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById("myAudio");
    const pseudoPlayPauseBtn = document.querySelector(".play-pause");
    const next = document.querySelector('.next');
    const prev = document.querySelector('.prev');
    const staticTime = document.querySelector('.static-time');
    const dynamicTime = document.querySelector('.dynamic-time');
    const img = document.querySelector('.img-cls img');

    let musicPlayer = false;
    let count = 0;

    // Initial setup
    img.src = playMusic[musicIndex[0]].image;
    audio.src = musicLinkPlayPage[0];

    // Ensure rotation class is always applied
    img.classList.add('play-page-image');
    img.style.animationPlayState = 'paused'; // Start paused

    // Play/Pause button
    pseudoPlayPauseBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (!musicPlayer) {
            audio.play();
            img.style.animationPlayState = 'running';
            musicPlayer = true;
            pseudoPlayPauseBtn.textContent = "⏸";
        } else {
            audio.pause();
            img.style.animationPlayState = 'paused';
            musicPlayer = false;
            pseudoPlayPauseBtn.textContent = "▶";
        }
    });

    function playSong(index) {
        if (!playMusic[index] || !musicLinkPlayPage[index]) {
            console.error("Invalid index:", index, playMusic[index], musicLinkPlayPage[index]);
            return;
        }
        img.src = playMusic[index].image;
        audio.src = musicLinkPlayPage[index];
        audio.play();
        img.style.animationPlayState = 'running';
        musicPlayer = true;
        pseudoPlayPauseBtn.textContent = "⏸";
    }

    next.addEventListener('click', (e) => {
        e.preventDefault();
        count = (count + 1) % musicLinkPlayPage.length;
        playSong(count);
    });

    prev.addEventListener('click', (e) => {
        e.preventDefault();
        count = (count - 1 + musicLinkPlayPage.length) % musicLinkPlayPage.length;
        playSong(count);
    });

    audio.addEventListener('loadedmetadata', () => {
        const minutes = Math.floor(audio.duration / 60);
        const seconds = Math.floor(audio.duration % 60).toString().padStart(2, '0');
        staticTime.textContent = `${minutes}:${seconds}`;
    });

    audio.addEventListener('timeupdate', () => {
        document.getElementById('progress-bar').value = (audio.currentTime / audio.duration) * 100; 
        const minutes = Math.floor(audio.currentTime / 60);
        const seconds = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
        dynamicTime.textContent = `${minutes}:${seconds}`;
    });
});
