

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
      height: 435,
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
    }
  }
  function sendConfirm(){
    if(confirm("are you sure you want to send?")){
      document.getElementById("sendNewMessage").submit();
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

//   function postNewMessage() {
//     $(document).ready(function(){
//       // click on button submit
//       $("#submit").on('click', function(){
//           // send ajax
//           $.ajax({
//               url: 'URL', // url where to submit the request
//               type : "POST", // type of action POST || GET
//               dataType : 'json', // data type
//               data : $("#form").serialize(), // post data || get data
//           })
//       });
//   });
//     //URL
// }
  
  
  