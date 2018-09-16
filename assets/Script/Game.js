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
    
        scoreTxt:{
            default:null,
            type:cc.Label
        },
        copyIndex:0,
        gameRound:1,
       
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
         this.scoreNum=0
         this.parentNode=cc.find("Canvas/fightNode");
         cc.director.GlobalEvent.on('next_copy', function (event) {
            console.log("next_copy===================="+event.msg);//+event.detail.msg
            //cc.director.loadScene("Start");  
            this.scheduleOnce(function() {
                this.nextCopy();
            }, 3) 
          },this);
          cc.director.GlobalEvent.on('game_over', function (event) {
            console.log("game_over===================="+event.msg);//+event.detail.msg
            //cc.director.loadScene("Start");   
            this.gameOver();
          },this);
          cc.director.GlobalEvent.on('score_add', function (event) {    
            var effect=cc.instantiate(event.effect);
            this.parentNode.addChild(effect); 
            effect.x=event.position.x;   
            effect.y=event.position.y;     
            var ani=effect.getComponent(cc.Animation);
            ani.play('monsterDie');
            this.scoreNum=this.scoreNum+event.msg;
            this.scoreTxt.string=this.scoreNum;
          },this);
          this.copyList=[this.node.getComponent('Copy_1'),this.node.getComponent('Copy_2'),this.node.getComponent('Copy_3')];
     },

    start () {
        this.scoreTxt.string='0';
        var copy=this.copyList[this.copyIndex];
        copy.begin(this.gameRound);
        this.copyCurrent=copy;
    },
    
     onDestroy(){
        cc.director.GlobalEvent.off('next_copy');
        cc.director.GlobalEvent.off('game_over');
        cc.director.GlobalEvent.off('score_add');
        
    },
    gameOver:function(){
        cc.director.loadScene("Start");     
    },
    nextCopy:function(){
       this.copyIndex=this.copyIndex+1;
       let copyIndex=this.copyIndex%3;
       this.gameRound=Math.ceil(this.copyIndex/3);
       for(var i=0;i<3;i++ ){
            if(i==copyIndex){
                this.copyList[i].begin(this.gameRound);
                this.copyCurrent=this.copyList[i];
            }else{
                this.copyList[i].over()
            }
       }  
       
    }
});
