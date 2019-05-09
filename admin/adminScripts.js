const host = "http://localhost:8081"



function prevAlerts () {
	const BrowserWindow = require('electron').remote.BrowserWindow

	// grab reference to main window
	let p = BrowserWindow.fromId(0)

	// make this window child of above by adding parent: to ¿constructor?
	// make modal, "modal: true", must have parent
	var win = new BrowserWindow({
		width: 800,
		height: 700,
		show: false,
		center: true,
		parent: p,
		modal: true
	})

	win.id = 1

	win.loadFile('previous_alerts.html')

	win.once('ready-to-show', () => { win.show() })

	win.on('closed', () => { win = null })

}
  let reloadpage = false;
  //change color of buttons
  

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


  ///////////////////////////////////////////////////////
  //When clicked opens add/edit/delete template options//
  ///////////////////////////////////////////////////////



  var win3 = null;
  function popupTemplateAdd() {
    const remote = require('electron').remote;
    const BrowserWindow = remote.BrowserWindow;
     win3 = new BrowserWindow({
      width: 700,
      height: 585,
      frame: true,
      parent: BrowserWindow.fromId(1),
      modal: true
    });
    win3.setMenuBarVisibility(true);
    win3.loadFile('createTemplateMessage.html');

    win3.on('closed', () => {
      win2 = null
      location.reload()
    })
  }

  ///////////////////////////////////////////////////
  //When clicked opens add/edit/delete type options//
  ///////////////////////////////////////////////////

  //import {createWindow} from "./admin/main.js"



  var win2 = null;
  function popupTypeAdd() {
    const remote = require('electron').remote;
    const BrowserWindow = remote.BrowserWindow;
     win2 = new BrowserWindow({
      width: 700,
      height: 450,
      frame: true,
      parent: BrowserWindow.fromId(1),
      modal: true
    });
    win2.setMenuBarVisibility(true);
    win2.loadFile('createType.html');


    win2.on('closed', () => {
      win2 = null
      location.reload()
    })

  }

  ///////////////////////////////////////////////
  //Closes window when user click cancel button//
  //////////////////////////////////////////////
  function cancelConfirm() {
    let x = confirm("are you sure you want to cancel?")
    if (x == true) {
      window.close();
      return true;
    }
  }

  //////////////
  //Clear form//
  //////////////
  function resetForm() {
    document.getElementById("Title").value = "";
    document.getElementById("Content").value = "";
    document.getElementById("MessageTypeID").value = "";
    setTimeout("location.reload(true);", 100);

  }

  /////////////////////////////////////////
  //Are you sure for: Sending new message//
  ////////////////////////////////////////
  function sendConfirm() {
    if (confirm("are you sure you want to send?")) {
      let x = document.getElementById("MessageTypeID");
      let y = document.getElementById("Title");
      let z = document.getElementById("Content");
      let t = document.getElementById("sendAlertButton");

      if( x.value  === "no" || y.value === "" || z.value === ""){
        alert("Please enter all fields")
        }else{
      document.getElementById("sendNewMessage").submit()
      document.getElementById("sendNewMessage").reset()
      setTimeout("location.reload(true);", 50);

      }

    }
  }

  /////////////////////////////////////////
  //Are you sure for: Making new template//
  /////////////////////////////////////////
  function sendTemplateConfirm() {
    if (confirm("are you sure you want to send?")) {
      let w = document.getElementById("Name")
      let x = document.getElementById("MessageTypeID2");
      let y = document.getElementById("alertTitle");
      let z = document.getElementById("alertMessage2");

      if( x.value  === "no" || y.value === "" || z.value === "" || w.value === ""){
        alert("Please enter all fields")
        }else{
      document.getElementById("sendNewTemplate").submit()
      document.getElementById("sendNewTemplate").reset()
      setTimeout("location.reload(true);", 50);

    }
  }
}

  /////////////////////////////////////
  //Are you sure for: Making new Type//
  /////////////////////////////////////
  function sendTypeConfirm() {
    if (confirm("are you sure you want to send?")) {
      let x = document.getElementById("Priority");
      let y = document.getElementById("Name");

      if( x.value  === "no" || y.value === "" ){
        alert("Please enter all fields")
        }else{
      document.getElementById("sendNewType").submit()
      document.getElementById("sendNewType").reset()
      setTimeout("location.reload(true);", 50);

    }
  }
}

  //////////////////////////////////
  //Are you sure for: Editing type//
  //////////////////////////////////
  function editTypeConfirm() {
    if (confirm("are you sure you want to send?")) {
      let w = document.getElementById("Priority2")
      let x = document.getElementById("editMessageTypeID");
      let y = document.getElementById("Name2");

      if( x.value  === "no" || y.value === ""  || w.value === ""){
        alert("Please enter all fields")
        }else{
      document.getElementById("edittypee").submit()
      document.getElementById("edittypee").reset()
      setTimeout("location.reload(true);", 50);
      BrowserWindow.fromId(1).reload()
    }
  }
}

  //////////////////////////////////////
  //Are you sure for: Editing template//
  //////////////////////////////////////

  function editTemplateConfirm() {
    if (confirm("are you sure you want to send?")) {
      let v = document.getElementById("MessageTypeID")
      let w = document.getElementById("Names")
      let x = document.getElementById("editTemplates");
      let y = document.getElementById("Title");
      let z = document.getElementById("Content");

      if( x.value  === "no" || y.value === "" || z.value === "" || w.value === "" || v.value === "no"){
        alert("Please enter all fields")
        }else{
      document.getElementById("editTemplates").submit()
      document.getElementById("editTemplates").reset()
      console.log("edittemplate sent")

      setTimeout("location.reload(true);", 50);
    }
  }
}

  ////////////////////////////////////////
  //Are you sure for Deleting type/template //
  ////////////////////////////////////////
  function deleteConfirm(deleteID) {
    if (confirm("are you sure you want to send?")) {
      document.getElementById(deleteID).submit()
      document.getElementById(deleteID).reset()
      setTimeout("location.reload(true);", 50);
    }
  }

  ////////////////////////////////////////
  //Grabbing template data from database//
  ////////////////////////////////////////
  const axios = require('axios')

  function getData() {
    const axios = require('axios')
    axios.get(host + "/get_templates")
      .then((res) => {

        const messageData = res.data
        let x = document.getElementById("tempSelect");

        for (let i = 0; i < messageData.length; i++) {

          let option = document.createElement("option");
          option.innerHTML = messageData[i].Name;
          option.id = messageData[i].ID

          x.options.add(option)
        }

        //////////////////////////////////////////////////
        //removing all duplicates from template dropdown//
        //////////////////////////////////////////////////

        //window.$ = window.jQuery = require('jquery');

        const opts = []

        document.querySelectorAll('#tempSelect > option').forEach((option) => {
          if (opts.includes(option.value)) option.remove()
          else opts.push(option.value)
        })
      })

    ////////////////////////////////////
    //Grabbing type data from database//
    ////////////////////////////////////
    axios.get(host + "/get_types")
      .then((res) => {

        const messageData = res.data
        let x = document.getElementById("MessageTypeID");

        for (let i = 0; i < messageData.length; i++) {
          let option = document.createElement("option");
          option.innerHTML = messageData[i].Name;
          option.value = messageData[i].ID

          x.options.add(option)
        }

        //////////////////////////////////////////
        //Removing duplicates from type dropdown//
        //////////////////////////////////////////

        const options = []
        document.querySelectorAll('#MessageTypeID > option').forEach((option) => {
          if (options.includes(option.value)) option.remove()
          else options.push(option.value)
        })
      })
  }

  ////////////////////////////////
  //Autofills data for edit form//
  ////////////////////////////////

  function fillFormFromDropdown(templateID) {
    axios.get(host + "/get_templates")
      .then((res) => {

        let messageData = res.data
        let sel = document.getElementById(templateID);

        let messageTitleData = messageData[sel.selectedIndex - 1].Title;
        let messageContentData = messageData[sel.selectedIndex - 1].Content;
        let messageTypeData = messageData[sel.selectedIndex - 1].MessageTypeID;
        let messageNameData = messageData[sel.selectedIndex - 1].Name
        let messageIdData = messageData[sel.selectedIndex - 1].ID

        document.getElementById("Title").value = messageTitleData;
        document.getElementById("Content").value = messageContentData;
        document.getElementById("MessageTypeID").value = messageTypeData;
        
        if(document.getElementById("Names") !== null || document.getElementById("ID") !== null )
          document.getElementById("Names").value = messageNameData;
          document.getElementById("ID").value = messageIdData;
      })
  }

  ////////////////////////////////////////////////
  //Populates type dropdown in edit template tab//
  ////////////////////////////////////////////////

  function fillTypeDropdown(typeID) {
    axios.get(host + "/get_types")
      .then((res) => {

        let messageData = res.data
        let x = document.getElementById(typeID);

        for (let i = 0; i < messageData.length; i++) {
          let option = document.createElement("option");
          option.innerHTML = messageData[i].Name;
          option.value = messageData[i].ID

          x.options.add(option)
        }
      })
  }

  function fillTemplateDropdown(templateID){
    const axios = require('axios')
    axios.get(host + "/get_templates")
      .then((res) => {

        let messageData = res.data
        let x = document.getElementById(templateID);

        for (let i = 0; i < messageData.length; i++) {
          let option = document.createElement("option");
          option.innerHTML = messageData[i].Name;
          option.id = messageData[i].ID
          
          x.options.add(option)
        }
      })
  }


  ////////////////////////////////////////
  //Populates type form in edit type tab//
  ////////////////////////////////////////

  function fillEditType() {
    axios.get(host + "/get_types")
      .then((res) => {

        let messageData = res.data
        console.log(messageData)
        let sel = document.getElementById("editMessageTypeID");

        let messageContentData = messageData[sel.selectedIndex - 1].Priority;
        let messageTypeData = messageData[sel.selectedIndex - 1].Name;
        let messageTypeID = messageData[sel.selectedIndex - 1].ID

        document.getElementById("Priority2").value = messageContentData;
        document.getElementById("Name2").value = messageTypeData;
        document.getElementById("ID2").value = messageTypeID;
      })
  }

  function deleteTemplateForm() {
    axios.get(host + "/get_templates")
      .then((res) => {

        let messageData = res.data
        let sel = document.getElementById("tempSelect2");
        let messageTypeData = messageData[sel.selectedIndex - 1].ID;

        document.getElementById("deleteSavedTemplate").value = messageTypeData;
      })
  }

  function deleteTypeForm() {
    axios.get(host + "/get_types")
      .then((res) => {

        let messageData = res.data
        let sel = document.getElementById("MessageTypeID3");
        let messageTypeData = messageData[sel.selectedIndex - 1].ID;

        document.getElementById("deleteSavedType").value = messageTypeData;
      })
  }

  ///////////
  //Polling//
  ///////////

  setInterval(getData, 5000);
