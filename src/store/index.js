import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const judgeContain = function(out, inner) { // 判断out是否包含inner
  return (out.x < inner.x && out.y < inner.y && out.x + out.w > inner.x + inner.w && out.y + out.h > inner.y + inner.h)
}

const state = {
  rectArr: [], // rectArr仅用于绘制图上的方框
  root: {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    order: -1,
    level: 0,
    children: []
  },
  imgUrl: '',
}
const mutations = {
  pushRect(state, rect) { // 将r放入绘制数组和rect树中
    /**将r push到rect树中
     * 首先在绘制数组中，找到r最近的parent的order；（所有parent中面积最小的为最近的rect）
     * 再根据order，将r push到rect树中
     */
    let parentOrder = -1
    let area = 0
    for(let r of state.rectArr) {
        if(judgeContain(r, rect) && (!area || r.w * r.h < area)) {
            parentOrder = r.order
            area = r.w * r.h
        }
    }
    this.commit('pushToTree', {
      rect: rect,
      parentOrder: parentOrder,
      node: state.root,
    })

    /**将r push到绘制数组中 */
    state.rectArr.push(rect)

    console.log('testttt', state.root)
  },
  pushToTree(state, payload) {
      let {rect, parentOrder, node} = payload
      if(node.order === parentOrder) {
          rect.level = node.level + 1
          node.children.push(rect)
          return true
      }
      else if(node.children.length) {
          for(let item of node.children) {
              this.commit('pushToTree', {
                rect,
                parentOrder,
                node: item,
              })
          }
      }
      return false
  },
  changeRectName(state, payload) { // 根据order找到对应的rect并修改它的name
    let {order, name} = payload
    this.commit('dfsChangeName', {
      node: state.root,
      order,
      newName: name,
    })
  },
  dfsChangeName(state, payload) {
    let {node, order, newName} = payload
    if(node.order === order) {
      node.name = newName
    }
    else if(node.children.length) {
      for(let item of node.children) {
        this.commit('dfsChangeName', {
          node: item,
          order,
          newName,
        })
      }
    }
  },
  setImgUrl(state, payload) {
    let {url} = payload
    state.imgUrl = url
  }
}
const getters = {
  
}
const actions = {
  
}


const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
})



export default store