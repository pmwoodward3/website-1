import { createSelector } from 'reselect'

const chapterSelector = (state) => state.chapter

export const chapter = createSelector(
  chapterSelector,
  (chapter) => chapter,
)

export default chapter
