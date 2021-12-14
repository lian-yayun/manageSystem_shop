<template>
  <div class="wang" ref="editorWang" style="text-align: left;"></div>
</template>

<script>
import wangEditor from "wangeditor";
export default {
  data() {
    return {
      editor: null,
      editorData: "",
    };
  },
  props:{
currentEditorData:{
type:String,
default:"",
}
  },
  watch:{
currentEditorData(newVal,oldVal){
  this.editor.txt.html(newVal) 
}
  },
  mounted() {
    this.editor = new wangEditor(this.$refs.editorWang);
    this.editor.config.onchange = (newHtml) => {
      this.editorData = newHtml;
      this.$emit("onEditor",this.editorData)
    };
    this.editor.config.menus = [
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "foreColor", // 文字颜色
      "backColor", // 背景颜色
      "link", // 插入链接
      "list", // 列表
      "justify", // 对齐方式
      "quote", // 引用
      "emoticon", // 表情
      "image", // 插入图片
      "table", // 表格
      "code", // 插入代码
      "undo", // 撤销
      "redo", // 重复
    ];
    this.editor.create();
  },
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy();
    this.editor = null;
  },
};
</script>

<style scoped>

</style>