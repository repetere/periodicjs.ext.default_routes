var child = require("child"),
    ___backgroundExec;
 
process.on('message',function(msg){
 
    this._dev_server = function(data){
        //Send the results back to the master process
        if(data){
          try{
            process.send(data);
          }
          catch(err){
            console.log("periodic_worker.js: problem with process.send() " + err.message + ", " + err.stack);
          }
        }
        else{
          console.log("periodic_worker.js: no data processed");
        }
    }
 
    this._startServer = function(){
        var count = 0;
 
        ___backgroundExec = child.exec(function(){
 
            try{
                this._dev_server(msg.command);
            }
            catch(err){
                count++;
                if(count == 3){
                    console.log("periodic_worker.js: shutdown timer...too many errors. " + err.message);
                    process.disconnect();
                }
                else{
                    console.log("periodic_worker.js error: " + err.message + "\n" + err.stack);
                }
            }
        });
    }
 
    this._init = function(){
        if(msg.startServer === true){
            this._startServer();
        }
        else{
            console.log("periodic_worker.js: Unable to start server.");
        }
    //bind to process and call when new message is passed in
    }.bind(this)()
 
})
 
process.on('uncaughtException',function(err){
    console.log("periodic_worker.js: " + err.message + "\n" + err.stack + "\n Stopping background server");
});
