// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
require ("Global");
require("Config");
require("Utils");
require("Flags");
cc.Class({
    extends: cc.Component,
    
    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        btn_start:{
            default:null,
            type:cc.Button
        },
       
     
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {

        window.NetWork.enter(window.Role);
        // window.NetWork.command('A01',[600000],function(data){
        //     console.error("data.code============="+data.code);
            
        //     switch (data.code) {
        //         case 1:
                    
        //         break;
            
        //         default:
        //             break;
        //     }

        // });
     },

    start () {
    
        this.btn_start.node.on(cc.Node.EventType.MOUSE_DOWN,function(event){
             console.log("event========"+event);
             cc.director.loadScene("Game");   
        },this)
       
       
    },

    // update (dt) {},
});
