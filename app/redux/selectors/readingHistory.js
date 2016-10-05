import { createSelector } from 'reselect'

const mangaTableSelector = state => state.mangaTable.items
const readingHistorySelector = state => state.readingHistory

function getNextPage({chapternum, pagenum, totalPages, ...item}) {
  if(!isNaN(parseInt(totalPages)) && pagenum >= totalPages){
    chapternum += 1
    pagenum = 1
  }else{
    pagenum += 1
  }

  return ({
    chapternum,
    pagenum,
    ...item,
  })
}

const readingHistory = createSelector(
  mangaTableSelector,
  readingHistorySelector,
  (table, readingHistory) => ({
    ...readingHistory,
    items: readingHistory.items
    .map((item) => {

      return ({
        ...table[item.mangaid],
        ...getNextPage(item),
      })
    })
    .asMutable()
    .reverse(),
  })
)

export default readingHistory

const progressSelector = (state, mangaid) =>
state.readingHistory.items
.filter((item) => item.mangaid == mangaid)[0]

export const mangaProgress = createSelector(
  progressSelector,
  (progress) => !!progress ? getNextPage(progress) : undefined,
)
