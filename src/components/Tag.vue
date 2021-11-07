<template>
  <div class="tag">
    <span v-for="n in level" :key="n" style="display: inline-block; width: 50px;"></span>
    <div class="text">
      +
      <input
        v-if="editing"
        type="text"
        v-model="tagText"
        @keyup.enter="finishEditing"
        :ref="refName">
      <div v-else @click="startEditing">{{tagText}}</div>
    </div>
    <button class="btn" @click="editing ? finishEditing() : startEditing()">{{editing ? '保存' : '编辑'}}</button>
  </div>
</template>

<script>
  export default {
    name: "Tag",
    props: {
      rect: {
        type: Object,
        default: function() {
          return {}
        }
      }
    },
    data() {
      return {
        editing: false,
        tagText: '',
        order: 0,
        refName: '',
        level: 0,
      }
    },
    mounted() {
      this.tagText = this.rect.name || 'defaultName'
      this.order = this.rect.order || 0
      this.level = this.rect.level || 0

      // this.refName = this.tagText.split(' ')[0] + this.order
      if(this.tagText === 'defaultName') this.editing = true
    },
    methods: {
      startEditing() {
        this.editing = true
        // this.$refs[this.refName].focus()
      },
      finishEditing() {
        this.$store.commit('changeRectName', {
          order: this.order,
          name: this.tagText,
        })
        this.editing = false
      }
    }
  }
</script>

<style lang='less' scoped>
@fontSize: 16px;
@divWidth: 208px;
@divHeight: 20px;
@inputWidth: 200px;
@inputHeight: 20px;
.text {
  display: inline-block;
  margin-bottom: 15px;
  div {
    display: inline-block;
    font-size: @fontSize;
    width: @divWidth;
    height: @divHeight;
    text-align: left;
  }
  input {
    font-size: @fontSize;
    width: @inputWidth;
    height: @inputHeight;
  }
}
.btn {
  width: 60px; /* 宽度 */
	height: 30px; /* 高度 */
	border-width: 0px; /* 边框宽度 */
	border-radius: 3px; /* 边框半径 */
	background: #1E90FF; /* 背景颜色 */
  margin-left: auto;
	cursor: pointer; /* 鼠标移入按钮范围时出现手势 */
	outline: none; /* 不显示轮廓线 */
	color: white; /* 字体颜色 */
  margin-left: 20px;
  vertical-align: middle;
  font-size: 14px;
}
</style>