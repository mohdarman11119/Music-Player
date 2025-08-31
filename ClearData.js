function delData() {
const dataTobeDel = JSON.parse(localStorage.getItem('songs')) || [];
const imageData = localStorage.getItem('imageSrc') || [];
const LiveMusicName = localStorage.getItem('musicName') || [];
const live_num = localStorage.getItem('pNumber');

if(dataTobeDel.length === 0 && LiveMusicName.length === 0 && imageData.length !==  0) {
    localStorage.clear();
    window.location.reload();
    }
}
document.addEventListener('DOMContentLoaded', delData);