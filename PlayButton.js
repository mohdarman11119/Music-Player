const playBtn = document.querySelector('.play');
let mLinkArr = [], playAbleMusicURLs = [];

document.addEventListener('DOMContentLoaded', () => {
    playBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const playAble = document.querySelectorAll('.check-box:checked');

        if (playAble.length === 0) return;

        playAble.forEach(mLink => {
            const priorityElem = mLink.closest('.music-card')?.querySelector('.priority-number');

            if (priorityElem) {
                mLinkArr.push(priorityElem.dataset.pr);
            }
        });

        localStorage.setItem('M_L_Arr', JSON.stringify(mLinkArr));
        const priorityNum = JSON.parse(localStorage.getItem("songs"));

        priorityNum.sort((a, b) => a.priority - b.priority);
    
        let playAbleMusicURLs = priorityNum.map((obj, i) => (
            mLinkArr.includes(obj.priority)?i: -1)).filter(index => index !== -1);
            localStorage.setItem('musicURLplayPage', JSON.stringify(playAbleMusicURLs));
            window.location.href = 'PlayPage.html';
    });
});