import store from "../store"

if(localStorage.getItem("limbo")){
    store.commit("login/setUser",JSON.parse(localStorage.getItem("limbo")))
}