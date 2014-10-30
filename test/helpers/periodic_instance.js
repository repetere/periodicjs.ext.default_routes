var npm      = require('npm'),
    path     = require('path'),
    fs       = require('fs-extra'),
    child    = require('child_process'),
    periodic_cwd = path.resolve(previous_dir(),'/periodicjs/'),
    periodic = "periodicjs@latest";

create_previous_dirSync(previous_dir())

npm.load({prefix:previous_dir()}, function (err) {
    if (err) {
     throw err 
    }
  npm.commands.install([periodic], function (err, data) {
   if (err) {
    throw err 
   } 
   
  });
  npm.on("log", function (message) {
    // log the progress of the installation
    console.log(message);
  });
});


function start_server() {
 var server = child.exec('npm start',{cwd:periodic_cwd},function(error,stdout,stderr) { 
    if (error) {
    console.log(error.stack);
    }
    console.log(stdout);
 }); 
 return server;
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
//Use by passing the server pid like kill(server.pid)
function kill_server(pid, signal, callback) {
  signal   = signal || 'SIGKILL';
  callback = callback || function () {};
  var killTree = true;
  if(killTree) {
    psTree(pid, function (err, children) {
      [pid].concat(
        children.map(function (p) {
          return p.PID;
        })
      ).forEach(function (tpid) {
        try { process.kill(tpid, signal) }
        catch (ex) { }
      });
      callback();
    });
  } else {
    try { process.kill(pid, signal) }
    catch (ex) { }
    callback();
  }
};

module.exports.previous_dir = previous_dir;
module.exports.create_previous_dir = create_previous_dirSync;
module.exports.remove_previous_dirSync = remove_previous_dirSync;
module.exports.kill_server = kill_server;
