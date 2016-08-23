import { createReducer } from '../utils/createReducer';

const initialState = {
  items: [],
}

export default createReducer({
  ['ADD_MY_LIST_ITEM']: (state, { payload }) => {
    const isNotInList = state.items.filter(({mangaid}) => mangaid == payload.mangaid).length < 1
    if(isNotInList){
      return {
        ...state,
        items: [
          ...state.items,
          payload,
        ]
      }
    }else{
      return state
    }
  },
}, initialState)
