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
        score:{
            default:null,
            type:cc.Label
        },
        scoreTxt:{
            default:null,
            type:cc.Label
        },
        text:"Score:",
        enemyPrefab: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
         this.scoreNum=0
          cc.director.GlobalEvent.on('game_over', function (event) {
            console.log("game_over===================="+event.msg);//+event.detail.msg
            //cc.director.loadScene("Start");   
            this.ReStart();
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
     },

    start () {
        this.scoreTxt.string='0';
        this.score.string=this.text;
        this.enemyPool = new cc.NodePool();
        this.destroyEffectPool=new cc.NodePool();
        let initCount = 5;
        for (let i = 0; i < initCount; ++i) {
            let enemy = cc.instantiate(this.enemyPrefab); // 创建节点
            this.enemyPool.put(enemy); // 通过 putInPool 接口放入对象池
        }
       this.dtTime=0
       this.parentNode=cc.find("Canvas");
       this.enemyList=[];
  //     this.createEnemy(this.parentNode);
        
    },
    createEnemy: function (parentNode) {
        let enemy = null;
        if (this.enemyPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            enemy = this.enemyPool.get();
        } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            enemy = cc.instantiate(this.enemyPrefab);
        }
        enemy.parent = parentNode; // 将生成的敌人加入节点树        
        this.enemyList.push(enemy);
    },

     update (dt) {
        this.dtTime=this.dtTime+dt;
        if (this.dtTime>3)
        {
            this.dtTime=0;        
            this.createEnemy(this.parentNode);
        }
     },
     onDestroy(){
        cc.director.GlobalEvent.off('game_over');
        cc.director.GlobalEvent.off('sore_add');
        
    },
    ReStart:function(){
        for ( var i = 0,l = this.enemyList.length; i < l; i++ ){
            //这样的写法是最常见的。最好理解的，也是通用的，对于a,b这两种类型的(伪)数组都能够。
            var en=this.enemyList[i];
           // this.enemyList.node.destroy();
            en.destroy()
        
            } 
        this.enemyList=[];
        this.scoreNum=0;
        this.scoreTxt.string=this.scoreNum;
        console.log('this.scoreTxt==========='+this.scoreNum);
    }
});
