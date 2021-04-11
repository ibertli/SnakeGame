// 以面向对象开发的思想来写

// 1.先定义food类
class Food{
    // 定义一个属性，表示食物对应的元素
    element: HTMLElement;

    constructor(){
        // 获取页面中的food元素，并将其赋值给element,加一个 ! 表示不可能为null
        this.element = document.getElementById("food")!;
    }

    // 定义获取食物x轴坐标的方法,用get X(){}这种形式定义方法，可以通过 实例.X 来调用方法
    get X(){
        return this.element.offsetLeft;
    }

    // 定义一个获取食物y轴坐标的方法
    get Y(){
        return this.element.offsetTop;
    }

    // 修改食物位置的方法：蛇吃到当前食物后，下一个食物的位置要变化
    change(){
        // 生成一个随机的位置，食物的位置最小是0，最大是290，
        // 蛇每次移动的位置就是一格，大小是10，要求食物的坐标必须是整10，
        let left = Math.round(Math.random() * 29) * 10;
        let top = Math.round(Math.random() * 29) * 10;

        this.element.style.left = left + "px";
        this.element.style.top = top + "px";
    }
}

// 测试代码
// const food = new Food();

// food.change();
// console.log(food.X);
// console.log(food.Y);

export default Food;