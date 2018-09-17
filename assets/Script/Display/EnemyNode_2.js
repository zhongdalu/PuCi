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
        pos_x:0,
        y_offset:150,
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


   update (dt) {
        this.node.y=this.pos_y-this.y_offset*this.fsg;
        if (this.pos_x>500){
            this.moveFlag=true  
            this.fsg=this.fsg+1;     
        }else if(this.pos_x<-500){
            this.moveFlag=false 
            this.fsg=this.fsg+1;    
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
});
