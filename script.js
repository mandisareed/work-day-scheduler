$(document).ready(function () { 

  var textArea = $("#textarea-a");
  var textAreaOutput = $("text-output");

  var todos = [];


  //Implement a function to display the current day, date, and time that updates every second
  var now = $("#currentDay");
  setInterval(function () {
    now.text(moment().format("LL H:mm:ss"));
  }, 1000);//end setInterval

  // create a function to read and retrieve tasks from local storage when the page first loads
  function readLocalStorage() {
    var storedTasksString = localStorage.getItem("StoredTasks");
    var storedTasks = [
        {"task": ""}, {"task": ""}, {"task": ""}, {"task": ""}, {"task": ""},
        {"task": ""}, {"task": ""}, {"task": ""}, {"task": ""}
    ];
    //if there is something in local storage, parse the string of text into an object
    if (storedTasksString !== null) {
      storedTasks = JSON.parse(storedTasksString);
    }
    return storedTasks;
  }//end readLocalStorage() fct def

function displayResults(){
 //invoke function to read what's in storage when the page loads
 var storedTasks = readLocalStorage();
    ///create a for loop to loop through the array of stored user inputs for each time block
  for (var i = 0; i < storedTasks.length; i++) {
    var storedTask = storedTasks[i];
    $("textarea")[i].value = storedTask.task;
    var hour = i + 9;
    var hourStart = moment().set({"hour":hour,"minute":0,"second":0,"millisecond": 0});
    if (hourStart.isAfter(moment())) {
    $("textarea")[i].style.backgroundColor = "red";
}

  }
}//end displayResults() fct def

  //invoke function to display what's in Local Storage
  displayResults();
  
  //When the save button is clicked, create an element in which the text in the input area will be contained
  $(".saveBtn").on("click", function (event) {
    event.preventDefault();

    var btnIndex = event.target.id
    console.log("SAVED 2 9am!");
    //read value of text input
    var userInput = $("textarea")[btnIndex].value;
    console.log("New Submission: \n", userInput);

    //save input to local storage
    var storedTasks = readLocalStorage();
    var newTask = {"task": userInput};
    storedTasks[btnIndex] = newTask;
    
    localStorage.setItem("StoredTasks", JSON.stringify(storedTasks));
    displayResults();
  });
 
}); //end ready fct declaration

 
