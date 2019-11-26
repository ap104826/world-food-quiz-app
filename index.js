/* when a user clicks on start quiz button */
 $('#start').on('click', function(event){
    startQuiz();
});
function startQuiz() {
  //get the first question from store.js
  let firstQuestion = STORE.questions[STORE.currentQuestion]
  renderAQuestion(firstQuestion);
}

function advanceNext(){
  //if on the last question go to the restart screen
  if(STORE.currentQuestion + 1 === STORE.questions.length){
    //produce html for the Restart screen
    let restartHtml = `<section>
        <h3>Score: ${STORE.score}/10</h3>
        <button class="restartButton">Restart Quiz</button>
      </section>` 
    //remove the question section
    $('section').remove()
    //insert the restart html section
    $('main').append(restartHtml)
    //follow the same pattern as the next link and attach a click handler to the restart quiz button 
    $('.restartButton').on('click', function(event){
      //reset the current question and the score
      STORE.currentQuestion = 0
      STORE.score = 0
      //when clicked it should call the start quiz function
      startQuiz();
    })
    
    
    //else go to the next question
  } else { 
    //from currectquestion add 1 
    STORE.currentQuestion++
    //then get the next question from the store
    let nextquestion = STORE.questions[STORE.currentQuestion]
    //then call renderaquestion function with the next question
    renderAQuestion(nextquestion);
  }
}

function renderAQuestion(question){
  //produce html from the first question
  let questionHtml = `<section>
        <h3>Question Number: ${STORE.currentQuestion + 1}/10</h3>
        <h3>Score: ${STORE.score}/10</h3>
        <form id="questionForm">
          <p> ${question.question} </p>
          
          <input type="radio" id="option1" class="options" value="${question.options[0]}" name="question">
          <label for="option1">${question.options[0]}</label><br/>

          <input type="radio" id="option2" value="${question.options[1]}" name="question">
          <label for="option2">${question.options[1]}</label><br/>
          
          <input type="radio" id="option3" value="${question.options[2]}" name="question">
          <label for="option3">${question.options[2]}</label><br/>
          
          <input type="radio" id="option4" value="${question.options[3]}" name="question">
          <label for="option4">${question.options[3]}</label><br/>

          <input type="submit" class ="submit" value="submit">
        
         
        </form>
        
      </section>`
  //checks whether the chosen option is right or wrong and displays message. 
  //remove the start quiz html
  $('section').remove()

  //insert the html from the first question
  $('main').append(questionHtml)

  //handle form submit
  $("#questionForm").submit(function( event){
    //read the option that user checked
    let answer = $("input[name=question]:checked").val()
    //get the correct answer for the question from the store
    let correctAnswer = question.answer;
    //compare the correct answer with the answer the user gave
    //if they gave the right answer,advance them to the next question
    if(answer===correctAnswer){
      //update the score
      STORE.score++
      let correctAnswerhtml= `<div>
      <p> Good job! you got it right!</p>
      </div>`
      $('section').append(correctAnswerhtml);
      advanceNext()
      
    } else{
      //if they have the wrong answer, show them the correct answer and disable the options. 
      let wrongAnswerhtml =  `<div class="wrongAnswerMessage">
          <p>Oh no, thats wrong!</p>
          <p>The correct answer is: ${correctAnswer} </p>
        </div>`
      $('section').append(wrongAnswerhtml);

    //disable the submit button
    //show the next link
      $('input').attr('disabled',true);
      let nextbuttonhtml = ` <a href="#" class="next">Next &raquo;</a>`
      $('form').append(nextbuttonhtml);
      //find the next link by class and attach a click handler
      $('.next').on('click', function(event){
        advanceNext();
      })
    }  
    event.preventDefault();
    //
  })
//
}


