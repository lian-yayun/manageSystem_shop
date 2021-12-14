import axios from "../utils/request"
import base from "./base"

const api = {
    /**
     * 注册
     */
    register(params) {
        return axios.post(base.baseUrl + base.register, params)
    },
    /**
     * 登陆
     */
    login(params) {
        return axios.post(base.baseUrl + base.login, params)
    },
/**
 * 
 * ，密码
 */
 searchUser(params) {
    return axios.get(base.baseUrl + base.searchUser, {
        params
    })
},
    /**
     * 商品列表
     */
    selectTbItemAllByPage(params) {
        return axios.get(base.baseUrl + base.selectTbItemAllByPage, {
            params
        })
    },
    selectUserAllByPage(params){
        return axios.get(base.baseUrl+base.selectUserAllByPage,{
            params
        })
    },
    /**
     * 商品总条数
     */
    total() {
        return axios.get(base.baseUrl + base.total)
    },
    customertotal(){
        return axios.get(base.baseUrl+base.customertotal)
    },
    usertotal(){
return axios.get(base.baseUrl+base.usertotal)
    },
    /**
     * 模糊查询
     */
    search(params) {
        return axios.get(base.baseUrl + base.search, {
            params
        })
    },
    searchuser(params) {
        return axios.get(base.baseUrl+base.searchuser,{
            params
        })
    },
    searchList(params) {
        return axios.get(base.baseUrl+base.searchList,{
            params
        })
    },
    searchCustomer(params) {
        return axios.get(base.baseUrl+base.searchCustomer,{
            params
        })
    },
    searchBacklist(params) {
        return axios.get(base.baseUrl+base.searchBacklist,{
            params
        })
    },
    deleteUser(params) {
        return axios.get(base.baseUrl+base.deleteUser,{
            params
        })
    },
    deleteCustomer(params) {
        return axios.get(base.baseUrl+base.deleteCustomer,{
            params
        })
    },
    deleteSellBackList(params) {
        return axios.get(base.baseUrl+base.deleteSellBackList,{
            params
        })
    },
    //图表
    customerFujian(params) {
        return axios.get(base.baseUrl+base.customerFujian,{
            params
        })
    },
    customerGuangdong(params) {
        return axios.get(base.baseUrl+base.customerGuangdong,{
            params
        })
    },
    customerShanghai(params) {
        return axios.get(base.baseUrl+base.customerShanghai,{
            params
        })
    },
    customerJiangsu(params) {
        return axios.get(base.baseUrl+base.customerJiangsu,{
            params
        })
    },
    customerBeijing(params) {
        return axios.get(base.baseUrl+base.customerBeijing,{
            params
        })
    },
    customerGansu(params) {
        return axios.get(base.baseUrl+base.customerGansu,{
            params
        })
    },
    customerYunnan(params) {
        return axios.get(base.baseUrl+base.customerYunnan,{
            params
        })
    },
    customerGuizhou(params) {
        return axios.get(base.baseUrl+base.customerGuizhou,{
            params
        })
    },
    customerHainan(params) {
        return axios.get(base.baseUrl+base.customerHainan,{
            params
        })
    },
  //退货
  selectBack(params) {
    return axios.get(base.baseUrl+base.selectBack,{
        params
    })
},
deleteSellBack(params) {
    return axios.get(base.baseUrl+base.deleteSellBack,{
        params
    })
},
insertreason(params) {
    return axios.get(base.baseUrl+base.insertreason,{
        params
    })
},
    // 商铺----------------------------------

    /**
     * 商铺列表
     */
    selectTbshopAllByPage(params) {
        return axios.get(base.baseUrl + base.selectTbshopAllByPage, {
            params
        })
    },

    selectCustomerAllByPage(params) {
        return axios.get(base.baseUrl + base.selectCustomerAllByPage, {
            params
        })
    },
    selectList(params) {
        return axios.get(base.baseUrl + base.selectList, {
            params
        })
    },
    deleteList(params) {
        return axios.get(base.baseUrl + base.deleteList, {
            params
        })
    },
    selectBackList(params) {
        return axios.get(base.baseUrl + base.selectBackList, {
            params
        })
    },
    /**
     * 商品总条数
     */
    shoptotal() {
        return axios.get(base.baseUrl + base.shoptotal)
    },
    totalBList() {
        return axios.get(base.baseUrl + base.totalBList)
    },
    /**
     * 模糊查询
     */
    searchshop(params) {
        return axios.get(base.baseUrl + base.searchshop, {
            params
        })
    },
    /**
     * 类目选择
     */
    selectshopCategoryByParentId(params) {
        return axios.get(base.baseUrl + base.selectshopCategoryByParentId, {
            params
        })
    },


    /**
     * 
     *  删除
     *  
     */

    deleteshopItemById(params) {
        return axios.get(base.baseUrl + base.deleteshopItemById, {
            params
        })
    },
    insertTbShopItem(params) {
        return axios.get(base.baseUrl + base.insertTbShopItem, {
            params
        })
    },


    // ----------------------------------

    /**
     * 类目选择
     */
    selectItemCategoryByParentId(params) {
        return axios.get(base.baseUrl + base.selectItemCategoryByParentId, {
            params
        })
    },
    /**
     * 商品添加 
     */
    insertTbItem(params) {
        return axios.get(base.baseUrl + base.insertTbItem, {
            params
        })
    },
    /**
     * 商品删除
     */
    deleteItemById(params) {
        return axios.get(base.baseUrl + base.deleteItemById, {
            params
        })
    },
    /**
     * 预更新
     */
    preUpdateItem(params) {
        return axios.get(base.baseUrl + base.preUpdateItem, {
            params
        })
    },
    preReason(params) {
        return axios.get(base.baseUrl + base.preReason, {
            params
        })
    },
    preUpdateShop(params) {
        return axios.get(base.baseUrl + base.preUpdateShop, {
            params
        })
    },
    preUpdateList(params) {
        return axios.get(base.baseUrl + base.preUpdateList, {
            params
        })
    },
    prebackList(params) {
        return axios.get(base.baseUrl + base.prebackList, {
            params
        })
    },
    /**
     * 商品修改
     */
    updateTbItem(params) {
        return axios.get(base.baseUrl + base.updateTbItem, {
            params
        })
    },

    /**
     * 商铺修改
     */
    updateShop(params) {
        return axios.get(base.baseUrl + base.updateShop, {
            params
        })
    },
    updatePassword(params) {
        return axios.get(base.baseUrl + base.updatePassword, {
            params
        })
    },
    updateList(params) {
        return axios.get(base.baseUrl + base.updateList, {
            params
        })
    },
    updateReason(params) {
        return axios.get(base.baseUrl + base.updateReason, {
            params
        })
    },
    updateCheck(params) {
        return axios.get(base.baseUrl + base.updateCheck, {
            params
        })
    },
   
}

export default api;