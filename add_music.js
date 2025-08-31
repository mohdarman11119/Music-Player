const name = document.querySelector('#mus-name');
const num = document.getElementById('pr-order');
const img = document.querySelectorAll('.Img');
const btn = document.querySelector('.done');
const musicLink = document.querySelector('.music-link');

let selectedImage = null;

musicLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = "MusicURL.html";
});

name.addEventListener('input', () => {
    localStorage.setItem('musicName', name.value);
});

num.addEventListener('input', () => {
    localStorage.setItem('pNumber', num.value);
});

img.forEach(elem => {
    elem.addEventListener('click', (e) => {
        img.forEach(im => im.classList.remove('shrink'));
        
        e.currentTarget.classList.add('shrink');
        selectedImage = e.currentTarget.getAttribute('src');
        localStorage.setItem('imageSrc', selectedImage);
    });
});

if(localStorage.getItem('musicName')) name.value = localStorage.getItem('musicName');
if(localStorage.getItem('pNumber')) num.value = localStorage.getItem('pNumber');
if(localStorage.getItem('imageSrc')){
    img.forEach(image => {
        if(image.getAttribute('src') === localStorage.getItem('imageSrc')){
            image.classList.add('shrink');
            selectedImage = localStorage.getItem('imageSrc');
        }
    });
}

btn.addEventListener('click', (e) => {
    e.preventDefault();

    if(name.value === '' || num.value === '' || !selectedImage){
        alert('Please fill all the fields');
        return;
    }

    else if(num.value <= 0) {
        alert('Please put priority number greater than or equal than 1');
        return;
    }

    let songs = JSON.parse(localStorage.getItem('songs')) || [];

    const newSong = {
        name: name.value,
        priority: num.value,
        image: selectedImage
    };

    songs.push(newSong);
    localStorage.setItem('songs', JSON.stringify(songs));
    window.location.href = "index.html";
});