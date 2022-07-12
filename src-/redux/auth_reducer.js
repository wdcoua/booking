import {API} from "../API/api";
import {stopSubmit} from "redux-form";
import {setInitialized, setNoInet} from "./app_reducer";
import {Redirect} from "react-router-dom";
// import {getCart, newCart} from "./cart_reducer";

const SET_USER_DATA = 'sweet/auth/SET_USER_DATA';
const SET_CAPTCHA_ANS = 'sweet/auth/SET_CAPTCHA_ANS';
const SET_SIGNUP_COMPLETED = 'sweet/auth/SET_SIGNUP_COMPLETED';

let initialState = {
    userID: null,
    email: null,
    login: null,
    isAuth: false,
    capthaImg: null,
    captchaAnswer: null,
    loginError: null,
    al: null,
    address: null,
    city: null,
    zip: null,
    np_dep: null,
    receiver: null,
    phone: null,
    temp: null,
    signup_completed: false

}


const auth_reducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
/*        /!*case LOG_OUT:
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
            }*/
        case SET_CAPTCHA_ANS:
            return {
                ...state,
                captchaAnswer: action.ans
            }
        case SET_SIGNUP_COMPLETED:
            return {
                ...state,
                signup_completed: true
            }
        /*        case SET_ERROR:
                    return {
                        ...state,
                        loginError:action.err
                    }*/


        default:
            return state;

    }

}

export default auth_reducer;

export const setUserAuthData = (userID, email, login, isAuth, capthaImg, captchaAnswer, loginError,al,address,phone,temp,city, zip,np_dep,receiver) => {
    return {type: SET_USER_DATA, payload: {userID, email, login, isAuth, capthaImg, captchaAnswer, loginError,al,address,phone,temp,city, zip,np_dep,receiver}};
}

export const setUserAuthCaptchaAnswer = (ans) => {
    return {type: SET_CAPTCHA_ANS, ans};
}
export const setSignupCompleted = () => {
    return {type: SET_SIGNUP_COMPLETED};
}

/////  THUNKS


export const checkAuthorization = () => async (dispatch) => {
    try{
        let data = await API.authMe();
        if (data.error === 0) {
            if(data.main_data.message === null || data.main_data.message === undefined  || data.main_data.message === 'new_user' ){
                // console.log('data.main_data')
                // console.log(data.main_data)
                let {id, login, email,al,address,phone,temp,city, zip,np_dep,receiver} = data.main_data;
                dispatch(setUserAuthData(id, email, login, true, null, null, null,al,address,phone,temp,city, zip,np_dep,receiver));
                // if(data.main_data.message === 'new_user') dispatch(newCart())
                dispatch(setInitialized())
            }else{
                // todo - опрацювати усі меседжі

                console.log('data.main_data.message')
                console.log(data.main_data.message)
            }

            // let resp2 = await API.getProfile(id);
            // dispatch(setUserProfile(resp2.data));
            // let data2 = await API.getStatus(id);
            // dispatch(setUserStatus(data2));

            // let promise1 = await API.getProfile(id);
            // let promise2 = await API.getStatus(id);
            // let data3 = await Promise.all([promise1,promise2])
            //     .then( () => {
            //
            //         dispatch(setUserProfile(promise1.data));
            //         dispatch(setUserStatus(promise2));
            //         // dispatch(setInitialized())
            //     })


        }else{

            // console.log('data.error')
            // console.log(data.error)
        }
    }
    catch(error){
        // console.log(error)
        dispatch(setNoInet(true))
        console.log('NoInet')
    }

}


export const logOut = () => async (dispatch) => {
    await API.logOut()
    // console.warn('logout2');
    //dispatch(setUserLogOut());
    dispatch(setUserAuthData(null, null, null, false, null, null, null,null,null,null,null,null,null,null,null));
    // dispatch(getCart())
}
export const setCaptchaAnswer = (c) => async (dispatch) => {
    // console.log('dsd')
    // console.log(c)
    dispatch(setUserAuthCaptchaAnswer(c));
}


export const login = (email, pass, remember) => async (dispatch,getState) => {
    let captcha = getState().auth.captchaAnswer;
    let data = await API.login(email, pass, remember, captcha);
     // console.log('data')
     // console.log(data)
    if (data.error === 0) {
        // console.log('login +')
        dispatch(checkAuthorization());
        // dispatch(getCart())
    } else {
        //dispatch(setUserAuthError(data.messages.join('<br/>')));

        dispatch(stopSubmit('auth', {_error: data.main_data.message/*.join('<br/>')*/}));

        // if (data.resultCode === 10) {
        //     let data = await API.getCaptcha();
        //     // dispatch(setUserAuthCaptchaImg(data.url));
        //     // todo зробити виведення помилок - а треба?
        // }
    }


}

export const signup = (login,email, pass, phone, addr) => async (dispatch,getState) => {
    // let captcha = getState().auth.captchaAnswer;
    let data = await API.signup(login,email, pass,phone,addr);
     // console.log('data')
     // console.log(data)
    if (data.error === 0) {
        // console.log('signup +')
        dispatch(setSignupCompleted());

    } else {
        //dispatch(setUserAuthError(data.messages.join('<br/>')));

        dispatch(stopSubmit('signup', {_error: data.main_data.message/*.join('<br/>')*/}));

        // if (data.resultCode === 10) {
        //     let data = await API.getCaptcha();
        //     // dispatch(setUserAuthCaptchaImg(data.url));
        //     // todo зробити виведення помилок - а треба?
        // }
    }


}

//

export const saveMyInfo = (addr,city, zip,np_dep,receiver, phone, pass) => async (dispatch) => {
    let data = await API.saveInfo(addr,city, zip,np_dep,receiver, phone, pass);
    // console.log('data')
    // console.log(data)
    if (data.error === 0) {
        console.log(data)
        // dispatch(setNewInfo(addr, phone, pass));
        // dispatch(stopSubmit('myInfo', {_notify: data.main_data.message/*.join('<br/>')*/}));
    } else {
        console.log(data)
        //dispatch(setUserAuthError(data.messages.join('<br/>')));

        dispatch(stopSubmit('myInfo', {_error: data.main_data.message/*.join('<br/>')*/}));

        // if (data.resultCode === 10) {
        //     let data = await API.getCaptcha();
        //     // dispatch(setUserAuthCaptchaImg(data.url));
        //     // todo зробити виведення помилок - а треба?
        // }
    }

}