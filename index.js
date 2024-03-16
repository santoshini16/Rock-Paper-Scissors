const btnRules=document.querySelector('.rules-btn');
const btnClose=document.querySelector('.close-btn');
const modalRules=document.querySelector('.modal');
const CHOICES=[
    {
        name:"paper",
        beats:"rock"
    },
    {
        name:"scissors",
        beats:"paper"
    },
    {
        name:"rock",
        beats:"scissors"
    },
]
const choiceButtons=document.querySelectorAll('.choice-button');
const gameDiv=document.querySelectorAll('.game');
const resultsDiv=document.querySelectorAll('.results');
const resultDivs=document.querySelectorAll('.results_result');
const resultWinner = document.querySelector('.results_winner');
const resultText = document.querySelector('.results_text');
const playAgainBtn=document.querySelector('.play-again');
const nextButton=document.querySelector('.next');
const computerScore=document.getElementById("score-a");
const userScore=document.getElementById("score-b");
let compScore = localStorage.getItem('compScore') ? parseInt(localStorage.getItem('compScore')) : 0;
let yourScore = localStorage.getItem('yourScore') ? parseInt(localStorage.getItem('yourScore')) : 0;

// Update the initial scores in the UI
computerScore.innerText = compScore;
userScore.innerText = yourScore;

choiceButtons.forEach(button=>{
    button.addEventListener('click',()=>{
       const choiceName=button.dataset.choice;
       const choice=CHOICES.find(choice=>choice.name==choiceName);
       choose(choice)
    })
})

function choose(choice){
    const aichoice=aiChoose()
    displayResults([choice,aichoice])
    displayWinner([choice,aichoice])
}
function aiChoose(){
    const rand= Math.floor(Math.random()*CHOICES.length)
    return CHOICES[rand]
}
function displayResults(results){
    resultDivs.forEach((resultDiv,idx)=>{
        setTimeout(()=>{
            resultDiv.innerHTML=`
            <div class="choice ${results[idx].name}">
             <img src="images/${results[idx].name}.png" />
            </div>
            `
        },idx*1000);
    });
    gameDiv.forEach(element => {
        element.classList.toggle('hidden');
    });
    
    resultsDiv.forEach(element => {
        element.classList.toggle('hidden');
    });
}
function displayWinner(results){
    setTimeout(()=>{
        const userWins = isWinner(results)
        const aiWins = isWinner(results.reverse())

        if (userWins) {
            resultText.innerHTML = "<div class='you-win'>YOU WIN</div><div class='against-pc'>AGAINST PC</div>";
            resultDivs[0].classList.add('winner');
            resultDivs[1].classList.remove('winner');
            playAgainBtn.innerHTML="PLAY AGAIN";
            yourScore++;
            userScore.innerText=yourScore;
            nextButton.classList.remove('hidden');
            nextButton.addEventListener('click', () => {
                window.location.href = 'hurray_animation.html';
            });
        } else if (aiWins) {
            resultText.innerHTML = "<div class='you-lose'>YOU LOST</div><div class='against-pc'>AGAINST PC</div>";
            resultDivs[1].classList.add('winner');
            resultDivs[0].classList.remove('winner');
            playAgainBtn.innerHTML="PLAY AGAIN";
            compScore++;
            computerScore.innerText=compScore;
            
        } else {
            resultText.innerText = "TIE UP";
            resultDivs.forEach(div => div.classList.remove('winner'));
            playAgainBtn.innerHTML="REPLAY";

        }
        localStorage.setItem('yourScore', yourScore); 
        localStorage.setItem('compScore', compScore);       
        resultWinner.classList.toggle('hidden')
        resultsDiv.forEach(element => {
            element.classList.toggle('show-winner');
        });
    },1000);
}
function isWinner(results){
    return results[0].beats==results[1].name;
}
playAgainBtn.addEventListener('click',()=>{
    gameDiv.forEach(element => {
        element.classList.toggle('hidden');
    });
    
    resultsDiv.forEach(element => {
        element.classList.toggle('hidden');
    });

    resultDivs.forEach(resultDiv=>{
        resultDiv.innerHTML=""
        resultDiv.classList.remove('winner')
    })
    resultText.innerText="";
    resultWinner.classList.toggle('hidden');
    resultsDiv.forEach(element => {
        element.classList.toggle('show-winner');
    });
})

btnRules.addEventListener('click',()=>{
    console.log('hello')
    modalRules.classList.add('show-modal');
})
btnClose.addEventListener('click',()=>{
    console.log('hi')
    modalRules.classList.remove('show-modal');
})