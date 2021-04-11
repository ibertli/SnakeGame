// 游戏控制器，控制其他的所有类
// 1. 首先需要引入其他的类
import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";


class GameControl{
    // 2. 定义三个属性
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;

    // 创建一个属性，来保存蛇的移动方向，也就是按键的方向
    direction: string = "";
    // 创建一个属性，用来记录游戏是否结束
    isLive = true;

    constructor(){
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();

        this.init();
    }

    // 游戏的初始化方法，调用后游戏即开始
    init(){
        // 1. 绑定键盘按键按下的事件
        document.addEventListener("keydown", this.keydownHandler.bind(this));
        // 调用run方法，使蛇移动
        this.run();

    }
    
    //创建一个键盘按下的响应函数
    // event.key = ArrowUp  ArrowLeft  ArrowDown  ArrowRight
    // 在 IE中，只有 Up, Left, Down, Right
    keydownHandler(event: KeyboardEvent){
        // 在这里修改direction 的属性,赋值之前需要检查用户的按键行为，确认是否按下了正确的按键
        this.direction = event.key;

    }

    // 获得键盘的按键之后，还需要一个能让蛇移动的方法，也就是动态修改蛇头部元素的left和top值
    run(){
        // 根据 this.direction 来使蛇的位置发生改变
        // 向上：top减小，向下：top增大，向左：left减小，向右：left增大
        let X = this.snake.X;
        let Y = this.snake.Y;

        // 根据按键方向，修改X值和Y值
        console.log(this.direction);
        switch(this.direction){
            case "ArrowUp":
            case "Up":
                Y -= 10;
                break;
            case "ArrowDown":
            case "Down":
                Y += 10;
                break;
            case "ArrowLeft":
            case "Left":
                X -= 10;
                break;
            case "ArrowRight":
            case "Right":
                X += 10;
                break;
        }

        // 检查蛇是否吃到了食物
        this.checkEat(X, Y);


        // 修改蛇的X值和Y值
        try {
            this.snake.X = X;
            this.snake.Y = Y;
        } catch (error) {
            alert(error.message + "GAME OVER!");
            // 在Snake.ts中设置了error，这里就会捕获异常，程序不会终止，会继续向下进行；所以需要设置状态位
            this.isLive = false;
        }
        

        //开启一个定时调用: new 一个对象的时候，执行构造函数中的代码，也就会执行init()方法，也就会执行run方法
        // run()方法中，设置了一个定时器，根据this.run.bind(this) 说明，每次run方法执行一次后，都会开启新的定时器
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level -1) * 30);
    }

    // 定义一个方法，检查蛇是否吃到了食物
    checkEat(X:number, Y:number){
        if(X === this.food.X && Y === this.food.Y){
            // 1. 吃到食物后，食物的位置需要重置；
            this.food.change();
            // 2. 记分牌上的分数要增加
            this.scorePanel.addScore();
            // 3. 蛇增加一段长度
            this.snake.addBody();
        }

    }
}

export default GameControl;