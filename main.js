const controls_btns = 

document.querySelectorAll('.controls_btn_wrapper button')

const counter_wrapper = 

document.querySelector('.counter_wrapper')

const scoreInner =

document.querySelectorAll('.scoreInner span')

const game_feedback = 

document.querySelector('.game_feedback span')

const cards =

Array.from(document.querySelectorAll('.game_container .card')

)

let firstValue = "";

let secondValue = "";

let firstCard;

let secondCard;

let Timer;

let shuffleCardsCount = 3

let mouveCount = 5

let matchesInRow  = 0

let totalSeconds = Math.floor(359); // Total seconds = 5 * 60 + 59

const minutes = document.getElementById("minutes");

const seconds = document.getElementById("seconds");

  

  

let score = localStorage.getItem('score',Number(0))

let hightScore = localStorage.getItem('hightScore') || 0;

setInterval(()=>{

  if (score > hightScore) {

  localStorage.setItem('hightScore',Number(score));

  hightScore = score;

}

},1000)

function checkScore()

{

  if (score) {

    scoreInner[1].innerHTML = `Score : ${score}`

  } else {

   scoreInner[1].innerHTML = `Score : 0`

  }

if (hightScore) {

  scoreInner[0].innerHTML = `HI : ${hightScore}`

} else {

    scoreInner[0].innerHTML = `HI : 0`

}

}

checkScore()

function disabledCards()

{

  cards.forEach(card =>{

    card.classList.add('disabled')

  })

}

disabledCards()

function checkWin() {

  if (matchedCards.length === cards.length) {

    game_feedback.textContent = 'You Win!';

    clearInterval(Timer);

    controls_btns[4].disabled = false;

    shuffleCards();

  }

}

 let matchedCards = [];

let clickLock = false;

cards.forEach(card => {

  card.addEventListener("click", function() {

    

    

    if (clickLock) {

      return;

    }

    clickLock = true;

     

    if (firstValue === "") {

      firstValue = this.getAttribute('data-card');

      firstCard = this;

      firstCard.classList.add('clicked');

      if (firstCard.classList.contains('clicked')) {

       firstCard.classList.add('disabled')

        }

    } else if (matchedCards.includes(firstCard) || matchedCards.includes(this)) {

      // if the first card or current card has already been matched, do nothing

    } else {

      secondValue = this.getAttribute('data-card');

      secondCard = this;

      secondCard.classList.add('clicked');

      

      

      if (firstValue === secondValue) {

           score += 5

        mouveCount++

      scoreInner[1].innerHTML = `Score : ${score}`

      matchedCards.push(firstCard, secondCard);

        localStorage.setItem('score', Number(score));

        matchesInRow++

        if (matchesInRow == 2) {

          score+=20

        game_feedback.innerHTML = '2 in a row, score +20'

        

        scoreInner[1].innerHTML = `Score : ${score}`

      localStorage.setItem('score', Number(score));

        }else if (matchesInRow == 3){

             score+=30

          game_feedback.innerHTML = '3 in a row, score +30'

          

       scoreInner[1].innerHTML = `Score : ${score}`

   localStorage.setItem('score', Number(score));

        }else if (matchesInRow == 5){

           score+=50

          game_feedback.innerHTML = '5 in a row, score +50'

         scoreInner[1].innerHTML = `Score : ${score}`

    localStorage.setItem('score', Number(score));

          matchesInRow = 0

        }

        setTimeout(() => {

          firstCard.classList.add('match');

          secondCard.classList.add('match');

          checkWin()

        },300);

      controls_btns[3].setAttribute('data-count', mouveCount)

      } else {

           mouveCount--

           if (score > 0) {

               score -= 5

             }else 

             {

               score = 0

             }

      scoreInner[1].innerHTML = `Score : ${score}`

          matchesInRow =0 

        

        setTimeout(()=>{

          firstCard.classList.remove('clicked');

          secondCard.classList.remove('clicked');

         

        // checkScore()

     localStorage.setItem('score', Number(score));

        },400);

        

       firstCard.classList.remove('disabled')

        controls_btns[3].setAttribute('data-count', mouveCount)

        if (mouveCount == 0) {

          game_feedback.textContent = 'Out of moves, try again'

          score = 0

        scoreInner[1].innerHTML = `Score : ${score}`

          localStorage.setItem("score", Number(0));

          //checkScore();

          disabledCards();

          clearInterval(Timer);

          controls_btns[1].disabled = true;

          controls_btns[4].disabled = false;

        }

      }

      firstValue = '';

      secondValue = '';

    }

    setTimeout(() => {

      clickLock = false;

    }, 500);

  });

});

function shuffleCards() {

  cards.forEach(card => {

    let randomPos = Math.floor(Math.random() * cards.length);

    card.style.order = randomPos;

  });

}

shuffleCards();

function startTimer()

{

  

  Timer = setInterval(()=>{

    

    if (totalSeconds > 0) {

  if (seconds.innerHTML == 0) {

    minutes.innerHTML = minutes.innerHTML  - 1;

    seconds.innerHTML = 59;

  } else {

    seconds.innerHTML = seconds.innerHTML - 1;

  }

  totalSeconds--;

} else {

  clearInterval(Timer)

  game_feedback.textContent = 'Time\'s over,try again'

    controls_btns[4].disabled = false

    controls_btns[1].disabled = true

    score = 0

    scoreInner[1].innerHTML = `Score : ${score}`

    localStorage.setItem("score", Number(0));

    checkScore()

}

  },100)

  

  

  

//checkScore()

// Timer = setInterval(()=>{

//     secondes--

//     if (secondes == 0) {

//       minutes--

//       secondes = 59

//     }if(minutes == 0){

//       secondes = 59

//       secondes--

//         minutes = 0

//     }

    

//     counter_wrapper.innerHTML = `

//     <span class="timer_icon material-symbols-outlined">

//       timer

//     </span>

//     <p>

//     ${minutes.toString().padStart(2,'0')} : ${secondes.toString().padStart(2,'0')}

//     </p>

//     `

//   },200)

}

controls_btns[0].addEventListener('click',function(){

  controls_btns[0].disabled = true

  controls_btns[1].disabled = false

  cards.forEach(card =>{

    card.classList.remove('disabled')

  })

  startTimer()

  //checkScore()

})

controls_btns[1].disabled = true

controls_btns[1].addEventListener('click',function(){

  controls_btns[1].disabled = false

   shuffleCards()

  shuffleCardsCount--

  controls_btns[1].setAttribute('data-count',shuffleCardsCount)

  if (shuffleCardsCount == 0) {

    game_feedback.textContent = 'Out of shuffle moves'

    controls_btns[1].disabled = true

    return ;

  }

})

controls_btns[2].addEventListener('click', ()=>{

  if (confirm('Delete your score and your hightscore')) {

    localStorage.removeItem('score')

    localStorage.removeItem('hightScore')

    window.location.reload(true);

    checkScore()

  } 

})

controls_btns[4].disabled = true

controls_btns[4].addEventListener('click',function(){

  window.location.reload(true);

})

