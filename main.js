const startButton = document.querySelector('#start-btn');
const box = document.querySelector('.box');
const title = document.querySelector('.title');
const questionContainer = document.querySelector('#question-container');
const questionPhrase = document.querySelector('#question');
const nextButton = document.querySelector('#next-btn');
let numbers = [1, 2, 3, 4];
let index = 0;
var sum = 0;
let isRight = false;

function shuffle(o) {
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

var randomNumber = shuffle(numbers); // tem que dar esse shuffle toda a vez que passar pra prox questão (função nova)

fetch('https://opentdb.com/api.php?amount=10&category=11&type=multiple') // para ter múltiplos temas, podemos armazenar link numa variavel e usar template string.
    .then(res => res.json())
    .then((out) => {

        newQuestion();
        function newQuestion() {

            question.innerHTML = ' ' + out.results[index].question;
            let answer1 = document.querySelector(`.answer${randomNumber[0]}`);
            answer1.innerHTML = ' ' + out.results[index].incorrect_answers[0];
            let answer2 = document.querySelector(`.answer${randomNumber[1]}`);
            answer2.innerHTML = ' ' + out.results[index].incorrect_answers[1];
            let answer3 = document.querySelector(`.answer${randomNumber[2]}`);
            answer3.innerHTML = ' ' + out.results[index].correct_answer;
            let answer4 = document.querySelector(`.answer${randomNumber[3]}`);
            answer4.innerHTML = ' ' + out.results[index].incorrect_answers[2];
            console.log(answer3);

            document.addEventListener('click', function clickButton(e) {
                if (e.target == answer1 || e.target == answer2 || e.target == answer4) {
                    answer1.disabled = true;
                    answer2.disabled = true;
                    answer3.disabled = true;
                    answer4.disabled = true;
                    isRight = false;
                    e.target.style.backgroundColor = 'red';
                    document.querySelector(`.answer${randomNumber[2]}`).style.backgroundColor = 'green';
                    nextButton.classList.remove('next-hide');
                    return;
                }

                else if (e.target == answer3) {
                    answer1.disabled = true;
                    answer2.disabled = true;
                    answer3.disabled = true;
                    answer4.disabled = true;
                    isRight = true;
                    document.querySelector(`.answer${randomNumber[2]}`).style.backgroundColor = 'green';
                    nextButton.classList.remove('next-hide');
                    return;
                }

                answer1.disabled = false;
                answer2.disabled = false;
                answer3.disabled = false;
                answer4.disabled = false;
                return;
            });
        }

        document.addEventListener('click', e => {
            if (e.target == nextButton) {
                if (isRight == true) sum++;
                index++; // somar o index quando passar pra próxima questão!
                console.log(sum);
                randomNumber = shuffle(numbers);
                document.querySelector(`.answer${randomNumber[0]}`).style.backgroundColor = '#2d95eb';
                document.querySelector(`.answer${randomNumber[1]}`).style.backgroundColor = '#2d95eb';
                document.querySelector(`.answer${randomNumber[2]}`).style.backgroundColor = '#2d95eb';
                document.querySelector(`.answer${randomNumber[3]}`).style.backgroundColor = '#2d95eb';
                nextButton.classList.add('next-hide');
                console.log(index);

                if(index<=9) {
                    newQuestion();
                } else {
                    const totalSum = sum;
                    restartGame(totalSum);
                }
            };
        })


    }).catch(err => console.error(err));

startButton.addEventListener('click', startGame);

function startGame() {
    box.classList.add('hide');
    title.classList.add('hide');
    questionContainer.classList.remove('hide');
    nextButton.classList.remove('hide');
}

function homeScreen() {
    sum = 0;
    index = 0;
    box.classList.remove('hide');
    title.classList.remove('hide');
}

function restartGame(sum){
    score = document.querySelector('.restart.hide');
    score.classList.remove('hide');
    score.innerHTML = 'Total score: ' + sum;
    restartButton = document.createElement('button');
    restartButton.classList.add('btn');
    restartButton.classList.add('restart-btn');
    restartButton.innerHTML = 'Restart';
    score.appendChild(restartButton);
    questionContainer.classList.add('hide');
    nextButton.classList.add('hide');
    
    document.addEventListener('click', e => {
        if(e.target == restartButton) {
            score.removeChild(restartButton);
            score.classList.add('hide');
            homeScreen();
        }
    })
    
}

// ADICIONAR OUTROS TEMAS DE JOGO
// ADICIONAR API COM MAIS PERGUNTAS (colocar template string no link da API)



