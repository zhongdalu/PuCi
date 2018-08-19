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
        anim:{
            default:null,
            type:cc.Animation
        }
    
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
       
        var collision_manager=cc.director.getCollisionManager();
        collision_manager.enabled=true;
     },

    start () {
       
    },

    OnClick:function(event,customEventData)
    {
        console.log("evnet="+customEventData);   
        this.anim.play('gun');
        this.anim.playAdditive('run');
        //加载预制资源 PrefabUrl为 预制资源在 资源中的路径
        var PrefabUrl="bullet";
        cc.loader.loadRes(PrefabUrl,cc.Prefab, function(errorMessage,loadedResource){
             //开始实例化预制资源(这是个实例化是我自己理解的，可能说的不正确)
            var bullet = cc.instantiate(loadedResource);
            //将预制资源添加到父节点CanvasNode为画布canvas节点 是用cc.find()获得的对象
            var CanvasNode=cc.find("Canvas");
            CanvasNode.addChild(bullet);     
            bullet.getComponent('Bullet').init(customEventData);     
        });
    },
    onCollisionEnter: function (other, self) {     
        console.log("111111111111111111");
        this.node.dispatchEvent( new cc.Event.EventCustom('game_over', true) );   
        this.node.emit('game_over', {
            msg: 'hahahah===========',
          });
          cc.director.GlobalEvent.emit('game_over', {
            msg: 'hahahah===========',
          });
    },
    onDestroy(){

    }
    // update (dt) {},
});
