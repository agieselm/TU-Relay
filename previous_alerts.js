const electron = require('electron')
const axios = require('axios')
const remote = electron.remote
const BrowserWindow = electron.BrowserWindow

//const console = electron.remote.getGlobal('console')


const host = "http://localhost:8081"


// constructor
/*
function prevAlerts () {

	// grab reference to main window
	// let p = BrowserWindow.fromId(0)

	// make this window child of above by adding parent: to ¿constructor?
	// make modal, "modal: true", must have parent
	var win = new BrowserWindow({ width: 800, height: 700, show: false, center: true })

	win.id = 1

	win.loadFile('previous_alerts.html')

	win.once('ready-to-show', () => { win.show() })

	win.on('closed', () => { win = null })

}
*/

//module.exports = { prevAlerts: prevAlerts() }


function fillList(msgType, messages) {

	// ensure valid parameter
	if (msgType != "active" && msgType != "inactive") {
		console.log("ERROR::previous_alerts.fillList(...) called with invalid msgType parameter")
		console.log("     ::'" + msgType + "' is not a valid message type")
		console.log("	  ::valid message types are: 'active' and 'inactive'")
		return
	}

	// set name of checkboxes
	let cbName = "cb" + (msgType == "active" ? "Delete" : "Activate")
	// get list that we are filling
	let list = document.getElementById(msgType + " list")
	// empty out list
	while (list.lastChild) list.removeChild(list.lastChild)

	// create row for each alert
	for (var i = 0; i < messages.length; ++i) {

		// grab reference to current alert
		var a = messages[i]

		// create div.row
		var row = document.createElement("div");
		row.setAttribute("class", "row")

		// create span to hold label and checkbox
		var span = document.createElement("span")
		span.setAttribute("class", "row")

		// create checkbox, set attributes, add to row
		var check = document.createElement("input")
		check.setAttribute("type", "checkbox")
		check.setAttribute("name", cbName)
		check.setAttribute("value", a.id)
		check.setAttribute("id", a.id)
//		check.setAttribute("onclick", "checkForSelected(msgType)")
		if (msgType == "active")
			check.setAttribute("onclick", "checkForSelected('active')")
		else
			check.setAttribute("onclick", "checkForSelected('inactive')")
		span.appendChild(check)

		// create title label, set text, add to row
		var title = document.createElement("label")
		title.setAttribute("for", a.id+i)
		title.innerHTML = a.title
		span.appendChild(title)

		// add span to row
		row.appendChild(span)

		// create message paragraph, set text, add to row
		var message = document.createElement("p")
		message.setAttribute("class", "row")
		message.innerHTML = a.message
		row.appendChild(message)

		// add row to list
		list.appendChild(row)

	}

}


// pull deleted messages from server, parse and fill list
function getMessages(msgType) {

	// ensure valid parameter
	if (msgType != "active" && msgType != "inactive") {
		console.log("ERROR::previous_alerts.getMessages(...) called with invalid msgType parameter")
		console.log("     ::'" + msgType + "' is not a valid message type")
		console.log("	  ::valid message types are: 'active' and 'inactive'")
		return
	}

	// set request
	let request = msgType == "active" ? "/new_messages" : "/deleted_messages"

	axios.post(host + request)
	.then((res) => {	// on success, log data and fill global array

		// extract & log alert data
		const alerts = res.data
		console.log(request + " returned: " + alerts)

		let messages = []

		// fill messages array with new data
		for (var i = 0; i < alerts.length; ++i) {

			let a = alerts[i]

			messages.push({
				"id": a.ID,
				"title": a.Title,
				"message": a.Content
			})

		}

		// fill list with messages
		fillList(msgType, messages)

	})
	.catch((err) => {	// on failure, log error(s)
		console.log(err)
	})
}


// will loop through array and send (un)delete request for each id
function submit(msgType) {

	// ensure valid parameter
	if (msgType != "active" && msgType != "inactive") {
		console.log("ERROR::previous_alerts.submit(...) called with invalid msgType parameter")
		console.log("     ::'" + msgType + "' is not a valid message type")
		console.log("	  ::valid message types are: 'active' and 'inactive'")
		return
	}

	// set checkbox name
	let cbName = "cb" + (msgType == "active" ? "Delete" : "Activate")
	// set request
	let request = msgType == "active" ? "/delete_messages" : "/undelete_messages"

	var ids = []

	// get ids of all selected messages
	document.querySelectorAll("[name="+cbName+"]").forEach((cb) => {
		if (cb.checked)
			ids.push(cb.id)
	})

	// add content type to header
	let config = { headers: { "Content-Type": "application/json" }}
	// convert ids to JSON string
	let data = { messages: ids } // ids.stringify() }
	// post request to server
	axios.post(host + request, JSON.stringify(data), config)
	.then((res) => {	// on success, log response and refresh list
		// log response
		console.log(request + "response: " + res)
		// refresh lists of messages
		getMessages("active")
		getMessages("inactive")
//		getActiveMessages()
//		getDeletedMessages()
		document.getElementById("submit "+msgType).disabled = true
	})
	.catch((err) => {	// on failure, log error(s)
		// log error
		console.log(err)
		// inform user of error
		alert("Uh oh! The server returned an error. :(")
	})

}


// onClick event for checkboxes
function checkForSelected(msgType) {

	// ensure valid parameter
	if (msgType != "active" && msgType != "inactive") {
		console.log("ERROR::previous_alerts.checkForSelected(...) called with invalid msgType parameter")
		console.log("     ::'" + msgType + "' is not a valid message type")
		console.log("	  ::valid message types are: 'active' and 'inactive'")
		return
	}

	// boolean flag
	var alertSelected = false

	// determine name of checkboxes to grab
	let cbName = "cb" + (msgType == "active" ? "Delete" : "Activate")
	let btnID = "submit " + msgType

	// look at each checkbox, set flag if find one selected
	document.querySelectorAll("[name="+cbName+"]").forEach((cb) => {
		if (cb.checked)
			alertSelected = true
	})

	// grab reference to submit button
	let btn = document.getElementById(btnID)

	// if any alert(s) selected, button is live! :D
	// otherwise, it's dead :(
	if (alertSelected)
		btn.disabled = false
	else
		btn.disabled = true

}


// close the active window
function closeCurrentWindow() {
	remote.getCurrentWindow().close()
}


// switch tabs
// function switchTabs(evnt, tab) {
// 	document.querySelectorAll("[class=tabcontent]").forEach((t) => {
// 		t.style.display = "none"
// 	})
// 	document.querySelectorAll("[class=tablinks]").forEach((t) => {
// 		t.className = t.className.replace(" active", "")
// 	})
// 	document.getElementById(tab).style.display = "block"
// 	evnt.currentTarget.className += " active"
// }

  //////////////////////////////////////////////
  //Controlls the tabs at the top of each page//
  //////////////////////////////////////////////
  function switchTabs(evt, tabs) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabs).style.display = "block";
    evt.currentTarget.className += " active";
  }
  ////////////////////////////////////////////
  //sets new page be the default open screen//
  ////////////////////////////////////////////
  document.getElementById("defaultOpen").click();
