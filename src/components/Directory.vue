<template>
    <div class="directory">
        <tag v-for="(item, idx) of tags" :key="idx" :rect="item"></tag>
    </div>
</template>

<script>
import Tag from './Tag.vue'
export default {
    name: "Directory",
    components: {
        Tag
    },
    computed: {
        rectsRoot() {
            return this.$store.state.root || {}
        },
        tags() {// TODO：用v-for渲染时有bug，渲染出来的顺序与实际数组顺序不一致
            let tagArr = []
            for(let item of this.rectsRoot.children) {
                this.dfsPush(tagArr, item)
            }
            console.log('test', tagArr)
            return tagArr
        }
    },
    created() {
    },
    methods: {
        dfsPush(arr, node) {
            if(node) {
                arr.push(node)
                console.log(node.name)
                if(node.children.length) {
                    for(let n of node.children) {
                        this.dfsPush(arr, n)
                    }
                }
            }
        },
    }
}
</script>

<style lang='less' scoped>
.directory {
    display: flex;
    position: fixed;
    overflow: scroll;
    left: 50%;
    flex-direction: column;
    min-width: 20%;
    min-height: 100px;
}
</style>