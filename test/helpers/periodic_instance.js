'use strict';

var npm = require('npm'),
	path = require('path'),
	fs = require('fs-extra'),
	async = require('async'),
	child = require('child_process'),
	previous_dir = function () {
		return path.resolve(process.cwd(), '../periodicjs_Stub');
	},
	create_previous_dirSync = function (path_to) {
		return fs.mkdirsSync(path_to);
	},
	remove_previous_dirSync = function () {
		return fs.removeSync(previous_dir());
	},
	periodic_cwd = path.resolve(previous_dir(), '/periodicjs/'),
	periodic_version,
	currentExtensionPeerDependencies;

/**
 * gets the periodic version number from periodic.ext.json
 * @param  {Function} asyncCallback async callback
 */
var getExtPeriodicVer = function (asyncCallback) {
	var ext_json = path.resolve(process.cwd(), './periodicjs.ext.json');
	fs.readJson(ext_json, function (err, ext) {
		var version = String('periodicjs@' + ext.periodicCompatibility);
		periodic_version = version;

		asyncCallback(err, version);
	});
};

/**
 * install periodic stub for testing
 * @param  {Function} asyncCallback async callback function
 */
var installCorrectVersion = function (asyncCallback) {
	create_previous_dirSync(previous_dir());

	//npm.config skip_post_install =true
	if (fs.existsSync(periodic_cwd)) {
		asyncCallback(null, 'Periodic Installed!');
	}
	else {
		npm.load({
				prefix: previous_dir(),
				skip_post_install: true
			},
			function (err) {
				if (err) {
					asyncCallback(err, null);
				}
				else {
					npm.config.set('skip_post_install', true);
					npm.commands.install([periodic_version], function (err, data) {
						if (err) {
							asyncCallback(err, null);
						}
						else {
							asyncCallback(null, data);
						}
					});
					npm.on('log', function (message) {
						// log the progress of the installation
						console.log(message);
					});
				}
			});
	}
};

/**
 * copy current extenion to periodic stub
 * @param  {Function} asyncCallback async callback function
 */
var copyExt = function (asyncCallback) {
	asyncCallback(null, 'copied extension to stub');
	//fs.copy(currentext,dirinperiodicstub,function(err){
	//if(err){
	//async(err)}
	//else{
	//async(null,'copied')}
	//})
};

/**
 * get peer dependencies to install after current extension is copied into periodic stub
 * @param  {Function} asyncCallback async callback function
 */
var readPeerDeps = function (asyncCallback) {
	var current_ext_package_json = path.resolve(process.cwd(), 'package.json');
	fs.readJson(current_ext_package_json, function (err, json) {
		if (err) {
			asyncCallback(err, null);
		}
		else {
			currentExtensionPeerDependencies = json.peerDependencies;
			asyncCallback(err, 'got extension peerDependencies');
		}
	});
};
/**
 * get peer dependencies to install after current extension is copied into periodic stub
 * @param  {Function} asyncCallback async callback function
 */
var installPeerDeps = function (asyncCallback) {
	asyncCallback(null, 'installed extension peerDependencies');
};



/**
 * start periodic stub express app
 * @param  {Function} asyncCallback async callback function
 * @todo change the port
 * @todo try fork
 */
var start_server = function (asyncCallback) {
	asyncCallback(null, 'started periodicjs_Stub');
	// child.fork('./periodic_worker');
	// child.on('message',function(message) {
	//   console.log('From periodic worker: ' +  message);
	// });

	// child.send('npm run nd');



	//function start_server() {
	//var server = child.exec('npm start', {
	//cwd: periodic_cwd
	//}, function (error, stdout, stderr) {
	//if (error) {
	//console.log(error.stack);
	//}
	//console.log(stdout);
	//});
	//return server;
	//}
};


//Use by passing the server pid like kill(server.pid)
function kill_server(pid, signal, callback) {
	signal = signal || 'SIGKILL';
	callback = callback || function () {};
	var killTree = true;
	if (killTree) {
		psTree(pid, function (err, children) {
			[pid].concat(
				children.map(function (p) {
					return p.PID;
				})
			).forEach(function (tpid) {
				try {
					process.kill(tpid, signal);
				}
				catch (ex) {}
			});
			callback();
		});
	}
	else {
		try {
			process.kill(pid, signal);
		}
		catch (ex) {}
		callback();
	}
};

async.series({
		getPeriodicVersion: getExtPeriodicVer,
		installCorrectVersion: installCorrectVersion,
		copyExtentionToPeriodicStub: copyExt,
		readExtensionPeerDependencies: readPeerDeps,
		installExtPeerDeps: installPeerDeps,
		startPeriodicStubServer: start_server
	},
	function (err, status) {
		if (err) {
			throw err;
		}
		else {
			console.log('status', status);
		}
	});

module.exports.previous_dir = previous_dir;
module.exports.create_previous_dir = create_previous_dirSync;
module.exports.remove_previous_dirSync = remove_previous_dirSync;
module.exports.kill_server = kill_server;
