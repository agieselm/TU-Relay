

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