// import {API} from '../API/api'


let initialState = {
    test: 1
}

export type InitialStateType = typeof initialState

const admin_reducer = (state = initialState, action: any): InitialStateType => {

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
        // case SET_SORT_BY:
        //     // debugger
        //     return {
        //         ...state,
        //         sortBy: action.sortBy,
        //     }
        // case SET_SELECTED_CATS:
        //     // debugger
        //     return {
        //         ...state,
        //         selectedCats: action.selectedCats,
        //     }

        default:
            return state;

    }

}

export default admin_reducer;