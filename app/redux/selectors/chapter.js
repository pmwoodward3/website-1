import { createSelector } from 'reselect'

const chapterSelector = (state) => state.chapter

export const chapter = createSelector(
  chapterSelector,
  (chapterItem) => ({
    ...chapterItem,
    items: chapterItem.items
    .asMutable()
    .map(({url}) => ({
      src: url,
      w: 0,
      h: 0,
    })),
  })
)

export default chapter
