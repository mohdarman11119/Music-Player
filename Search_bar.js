const data = document.querySelector('.search-input');
const musicContainer = document.querySelector('.music-list');

let musicList = JSON.parse(localStorage.getItem('songs')) || [];

function displayCards(songs) {
    musicContainer.innerHTML = '';
    let musicColor = ['#f143c8ff','#ffd6a5','#eef45cff','#87fd6fff','#b85df9ff'];

    songs.forEach((song, idx) => {
        const newMusicCard = document.createElement('div');
        newMusicCard.classList.add('music-card');
        newMusicCard.style.backgroundColor = musicColor[Math.floor(Math.random() * musicColor.length)];
        newMusicCard.innerHTML = `
            <img src="${song.image}" alt="Music Image" class="music-image">
            <p class="music-name"><i>${song.name}</i></p>
            <p data-pr="${song.priority}" class="priority-number" style="font-family: calibri;"><i>#${song.priority}</i></p>
            <input class="check-box" type="checkbox" id="check${idx}" data-index="${idx}"><span></span>
        `;
        musicContainer.appendChild(newMusicCard);
    });
}

data.addEventListener('input', (e) => {
    e.preventDefault();
    const searchTerm = e.target.value.trim().toLowerCase();

    if (searchTerm === '') {
        displayCards(musicList);
        return;
    }

    const filteredSongs = musicList.filter(song => song.name.toLowerCase().includes(searchTerm));
    displayCards(filteredSongs);
});