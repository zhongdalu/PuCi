// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

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
        pos:new cc.Vec2(),
        speed:1000
    },
    

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
         cc.director.getCollisionManager().enabledDrawBoundingBox  = true;      
     },

    start () {
        this.node.position=this.pos;
        this.pos_y=this.node.y;
    },

     update (dt) {
         this.pos_y=this.pos_y+dt*this.speed;
         this.node.y=this.pos_y;
     },
     lateUpdate(){
         if (this.pos_y>1000)
         {  
            this.node.destroy();
         }
     },
     onCollisionEnter: function (other, self) {
        console.log('on collision enter-----------------');
    
        this.node.destroy();
    },
    init:function(_type){
        console.log('Bullet_type-----------------'+_type);
        this.type=_type;
    }
});
