export const getChapter = (mangaid, chapternum) => ({
  mode: 'GET',
  type: 'GET_CHAPTER',
  url: `manga/${mangaid}/${chapternum}`,
})

export const nextChapterPage = () => ({
  type: 'NEXT_CHAPTER_PAGE',
})

export const previousChapterPage = () => ({
  type: 'PREVIOUS_CHAPTER_PAGE',
})
