<template>
  <div>
    <div class="top">
      <img src="@/assets/logo.png" alt="">
      <span>道乐科技</span>
      <div class="operations">
        <button class="btn">
          上传图片
          <input type="file" class="img-input" @change="addImg" ref="imgInput" accept="image/png,image/jpeg,image/gif,image/jpg"/>
        </button>
        <button class="btn">导出图片</button>
        <button class="btn">撤销框选</button>
      </div>
    </div>
    <div class="main">
      <board></board>
      <directory></directory>
    </div>
  </div>
</template>

<script>
import Directory from '@/components/Directory.vue'
import Board from '../components/Board.vue'
export default {
  name: 'Home',
  components: {
    Directory,
    Board
  },
  data() {
    return {

    }
  },
  methods: {
    addImg() {
      const imgInput = this.$refs.imgInput
      const imgFile = imgInput.files[0] // 只选取一张图片
      this.setImgUrl(imgFile)
    },
    setImgUrl(file) {
      let url = null
      if (window.createObjectURL) { // basic
        url = window.createObjectURL(file)
      } else if (window.URL) { // mozilla(firefox)
        url = window.URL.createObjectURL(file)
      } else if (window.webkitURL) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file)
      }
			if(url) {
				this.$store.commit('setImgUrl', {
					url,
				})
				console.log('url test', this.$store.state.imgUrl)
			}
			return false
    },
  }
}
</script>

<style lang="less" scoped>
.top {
  display: flex;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #e8e8e8;
  margin-bottom: 30px;
  img {
    width: 50px;
    height: 50px;
    margin-left: 2%;
  }
  span {
    font-size: 20px;
    line-height: 50px;
    margin-left: 10px;
  }
  .operations {
    height: 100%;
    width: 50%;
    display: flex;
    margin-right: 100px;
    justify-content: flex-end;
    flex: 1; 
    align-items: center;
  }
}
.main {
  display: flex;
  height: 80vh;
  overflow-y: scroll;
  .directory {
    margin-left: 10%;
  } 
}
.btn {
  position: relative;
  width: 80px; /* 宽度 */
	height: 30px; /* 高度 */
	border-width: 0px; /* 边框宽度 */
	border-radius: 3px; /* 边框半径 */
	background: #1E90FF; /* 背景颜色 */
	cursor: pointer; /* 鼠标移入按钮范围时出现手势 */
	outline: none; /* 不显示轮廓线 */
	color: white; /* 字体颜色 */
  margin-right: 40px;
  vertical-align: middle;
  font-size: 14px;
}
.img-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
</style>