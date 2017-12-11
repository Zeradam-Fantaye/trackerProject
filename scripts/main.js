// Add an event handler Which handles the submit event from our <form>
document.getElementById("issueInputForm").addEventListener("submit", saveIssue);

function saveIssue(e){
	var issueDesc = document.getElementById("issueDescInput").value;
	var issueSeverity = document.getElementById("issueSeverityInput").value;
	var issueAssignedTo = document.getElementById("issueAssignedToInput").value;
	var issueId = chance.guid();//To generate a global unique identifier for that new ID
	var issueStatus = "Open";

	var issue = {
		id: issueId,
		description: issueDesc,
		severity: issueSeverity,
		assignedTo: issueAssignedTo,
		status: issueStatus
	}

	if (localStorage.getItem("issues") == null){

		var issues = [];
		issues.push(issue);

		//JSON.stringify will take the "issues" array and 
		//generates a JSON object and store it to the "issues"
		//local storage. 
		localStorage.setItem("issues", JSON.stringify(issues));

	}
	else{
		
		//If we have something inside the storage, then we will do:
		var issues = JSON.parse(localStorage.getItem("issues"));
		issues.push(issue);
		localStorage.setItem("issues", JSON.stringify(issues))

	}

	//Reseting the <form>
	document.getElementById("issueInputForm").reset();

    //We need to call the fetchIssues so that the list output is 
    //regenerated and the new element is included in the list output as well
	fetchIssues();

	//To prevent the <form> from submitting
	e.preventDefault();
}

function fetchIssues(){
	//fetching issues for a local storage
	var issues = JSON.parse(localStorage.getItem("issues"));
	var issuesList = document.getElementById("issuesList");

	issuesList.innerHTML = "";

	for(var i = 0; i < issues.length; i++){

		// if (id == undefined){
		// 	console.log("I am here 2");
		// 	continue;
		// }

		var id = issues[i].id; console.log("id = " + id);
		var desc = issues[i].description;
		var severity = issues[i].severity;
		var assignedTo = issues[i].assignedTo;
		var status = issues[i].status;

		issuesList.innerHTML += "<div class='well'>" +  
									"<h6> Issue ID: " + id + "</h6>" + 
									"<p>" +
										"<span class='label label-info'>" + 
											status + 
										"<span>" +
									"</p>" +

									"<h3>" + desc + "</h3>" + 

									"<p>" + 
										"<span class='glyphicon glyphicon-time'>" + "</span>" + severity + 
									"</p>" + 

									"<p>" + 
										"<span class='glyphicon glyphicon-user'>" + "</span>" + assignedTo + 
									"</p>" + 

									"<a href='#' onclick='setStatusClosed(\""+id+"\")' class='btn btn-warning'> Close </a>" + 
									
									"<a href='#' onclick='deleteIssue(\""+id+"\")' class='btn btn-danger'> Delete </a>" +
							
								"</div>" + "<br><hr><br>";

	}
}


function setStatusClosed(id){
	//console.log("I am here11 .... ID = " + id);
	var issues = JSON.parse(localStorage.getItem("issues"));
	//debugger;
	for (var i = 0; i < issues.length; i++){
		
		if (issues[i].id == id){
			issues[i].status = "Closed";
		}
	}

	//Change that array(issues) to JSON format
	localStorage.setItem("issues", JSON.stringify(issues));

	//To update our output on the html, we need to call fetchIssues()
	fetchIssues();

}

function deleteIssue(id){
	//console.log("I am here11 .... ID = " + id);
	var issues = JSON.parse(localStorage.getItem("issues"));
	
	for (var i = 0; i < issues.length; i++){
		
		if (issues[i].id == id){
			issues.splice(i, 1);
		}
	}

	//Change that array(issues) to JSON format
	localStorage.setItem("issues", JSON.stringify(issues));

	//To update our output on the html, we need to call fetchIssues()
	fetchIssues();
}











