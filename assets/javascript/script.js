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
        var firstTrainms = moment(firstTrain,"HH:mm");
        var nowTimems = moment(new Date());

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

        
        var firstTrainms = moment(rowAdded.val().firstHour,"HH:mm");
        
        var nextArrivalTimems = nextArrFunction(firstTrainms, rowAdded.val().freq);
        var nextArrivalTime = moment(nextArrivalTimems, "HH:mm");

        var minutesAway = "nextArrivalTime - currentTime(mins)";

        //edit button
        var editIcon = $("<i>");
        editIcon.addClass("fa fa-pencil");
        editIcon.attr("aria-hidden", "true");

        // delete button
        var delIcon = $("<i>");
        delIcon.addClass("fa fa-trash");
        delIcon.attr("aria-hidden", "true");

        // rendering the table information
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

        
        var nextArrivalTime;
        var nextArrivalNoForm;
        
        var firstTime = moment(rowAdded.val().firstHour,"HH:mm");
    
        var nowTime = moment(new Date());
        var timesArray=[];
        frqms = rowAdded.val().freq * 60000; //freq in miliseconds
        
        var j = 0;
        var compareTime = firstTime;
       
        while (nowTime > compareTime){
            j++;
            compareTime = firstTime + (j*frqms);
            timesArray.push(compareTime);
        }
        if (nowTime<=firstTime){
            nextArrivalNoForm = firstTime;
            console.log(firstTime +"|"+ nowTime);
            minutesAway = Math.floor((firstTime-nowTime)/60000)+1;
        }
        else{
            j--;
            nextArrivalNoForm = moment(timesArray[j],"x");
            minutesAway = Math.floor((timesArray[j]-nowTime)/60000)+1;
        }
        nextArrivalTime = moment(nextArrivalNoForm).format("dddd, MMMM Do YYYY, h:mm");
        
       


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
    

    function nextArrFunction (firstTime,q) {
        var nextArrival;
        var nowTime = moment().format("hh:mm");
        var x = 0;
        var compareTime = firstTime
        while (nowTime > compareTime){
            x++;
            compareTime = firstTime + (x*q);
        }
        x--
        nextArrival = firstTime + (x*q);
        return nextArrival;

    };

});