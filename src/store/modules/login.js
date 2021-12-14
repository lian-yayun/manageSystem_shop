export default {
    namespaced:true,
    state:{
        user:{
         
            username:"",
            token:""
        }
    },
    mutations:{
        setUser(state,user){
            state.user = user;
        }
    }
}