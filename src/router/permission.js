import router from "./index"
import store from "../store"

router.beforeEach((to,from,next) =>{
    if(to.meta.isLogin){
        let token = store.state.login.user.token;
        console.log("hhhhhhhhhhhhhhhhhhhhhhhh");
        console.log(token);
        console.log("hhhhhhhhhhhhhhhhhhhhhhhhh");
        if(token){
            next();
        }else{
            next({
                name:"Login"
            })
        }
    }else{
        next();
    }
    // if (to.meta.saixuan) {
        
    // }


})