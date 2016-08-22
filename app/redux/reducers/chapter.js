import { createReducer } from '../utils/createReducer';

const initialState = {
  pagenum: 1,
  items: [],
}

export default createReducer({
  ['GET_CHAPTER_SUCCESS']: (state, { payload }) => ({
    pagenum: 1,
    items: payload.pages,
  }),

  ['GET_CHAPTER_FAILURE']: (state, { payload, error }) =>
  console.error('error', error),

  ['NEXT_CHAPTER_PAGE']: (state) => {
    let pagenum = state.pagenum + 1
    pagenum = pagenum > state.items.length ? state.items.length : pagenum
    return {
      ...state,
      pagenum,
    }
  },

  ['PREVIOUS_CHAPTER_PAGE']: (state) => {
    let pagenum = state.pagenum - 1
    pagenum = pagenum < 1 ? 1 : pagenum
    return {
      ...state,
      pagenum,
    }
  },
}, initialState);
