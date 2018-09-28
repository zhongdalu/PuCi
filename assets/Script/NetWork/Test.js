
var Role = require("Role");
var NetWork = require("NetWork");
cc.Class({
    extends: cc.Component,

    properties: {

    },
    enter:function()
    {
        NetWork.enter(Role);
    },
    set_score:function()
    {
        NetWork.command('A01',[600000]);
    }
});
