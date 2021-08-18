// 定义食物类
export default class Food {
    // 定义一个属性代表食物所对应的元素
    element: HTMLElement
    constructor() {
        // 获取页面中的food元素并将其赋值给element
        this.element = document.getElementById('food')!
    }
    // 定义一个获取食物X轴坐标的方法
    get X() {
        return this.element.offsetLeft
    }
    // 定义一个获取食物Y轴坐标的方法
    get Y() {
        return this.element.offsetTop
    }
    change() {
        let left = Math.round(Math.random() * 29) * 10
        let top = Math.round(Math.random() * 29) * 10
        this.element.style.left = left + 'PX'
        this.element.style.top = top + 'PX'
    }
}