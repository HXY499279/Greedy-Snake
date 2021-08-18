// 定义记分牌的类
export default class ScorePanel {
    private _score:number = 0;
    private _level:number = 1;

    scoreEle: HTMLElement
    levelEle: HTMLElement

    // 设置最大等级限制和升级的积分条件
    maxLevel: number
    upScore: number

    constructor(maxLevel = 10, upScore = 2) {
        // 初始化
        this.scoreEle = document.getElementById("score")!
        this.levelEle = document.getElementById("level")!
        this.scoreEle.innerHTML = this._score + ''
        this.levelEle.innerHTML = this._level + ''
        this.maxLevel = maxLevel
        this.upScore = upScore
    }
    get score() {
        return this._score
    }

    get level() {
        return this._level
    }


    // 加分
    addScore() {
        this.scoreEle.innerHTML = ++this._score + ''
        // 判断分数是多少,来升级
        if (this._score % this.upScore === 0) {
            this.levelUp()
        }
    }

    // 升级
    levelUp() {
        // 等级限制
        if (this.level < this.maxLevel) {
            this.levelEle.innerHTML = ++this._level + ''
        }
    }
}