
const initialState = {
    token:localStorage.getItem("token"),
    isAuthenticated:null,
    loading:true,
    user:null
};

const authReducer = (state=initialState,action)=>{
    switch(action.type){

        case "USER_LOADED":
            return{
                ...state,
                isAuthenticated:true,
                loading:false,
                user:action.user
            }

        case "REGISTER_SUCCESS":
        case "LOGIN_SUCCESS":
            localStorage.setItem("token",action.token);
            return{
                ...state,
                token:action.token,
                isAuthenticated:true,
                loading:false
            }
        case "REGISTER_FAIL":
        case "AUTH_ERROR":
        case "LOGIN_FAIL":
        case "LOGOUT":
            localStorage.removeItem("token");
            return{
                token:null,
                isAuthenticated:false,
                loading:false,
            }
        default:
            return state;
    }
}

export default authReducer;