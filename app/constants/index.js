const __PRODUCTION__ = __PRODUCTION__ || process.env.NODE_ENV === 'production' // eslint-disable-line

export const DEV_URL = __PRODUCTION__
? '/dist/'
: 'http://localhost:3000/dist/'

export const API_URL = __PRODUCTION__
? 'https://beam.noip.me:4002/api/'
: 'https://beam.noip.me:4002/api/'

const margin = 8

export const MANGA_ITEM_CARD_HEIGHT = 180 + (margin * 2)

export const MANGA_ITEM_CARD_WIDTH = 130 + (margin * 2)

export const MAIN_SOURCE = 'mangaeden'
