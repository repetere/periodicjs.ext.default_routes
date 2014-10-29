var npm     = require('npm'),
    path    = require('path'),
    fs      = require('fs-extra');
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
   console.log(data);
  });
  npm.on("log", function (message) {
    // log the progress of the installation
    console.log(message);
  });
});


function previous_dir() {
 return path.resolve(process.cwd(),'../periodic_Stub');
}
function create_previous_dirSync(path_to) {
 return fs.mkdirsSync(path_to); 
}
function remove_previous_dirSync() {
  return fs.removeSync(previous_dir());
}
module.exports.previous_dir = previous_dir;
module.exports.create_previous_dir = create_previous_dir;
module.exports.remove_previous_dirSync = remove_previous_dirSync;
