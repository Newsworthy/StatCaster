$(document).ready(function() {
  $('#updateStatus').click(function() {
    location.reload(true);
  });
  $.ajax({
    type: 'GET',
    // If you want to use this code for your own underground status app, please register for a different App ID & API key at https://api-portal.tfl.gov.uk/login, and insert the details in the line below.
    url: 'https://api.tfl.gov.uk/Line/Mode/tube,overground,dlr,tflrail,tram/Status?detail=False&app_id=ee65a450&app_key=3db5817b87411911cbde2fcf1fd5516e',
    success: function(data) {
      // console.log(data);
      $.each(data, function(index, element) {
        //Get the time of the latest update
        document.getElementById("time").innerHTML = Date();
        //Get the name of each line, and change the background of the div depending on the result of the line
        var lineName = element.name;
        // Remove the spaces and ampersands from names, so they match the CSS
        var lineFixed = lineName.replace(/ |&/g, "_");
        // console.log(lineFixed);
        var lineDisplay = "<div class='top-buffer col-xs-6 col-sm-5 col-md-4 col-lg-3 col-sm-offset-1 col-md-offset-2 col-lg-offset-3 " + lineFixed + "' id='" + lineFixed + "'>" + "<h4>" + element.name + "</h4>";
        // console.log(lineDisplay);
        // Check the line status from the JSON, and change the background colour of the div depending on the result
        var lineStatus = element.lineStatuses[0].statusSeverityDescription;
        //var lineStatus = "Minor Delays";
        var statusColour = "";
        if (lineStatus == "Good Service") {
          statusColour = "<div class='top-buffer text-center col-xs-6 col-sm-5 col-md-4 col-lg-3 goodService'><h4>";
        } else if (lineStatus == "Minor Delays") {
          statusColour = "<div class='top-buffer text-center col-xs-6 col-sm-5 col-md-4 col-lg-3 delayedService'><h4>";
        } else if (lineStatus == "Suspended") {
          statusColour = "<div class='top-buffer text-center col-xs-6 col-sm-5 col-md-4 col-lg-3 closedService'><h4>";
        } else {
          statusColour = "<div class='top-buffer text-center col-xs-6 col-sm-5 col-md-4 col-lg-3 suspendedService'><h4>";
        }
        // Get the reason for the closure/delay, remove the name from the front, then store it as closureReason
        var closureReason = "";
        if (element.lineStatuses[0].reason) {
          var reason = element.lineStatuses[0].reason;
          closureReason = reason;
        } else {
          closureReason = "Good Service reported on the " + element.name + " line";
        }
        // Now I need to make the "Minor/Severe Delay warning to turn into a clickable link, allowing you to get the reason for the delay in an alert
        var lineStatusButton = "";
        var lineInfoDiv = lineFixed + "Modal";
        var lineInformationDisplay = "";
        if (lineStatus == "Good Service") {
          lineStatusButton = "Good Service";
        } else if (lineStatus == "Minor Delays") {

          // This next bit was tough, took a lot of work to get these to work. In the end, it was a # that saved the day. Amazing.
          lineStatusButton = "<button type='button' class='btn btn-link btn-block btn-lg' data-toggle='modal' data-target='#" + lineInfoDiv + "'><h4>" + lineStatus + "</h4></button>";
          lineInformationDisplay = "<div id='" + lineInfoDiv + "' class='modal fade' role='dialog'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><h3 class='modal-title'>" + lineName + "</h3></div><div class='modal-body'><p>" + closureReason + "</p></div><div class='modal-footer'><button type='button' class='btn btn-default' data-dismiss='modal'>Close</button></div></div></div>";
        } else if (lineStatus == "Severe Delays") {
          lineStatusButton = "<button type='button' class='btn btn-link btn-lg btn-block' data-toggle='modal' data-target='#" + lineInfoDiv + "'><h4>" + lineStatus + "</h4></button>";
          lineInformationDisplay = "<div id='" + lineInfoDiv + "' class='modal fade' role='dialog'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><h3 class='modal-title'>" + lineName + "</h3></div><div class='modal-body'><p>" + closureReason + "</p></div><div class='modal-footer'><button type='button' class='btn btn-default' data-dismiss='modal'>Close</button></div></div></div></div>";
        } else if (lineStatus == "Part Suspended") {
          lineStatusButton = "<button type='button' class='btn btn-link btn-block' data-toggle='modal' data-target='#" + lineInfoDiv + "'><h4>" + lineStatus + "</h4></button>";
          lineInformationDisplay = "<div id='" + lineInfoDiv + "' class='modal fade' role='dialog'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><h3 class='modal-title'>" + lineName + "</h3></div><div class='modal-body'><p>" + closureReason + "</p></div><div class='modal-footer'><button type='button' class='btn btn-default' data-dismiss='modal'>Close</button></div></div></div></div>";
        } else if (lineStatus == "Part Closure") {
          lineStatusButton = "<button type='button' class='btn btn-link btn-block' data-toggle='modal' data-target='#" + lineInfoDiv + "'><h4>" + lineStatus + "</h4></button>";
          lineInformationDisplay = "<div id='" + lineInfoDiv + "' class='modal fade' role='dialog'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><h4 class='modal-title'>" + lineName + "</h4></div><div class='modal-body'><p>" + closureReason + "</p></div><div class='modal-footer'><button type='button' class='btn btn-default' data-dismiss='modal'>Close</button></div></div></div></div>";
          // Insert same concept but for "Line Closed" status
        } else if (lineStatus == "Service Closed") {
          lineStatusButton = "<button type='button' class='btn btn-link btn-block' data-toggle='modal' data-target='#" + lineInfoDiv + "'><h4>" + lineStatus + "</h4></button>";
          lineInformationDisplay = "<div id='" + lineInfoDiv + "' class='modal fade' role='dialog'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><h4 class='modal-title'>" + lineName + "</h4></div><div class='modal-body'><p>" + closureReason + "</p></div><div class='modal-footer'><button type='button' class='btn btn-default' data-dismiss='modal'>Close</button></div></div></div></div>";
          // Insert same concept but for "Planned Closure" status
        } else if (lineStatus == "Special Service") {
          lineStatusButton = "<button type='button' class='btn btn-link btn-block' data-toggle='modal' data-target='#" + lineInfoDiv + "'><h4>" + lineStatus + "</h4></button>";
          lineInformationDisplay = "<div id='" + lineInfoDiv + "' class='modal fade' role='dialog'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><h4 class='modal-title'>" + lineName + "</h4></div><div class='modal-body'><p>" + closureReason + "</p></div><div class='modal-footer'><button type='button' class='btn btn-default' data-dismiss='modal'>Close</button></div></div></div></div>";
        } else if (lineStatus == "Planned Closure") {
          lineStatusButton = "<button type='button' class='btn btn-danger btn-block' data-toggle='modal' data-target='#" + lineInfoDiv + "'><h4>" + lineStatus + "</h4></button>";
          lineInformationDisplay = "<div id='" + lineInfoDiv + "' class='modal fade' role='dialog'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><h4 class='modal-title'>" + lineName + "</h4></div><div class='modal-body'><p>" + closureReason + "</p></div><div class='modal-footer'><button type='button' class='btn btn-default' data-dismiss='modal'>Close</button></div></div></div></div>";
        } else if (lineStatus == "Suspended") {
          lineStatusButton = "<button type='button' class='btn btn-link btn-block' data-toggle='modal' data-target='#" + lineInfoDiv + "'><h4>" + lineStatus + "</h4></button>";
          lineInformationDisplay = "<div id='" + lineInfoDiv + "' class='modal fade' role='dialog'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><h4 class='modal-title'>" + lineName + "</h4></div><div class='modal-body'><p>" + closureReason + "</p></div><div class='modal-footer'><button type='button' class='btn btn-default' data-dismiss='modal'>Close</button></div></div></div></div>";
        } else {
          lineStatusButton = "Information Unavailable";
        }
        $("#content").append("<div class='row row-eq-height'>" + lineDisplay + "</div>" + statusColour + lineStatusButton + "</div>" + lineInformationDisplay);
      });
    }
  });

});