export default class Snake {
    // 表示蛇头的元素🐍
    head: HTMLElement
    bodies: HTMLCollection
    element: HTMLElement

    constructor() {
        this.head = document.querySelector('#snake>div')!
        this.element = document.getElementById('snake')!
        this.bodies = this.element.getElementsByTagName('div')!
    }

    // 获取蛇（蛇头）的坐标
    get X() {
        return this.head.offsetLeft
    }

    get Y() {
        return this.head.offsetTop
    }

    // 设置蛇（蛇头）的坐标
    set X(value: number) {
        // 如果坐标没变化就不更改
        if (this.X === value) {
            return
        }
        // 如果蛇出界了
        if (value < 0 || value > 290) {
            throw new Error("蛇撞墙了");
        }

        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            if (value > this.X) {
                value -= 20
            } else {
                value += 20
            }
        }

        this.moveBody()
        this.head.style.left = value + 'PX'
    }

    set Y(value: number) {
        // 如果坐标没变化就不更改
        if (this.Y === value) {
            return
        }
        // 如果蛇出界了
        if (value < 0 || value > 290) {
            throw new Error("蛇撞墙了");
        }

        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            if (value > this.Y) {
                value -= 20
            } else {
                value += 20
            }
        }

        this.moveBody()
        this.head.style.top = value + 'PX'
    }

    // 蛇增加身体
    addBody() {
        let node = document.createElement("div")
        this.element.appendChild(node)
    }

    // 蛇删除身体
    removeBody(node:Node){
        this.element.removeChild(node)

    }
    // 改变蛇的位置
    change() {
        let left = Math.round(Math.random() * 29) * 10
        let top = Math.round(Math.random() * 29) * 10
        this.head.style.left = left + 'PX'
        this.head.style.top = top + 'PX'
    }

    // 移动身体
    moveBody() {
        for (let i = this.bodies.length - 1; i > 0; i--) {

            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

            (this.bodies[i] as HTMLElement).style.left = X + 'PX';
            (this.bodies[i] as HTMLElement).style.top = Y + 'PX';
        }
    }
}