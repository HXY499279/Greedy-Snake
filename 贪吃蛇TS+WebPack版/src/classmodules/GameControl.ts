import { Food } from './modules'
import { ScorePanel } from './modules'
import { Snake } from './modules'

// 游戏控制器，控制其他的所以类
export default class GameControl {
    // 定义三个属性
    snake: Snake
    food: Food
    scorePanel: ScorePanel
    // 定义蛇的移动方向
    direction: string = ''
    // 创建一个属性用来记录游戏是否结束
    isLive = true;

    constructor() {
        this.snake = new Snake()
        this.food = new Food()
        this.scorePanel = new ScorePanel()
        this.init()
    }

    init() {
        document.addEventListener('keydown', this.keydownHandler.bind(this))
        // 随机蛇的位置
        this.snake.change()
        this.food.change()
        this.run()
    }

    // 创建一个键盘按下的响应函数
    keydownHandler(evt: KeyboardEvent) {
        this.direction = evt.key;
    }

    // 创建一个控制蛇移动的方法
    run() {
        /* 
            根据方向(this.direction)来使蛇的位置改变
                向上 top 减少
                向下 top 增加
                向左 left 减少
                向右 left 增加
        */
        // 获取蛇的坐标
        let X = this.snake.X
        let Y = this.snake.Y

        // 根据按键改变蛇的位置
        switch (this.direction) {
            case "ArrowUp" || "up":
                Y -= 10
                break;
            case "ArrowDown" || "Down":
                Y += 10
                break;
            case "ArrowLeft" || "Left":
                X -= 10
                break;
            case "ArrowRight" || "Right":
                X += 10
                break;
        }

        // 如果蛇吃到食物了
        this.checkEat(X, Y)

        try {
            [this.snake.X, this.snake.Y] = [X, Y]
        } catch (e) {
            this.isLive = false
            alert("Game Over!")
            this.reset()
        }

        // 设置定时器让蛇移动
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30)
    }

    // 定义检查蛇是否吃到食物的方法
    // 定义一个方法，用来检查蛇是否吃到食物
    checkEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            // 食物的位置要进行重置
            this.food.change();
            // 分数增加
            this.scorePanel.addScore();
            // 蛇要增加一节
            this.snake.addBody();
        }
    }

    reset() {
        this.snake.change()
        this.food.change()
        this.isLive = true
        this.direction = ''
        for (let i = this.snake.bodies.length - 1; i > 0; i--) {
            this.snake.element.removeChild(this.snake.bodies[i])
        }
    }
}