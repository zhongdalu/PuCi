// 基本公式（暂定）：通过分数 score  = 轮数round * 基础score //（基础暂定20分）；
// 速度 speed = 基础speed  +  轮数round/3*20 ;//即每三轮速度加1
// num_min = 基础num_min +  轮数round/2；//即每两轮最小数+1，
// num_max = 基础num_max  轮数round；//即每一轮最大数+1；应该有上限，暂时先不定了，看看效果

var copydata;
var Expressions=cc.Class({
    ctor:function(copyIndex){
        switch (copyIndex) {
            case 1:
            copydata=window.CopyData['copy_1'];
            break;
            case 2:
            copydata=window.CopyData['copy_2'];
            break;
            case 3:
            copydata=window.CopyData['copy_3'];
            break;
        
            default:
            break;
        }
    },
    setRound:function(round){
       this.round=round     
    },
    getScore:function(){
       return  copydata.score*this.round    
    },
    getSpeed:function(){
        return  copydata.speed+Math.round(this.round/2*20); 
    },
    getNumMin:function(){
        return  copydata.num_min+Math.round(this.round/2); 
    },
    getNumMax:function(){
        return  copydata.num_max+Math.round(this.round); 
    }
}) 
Expressions._instance = null;
Expressions.getInstance = function (copyIndex) {
    if(!Expressions._instance){
        Expressions._instance = new Expressions(copyIndex);
    }
    return Expressions._instance;
}

module.exports=Expressions