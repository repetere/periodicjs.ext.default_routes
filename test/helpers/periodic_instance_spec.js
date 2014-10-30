var expect       = require('chai').expect,
    path         = require('path'),
    exec = require('child_process').exec,
    previous_dir = require('./periodic_instance').previous_dir,
    remove_dir = require('./periodic_instance').remove_previous_dirSync,
    context = describe;
    chai.use(require('chai-fs'))

describe('The periodic Stub', function(){

  context('folder management of for the install process',function() {
    it('should have a stub folder in the previous directory', function(done){
      expect(previous_dir()).to.have.dirname('periodic_Stub')
      done();
    });
    it('should create a folder in the previous dir to install the instance', function(done){
      expect(previous_dir()).to.be.a.directory('periodic_Stub').and.empty;
      done(); 
    });
  })

  context('The npm install process',function() {
    this.timeout(9000);
    before(function(done){
      var install = 'node' + path.resolve(process.cwd(),'test/helpers/periodic_instance.js');
      exec(install,function(error,stdout,stderr) {
        if (error)  done(error) 
       capturedOut = stdout 
      })
      done();
    });
    after(function(done){
     remove_dir(previous_dir()) 
     done();
    });

    it('should install the latest periodic', function(done){
      var packageJson = path.resolve(previous_dir(),'package.json')
      expect(packageJson).to.be.a.file().with.json;
      done()
    });
    it('should match the package.json name', function(done){
      var packageJson = path.resolve(previous_dir(),'package.json')
      expect(packageJson).to.have.content.that.match(/periodicjs/)
      done()
    });
    it('should start the server on the periodic folder', function(done){
      expect()
      done()
    });
    it('should stop the serve once the test have completed', function(done){
      expect()
      done()
    });
  })
});

