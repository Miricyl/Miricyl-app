import AsyncStorage from '@react-native-community/async-storage';
import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { ActionType, IJoyItem, JoyItemAction, ThunkResult } from '../../storeTypes';



export const updateJoyItems = (joyItems: IJoyItem[]): JoyItemAction => ({
    type: ActionType.UPDATE_JOYITEMS,
    joyItems
})

export const updateJoy = (joyItem: IJoyItem, index: number): ThunkResult<void> => async (
    dispatch,
    getState
) => {
    try {
        let joyitemsString = await AsyncStorage.getItem('joyitems') as string;
        let joyitems: IJoyItem[] = []
        if (joyitemsString) {
            joyitems = JSON.parse(joyitemsString) as IJoyItem[];
            joyitems[index] = joyItem;

        }
        else {

            joyitems[0] = joyItem;

        }

        AsyncStorage.setItem('joyitems', JSON.stringify(joyitems));
        dispatch(updateJoyItems(joyitems))
    } catch (err) {
        throw err
    }
}

/* export const updateJoyItemsold = (joyitem:IJoyItem, index:number) => {
    return async dispatch: => {
        try {

            let joyitems = await AsyncStorage.getItem('joyitems');
            if (joyitems) {
                joyitems = JSON.parse(joyitems) as IJoyItem[];
                joyitems[index] = {
                    joyitem,

                };

            }
            else {

                joyitems = [{
                    joyitem,

                }
                ];

            }

            AsyncStorage.setItem('joyitems', JSON.stringify(joyitems));
            dispatch({ type: UPDATE_JOYITEMS, joyitems: joyitems })

        } catch (err) {
            throw err;
        }



    };
};

export const deleteJoyItem = (joyitem:IJoyItem, index:number) => {
    return async dispatch => {
        try {
            let joyitems = await AsyncStorage.getItem('joyitems');
            if (joyitems) {
                joyitems = JSON.parse(joyitems) as IJoyItem[];
                joyitems.splice(index, index);
                AsyncStorage.setItem('joyitems', JSON.stringify(joyitems));
                dispatch({ type: DELETE_JOYITEM, joyitem: joyitem });
            }

        } catch (err) {
            throw err;
        }
    };
};

export const getJoyItems = () => {
    return async dispatch=> {

        try {

            let joyitems = await AsyncStorage.getItem('joyitems');
            joyitems = JSON.parse(joyitems) as IJoyItem[];
            if (joyitems) {

                dispatch({ type: LOAD_JOYITEMS, joyitems: joyitems})
            }


        } catch (err) {
            throw err;
        }

    };
};


 */

