// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var Bullet=require("Bullet");
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
        type:0,
        speed:100,
        color_1:{
            default:new cc.Color(253,167,131),
            type:cc.Color
        },
        color_2:{
            default:new cc.Color(113,205,237),
            type:cc.Color
        },
        destroyEffect:{
            default:null,
            type:cc.Prefab
        }
        
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        // cc.director.getCollisionManager().enabledDrawBoundingBox  = true;
         
     },
     SetPosY:function(posY){
        this.pos_y=posY;
     },

    start () {
        this.node.y=this.pos_y;    
        this.count=1;  
    },

     init:function(_type){
         this.type=_type;
         if (this.type==1)
         {
            this.node.color=this.color_1;//new cc.color(0,0,0,255);
        }else
        {
            this.node.color=this.color_2;
        }

     },
     onCollisionEnter: function (other, self) {
         var bullet=other.getComponent("Bullet");
         if(!cc.isValid(bullet))
         {
             return;
         }
        var  other_type=bullet.type;
        if(other_type!=this.type){
            this.count=this.count+1;
        }else{
            this.count=this.count-1;
        }
        if(this.count==0){
            this.node.destroy();
            cc.director.GlobalEvent.emit('score_add', {
                msg: 1,
              });
        }else{
            var scale=1+(this.count-1)/10;
            this.node.setScale(scale, scale);
        }
        
    },
    onDestroy()
    {
        console.log("enemy  body destroy========");
       
    }
});
