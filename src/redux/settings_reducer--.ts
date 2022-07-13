import {API} from '../API/api'


let initialState = {
    startTime: 10,
    endTime: 20,
    // count: -1,
    // selectedDate: null,
    // selectedDateBooking: null
}

export type InitialStateType = typeof initialState

const SET_BOOKING = 'booking/booking/SET_BOOKING';
const SET_COUNT = 'booking/booking/SET_COUNT';
const SET_SELECTED_DATE = 'booking/booking/SET_SELECTED_DATE';
const SET_SELECTED_DATE_BOOKING = 'booking/booking/SET_SELECTED_DATE_BOOKING';

const settings_reducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {

        // case GET_TEST:
        //     // debugger
        //     return {
        //         ...state,
        //         catList: action.catList,
        //     }
        // case SET_ITEM_LIST:
        //     // debugger
        //     return {
        //         ...state,
        //         itemList: action.items,
        //     }
        // case APPEND_TO_ITEMS:
        //     // debugger
        //     return {
        //         ...state,
        //         itemList: [...state.itemList, ...action.items] ,
        //     }
        // case SET_COUNT_ITEMS:
        //     // debugger
        //     return {
        //         ...state,
        //         countItems: action.countItems,
        //     }
        // case SET_ITEMS_TOTAL:
        //     // debugger
        //     return {
        //         ...state,
        //         itemsTotal: action.itemsTotal,
        //     }
        // case SET_SEARCH_STRING:
        //     // debugger
        //     return {
        //         ...state,
        //         searchString: action.searchString,
        //     }
        // case SET_SELECTED_DATE:
        //     // debugger
        //     return {
        //         ...state,
        //         selectedDate: action.selectedDate,
        //     }
        // case SET_SELECTED_DATE_BOOKING:
        //     // debugger
        //     return {
        //         ...state,
        //         selectedDateBooking: action.selectedDateBooking,
        //     }
        // case SET_COUNT:
        //     // debugger
        //     return {
        //         ...state,
        //         count: action.count,
        //     }
        // case SET_BOOKING:
        //     // debugger
        //     return {
        //         ...state,
        //         allBooking: action.booking,
        //     }

        default:
            return state;

    }

}

export default settings_reducer;


export const setBooking = (booking: string) => {
    return {type: SET_BOOKING, booking: booking};
}
export const setCount = (count: string) => {
    return {type: SET_COUNT, count: count};
}
export const setSelectedDate = (selectedDate: string) => {
    return {type: SET_SELECTED_DATE, selectedDate: selectedDate};
}
export const setSelectedDateBooking = (selectedDateBooking: string) => {
    return {type: SET_SELECTED_DATE_BOOKING, selectedDateBooking: selectedDateBooking};
}


export const getSelectedDateBooking = () => async (dispatch: any,getState: any) => {
    let selectedDate = getState().book.selectedDate;
    if(selectedDate !== null){
        try{
            const result = await API.getBooking(selectedDate);
            if(result !== undefined){
                dispatch(setSelectedDateBooking(result.booking));
                // dispatch(setCount(result.count));
                console.log(result)
            }
        }catch(error){
            console.log(error)
            // dispatch(setNoInet(true))
        }
    }else{
        console.log('selectedDate is null')
    }
    
}
export const getBooking = () => async (dispatch: any) => {
    try{
        const result = await API.getBooking();
        if(result !== undefined){
            dispatch(setBooking(result.booking));
            dispatch(setCount(result.count));
        }
    }catch(error){
        console.log(error)
        // dispatch(setNoInet(true))
    }
}