import {
    SET_PEOPLELIST,
    SET_PEOPLESELECTED,
    SET_LOADING,
    SET_LOADINGLIST
} from './Actions';

const initState = {
    isLoading: false,
    isLoadingList: false,
    peopleList: [],
    peopleSelected: {}
}

export default function UiReducer(state = initState, action) {
    switch (action.type) {
        case SET_LOADINGLIST:
            return { ...state, isLoadingList: action.payload };
        case SET_LOADING:
            return { ...state, isLoading: action.payload };
        case SET_PEOPLELIST:
            return { ...state, peopleList: action.payload };
        case SET_PEOPLESELECTED:
            return { ...state, peopleSelected: action.payload };
        default:
            return state;
    }
}