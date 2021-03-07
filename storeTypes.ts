import { ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { ContentType } from './types'


export interface IJoyItem {
    type: ContentType;
    text?: string;
    url?: string;
    //TODO add image
}
// Enum of your action types
export enum ActionType {
    UPDATE_JOYITEMS = 'UPDATE_JOYITEMS',
    DELETE_JOYITEM = 'DELETE_JOYITEMS',
    LOAD_JOYITEMS = 'LOAD_JOYITEMS',
}

export type JoyItemState = {
    joyItems: IJoyItem[]
}

export type JoyItemAction = {
    readonly type: ActionType
    readonly joyItems: IJoyItem[]
}

export type DispatchType = (args: JoyItemAction) => JoyItemAction


// Create this reusable type that can be imported into your redux action files
export type ThunkResult<R> = ThunkAction<R, RootState, Services, RootAction>

// Services are only necesarry because we are using
// `reduxThunk.withExtraArgument({ webService }))` when we are creating our store.
export type Services = {
    
}

// Union type of all of your actions
export type RootAction = JoyItemAction

// Interface of your root Redux state
export interface RootState {
    readonly joyState: JoyItemState
}
