var WebSocket=function(){
    this.Role=null;
    this.serverIp ="47.93.39.12";
    this.serverPort ="3014";
}
WebSocket.prototype.enter= function(Role,cb) {

    pomelo.on('disconnect', function(reason) {
        cc.log("pomelo.on() disconnect: ", reason);
    });
    
    pomelo.on('io-error', function(data) {
        cc.log("pomelo.on() io-error: ", data);
    });
    var that = this;
    that.Role=Role;
    cc.log("login()");
    that.queryEntry(Role.uid, function(host, port) {
        pomelo.init({
            host: host,  
            port: port,
            log: true
        }, function() {
            var route = "connector.entryHandler.enter";
            pomelo.request(route, {
                name: Role.name,
                uid: Role.uid
            }, function(data) {
                cc.log("pomelo.request return data: ", data);
                
                if(data.error) {
                    cc.log("pomelo.request return error");
                    return; 
                }
                that.login(cb);
            });
        });
    });
}
WebSocket.prototype.queryEntry= function(uid, callback) {
    var that = this;
    var route = 'gate.gateHandler.queryEntry';
    pomelo.init({
        host: that.serverIp,
        port: that.serverPort,
        log: true
    }, function() {
        pomelo.request(route, {
            uid: uid
        }, function(data) {
            cc.log("pomelo.request return data: ", data);
            
            pomelo.disconnect();
            if(data.code === 500) {
                return;
            }
            callback(that.serverIp, data.port);
        });
    });
}
WebSocket.prototype.login=function(cb)
{
    var that=this;
    var route = "game.gameHandler.login";
    pomelo.request(route, {
        name: that.Role.name,
        uid: that.Role.uid
    }, function(data) {
        cc.log(data);
        if(data.error) {
            cc.log("pomelo.request return error");
            return; 
        }
        if(cb){
            cb();    
        }

    });
}
//命令 args 是数组类型
WebSocket.prototype.command=function(cmd,args,cb)
{
    var route = "game.gameHandler.command";
    pomelo.request(route, {
        cmd: cmd,
        args:args,
    }, function(data) {
        cc.log(data);
        if(data.error) {
            return; 
        }
        if(cb){
            cb(data);
        }
    });
}
module.exports = new WebSocket();
