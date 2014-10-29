var mongo_fixture = require('pow-mongodb-fixtures').connect('periodic_test');

module.exports.clear = clear;
module.exports.load = load;

function clear(collection,cb) {
  mongo_fixture.clear(collection, function(err) {
    if (err) {
      throw err;
    }else{
      cb();
    }
  });
}

function load(cb) {
 mongo_fixture.load(__dirname + 'test/fixtures/models', cb) 
}
