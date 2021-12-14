<template>

  <div class="product">
    
    <ProductHeader></ProductHeader>
    <ProductList></ProductList>
    <!-- <productPagination></productPagination> -->
    <!-- <ProductAdd></ProductAdd> -->
    <productEditor></productEditor>
  </div>
 
</template>

<script>
import ProductList from "./ProductList";
import ProductHeader from "./ProductHeader";
// import ProductAdd from "./ProductAdd";
import productEditor from './productEditor.vue'
export default {
  components: {
    ProductList,
    ProductHeader,
    // ProductAdd,
    productEditor,
  },
};
</script>

<style scoped>

.product {
padding: 20px;

}
</style>