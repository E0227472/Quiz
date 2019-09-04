import * as actions from "../action";
// flobal quiz object is stored here.
const initialState = {
   quiz: {}
  
};

// to get state's current value, retrieve it from the application state - initialstate
// reducer to update the state. 
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SAVE_FORM_DATA: {
            return {
                ...state, 
                quiz: action.quiz
            };
        }
        
        default:
            return state;
    }
}

export default reducer;