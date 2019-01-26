$(document).ready(function () {
    //initialize firebase
    var config = {
        apiKey: "AIzaSyAQmoQYURy5y4SvkVSwlsd54TeYUyETU84",
        authDomain: "trainscheduler-8946c.firebaseapp.com",
        databaseURL: "https://trainscheduler-8946c.firebaseio.com",
        projectId: "trainscheduler-8946c",
        storageBucket: "trainscheduler-8946c.appspot.com",
        messagingSenderId: "602135794729"
      };
      firebase.initializeApp(config);

      var database = firebase.database();


    //capturing Info ();
    $("#submit-button").on("click", function(event) {
        event.preventDefault();

        var trainName = $("#train-name").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrain = $("#first-train").val().trim();
        var frequency = $("#frequency").val().trim();

        var newTrainObj ={
            name : trainName,
            dest : destination,
            firstHour : firstTrain,
            freq : frequency
        };

        database.ref().push(newTrainObj);

        console.log(newTrainObj.name+ " | " + newTrainObj.dest+ " | " + newTrainObj.firstHour+ " | " + newTrainObj.freq);

        $("#train-name").val("");
        $("#destination").val("");
        $("#first-train").val("");
        $("#frequency").val("");

    });

    database.ref().on("child_added", function(rowAdded) {
        console.log(rowAdded.val());
        var nextArrivalTime = "function calcTime";
        var minutesAway = "nextArrivalTime - currentTime(mins)";

        var editIcon = $("<i>");
        editIcon.addClass("fa fa-pencil");
        editIcon.attr("aria-hidden", "true");

        var delIcon = $("<i>");
        delIcon.addClass("fa fa-trash");
        delIcon.attr("aria-hidden", "true");

        var rowEditVar = $("<tr>");
        rowEditVar.addClass("d-flex");

        var rowDisplayVar = $("<tr>");
        rowDisplayVar.addClass("d-flex");

        var trainEditVar = $("<td>");
        trainEditVar.addClass("col-2");
        trainEditVar.text(rowAdded.val().name);
        var trainDisplayVar = $("<td>");
        trainDisplayVar.addClass("col-3");
        trainDisplayVar.text(rowAdded.val().name);

        var destinationEditVar = $("<td>");
        destinationEditVar.addClass("col-2");
        destinationEditVar.text(rowAdded.val().dest);
        var destinationDisplayVar = $("<td>");
        destinationDisplayVar.addClass("col-3");
        destinationDisplayVar.text(rowAdded.val().dest);

        var frequencyEditVar = $("<td>");
        frequencyEditVar.addClass("col-2 text-center");
        frequencyEditVar.text(rowAdded.val().freq);
        var frequencyDisplayVar = $("<td>");
        frequencyDisplayVar.addClass("col-2 text-center");
        frequencyDisplayVar.text(rowAdded.val().freq);

        var nextArrivalEditVar = $("<td>");
        nextArrivalEditVar.addClass("col-2 text-center");
        nextArrivalEditVar.text(nextArrivalTime);
        var nextArrivalDisplayVar = $("<td>");
        nextArrivalDisplayVar.addClass("col-2 text-right");
        nextArrivalDisplayVar.text(nextArrivalTime);

        var minutesEditVar = $("<td>");
        minutesEditVar.addClass("col-2 text-center");
        minutesEditVar.text(minutesAway);
        var minutesDisplayVar = $("<td>");
        minutesDisplayVar.addClass("col-2 text-right");
        minutesDisplayVar.text(minutesAway);

        var editButtonVar = $("<td>");
        editButtonVar.addClass("col-1 text-center");
        editButtonVar.append(editIcon);

        var deleteButtonVar = $("<td>");
        deleteButtonVar.addClass("col-1 text-center");
        deleteButtonVar.append(delIcon);

        rowEditVar.append(trainEditVar, destinationEditVar, frequencyEditVar, nextArrivalEditVar, minutesEditVar, editButtonVar, deleteButtonVar);
        rowDisplayVar.append(trainDisplayVar, destinationDisplayVar, frequencyDisplayVar, nextArrivalDisplayVar, minutesDisplayVar);

        $("#train-info-del").append(rowEditVar);
        $("#train-info-display").append(rowDisplayVar)


    });
    

    function displayInfo () {

    };

});