import { MAIN_SOURCE } from 'constants'

export const getChapter = (mangaid, chapternum, source=MAIN_SOURCE) => ({
  mode: 'GET',
  type: 'GET_CHAPTER',
  url: `manga/${mangaid}/${chapternum}`,
  data: {
    source,
  }
})

export const nextChapterPage = () => ({
  type: 'NEXT_CHAPTER_PAGE',
})

export const previousChapterPage = () => ({
  type: 'PREVIOUS_CHAPTER_PAGE',
})
