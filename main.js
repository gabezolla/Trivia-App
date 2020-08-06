const startButton = document.querySelector('#start-btn');
const box = document.querySelector('.box');
const title = document.querySelector('.title');
const questionContainer = document.querySelector('#question-container');
const questionPhrase = document.querySelector('#question');
const nextButton = document.querySelector('#next-btn');
let numbers = [1, 2, 3, 4];
let index = 0;
var sum = 0;
var isRight = false;

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
            isRight = false;
            question.innerHTML = ' ' + out.results[index].question;
            let answer1 = document.querySelector(`.answer${randomNumber[0]}`);
            answer1.innerHTML = ' ' + out.results[index].incorrect_answers[0];
            let answer2 = document.querySelector(`.answer${randomNumber[1]}`);
            answer2.innerHTML = ' ' + out.results[index].incorrect_answers[1];
            let answer3 = document.querySelector(`.answer${randomNumber[2]}`);
            answer3.innerHTML = ' ' + out.results[index].correct_answer;
            let answer4 = document.querySelector(`.answer${randomNumber[3]}`);
            answer4.innerHTML = ' ' + out.results[index].incorrect_answers[2];

            document.addEventListener('click', function clickButton(e) {
                if (e.target == answer1 || e.target == answer2 || e.target == answer4) {
                    e.target.style.backgroundColor = 'red';
                    document.querySelector(`.answer${randomNumber[2]}`).style.backgroundColor = 'green';
                    nextButton.classList.remove('next-hide');
                }

                else if (e.target == answer3) {
                    isRight = true;
                    document.querySelector(`.answer${randomNumber[2]}`).style.backgroundColor = 'green';
                    nextButton.classList.remove('next-hide');
                }
            });
        }

        document.addEventListener('click', e => {
             // somar o index quando passar pra próxima questão!
            if (e.target == nextButton) {                
                if(isRight == true) sum++;
                index++;
                randomNumber = shuffle(numbers);
                document.querySelector(`.answer${randomNumber[0]}`).style.backgroundColor = '#2d95eb';
                document.querySelector(`.answer${randomNumber[1]}`).style.backgroundColor = '#2d95eb';
                document.querySelector(`.answer${randomNumber[2]}`).style.backgroundColor = '#2d95eb';
                document.querySelector(`.answer${randomNumber[3]}`).style.backgroundColor = '#2d95eb';
                newQuestion();
                nextButton.classList.add('next-hide');
                console.log(sum);
                console.log(index);
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

// ADICIONAR OUTROS TEMAS DE JOGO
// ADICIONAR UM FINAL SCORE
// ADICIONAR API COM MAIS PERGUNTAS



