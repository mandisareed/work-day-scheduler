$(document).ready(function () {

  var textArea = $("#textarea-a");
  var textAreaOutput = $("text-output");

  var todos = [];

  var submittedTask = {
    task:"" //userInput
  };

  var storedTasks = [];
  storedTasks.push(submittedTask);

  var submittedTask = JSON.stringify(storedTasks);
  localStorage.setItem("StoredTasks", storedTasks);

  //Implement a function to display the current day, date, and time that updates every second
  var now = $("#currentDay");
  setInterval(function () {
    now.text(moment().format("LL h:mm:ss"));
  }, 1000);//end setInterval

  //invoke function to read what's in storage when the page loads
  readLocalStorage();

  // create a function to read and retrieve tasks from local storage when the page first loads
  function readLocalStorage() {
    var storedTasksString = localStorage.getItem("StoredTasks");
    var storedTasks = [];
    //if there is something in local storage, parse the string of text into an object
    if (storedTasksString !== null) {
      storedTasks = JSON.parse(storedTasksString);
    }
  }//end readLocalStorage() fct def


  //When the save button is clicked, create an element in which the text in the input area will be contained
  $(".saveBtn").on("click", function (event) {
    event.preventDefault();

    console.log("SAVED 2 9am!");
    //read value of text input
    var userInput = $("#textarea-a").val();
    console.log("New Submission: \n", userInput);

    //append userInput to #text-output
    $("#text-output").append(userInput);

  });


function displayResults(){
  for (var i = 0; i < storedTasks.length; i++) {
    var storedTask = storedTasks[i];
    var listEl = $("<li>");
    listEl.text(storedTask.task);
    todoInput.append(listEl);
  }
}//end displayResults() fct def
 
}); //end ready fct declaration
