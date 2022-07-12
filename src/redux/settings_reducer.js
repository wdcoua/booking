import {API} from "../API/api";
import {setNoInet} from "./app_reducer";


let initialState = {
    settings: {
        startTime: 10,
        endTime: 20,
    },
}

const SET_SETTINGS = 'sweetkids/settings/SET_SETTINGS';
const ADD_SETTINGS = 'sweetkids/settings/ADD_SETTINGS';

const settings_reducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_SETTINGS:
            // debugger
            return {
                ...state,
                settings: action.settings,
            }

        // case UPD_SETTINGS:
        //     // debugger
        //     return {
        //         ...state,
        //         settings: [...state.settings,action.newSettings],
        //     }

        default:
            return state;

    }

}

export default settings_reducer;

export const setSettings = (settings) => {
    return {type: SET_SETTINGS, settings: settings};
}
// export const updSettings = (newSettings) => {
//     return {type: UPD_SETTINGS, newSettings: newSettings};
// }

/*  THUNKs  */

export const getSettings = () => async (dispatch) => {
    try{
        const result = await API.getSettings();
        // console.log('getSettings');
        // console.log(result);
        dispatch(setSettings(result.main_data.settings));
    }
    catch(error){
        // console.log(error)
        dispatch(setNoInet(true))
    }

}
/*export const addNewSettings = (newSettings) => async (dispatch) => {
    const result = await API.addNewSettings(newSettings);
    console.log(result);
    dispatch(addSettings(newSettings));
}*/
export const updateSettings = (newSettings) => async (dispatch) => {
    const result = await API.updateSettings(newSettings);
    // console.log(result);
    dispatch(setSettings(newSettings));
}
/*
export const delCat = (catId) => async (dispatch) => {
    const result = await API.delCat(catId);
    console.log(result);
    dispatch(delCatLocal(catId));

}
export const saveCat = (catId,newCatData) => async (dispatch) => {
    const result = await API.saveCat(catId,newCatData);
    console.log(result);
    return dispatch(saveCatLocal(catId,newCatData));

}
export const saveCatsOrder = (newCatsOrder) => async (dispatch) => {
    const result = await API.saveCatsOrder(newCatsOrder);
    console.log(result);
    return dispatch(getCatList());

}
export const delItem = (itemId) => async (dispatch) => {
    const result = await API.delItem(itemId);
    console.log(result);
    dispatch(delItemLocal(itemId));

}
export const saveItem = (itemId,newItemData) => async (dispatch) => {
    const result = await API.saveItem(itemId,newItemData);
    console.log(result);
    return dispatch(saveItemLocal(itemId,newItemData));

}
export const getItemList = () => async (dispatch) => {
    const result = await API.getItems();
    console.log('result');
    console.log(result);
    dispatch(setItemList(result.items));
}
export const addNewItem = (newItem) => async (dispatch) => {
    await API.addItem(newItem)
        .then(() => {
            dispatch(getItemList());
        })
    // console.log('addNewItem -> result');
    // console.log(result);

}*/