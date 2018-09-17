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
    extends: base,
    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
    },
    start(){
        this.count=1;
        this.bodyLinkedList=new LinkedList();
        var bodyNumRan=this.bodyNumRan;//rand(this.bodyNumMin,this.bodyNumMax);
        for(var i=bodyNumRan;i>0;i--){    
            let enmy      
            if(i>1){  
                let enemyBody = cc.instantiate(this.body);
                this.bodyLinkedList.append(enemyBody);
                enemyBody.parent = this.node; // 将生成的敌人加入节点树
                var _type=Math.round(Math.random(0,1));
                enmy=enemyBody.getComponent('Enemy')      
            }else{
                let enemyHead= cc.instantiate(this.head);
                var _type=Math.round(Math.random(0,1));
                enemyHead.parent=this.node;
                enmy=enemyHead.getComponent('Enemy');//接下来就可以调用 enemy 身上的脚本进行初始   
              
            }
            let callback;
            if (i==bodyNumRan){ 
                callback=function(){
                     this.node.destroy();
                 };
                 callback=callback.bind(this);               
            }
            enmy.init(_type,callback);//接下来就可以调用 enemy 身上的脚本进行初始  
            enmy.SetPosY((i-1)*40); 
           // body;
        } 
    },

   update (dt) {
        this.pos_y=this.pos_y-dt*this.speed;
        this.node.y=this.pos_y; 
     },
});
