

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

  //sets new page be the default open screen
  document.getElementById("defaultOpen").click();
  
   
  


  function popupTemplateAdd() {
    const remote = require('electron').remote;
    const BrowserWindow = remote.BrowserWindow;
    var win = new BrowserWindow({ 
      width: 700, 
      height: 525,
      frame: false });
    win.setMenuBarVisibility(false);
    win.loadFile('createTemplateMessage.html');
  }
  function popupTypeAdd() {
    const remote = require('electron').remote;
    const BrowserWindow = remote.BrowserWindow;
    var win = new BrowserWindow({ 
      width: 700, 
      height: 450,
      frame: true });
    win.setMenuBarVisibility(true);
    win.loadFile('createType.html');
  }
  function popupDeleted() {
    const remote = require('electron').remote;
    const BrowserWindow = remote.BrowserWindow;
    var win = new BrowserWindow({ 
      width: 700, 
      height: 380,
      frame: false });
    win.setMenuBarVisibility(false);
    win.loadFile('deletedMessages.html');
  }

  function cancelConfirm(){
    let x = confirm("are you sure you want to cancel?")
    if(x == true){
      window.close();
      return true;
    }
  }

  function resetForm(){
    window.reset();
  }
  function sendConfirm(){
    if(confirm("are you sure you want to send?")){
      document.getElementById("sendNewMessage").submit()
      document.getElementById("sendNewMessage").reset()
    }
  }
  function sendTemplateConfirm(){
  if(confirm("are you sure you want to send?")){
    document.getElementById("sendNewTemplate").submit()
    document.getElementById("sendNewTemplate").reset()
  }
}
function sendTypeConfirm(){
  if(confirm("are you sure you want to send?")){
    document.getElementById("sendNewType").submit()
    document.getElementById("sendNewType").reset()
  }
}

function deleteTemplateConfirm(){
  if(confirm("are you sure you want to send?")){
    document.getElementById("deleteTemplateID").submit()
    document.getElementById("deleteTemplateID").reset()
  }
}



const axios = require('axios')

function getData(){
  const axios = require('axios')
axios.get("http://localhost:8081/get_templates")
  .then((res) => {

    const messageData = res.data
    console.log("get template: " + messageData);

    let x = document.getElementById("tempSelect");

    
    for( let i = 0; i < messageData.length; i++){
       
      let option = document.createElement("option");
      option.innerHTML = messageData[i].Name;
      option.id = messageData[i].ID
      console.log(option)




      x.options.add(option)
    }


    //window.$ = window.jQuery = require('jquery');
    
    const options = []

    document.querySelectorAll('#tempSelect > option').forEach((option) => {
        if (options.includes(option.value)) option.remove()
        else options.push(option.value)
    })


  })
axios.get("http://localhost:8081/get_types")
  .then((res) => {

    const messageData = res.data
    console.log("get types: "+messageData);

    let x = document.getElementById("MessageTypeID");

    for( let i = 0; i < messageData.length; i++){
       
      let option = document.createElement("option");
      option.innerHTML = messageData[i].Name;
      option.value = messageData[i].ID
      console.log(option)


      x.options.add(option)
    }



        //window.$ = window.jQuery = require('jquery');
    
        const options = []

        document.querySelectorAll('#MessageTypeID > option').forEach((option) => {
            if (options.includes(option.value)) option.remove()
            else options.push(option.value)
        })

  })

 



}



function fillTypeData(){
  const axios = require('axios')

  axios.get("http://localhost:8081/get_types")
    .then((res) => {
  
    let messageData = res.data
    console.log(messageData)
    let sel = document.getElementById("MessageTypeID");
  
    let messagePriorityData = messageData[sel.selectedIndex-1].Priority;
    let messageNameData = messageData[sel.selectedIndex-1].Name; 

    document.getElementById("Priority").innerHTML = messagePriorityData;
    document.getElementById("Name").innerHTML = messageNameData;

      
  })
  }
  


  
  
  