var npm      = require('npm'),
    path     = require('path'),
    fs       = require('fs-extra'),
    child    = require('child_process'),
    periodic_cwd = path.resolve(previous_dir(),'node_modules/periodicjs/'),
    periodic = "periodicjs@latest";

create_previous_dirSync(previous_dir())

npm.load({prefix:previous_dir()}, function (err) {
    if (err) {
     throw err 
    }
  npm.commands.install([periodic], function (er, data) {
   if (err) {
    throw err 
   } 
   start_server();
   
  });
  npm.on("log", function (message) {
    // log the progress of the installation
    console.log(message);
  });
});


function start_server() {
 var server = child.exec('npm run nd',{cwd:periodic_cwd},function(error,stdout,stderr) { 
    if (error) {
     throw error; 
    }
    console.log(stdout);
 }); 
}

function previous_dir() {
 return path.resolve(process.cwd(),'../periodicjs_Stub');
}
function create_previous_dirSync(path_to) {
 return fs.mkdirsSync(path_to); 
}
function remove_previous_dirSync() {
  return fs.removeSync(previous_dir());
}
function kill_server(server) {
  psTree(server.pid, function (err, children) {
    cp.spawn('kill', ['-9'].concat(children.map(function (p) {return p.PID})))
  }) 
}
module.exports.previous_dir = previous_dir;
module.exports.create_previous_dir = create_previous_dirSync;
module.exports.remove_previous_dirSync = remove_previous_dirSync;
module.exports.kill_server = kill_server;
