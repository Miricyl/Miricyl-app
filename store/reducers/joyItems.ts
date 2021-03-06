import {ActionType, JoyItemAction} from '../../storeTypes';


const initialState = {
    joyItems:[]

};

export default (state = initialState, action:JoyItemAction) => {
    switch (action.type) {
        case ActionType.UPDATE_JOYITEMS:
            return {
                joyItems: action.joyItems
            };

        case ActionType.LOAD_JOYITEMS:
            return {
                joyItems: action.joyItems
            };

        default:
            return state

    }

};