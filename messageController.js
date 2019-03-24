const remote = require('electron').remote;

document.getElementById("close-btn").addEventListener("click", function(e) {
    var window = remote.getCurrentWindow();
    window.close();
})

function closeMessage(el) {
    el.addClass('is-hidden');
  }
  
  $(document).ready(function() {
    setTimeout(function() {
      closeMessage($('#js-timer'));
    }, 5000);
  });