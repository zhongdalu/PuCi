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
        bodyNumRan:0,
        speed:100, 
        pos_y:600,
        direct:1,
        pos_x:0,
        y_offset:150,
        body_1:{
            default:null,
            type:cc.Prefab,
        },
        body_2:{
            default:null,
            type:cc.Prefab,
        },
    },
    onLoad(){
       this.fsg=0; 
       this.moveFlag=false;
       this.node.y=this.pos_y;
       this.node.x=this.pos_x;     
       switch (this.direct) {
        case 1:
            
        break;
        case 2:
            this.node.rotation = 270;
        break;
    
        default:
            break;
        }
    },
    start () {
        this.count=1;
        this.bodyLinkedList=new LinkedList();
        var bodyNumRan=this.bodyNumRan;//rand(this.bodyNumMin,this.bodyNumMax);
        this.killNum=0;
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
          let totalHeight=0;
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
            let callback=null;
            // if (i==bodyNumRan){ 
            //     callback=function(){
            //          this.node.destroy();
            //      };
            //      callback=callback.bind(this);               
            // }
            enmy.init(_type,callback);//接下来就可以调用 enemy 身上的脚本进行初始  
            enmy.SetPosY((i-1)*enmy.node.height); 
            totalHeight=totalHeight+enmy.node.height;
           // body;
        } 
        let innerWidth=window.windowSizeWidth;//window.innerWidth>900?window.innerWidth:900;
        this.innerWidth=innerWidth+totalHeight;
        console.error("this.pos_x========="+innerWidth+"========"+totalHeight); 
    },

   update (dt) {
        this.node.y=this.pos_y-this.y_offset*this.fsg;
        if (this.pos_x>this.innerWidth){
            this.moveFlag=true  
            this.fsg=this.fsg+1;   
            console.error("this.pos_x========="+this.pos_x);  
        }else if(this.pos_x<-this.innerWidth){
            this.moveFlag=false 
            this.fsg=this.fsg+1;   
            console.error("-this.pos_x========="+this.pos_x); 
        };
        if(this.moveFlag==true){
            this.node.rotation = 90; 
            this.pos_x=this.pos_x-dt*this.speed;    
        }else{
            this.node.rotation = 270; 
            this.pos_x=this.pos_x+dt*this.speed;    
        }
        this.node.x=this.pos_x;
     },
     onDestroy()
     {
        cc.director.GlobalEvent.off(window.Flags.score_add,this);  
     }
});
