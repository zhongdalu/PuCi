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
var LinkedList=require("LinkedList").LinkedList;
var rand=require("Utils").rand
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
        count:1,
        destroyEffect:{
            default:null,
            type:cc.Prefab
        },
       
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
        this.node.x=this.pos_x ||0;
    },

    update (dt) {
       
     },
    init:function(_type,_callback){
        this.callback=_callback;
        this.type=_type;
     },
     onCollisionEnter: function (other, self) {
         var bullet=other.getComponent("Bullet");
         if(!cc.isValid(bullet))
         {
             return;
         }
        var  other_type=bullet.type;
        if (this.type>=0) {
            if(other_type!=this.type){
                this.count=this.count+1;
            }else{
                this.count=this.count-1;
            }
        }else{
            this.count=this.count-1;
        } 
        if(this.count==0){       
            var  pos_x=this.node.x;//+this.node.parent.x;   
            var  pos_y=this.node.y;//+this.node.parent.y;  
            cc.director.GlobalEvent.emit(window.Flags.score_add, {
                msg:1,
                position:{x:pos_x,y:pos_y},
                effect:this.destroyEffect
              });
              var effect=cc.instantiate(this.destroyEffect);
              this.node.parent.addChild(effect); 
              effect.x=pos_x;   
              effect.y=pos_y;     
              var ani=effect.getComponent(cc.Animation);
              ani.play('monsterDie');
              if(this.callback){
                  this.callback()
              }
              this.node.destroy();
        }else{
            var scale=1+(this.count-1)/10;
            this.node.setScale(scale, scale);
        }
        
    },
    onDestroy()
    {
       
    }
});
