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
        bodyNumRan:0,
        speed:100, 
        body_1:{
            default:null,
            type:cc.Prefab,
        },
        body_2:{
            default:null,
            type:cc.Prefab,
        },
        pos_y:600,
        direct:1
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
         
         
     },

    start () {
        this.count=1;
        this.bodyLinkedList=new LinkedList();
        var bodyNumRan=this.bodyNumRan;//rand(this.bodyNumMin,this.bodyNumMax);
        for(var i=bodyNumRan;i>0;i--){    
            let enmy  
            var _type=Math.round(Math.random(0,1))
            if(_type==0){  
                let enemyBody = cc.instantiate(this.body_1);
                this.bodyLinkedList.append(enemyBody);
                enemyBody.parent = this.node; // 将生成的敌人加入节点树
                enmy=enemyBody.getComponent('Enemy')      
            }else{
                let enemyHead= cc.instantiate(this.body_2);
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
            enmy.SetPosY((i-1)*enmy.node.height); 
           // body;
        } 
    },

     update (dt) {
       
     },
        
    onDestroy()
    {
        cc.director.GlobalEvent.emit('enemyNode_destroy', {
        });
           
    }
});
