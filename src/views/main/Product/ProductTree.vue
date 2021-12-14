<template>
    <div>
        <el-tree
            :props="defaultProps"
            :load="loadNode"
            @node-click="handleNodeClick"
            lazy
        ></el-tree>
    </div>
</template>

<script>
export default {
    data() {
        return {
            defaultProps: {
                children: "children",
                label: "name",
            },
        };
    },
    methods: {
        handleNodeClick(data) {
            this.$emit("onTree",data)
        },
        loadNode(node, resolve){
            // 第一层数据
            if(node.level === 0){
                this.$api.selectItemCategoryByParentId().then(res =>{
                    if(res.data.status === 200){
                        return resolve(res.data.result)
                    }else{
                        return resolve([])
                    }
                })
            }
            // 后续展开数据
            if(node.level >= 1){
                this.$api.selectItemCategoryByParentId({
                    id:node.data.cid
                }).then(res =>{
                    if(res.data.status === 200){
                        return resolve(res.data.result)
                    }else{
                        return resolve([])
                    }
                }).catch(error =>{
                    resolve([])
                })
            }
        }
    },
};
</script>

<style>
</style>