import * as actionTypes from "./actions";

const initialState = {
    ingredients : {
        salad : 0,
        bacon : 0,
        meat : 0,
        cheese : 0
    },
    totalPrice : 4
};

const reducer = (state=initialState,action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT :
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.changingIngredient] : state.ingredients[action.changingIngredient] + 1
                }
            };   //since returning break isnt needed
        case actionTypes.REMOVE_INGREDIENT :
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.changingIngredient] : state.ingredients[action.changingIngredient] - 1
                }
            };
        default :
            return state;
    }
};

export default reducer;
