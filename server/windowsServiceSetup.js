const Service = require('node-windows').Service;
const config = require('./databaseConfig.js');
 
// Create a new service object
const svc = new Service({
  name:'TU-Relay Server',
  description: 'The server for the TU-Relay message broadcasting app.',
  script: config.projectDir + "server.js"
});
 
// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});
 
svc.install();