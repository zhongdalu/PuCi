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
var copyData;//require("CopyData").CopyData;
var base=require('EnemyNodeBase');
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
        body:{
            default:null,
            type:cc.Prefab,
        },
        pos:{default:[],type:cc.Vec2},
    },
    start () {
        this.count=1;
        this.bodyLinkedList=new LinkedList();
        var bodyNumRan=1
        this.killNum=0;
        this.node.x= 0;//window.innerWidth/2;
        this.node.y= window.innerHeight/2;
        console.error("window.innerWidth========"+window.innerWidth);
        console.error("window.windowSize========"+window.windowSize);
        
        cc.director.GlobalEvent.on(window.Flags.score_add, function (event) {    
            this.killNum=this.killNum+event.msg;
            if (this.killNum==bodyNumRan) {
                 this.scheduleOnce(function() {
                    this.node.destroy();
                 },1)
                cc.director.GlobalEvent.emit(window.Flags.enemyNode_destroy, {
                });
                
            }
          },this);
        for(var i=bodyNumRan;i>0;i--){    
            let enmy;  
            let enemyBody = cc.instantiate(this.body);
            this.bodyLinkedList.append(enemyBody);
            enemyBody.parent = this.node; // 将生成的敌人加入节点树
            enmy=enemyBody.getComponent('Enemy')      
            let callback;
            enmy.count=10;
            let _type=-1;
            enmy.init(_type,callback);//接下来就可以调用 enemy 身上的脚本进行初始  
            enmy.SetPosY((i-1)*enmy.node.height); 
           // body;
        } 
    },
    update (dt) {   
       
     },
     onDestroy()
     {
        cc.director.GlobalEvent.off(window.Flags.score_add,this);
     }
});
