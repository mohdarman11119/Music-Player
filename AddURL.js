const musicLinks = document.querySelector('.listen');
const addurlBtnLink = document.querySelectorAll('.submit-url');

musicLinks.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = "`${musicLinks.innerText}`";
});

let linkData = JSON.parse(localStorage.getItem('link_data')) || [];

addurlBtnLink.forEach(linkBtn => {
    linkBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(linkData);
        linkData.push(e.currentTarget.dataset.value);
        console.log(linkData);
        localStorage.setItem('link_data', JSON.stringify(linkData)); 
        window.location.href = "add_music.html";
    });
});