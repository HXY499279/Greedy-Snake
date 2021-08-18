//创建画布
const canvas = document.getElementById('snake')
const ctx = canvas.getContext("2d")

let button = document.getElementById("button")
console.log(button)
//创建格子
const box = 32

//地图图片
const ground = new Image()
ground.src = './ground.png'
//食物图片
const foodImg = new Image()
foodImg.src = './food.png'

//创建蛇
var snake = []
snake[0] = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

//食物，坐标是随机的
var food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

//得分
var score = 0

//定义蛇行动的方向
var d
//将键盘和蛇行动的方向绑定起来
document.addEventListener("keydown", function direction(event) {
    var key = event.keyCode
    if (key === 37 && d !== "RIGHT") {
        d = 'LEFT'
    } else if (key === 38 && d !== "DOWN") {
        d = "UP"
    } else if (key === 39 && d !== "LEFT") {
        d = "RIGHT"
    } else if (key === 40 && d !== "UP") {
        d = "DOWN"
    }
})

//绘制地图
function draw() {
    //地图的位置
    ctx.drawImage(ground, 0, 0)
    //食物的位置
    ctx.drawImage(foodImg, food.x, food.y)
    //创建文本
    ctx.font = "25px Arial";
    ctx.strokeStyle = "white"
    ctx.strokeText("贪吃蛇1.0", 252, 40);
    ctx.strokeText(`得分: ${score}`, 500, 60);


    //渲染蛇
    for (let i = 0; i < snake.length; i++) {
        //若是头部就显示红色，尾部显示黑色
        ctx.fillStyle = (i === 0) ? "red" : "green"
        //渲染蛇的身子
        ctx.fillRect(snake[i].x, snake[i].y, box, box)
        //给蛇身加边框
        ctx.strokeStyle = 'black'
        ctx.strokeRect(snake[i].x, snake[i].y, box, box)
    }

    //记录原来的位置
    var snakeX = snake[0].x
    var snakeY = snake[0].y

    //转方向
    //在Y轴前进时才能左右转 左减右加
    if (d === "LEFT") snakeX -= box
    if (d === "RIGHT") snakeX += box
    //在x轴前进时才能上下转 上减下加
    if (d === "UP") snakeY -= box
    if (d === "DOWN") snakeY += box

    //记录新位置
    var newSnake = {
        x: snakeX,
        y: snakeY
    }

    //如果吃到食物，即头部与食物的位置一致
    if (snakeX === food.x && snakeY === food.y) {
        score++
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
    } else {
        snake.pop()//删除并返回数组的最后一个元素
    }

    //Game over
    //X轴 小于1个box 或者大于17个box
    //y轴 小于3个box 或者大于17个box
    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box) {
        clearInterval(game)
        ctx.strokeText("Game Over !", 235, 300);
        button.style.display = "block"
    }

    snake.unshift(newSnake)//在数组头部添加并返回一个元素

}

var game = setInterval(draw, 150);

