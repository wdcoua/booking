import {checkAuthorization} from "./auth_reducer";
import {getSettings} from "./settings_reducer";
// import {getOrder} from "./order_reducer";
// import {getCartItems} from "./cart_reducer";
import {API} from "../API/api";

const SET_INITIALIZED = 'sweet/app/SET_INITIALIZED';
const SET_NO_INET = 'sweet/app/SET_NO_INET';
const SET_CHECKER_STARTED = 'sweet/app/SET_CHECKER_STARTED';

let initialState = {
    initialized: false,
    no_inet: false,
    checker_started: false
}


const app_reducer = (state = initialState, action) => {

    switch (action.type) {


        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true,
            }
        case SET_NO_INET:
            return {
                ...state,
                no_inet: action.noinet,
            }
        case SET_CHECKER_STARTED:
            return {
                ...state,
                checker_started: action.checker_started,
            }
/*
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        /!*case LOG_OUT:
            return {
                ...state,
                isAuth: false
            }*!/

        case SET_USER_IMG:
            return {
                ...state,
                userImg: action.img
            }

        case SET_CAPTCHA_IMG:
            return {
                ...state,
                capthaImg: action.img
            }
        case SET_CAPTCHA_ANS:
            return {
                ...state,
                captchaAnswer: action.ans
            }*/
        /*        case SET_ERROR:
                    return {
                        ...state,
                        loginError:action.err
                    }*/


        default:
            return state;

    }

}

export const setInitialized = () => {
    return {type: SET_INITIALIZED};
}
export const setNoInet = (noinet) => {
    return {type: SET_NO_INET,noinet: noinet};
}
export const setCheckerStarted = (checker_started) => {
    return {type: SET_CHECKER_STARTED,checker_started: checker_started};
}

export default app_reducer;

// THUNKS


export const initializeApp = () => async (dispatch) => {
    try{

        let promise = dispatch(checkAuthorization())
        let promise2 = dispatch(getSettings())
        // let promise3 = dispatch(getOrder())
        // let promise4 = dispatch(getCartItems())
        // let data = await Promise.all([promise,promise2,promise3,promise4])
        Promise.all([promise,promise2])
            .then( () => {
                // console.log('init')
                // console.log(promise2)
                // debugger
                dispatch(setInitialized())
                // dispatch(setNoInet(false))

            }).catch(()=>{
            dispatch(setNoInet(true))
        })

    }
    catch(error){
        console.log(error)
        // dispatch(setNoInet(true))
    }


}
export const checkInet = () => async (dispatch) => {
    try{
        let result = await API.checkInet()
            if(result !== undefined && result.main_data.inet === '1'){
                dispatch(setNoInet(false))
                // console.log('NoInet +')
                // console.log(result)
            }else{
                dispatch(setNoInet(true))
                // console.log('NoInet')
                // console.log(result)
            }
                // console.log(result)

    //         })
    //
    }
    catch(error){
        // console.log(error)
        dispatch(setNoInet(true))
        console.log('NoInet')
    }


}