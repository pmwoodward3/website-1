import { MAIN_SOURCE } from 'constants'

export const getChapter = (mangaid, chapternum, source=MAIN_SOURCE) => ({
  mode: 'GET',
  type: 'GET_CHAPTER',
  url: `manga/${mangaid}/${chapternum}`,
  data: {
    source,
  },
})

export const nextChapterPage = () => ({
  type: 'NEXT_CHAPTER_PAGE',
})

export const previousChapterPage = () => ({
  type: 'PREVIOUS_CHAPTER_PAGE',
})

export const enterFullscreen = () => ({
  type: 'ENTER_FULLSCREEN_CHAPTER',
})

export const exitFullscreen = () => ({
  type: 'EXIT_FULLSCREEN_CHAPTER',
})

export const setScale = (payload) => ({
  type: 'SET_SCALE_CHAPTER',
  payload,
})

export const setOffset = (payload) => ({
  type: 'SET_OFFSET_CHAPTER',
  payload,
})

export const loadPage = (payload) => ({
  type: 'LOAD_PAGE_CHAPTER',
  payload, //pagenum
})
