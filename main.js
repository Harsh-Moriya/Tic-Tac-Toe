// selectors

const boxs = document.querySelectorAll('.box');
const choose = document.querySelector('.choose');
const options = document.querySelector('.options');
const start = document.querySelector('.start');
const x = document.querySelector('.x');
const o = document.querySelector('.o');
const res = document.querySelector('.result');
const reset = document.querySelector('.reset');
const resetAll = document.querySelector('.reset-all');
const youFirst = document.querySelector('.you');
const botFirst = document.querySelector('.bot');
const container = document.querySelector('.game-cont');
const win = document.querySelector('.wins');
const loss = document.querySelector('.losses');
const draw = document.querySelector('.draws');

// vars

let width = container.getBoundingClientRect().width;
container.style.height = `${width}px`;
let myChoice;
let botChoice;
let matrix = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let scores = {
    'box0': 0,
    'box1': 0,
    'box2': 0,
    'box3': 0,
    'box4': 0,
    'box5': 0,
    'box6': 0,
    'box7': 0,
    'box8': 0
}

let box0text = false;
let box1text = false;
let box2text = false;
let box3text = false;
let box4text = false;
let box5text = false;
let box6text = false;
let box7text = false;
let box8text = false;

let xClicked = false;
let oClicked = false;

let winner = '';

// let isReset = false;
let choosed = false;
let winnerDecided = false;
let first;
let winScore = 0;
let lossScore = 0;
let drawScore = 0;


// event listeners

youFirst.addEventListener('click', function(){
    first = 'You';
    youFirst.classList.add('you-clicked');
    botFirst.classList.remove('bot-clicked');
})
botFirst.addEventListener('click', function(){
    first = 'Bot';
    youFirst.classList.remove('you-clicked');
    botFirst.classList.add('bot-clicked');
})

choose.addEventListener('click', ()=>{
    if(choosed === false) {
        options.classList.add('show-opt');
        choosed = true;
    }
});
start.addEventListener('click', ()=>{
    if(first === 'Bot') {
        botPlay(botChoice);
    }
    options.classList.remove('show-opt');
    x.classList.remove('x-clicked');
    o.classList.remove('o-clicked');
    youFirst.classList.remove('you-clicked');
    botFirst.classList.remove('bot-clicked');
});


x.addEventListener('click', ()=>{
    myChoice = `X`
    botChoice = `O`
    x.classList.add('x-clicked');
    o.classList.remove('o-clicked');
    gamePlay();

})
o.addEventListener('click', ()=>{
    myChoice = `O`
    botChoice = `X`
    o.classList.add('o-clicked');
    x.classList.remove('x-clicked');
    gamePlay();

})

reset.addEventListener('click', ()=>{

    xClicked = false;
    oClicked = false;
    // myChoice = '';
    // botChoice = '';
    matrix = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    scores = {
        'box0': 0,
        'box1': 0,
        'box2': 0,
        'box3': 0,
        'box4': 0,
        'box5': 0,
        'box6': 0,
        'box7': 0,
        'box8': 0
    }

    boxs.forEach(function(box){
        box.innerHTML = '';
        box.style.fontSize = '70px';
    })

    box0text = false;
    box1text = false;
    box2text = false;
    box3text = false;
    box4text = false;
    box5text = false;
    box6text = false;
    box7text = false;
    box8text = false;

    winner = '';
    choosed = false;
    winnerDecided = false;

    // winScore = 0;
    // lossScore = 0;
    // drawScore = 0;
    // win.textContent = winScore;
    // loss.textContent = lossScore;
    // draw.textContent = drawScore;

    res.innerHTML = `<h1>Let's Play</h1>`;
    res.style.fontSize = `20px`;
    res.style.color = `rgb(0, 0, 0)`;

})

resetAll.addEventListener('click', function(){

    xClicked = false;
    oClicked = false;
    myChoice = '';
    botChoice = '';
    matrix = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    scores = {
        'box0': 0,
        'box1': 0,
        'box2': 0,
        'box3': 0,
        'box4': 0,
        'box5': 0,
        'box6': 0,
        'box7': 0,
        'box8': 0
    }

    boxs.forEach(function(box){
        box.innerHTML = '';
        box.style.fontSize = '70px';
    })

    box0text = false;
    box1text = false;
    box2text = false;
    box3text = false;
    box4text = false;
    box5text = false;
    box6text = false;
    box7text = false;
    box8text = false;

    winner = '';
    choosed = false;
    winnerDecided = false;

    winScore = 0;
    lossScore = 0;
    drawScore = 0;
    win.textContent = winScore;
    loss.textContent = lossScore;
    draw.textContent = drawScore;

    res.innerHTML = `<h1>Let's Play</h1>`;
    res.style.fontSize = `20px`;
    res.style.color = `rgb(0, 0, 0)`;
})

// functions

function gamePlay(){
    myPlay()
}

function myPlay() {

    const mySymb = 'M'
    boxs.forEach(function(box, index){
        box.addEventListener('click', function(e){
            // if(isReset === true) {
            //     isReset = false
            //     myChoice = myChoice
            //     botChoice = botChoice
            //     return;
            // }

            for(let i = 0; i < matrix.length; i++) {
                if(matrix[i] === index) {
                    if(winnerDecided === true) {
                        return;
                    }
                    e.currentTarget.textContent = `${myChoice}`
                    // console.log(index);
                    
                    
                    for(let i = 0; i < matrix.length; i++) {
                        if(matrix[i] === index){
                            if(myChoice !== '') {
                                matrix.splice(i,1);
                            }
                        }
                    }
                    updateScore(mySymb, index);
                    result()

                    if(winner === '') {
                        if(matrix.length >= 1){
                            botPlay(botChoice);
                        }
                    }
                    
                    // console.log(matrix);
                    win.textContent = winScore;
                    loss.textContent = lossScore;
                    draw.textContent = drawScore;
                }
            }
            
        })
    })

}

function botPlay(botChoice){
    
    const botSymb = 'B'
    let randomNum = Math.floor(Math.random()*matrix.length);
    let item = matrix[randomNum];

    // for box0
    if(box0text === false) {
        if(((scores.box1 === 'B' && scores.box2 === 'B') || (scores.box3 === 'B' && scores.box6 === 'B') || (scores.box4 === 'B' && scores.box8 === 'B')) || ((scores.box1 === 'M' && scores.box2 === 'M') || (scores.box3 === 'M' && scores.box6 === 'M') || (scores.box4 === 'M' && scores.box8 === 'M'))) {

            for(let i = 0; i < matrix.length; i++){
                if(matrix[i] === 0) {
                    item = 0;
                }
            }
            box0text = true;
        }
    }

    // for box1
    if(box1text === false) {
        if(((scores.box0 === 'B' && scores.box2 === 'B') || (scores.box4 === 'B' && scores.box7 === 'B')) || ((scores.box0 === 'M' && scores.box2 === 'M') || (scores.box4 === 'M' && scores.box7 === 'M'))) {
            
            for(let i = 0; i < matrix.length; i++){
                if(matrix[i] === 1) {
                    item = 1;
                }
            }
            box1text = true;
        }
    }

    // for box2
    if(box2text === false) {
        if(((scores.box0 === 'B' && scores.box1 === 'B') || (scores.box5 === 'B' && scores.box8 === 'B') || (scores.box4 === 'B' && scores.box6 === 'B')) || ((scores.box0 === 'M' && scores.box1 === 'M') || (scores.box5 === 'M' && scores.box8 === 'M') || (scores.box4 === 'M' && scores.box6 === 'M'))) {
            
            for(let i = 0; i < matrix.length; i++){
                if(matrix[i] === 2) {
                    item = 2;
                }
            }
            box2text = true;
        }
    }

    // for box3
    if(box3text === false) {
        if(((scores.box0 === 'B' && scores.box6 === 'B') || (scores.box4 === 'B' && scores.box5 === 'B')) || ((scores.box0 === 'M' && scores.box6 === 'M') || (scores.box4 === 'M' && scores.box5 === 'M'))) {
            
            for(let i = 0; i < matrix.length; i++){
                if(matrix[i] === 3) {
                    item = 3;
                }
            }
            box3text = true;
        }
    }

    // for box4
    if(box4text === false) {
        if(((scores.box0 === 'B' && scores.box8 === 'B') || (scores.box2 === 'B' && scores.box6 === 'B') || (scores.box3 === 'B' && scores.box5 === 'B') || (scores.box1 === 'B' && scores.box7 === 'B')) || ((scores.box0 === 'M' && scores.box8 === 'M') || (scores.box2 === 'M' && scores.box6 === 'M') || (scores.box3 === 'M' && scores.box5 === 'M') || (scores.box1 === 'M' && scores.box7 === 'M'))) {
            
            for(let i = 0; i < matrix.length; i++){
                if(matrix[i] === 4) {
                    item = 4;
                }
            }
            box4text = true;
        }
    }

    // for box5
    if(box5text === false) {
        if(((scores.box2 === 'B' && scores.box8 === 'B') || (scores.box3 === 'B' && scores.box4 === 'B')) || ((scores.box2 === 'M' && scores.box8 === 'M') || (scores.box3 === 'M' && scores.box4 === 'M'))) {
            
            for(let i = 0; i < matrix.length; i++){
                if(matrix[i] === 5) {
                    item = 5;
                }
            }
            box5text = true;
        }
    }

    // for box6
    if(box6text === false) {
        if(((scores.box0 === 'B' && scores.box3 === 'B') || (scores.box4 === 'B' && scores.box2 === 'B') || (scores.box7 === 'B' && scores.box8 === 'B')) || ((scores.box0 === 'M' && scores.box3 === 'M') || (scores.box4 === 'M' && scores.box2 === 'M') || (scores.box7 === 'M' && scores.box8 === 'M'))) {
            
            for(let i = 0; i < matrix.length; i++){
                if(matrix[i] === 6) {
                    item = 6;
                }
            }
            box6text = true;
        }
    }

    // for box7
    if(box7text === false) {
        if(((scores.box1 === 'B' && scores.box4 === 'B') || (scores.box6 === 'B' && scores.box8 === 'B')) || ((scores.box1 === 'M' && scores.box4 === 'M') || (scores.box6 === 'M' && scores.box8 === 'M'))) {
            
            for(let i = 0; i < matrix.length; i++){
                if(matrix[i] === 7) {
                    item = 7;
                }
            }
            box7text = true;
        }
    }

    // for box8
    if(box8text === false) {
        if(((scores.box0 === 'B' && scores.box4 === 'B') || (scores.box2 === 'B' && scores.box5 === 'B') || (scores.box6 === 'B' && scores.box7 === 'B')) || ((scores.box0 === 'M' && scores.box4 === 'M') || (scores.box2 === 'M' && scores.box5 === 'M') || (scores.box6 === 'M' && scores.box7 === 'M'))) {
            
            for(let i = 0; i < matrix.length; i++){
                if(matrix[i] === 8) {
                    item = 8;
                }
            }
            box8text = true;
        }
    }


    boxs[item].textContent =`${botChoice}`
    for(let i = 0; i < matrix.length; i++){
        if(matrix[i] === item){
            if(botChoice !== '') {
                matrix.splice(i,1);
            }
        }
    }
    updateScore(botSymb, item);
    result()
    win.textContent = winScore;
    loss.textContent = lossScore;
    draw.textContent = drawScore;
    // console.log(matrix);
    // console.log(scores);
}

function updateScore(symb, index) {
    for(let i = 0; i < 9; i++) {
        if(index === i) {
            if(myChoice !== '' && botChoice !== '') {
                scores[`box${index}`] = symb;
            }
        }
    }
}

function result() {

    // rows
    if(scores.box0 === 'M' && scores.box1 === 'M' && scores.box2 === 'M') {
        res.innerHTML = `<h1>You Won</h1>`;
        res.style.fontSize = `24px`;
        res.style.color = `rgb(46, 179, 46)`;
        boxs.forEach(function(box, index){
            if(index === 0 || index === 1 || index === 2) {
                box.style.fontSize = '90px';
            }
        })
        winScore++;
        winnerDecided = true;
        winner = 'me'
        return winner;

    } else if(scores.box0 === 'B' && scores.box1 === 'B' && scores.box2 === 'B') {
        res.innerHTML = `<h1>You Lost</h1>`;
        res.style.fontSize = `24px`;
        res.style.color = `rgb(247, 62, 62)`;
        boxs.forEach(function(box, index){
            if(index === 0 || index === 1 || index === 2) {
                box.style.fontSize = '90px';
            }
        })
        lossScore++;
        winnerDecided = true;
        return;

    }
    if(scores.box3 === 'M' && scores.box4 === 'M' && scores.box5 === 'M') {
        res.innerHTML = `<h1>You Won</h1>`;
        res.style.fontSize = `24px`;
        res.style.color = `rgb(46, 179, 46)`;
        boxs.forEach(function(box, index){
            if(index === 3 || index === 4 || index === 5) {
                box.style.fontSize = '90px';
            }
        })
        winScore++;
        winnerDecided = true;
        winner = 'me'
        return winner;

    } else if(scores.box3 === 'B' && scores.box4 === 'B' && scores.box5 === 'B') {
        res.innerHTML = `<h1>You Lost</h1>`;
        res.style.fontSize = `24px`;
        res.style.color = `rgb(247, 62, 62)`;
        boxs.forEach(function(box, index){
            if(index === 3 || index === 4 || index === 5) {
                box.style.fontSize = '90px';
            }
        })
        lossScore++;
        winnerDecided = true;
        return;
        
    }
    if(scores.box6 === 'M' && scores.box7 === 'M' && scores.box8 === 'M') {
        res.innerHTML = `<h1>You Won</h1>`;
        res.style.fontSize = `24px`;
        res.style.color = `rgb(46, 179, 46)`;
        boxs.forEach(function(box, index){
            if(index === 6 || index === 7 || index === 8) {
                box.style.fontSize = '90px';
            }
        })
        winScore++;
        winnerDecided = true;
        winner = 'me'
        return winner;

    } else if(scores.box6 === 'B' && scores.box7 === 'B' && scores.box8 === 'B') {
        res.innerHTML = `<h1>You Lost</h1>`;
        res.style.fontSize = `24px`;
        res.style.color = `rgb(247, 62, 62)`;
        boxs.forEach(function(box, index){
            if(index === 6 || index === 7 || index === 8) {
                box.style.fontSize = '90px';
            }
        })
        lossScore++;
        winnerDecided = true;
        return;
        
    }

    // coloumns
    if(scores.box0 === 'M' && scores.box3 === 'M' && scores.box6 === 'M') {
        res.innerHTML = `<h1>You Won</h1>`;
        res.style.fontSize = `24px`;
        res.style.color = `rgb(46, 179, 46)`;
        boxs.forEach(function(box, index){
            if(index === 0 || index === 3 || index === 6) {
                box.style.fontSize = '90px';
            }
        })
        winScore++;
        winnerDecided = true;
        winner = 'me'
        return winner;

    } else if(scores.box0 === 'B' && scores.box3 === 'B' && scores.box6 === 'B') {
        res.innerHTML = `<h1>You Lost</h1>`;
        res.style.fontSize = `24px`;
        res.style.color = `rgb(247, 62, 62)`;
        boxs.forEach(function(box, index){
            if(index === 0 || index === 3 || index === 6) {
                box.style.fontSize = '90px';
            }
        })
        lossScore++;
        winnerDecided = true;
        return;
        
    }
    if(scores.box1 === 'M' && scores.box4 === 'M' && scores.box7 === 'M') {
        res.innerHTML = `<h1>You Won</h1>`;
        res.style.fontSize = `24px`;
        res.style.color = `rgb(46, 179, 46)`;
        boxs.forEach(function(box, index){
            if(index === 1 || index === 4 || index === 7) {
                box.style.fontSize = '90px';
            }
        })
        winScore++;
        winnerDecided = true;
        winner = 'me'
        return winner;

    } else if(scores.box1 === 'B' && scores.box4 === 'B' && scores.box7 === 'B') {
        res.innerHTML = `<h1>You Lost</h1>`;
        res.style.fontSize = `24px`;
        res.style.color = `rgb(247, 62, 62)`;
        boxs.forEach(function(box, index){
            if(index === 1 || index === 4 || index === 7) {
                box.style.fontSize = '90px';
            }
        })
        lossScore++;
        winnerDecided = true;
        return;
        
    }
    if(scores.box2 === 'M' && scores.box5 === 'M' && scores.box8 === 'M') {
        res.innerHTML = `<h1>You Won</h1>`;
        res.style.fontSize = `24px`;
        res.style.color = `rgb(46, 179, 46)`;
        boxs.forEach(function(box, index){
            if(index === 2 || index === 5 || index === 8) {
                box.style.fontSize = '90px';
            }
        })
        winScore++;
        winnerDecided = true;
        winner = 'me'
        return winner;

    } else if(scores.box2 === 'B' && scores.box5 === 'B' && scores.box8 === 'B') {
        res.innerHTML = `<h1>You Lost</h1>`;
        res.style.fontSize = `24px`;
        res.style.color = `rgb(247, 62, 62)`;
        boxs.forEach(function(box, index){
            if(index === 2 || index === 5 || index === 8) {
                box.style.fontSize = '90px';
            }
        })
        lossScore++;
        winnerDecided = true;
        return;
        
    }

    // diagonals
    if(scores.box0 === 'M' && scores.box4 === 'M' && scores.box8 === 'M') {
        res.innerHTML = `<h1>You Won</h1>`;
        res.style.fontSize = `24px`;
        res.style.color = `rgb(46, 179, 46)`;
        boxs.forEach(function(box, index){
            if(index === 0 || index === 4 || index === 8) {
                box.style.fontSize = '90px';
            }
        })
        winScore++;
        winnerDecided = true;
        winner = 'me'
        return winner;

    } else if(scores.box0 === 'B' && scores.box4 === 'B' && scores.box8 === 'B') {
        res.innerHTML = `<h1>You Lost</h1>`;
        res.style.fontSize = `24px`;
        res.style.color = `rgb(247, 62, 62)`;
        boxs.forEach(function(box, index){
            if(index === 0 || index === 4 || index === 8) {
                box.style.fontSize = '90px';
            }
        })
        lossScore++;
        winnerDecided = true;
        return;
        
    }
    if(scores.box2 === 'M' && scores.box4 === 'M' && scores.box6 === 'M') {
        res.innerHTML = `<h1>You Won</h1>`;
        res.style.fontSize = `24px`;
        res.style.color = `rgb(46, 179, 46)`;
        boxs.forEach(function(box, index){
            if(index === 2 || index === 4 || index === 6) {
                box.style.fontSize = '90px';
            }
        })
        winScore++;
        winnerDecided = true;
        winner = 'me'
        return winner;

    } else if(scores.box2 === 'B' && scores.box4 === 'B' && scores.box6 === 'B') {
        res.innerHTML = `<h1>You Lost</h1>`;
        res.style.fontSize = `24px`;
        res.style.color = `rgb(247, 62, 62)`;
        boxs.forEach(function(box, index){
            if(index === 2 || index === 4 || index === 6) {
                box.style.fontSize = '90px';
            }
        })
        lossScore++;
        winnerDecided = true;
        return;
        
    }

    if(matrix.length === 0) {
        res.innerHTML = `<h1>Draw</h1>`;
        res.style.fontSize = `24px`;
        drawScore++;
    }

}



