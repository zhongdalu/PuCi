// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var rands =function (min,max) {
    return Math.round(Math.random()*(max-min))+min
};
var IsNull=function(obj){
    var bl=true
    console.log("obj.isValid========"+obj.isValid)
    return obj==null || !obj.isValid
}

module.exports=
{
    rand:rands,
}
window.utils={
    rand:rands,
    IsNull:IsNull,
};