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
var copyData=require("CopyData").CopyData;
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
        speed:100,   
        head:{
            default:null,
            type:cc.Prefab,
        },
        body:{
            default:null,
            type:cc.Prefab,
        },
        pos_y:800,
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
         
         
     },

    start () {
        this.count=1;
        let enemyHead= cc.instantiate(this.head);
        var _type=Math.round(Math.random(0,1));
        enemyHead.parent=this.node;
        enemyHead.getComponent('EnemyHead').init(_type);//接下来就可以调用 enemy 身上的脚本进行初始   
        enemyHead.getComponent('EnemyHead').SetPosY(0); 

        this.bodyLinkedList=new LinkedList();
        var bodyNumMin=copyData.type_1[0].num_min;
        var bodyNumMax=copyData.type_1[0].num_max;
        var bodyNumRan=rand(bodyNumMin,bodyNumMax);
        console.log("bodyNumRan============="+bodyNumRan);
        for(var i=0;i<bodyNumRan;i++)
        {
            let enemyBody = cc.instantiate(this.body);
            this.bodyLinkedList.append(enemyBody);
            enemyBody.parent = this.node; // 将生成的敌人加入节点树
            var _type=Math.round(Math.random(0,1));
           enemyBody.getComponent('EnemyBody').init(_type);//接下来就可以调用 enemy 身上的脚本进行初始   
           enemyBody.getComponent('EnemyBody').SetPosY((i+1)*40); 
           // body;
        } 
    },

     update (dt) {
        this.pos_y=this.pos_y-dt*this.speed;
        console.log("this.pos_y==================="+this.pos_y);
        this.node.y=this.pos_y;
     },
        
    onDestroy()
    {
        console.log("enemy destroy========");
       
    }
});
