const btnRules=document.querySelector('.rules-btn');
const btnClose=document.querySelector('.close-btn');
const modalRules=document.querySelector('.modal');
const playAgainBtn=document.querySelector('.play-again');
playAgainBtn.addEventListener('click',()=>{
    window.location.href = 'index.html';
    console.log('hi');
})

const stars = document.querySelectorAll('.star-img img');
stars.forEach(star => {
    const delay = Math.random() * 3;
    star.style.animationDelay = `${delay}s`;
});

btnRules.addEventListener('click',()=>{
    console.log('hello')
    modalRules.classList.add('show-modal');
})
btnClose.addEventListener('click',()=>{
    console.log('hi')
    modalRules.classList.remove('show-modal');
})