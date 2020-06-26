$(document).ready(function () {

  //Implement a function to display the current day, date, and time that updates every second
  var now = $("#currentDay");
  setInterval(function () {
    now.text(moment().format("LLLL"));
  }, 1000); 

  // create a function to read and retrieve tasks for each time block from local storage when the page first loads
  function readLocalStorage() {
    var storedTasksString = localStorage.getItem("StoredTasks");
    var storedTasks = [
      { task: "" },
      { task: "" },
      { task: "" },
      { task: "" },
      { task: "" },
      { task: "" },
      { task: "" },
      { task: "" },
      { task: "" },
    ];
    //if there is something in local storage, parse the string of text into an object
    if (storedTasksString !== null) {
      storedTasks = JSON.parse(storedTasksString);
    }
    return storedTasks;
  } //end readLocalStorage() fct def

  function displayResults() {
    //invoke function to read what's in storage when the page loads
    var storedTasks = readLocalStorage();
    ///create a for loop to loop through the array of stored user inputs for each time block
    for (var i = 0; i < storedTasks.length; i++) {
      var storedTask = storedTasks[i];
      $("textarea").eq(i).val(storedTask.task);
      //$("textarea")[i].value = storedTask.task;
      var hour = i + 9;
      var hourStart = moment().set({
        hour: hour,
        minute: 0,
        second: 0,
        millisecond: 0,
      });
      if (hour == moment().hour()) {
        $("textarea").eq( i ).css({"background-color": "green", "opacity": "0.5"});
      }
      else if (hourStart.isAfter(moment())) {
        $("textarea").eq( i ).css({"background-color": "red", "opacity": "0.5"});
      } else  {
        $("textarea").eq( i ).css({"background-color": "grey", "opacity": "0.5"});
      }
    }
  } //end displayResults() fct def

  //invoke function to display what's in Local Storage
  displayResults();

  //When the save button is clicked, create an element in which the text in the input area will be contained
  $(".saveBtn").on("click", function (event) {
    event.preventDefault();

    var btnIndex = event.target.id;
    //read value of text input
    var userInput = $("textarea").eq(btnIndex).val();

    //save input to local storage
    var storedTasks = readLocalStorage();
    var newTask = { task: userInput };
    storedTasks[btnIndex] = newTask;

    localStorage.setItem("StoredTasks", JSON.stringify(storedTasks));
    displayResults();
  });

  //i want to clear the storage at the end of each day (11:59:59)
  //WHEN time is 11:59:59, use localStorage.clear("StoredTasks", storedTasks)

  
}); //end ready fct declaration
