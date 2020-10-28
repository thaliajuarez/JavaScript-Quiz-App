// From HTML document - document object 
// reserved word used: const
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

// let - so they can re-defined later
let shuffledQuestions, currentQuestionIndex
// For score counter:
let countRightAnswers = 0;

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  // For score counter:
   countRightAnswers = 0; // to reset the counter after the test started
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }

  // For score counter:
  if (selectedButton.dataset = correct) {
    countRightAnswers++; // +1, change it if you need +10, +25 etc
  }
  document.getElementById('right-answers').innerHTML = countRightAnswers; // span will show the score
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Are JavaScript arrays heterogenous or homogenous?',
    answers: [
      { text: 'heterogenous', correct: true },
      { text: 'homogenous', correct: false }
    ]
  },
  {
    question: 'Does JavaScript use static or dynamic scoping?',
    answers: [
      { text: 'Static scoping', correct: true },
      { text: 'Dynamic scoping', correct: false },
    ]
  },
  {
    question: 'How do you create a function in JavaScript?',
    answers: [
      { text: 'function:myFunction()', correct: false },
      { text: 'function myFunction()', correct: true },
      { text: 'function=myFunction()', correct: false },
      { text: 'myFunction():function', correct: false }
    ]
  },
  {
    question: 'How do you comment in JavaScript?',
    answers: [
      { text: '//', correct: true },
      { text: '/* */', correct: true },
      { text: '##', correct: false },
      { text: '**', correct: false },
    ]
  }
]