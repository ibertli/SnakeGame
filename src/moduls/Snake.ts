class Snake{
    // 表示蛇头的元素
    head: HTMLElement;
    // 蛇的身体，包括蛇头， 该集合会实时刷新，自动补充新元素
    bodies: HTMLCollection;
    // 获取蛇的容器
    element: HTMLElement;

    constructor(){
        this.element = document.getElementById("snake")!;
        this.head = document.querySelector("#snake > div") as HTMLElement;
        this.bodies = this.element.getElementsByTagName("div");
    }

    // 获取蛇的坐标(toubu)
    get X(){
        return this.head.offsetLeft;
    }

    get Y(){
        return this.head.offsetTop;
    }

    // 设置头部的坐标
    set X(value: number){
        // 由于蛇在移动时，同时只能移动一个方向，所以在这里加个判断条件
        // 如果新值和旧值相同，则不在修改，直接返回
        if(this.X === value){
            return;
        }

        // X 的合法范围在 0-290 之间
        if(value < 0 || value > 290){
            // 能进入这个判断，说明蛇撞墙了
            throw new Error("蛇撞墙了");
        }

        // 修改X时，是在修改水平坐标，蛇在左右移动，蛇在向左移动时，不能向右走
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft == value){
            if(value > this.X){
                value = this.X - 10;
            }else{
                value = this.X + 10;
            }
        }

        // 移动身体
        this.moveBody();

        this.head.style.left = value + "px";

        this.checkHeadBody();

    }

    set Y(value: number){
        if(this.Y === value){
            return;
        }
        // Y 的合法范围在 0-290 之间
        if(value < 0 || value > 290){
            // 能进入这个判断，说明蛇撞墙了,抛出异常
            throw new Error("蛇撞墙了");
        }

        // 修改Y时，是在修改水平坐标，蛇在左右移动，蛇在向左移动时，不能向右走
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop == value){
            if(value > this.Y){
                value = this.Y - 10;
            }else{
                value = this.Y + 10;
            }
        }

        // 移动身体
        this.moveBody();

        this.head.style.top = value + "px";
        this.checkHeadBody();
    }

    // 设置蛇增加身体的方法
    addBody(){
        // 向element 中添加一个div
        this.element.insertAdjacentHTML("beforeend", "<div></div>")
    }

    // 添加蛇身体移动的方法
    moveBody(){
        // 后一个元素占据前一个元素的位置
        for(let i = this.bodies.length - 1; i > 0; i--){
            // 获取前边身体的位置
            let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i-1] as HTMLElement).offsetTop;

            // 将这个值设置到当前的身体上
            (this.bodies[i] as HTMLElement).style.left = X + "px";
            (this.bodies[i] as HTMLElement).style.top = Y + "px";
        }
    }

    checkHeadBody(){
        // 获取所有的身体，检查其是否和蛇头的坐标发生重叠
        for(let i = 1; i < this.bodies.length; i++){
            let bd = this.bodies[i] as HTMLElement;
            if(this.X === bd.offsetLeft && this.Y === bd.offsetTop){
                //撞到身体
                throw new Error("撞到了自己");
            }
        }
    }
}

export default Snake;