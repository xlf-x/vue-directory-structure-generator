<template>
    <div class="board">
        <canvas
            class="bg-board"
            ref="bgBoard"></canvas>
        <canvas
            class="rect-board"
            ref="rectBoard"
            @mousedown="mouseDown"
            @mouseup="mouseUp"
            @mousemove="mouseMove"></canvas>
        <div v-if="!bgImg" class="upload-tip">请上传设计图</div>
    </div>
</template>

<script>
/**
 * 节点结构
 * node: {
 *      x: 0,
 *      y: 0,
 *      w: 0,
 *      h: 0,
 *      order: -1, // 被添加的顺序
 *      level: 0, // 在树中的层数
 *      name: '', // 名称
 *      color: '', // 颜色
 *      children: [],
 * }
 */
class Rectangle {
    constructor(obj) {
        this.x = obj.x
        this.y = obj.y
        this.w = obj.w
        this.h = obj.h
        this.order = obj.order
        this.level = obj.level
        this.name = obj.name
        this.color = obj.color
        this.children = obj.children
    }
}
export default {
name: "Board",
data() {
    return {
        x: 0,
        y: 0,
        drawing: false,
        lineColor: 'blue',
        bgImg: null,
        bgImgScaleRate: 0,

        nodeCount: 0,
    }
},
computed: {
    rectArr() { // rectArr仅用于绘制图上的方框
        return this.$store.state.rectArr || []
    },
    root() {
        return this.$store.state.root || {}
    },
    rectCnt() {
        return this.rectArr.length
    },
    bgImgUrl() {
        return this.$store.state.imgUrl || ''
    }
},
mounted() {
    // this.initCanvas(this.bgImgUrl)
},
methods: {
    initCanvas(url) {
        const canvas = this.$refs.bgBoard
        const rectCanvas = this.$refs.rectBoard
        const ctx = canvas.getContext("2d")
        this.bgImg = new Image()
        this.bgImg.src = url
        const img = this.bgImg
        const width = img.width > img.height ? 750 : 1000
        img.onload = function() {
            this.bgImgScaleRate = width / img.width
            canvas.width = width
            canvas.height = img.height * this.bgImgScaleRate
            ctx.drawImage(img, 0, 0, width, img.height * this.bgImgScaleRate)
            rectCanvas.width = width
            rectCanvas.height = img.height * this.bgImgScaleRate
            rectCanvas.getContext("2d").drawImage(img, 0, 0, width, img.height * this.bgImgScaleRate)
        }
    },
    mouseDown(e) {
        this.drawing = true
        this.x = e.offsetX
        this.y = e.offsetY
    },
    mouseUp(e) {
        this.drawing = false
        const x = this.x
        const y = this.y
        this.$store.commit('pushRect', new Rectangle({
            x: x,
            y: y,
            w: e.offsetX - x,
            h: e.offsetY - y,
            order: this.rectCnt,
            level: -1,
            name: 'defaultName',
            color: this.lineColor,
            children: [],
        }))
        },
    mouseMove(e) {
        this.drawRect(e)
    },
    drawRect(e) {
        if(this.drawing) {
            const canvas = this.$refs.rectBoard
            const ctx = canvas.getContext("2d")
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.beginPath()
            // this.globalCompositeOperation = 'destination-out'
            ctx.strokeStyle = this.lineColor
            ctx.lineWidth = 1
            const x = this.x
            const y = this.y
            ctx.strokeRect(x, y, e.offsetX - x, e.offsetY - y)
            for(let item of this.rectArr) {
                // ctx.strokeStyle = item.color
                ctx.strokeRect(item.x, item.y, item.w, item.h)
            }
        }
    },
},
watch: {
    bgImgUrl(newVal) {
        this.initCanvas(newVal)
    }
}
}
</script>

<style lang='less' scoped>
.board {
    position: relative;
    width: 1010px;
    min-height: 80%;
    margin-left: 5%;
    // border: 1px dashed #ccc;
}
.rect-board, .bg-board {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0%);
}
.upload-tip {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size:  30px;
}
</style>