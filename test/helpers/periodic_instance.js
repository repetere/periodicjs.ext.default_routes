var npm = require('npm'),
    path    = require('path'),
    async = require('async')
    nexpect = require('nexpect');

//nexpect.spawn("ls -la /tmp/undefined", { stream: 'stderr' })
         //.expect("No such file or directory")
         //.run(function (err) {
           //if (!err) {
             //console.log("checked that file doesn't exists");
           //}
         //});

var previous_dir = path.resolve(process.cwd(),'../'),
    periodic      = "periodicjs@latest";


npm.load({prefix:previous_dir}, function (err) {
    if (err) {
     throw err 
    }
  npm.commands.install([periodic], function (er, data) {
   if (err) {
    throw err 
   } 
   console.log(data);
  });
  npm.on("log", function (message) {
    // log the progress of the installation
    console.log(message);
  });
});
