// 定义表示记分牌的类
class ScorePanel{
    // score 和 level 用来记录分数和等级
    score = 0;
    level = 1;
    // 修改的是两个span，需要将对应的变量存起来
    // 分数和等级所在的元素，在构造函数中完成初始化
    scoreEle: HTMLElement;
    levelEle: HTMLElement;

    // 设置一个变量，用来限制等级，使用变量，比使用字面量，提高了可扩展性
    maxLevel: number;
    // 设置一个变量，表示多少分升一级
    upScore: number;

    constructor(maxLevel: number = 10, upScore: number = 10){
        this.scoreEle = document.getElementById("score")!;
        this.levelEle = document.getElementById("level")!;
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }

    // 设置加分的方法
    addScore(){
        //
        this.scoreEle.innerHTML = ++this.score + "";
        // 判断分数是否满足升级的条件
        if(this.score % this.upScore == 0){
            this.levelUp();
        }
    }
    
    // 提升等级的方法
    // 设计的思想，每提升一个等级，蛇的移动速度加快，如果不对等级约束，蛇的速度就会不受限制
    // 这里面的 10 被写成了一个字面量，降低了程序的可扩展性
    // 设置升级的条件，条件应该在score部分
    levelUp(){
        if (this.level < this.maxLevel){
            this.levelEle.innerHTML = ++this.level + "";
        }
    }

}

export default ScorePanel;


// 测试代码
// const scorepanel = new ScorePanel();
// for (let i = 0; i < 19; i++) {
//     scorepanel.addScore();
// }
// scorepanel.levelUp();