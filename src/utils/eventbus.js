import Vue from "vue"

const EventBus = new Vue();
Object.defineProperties(Vue.prototype,{
    $bus:{
        get(){
            return EventBus
        }
    }
})