
const allAnswers = document.querySelectorAll('.answers>div');

const submitBtn = document.querySelector('.submitBtn');
const question__h1 = document.querySelector('.question h1');
const modalBackLayer = document.querySelector('.modalBackLayer');
const scoreText = document.querySelector('.scoreText');
const closeModalBtn = document.querySelector('.closeModalBtn');

// const answer1__input = document.querySelector('.answer1 input');
// const answer2__input = document.querySelector('.answer2 input');
// const answer3__input = document.querySelector('.answer3 input');
// const answer4__input = document.querySelector('.answer4 input');

// const answer1__span = document.querySelector('.answer1 span');
// const answer2__span = document.querySelector('.answer2 span');
// const answer3__span = document.querySelector('.answer3 span');
// const answer4__span = document.querySelector('.answer4 span');

let pageNum = 0;
let userScore = 0;

let officialAnswers = ['Java', '문재인', '시에라리온', '크리스토퍼 놀란']
let userAnswers = [];

submitBtn.addEventListener('click', (event) => {
    const allAnswers__input = document.querySelectorAll('.answers input');
    allAnswers__input.forEach((e) => { // 멍청아.. allAnswers를 문서 첨부터 설정하니까 다 적용안된 상태에서 시작했지..
        if(e.checked){
        userAnswers.push(e.value);
        scoring();
        e.checked = false;
        }
    })

    fetchPage()
    pageNum += 1;
    showScore();
})

closeModalBtn.addEventListener('click', () => {
    modalBackLayer.style.display = 'none';
    pageNum = 0;
    userScore = 0;
    userAnswers = [];
    fetchPage();
})

function scoring(){
        if(userAnswers[pageNum] === officialAnswers[pageNum]){
            userScore += 1;
        }
}

function showScore(){
    if(pageNum === officialAnswers.length){
        modalBackLayer.style.display = 'block';
        scoreText.innerText = `${userScore} / ${officialAnswers.length}`
    }
}

function fetchPage(){
fetch('data.json')
.then((response) => response.json())
.then((myData) => {
    let temp = ["answer1", "answer2", "answer3", "answer4"]

    if(pageNum < officialAnswers.length){
    question__h1.innerHTML = myData.data[pageNum]["question"];
        
        for(let i = 0; i < temp.length; i ++){
        allAnswers[i].innerHTML = `
        <input class="myInput" type="radio" name="answer" 
        value="${myData.data[pageNum][temp[i]]}">
        <span>${myData.data[pageNum][temp[i]]}</span></div>
        `
        }
    }
    if(pageNum === officialAnswers.length){
        console.log('end');
    }
    
    }
)
}

    // answer1__span.innerText = myData.data[pageNum]["answer1"];
    // answer1__input.value= myData.data[pageNum]["answer1"];
    // answer2__span.innerText = myData.data[pageNum]["answer2"];
    // answer2__input.value= myData.data[pageNum]["answer2"];
    // answer3__span.innerText = myData.data[pageNum]["answer3"];
    // answer3__input.value= myData.data[pageNum]["answer3"];
    // answer4__span.innerText = myData.data[pageNum]["answer4"];
    // answer4__input.value= myData.data[pageNum]["answer4"];
    // 이렇게 일일이 해주는 것에서...
    // 윗 내용처럼, for문을 이용한 방식으로 리팩토링하였다.
    // 일일이 해주기로 생각했던 출발점은, 뒤의 ['answer1'],['answer2'],['answer3'] 등의 string을 for 문에 어떻게 삽입할까 문제였는데
    // 처음에는 answer'1'처럼 뒤의 숫자만 let i = 1 을 이용해 적용시키려고했다. 하지만 되지 않았다.
    // 이후 고민해본결과, 새로운 배열에 'answer1' 'answer2'.. 등의 string을 넣고 index로 꺼내오면 되겠다고 생각했고,
    // 위와같이 성공시킬 수 있었다.



fetchPage();


// 배운것 1) fetch는 비동기니까, 그 연산 순서에 유의하자. (fetch가 완료되기 전에 그 바로 아랫줄 연산이 먼저 완료될 수도 있음)
// 배운것 2) radio, checkbox 등의 input type에서, check 여부를 확인하려면, input.checked를하자. 그럼 boolean값 나옴.