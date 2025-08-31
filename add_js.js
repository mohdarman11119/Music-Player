const musicDiv = document.querySelector('.music-list');
let strictClear =  [];

document.addEventListener('DOMContentLoaded', () => {
    const songs = JSON.parse(localStorage.getItem('songs')) || [];
    const urlData = JSON.parse(localStorage.getItem('link_data'));

    songs.forEach((song, urlData, index) => {
        let musicColor = ['#f143c8ff','#ffd6a5','#eef45cff','#87fd6fff','#b85df9ff'];
        let idx = Math.floor(Math.random() * 5);

        const newMusicCard = document.createElement('div');
        newMusicCard.classList.add('music-card');
        newMusicCard.style.backgroundColor = musicColor[idx];
        newMusicCard.innerHTML = 
            `<img src="${song.image}" alt="Music Image" class="music-image" data-musicLink = "${urlData[index]}">
            <p class="music-name"><i>${song.name}</i></p>
            <p data-pr = "${song.priority}" class="priority-number" style = "font-family: calibri;"><i>#${song.priority}</i></p>
            <input class = "check-box" type="checkbox" id="check${index}" data-index = "${index}"><span></span>`;
        
        musicDiv.appendChild(newMusicCard);
    });

const clear = document.getElementById('add');
clear.addEventListener('click', () => {
    localStorage.removeItem('musicName');
    localStorage.removeItem('pNumber');
    localStorage.removeItem('imageSrc');
    window.location.href = "add_music.html";
});

});

const removeBtn = document.querySelector('.remove');

removeBtn.addEventListener('click', () => {
    const checkedBoxes = document.querySelectorAll('.check-box:checked');
    
    if (checkedBoxes.length === 0) return;
        
    let songs = JSON.parse(localStorage.getItem('songs')) || [];
    const indexes = [...checkedBoxes].map(box => parseInt(box.dataset.index));
    indexes.sort((a, b) => b - a);
    
    indexes.forEach(idx => {
        songs.splice(idx, 1);
    });

    localStorage.setItem('songs', JSON.stringify(songs));

    checkedBoxes.forEach(box => {
        box.closest('.music-card').remove();
    });
    const checkData = JSON.parse(localStorage.getItem('songs'));
    console.log(checkData);
    
    if(checkData.length === 0) strictClear = 'strictClear';
    console.log(strictClear);
    if(strictClear === 'strictClear')
    {
        localStorage.clear();
        window.location.reload();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    let divs = Array.from(musicDiv.querySelectorAll('.music-card'));

divs.sort((a, b) => {
    return parseInt(a.querySelector('.priority-number').dataset.pr) - parseInt(b.querySelector('.priority-number').dataset.pr);
});

divs.forEach(d => {
    musicDiv.appendChild(d);
});
});