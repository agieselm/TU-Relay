

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

   let templateMessage = document.getElementById("alertMessage");
   let templateTitle = document.getElementById("alertTitle");
   let templateType = document.getElementById("selectType");
  
   
  
  
  function fillTemplate() {
  
  let alertTemplate = event.target.value;
  
        switch (alertTemplate) {
          case '':  {
            templateMessage.value = "";
            templateTitle.value = "";
            templateType.value = "";
            break;
          }
          case 'shooterMessage':  {
            templateMessage.value = "Shooter on campus";
            templateTitle.value = "Shooter";
            templateType.value = "Emergency";
            break;
          }
          case 'sportsMessage': {
            templateMessage.value = "Basketball Game at 7";
            templateTitle.value = "Sports Event";
            templateType.value = "Sports";
            break;
  
  }
  
        }
  }

  function popupTemplateAdd() {
    const remote = require('electron').remote;
    const BrowserWindow = remote.BrowserWindow;
    var win = new BrowserWindow({ 
      width: 700, 
      height: 385,
      frame: false });
    win.setMenuBarVisibility(false);
    win.loadFile('createTemplateMessage.html');
  }
  function popupTypeAdd() {
    const remote = require('electron').remote;
    const BrowserWindow = remote.BrowserWindow;
    var win = new BrowserWindow({ 
      width: 700, 
      height: 380,
      frame: false });
    win.setMenuBarVisibility(false);
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
    }else{
      return false;
    }
  }
  function sendConfirm(){
    let x = confirm("are you sure you want to send?")
    if(x == true){
      return true;
    }else{
      return false;
    }
  }


  function getMessages() {
    axios.get('')
      .then(res => {
        console.log(res.data.login);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function postNewMessage() {
    axios.post('', data, config)
      .then(res => {
        console.log(res.data.login);
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  
  