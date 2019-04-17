function prevAlerts () {
	const BrowserWindow = require('electron').remote.BrowserWindow

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
  let reloadpage = false;
  //change color of buttons
  
//localhost

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
  var win = null;
  function popupTemplateAdd() {
    const remote = require('electron').remote;
    const BrowserWindow = remote.BrowserWindow;
     win = new BrowserWindow({
      width: 700,
      height: 585,
      frame: true
    });
    win.setMenuBarVisibility(true);
    win.loadFile('createTemplateMessage.html');
  }

  //////////////////////////////////////////////////////
  //When clicked opens add/edit/delete type options//
  ///////////////////////////////////////////////////////

  var win2 = null;
  function popupTypeAdd() {
    const remote = require('electron').remote;
    const BrowserWindow = remote.BrowserWindow;
     win2 = new BrowserWindow({
      width: 700,
      height: 450,
      frame: true
    });
    win2.setMenuBarVisibility(true);
    win2.loadFile('createType.html');

  }
  ///////////////////////////////////////
  //When clicked opens deleted messages//
  ///////////////////////////////////////
  function popupDeleted() {
    const remote = require('electron').remote;
    const BrowserWindow = remote.BrowserWindow;
     win = new BrowserWindow({
      width: 700,
      height: 380,
      frame: false
    });
    win.setMenuBarVisibility(false);
    win.loadFile('deletedMessages.html');
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

  //////////////////////////////
  //Clear form. NOT FUNCTIONAL//
  /////////////////////////////
  function resetForm() {
    location.reload();
  }

  /////////////////////////////////////////
  //Are you sure for: Sending new message//
  ////////////////////////////////////////
  function sendConfirm() {
    if (confirm("are you sure you want to send?")) {
      let x = document.getElementById("MessageTypeID");
      let y = document.getElementById("Title");
      let z = document.getElementById("Content");


      if( x.value  === "no" || y.value === "" || z.value === ""){
        alert("Please enter all fields")
        }else{
      document.getElementById("sendNewMessage").submit()
      document.getElementById("sendNewMessage").reset()
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
    }
  }
}

  /////////////////////////////////////
  //Are you sure for: Making new Type//
  /////////////////////////////////////
  function sendTypeConfirm() {
    if (confirm("are you sure you want to send?")) {
      let w = document.getElementById("Color")
      let x = document.getElementById("Priority");
      let y = document.getElementById("Name");

      if( x.value  === "no" || y.value === ""  || w.value === ""){
        alert("Please enter all fields")
        }else{
      document.getElementById("sendNewType").submit()
      document.getElementById("sendNewType").reset()
    }
  }
}

  //////////////////////////////////
  //Are you sure for: Editing type//
  //////////////////////////////////
  function editTypeConfirm() {
    if (confirm("are you sure you want to send?")) {
      let w = document.getElementById("Priority2")
      let x = document.getElementById("MessageTypeIDs");
      let y = document.getElementById("Name2");

      if( x.value  === "no" || y.value === ""  || w.value === ""){
        alert("Please enter all fields")
        }else{
      document.getElementById("edittypee").submit()
      document.getElementById("edittypee").reset()


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
      let y = document.getElementById("Titles");
      let z = document.getElementById("Contents");

      if( x.value  === "no" || y.value === "" || z.value === "" || w.value === "" || v.value === "no"){
        alert("Please enter all fields")
        }else{
      document.getElementById("editTemplates").submit()
      document.getElementById("editTemplates").reset()
      console.log("edittemplate sent")
    }
  }
}

  ////////////////////////////////////////
  //Are you sure for: Deleting Template //
  ////////////////////////////////////////
  function deleteTemplateConfirm() {
    if (confirm("are you sure you want to send?")) {
      document.getElementById("deleteTemplateID").submit()
      document.getElementById("deleteTemplateID").reset()
    }
  }

  function deleteTypeConfirm() {
    if (confirm("are you sure you want to send?")) {
      document.getElementById("deleteTypeID").submit()
      document.getElementById("deleteTypeID").reset()
    }
  }

  ////////////////////////////////////////
  //Grabbing template data from database//
  ////////////////////////////////////////
  const axios = require('axios')

  function getData() {
    const axios = require('axios')
    axios.get("http://localhost:8081/get_templates")
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

        const options = []

        document.querySelectorAll('#tempSelect > option').forEach((option) => {
          if (options.includes(option.value)) option.remove()
          else options.push(option.value)
        })
      })

    ////////////////////////////////////
    //Grabbing type data from database//
    ////////////////////////////////////
    axios.get("http://localhost:8081/get_types")
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

  /////////////////////////////////////////
  //Autofills form from template dropdown//
  /////////////////////////////////////////

  function fillFormData() {
    axios.get("http://localhost:8081/get_templates")
      .then((res) => {

        let messageData = res.data
        let sel = document.getElementById("tempSelect");

        let messageTitleData = messageData[sel.selectedIndex - 1].Title;
        let messageContentData = messageData[sel.selectedIndex - 1].Content;
        let messageTypeData = messageData[sel.selectedIndex - 1].MessageTypeID;
        
        document.getElementById("Title").value = messageTitleData;
        document.getElementById("Content").value = messageContentData;
        document.getElementById("MessageTypeID").value = messageTypeData;
      })
  }

  ////////////////////////////////////////
  //Populates type form in edit type tab//
  ////////////////////////////////////////

  function fillEditType() {
    axios.get("http://localhost:8081/get_types")
      .then((res) => {

        let messageData = res.data
        let sel = document.getElementById("MessageTypeIDs");

        let messageTitleData = messageData[sel.selectedIndex - 1].Color;
        let messageContentData = messageData[sel.selectedIndex - 1].Priority;
        let messageTypeData = messageData[sel.selectedIndex - 1].Name;
        let messageTypeID = messageData[sel.selectedIndex - 1].ID

        document.getElementById("Color2").value = messageTitleData;
        document.getElementById("Priority2").value = messageContentData;
        document.getElementById("Name2").value = messageTypeData;
        document.getElementById("ID2").value = messageTypeID;

      
      })
  }


  ////////////////////////////////
  //Autofills data for edit form//
  ////////////////////////////////

  function fillEditFormData() {
    axios.get("http://localhost:8081/get_templates")
      .then((res) => {

        let messageData = res.data
        let sel = document.getElementById("tempSelect");

        let messageTitleData = messageData[sel.selectedIndex - 1].Title;
        let messageContentData = messageData[sel.selectedIndex - 1].Content;
        let messageTypeData = messageData[sel.selectedIndex - 1].MessageTypeID;
        let messageNameData = messageData[sel.selectedIndex - 1].Name
        let messageIdData = messageData[sel.selectedIndex - 1].ID


        document.getElementById("Titles").value = messageTitleData;
        document.getElementById("Contents").value = messageContentData;
        document.getElementById("MessageTypeID").value = messageTypeData;
        document.getElementById("Names").value = messageNameData;
        document.getElementById("ID").value = messageIdData;
      })
  }

  ////////////////////////////////////////////////
  //Populates type dropdown in edit template tab//
  ////////////////////////////////////////////////

  function grabDataForEditTemplateType() {
    axios.get("http://localhost:8081/get_types")
      .then((res) => {

        const messageData = res.data

        let x = document.getElementById("MessageTypeID2");

        for (let i = 0; i < messageData.length; i++) {
          let option = document.createElement("option");
          option.innerHTML = messageData[i].Name;
          option.value = messageData[i].ID


          x.options.add(option)
        }
        const options = []
        document.querySelectorAll('#MessageTypeID2 > option').forEach((option) => {
          if (options.includes(option.value)) option.remove()
          else options.push(option.value)
        })
      })
  }



  function grabDataForEditType() {
    axios.get("http://localhost:8081/get_types")
      .then((res) => {

        const messageData = res.data

        let x = document.getElementById("MessageTypeIDs");

        for (let i = 0; i < messageData.length; i++) {
          let option = document.createElement("option");
          option.innerHTML = messageData[i].Name;
          option.value = messageData[i].ID


          x.options.add(option)
        }
        const options = []
        document.querySelectorAll('#MessageTypeIDs > option').forEach((option) => {
          if (options.includes(option.value)) option.remove()
          else options.push(option.value)
        })
      })
  }

  function test(){

    const axios = require('axios')
    axios.get("http://localhost:8081/get_templates")
      .then((res) => {

        let messageData = res.data
        let x = document.getElementById("tempSelect2");

        for (let i = 0; i < messageData.length; i++) {
          let option = document.createElement("option");
          option.innerHTML = messageData[i].Name;
          option.id = messageData[i].ID
          
          x.options.add(option)
        }

        //////////////////////////////////////////////////
        //removing all duplicates from template dropdown//
        //////////////////////////////////////////////////
       
        const options = []
        document.querySelectorAll('#tempSelect2 > option').forEach((option) => {
          if (options.includes(option.value)) option.remove()
          else options.push(option.value)
        })
      })
  }

  function deleteTypeDropdown() {
    axios.get("http://localhost:8081/get_types")
      .then((res) => {

        const messageData = res.data
        console.log(messageData)
        let x = document.getElementById("MessageTypeID3");

        for (let i = 0; i < messageData.length; i++) {
          //console.log(i)
          let option = document.createElement("option");
          option.innerHTML = messageData[i].Name;
          option.value = messageData[i].ID
          console.log(option.value)

          x.options.add(option)
        }
        const options = []
        document.querySelectorAll('#MessageTypeID3 > option').forEach((option) => {
          if (options.includes(option.value)) option.remove()
          else options.push(option.value)
        })

      })
  }

  function fillFormDatassss() {
    axios.get("http://localhost:8081/get_templates")
      .then((res) => {

        let messageData = res.data
        let sel = document.getElementById("tempSelect2");
        let messageTypeData = messageData[sel.selectedIndex - 1].ID;

        document.getElementById("IDs").value = messageTypeData;
      })
  }


  function deleteTypeForm() {
    axios.get("http://localhost:8081/get_types")
      .then((res) => {

        let messageData = res.data
        let sel = document.getElementById("MessageTypeID3");
        let messageTypeData = messageData[sel.selectedIndex - 1].ID;

        document.getElementById("IDss").value = messageTypeData;
      })
  }


  // function getOldMessages() {
  //   axios.post("http://localhost:8081/new_messages")
  //     .then((res) => {

  //       const messageData = res.data
  //       console.log(messageData)
  //       let x = document.getElementById("oldMessageContainer");

  //       for (let i = 0; i < messageData.length; i++) {
          // var butt=document.createElement("button");
          // butt.innerHTML += messageData[i].Title;
          // x.appendChild(butt);
   

  //         x.innerHTML +=  "<button class ='oldMessageButtons' id = "+i+" onclick = 'getOldMessages()'> "
  //          + "Title: " + messageData[i].Title + "<br> <br> " +"Date: " + messageData[i].DateSent  
  //         + "</button>" + "<br>" + "<div id = " +"oldmessageInfoPageStuff" + i + ">"
  //         + "<label>Date Sent</label> "
  //         + "<input type='text' id= 'datesent' disabled = 'disabled' value = " + messageData[i].DateSent + ">"
  //         + "<label>Title</label>"
  //         + "<input type='text' placeholder='Alert Title' id='oldAlertTitle' name='Title' disabled = 'disabled' value = " +messageData[i].Title  + ">"
  //         + "<label>Type</label>"
  //         + "<input type='text'  id = 'oldMessageTypeID' name='MessageTypeID' disabled = 'disabled' value = " +messageData[i].MessageTypeID + ">"
  //         + "<label>Content</label>"
  //         + "<input type='text' placeholder='Your alert message'id='oldAlertMessage' name='Content' disabled = 'disabled' value = " +messageData[i].Content + ">" + "</div"

  //         //let wo = event.srcElement.id
  //         var y = document.getElementById("oldmessageInfoPageStuff" + i);
  //         if (y.style.display === "none") {
  //           y.style.display = "block";
  //         } else {
  //           y.style.display = "none";
  //         }

  //       }

  //       const buttons = []
  //       document.querySelectorAll('#oldMessageContainer > button').forEach((button) => {
  //         if (buttons.includes(button.id)) button.remove()
  //         else buttons.push(button.id)
  //       })

  //     })
  // }




    //alert(event.srcElement.id);
    //let wo = event.srcElement.id






  ///////////
  //Polling//
  ///////////

  setInterval(getData, 5000);
  //setInterval(getOldMessages, 5000)

  if(win !== null){
    setInterval(deleteTypeDropdown, 5000);

  }

  if(win2 !== null){
    setInterval(test, 5000);
    setInterval(grabDataForEditTemplateType, 5000);
    setInterval(grabDataForEditType, 5000)

    
  }

