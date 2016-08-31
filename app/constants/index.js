const __PRODUCTION__ = __PRODUCTION__ || process.env.NODE_ENV === 'production' // eslint-disable-line

export const DEV_URL = __PRODUCTION__
? '/dist/'
: 'http://localhost:3000/dist/'

export const API_URL = __PRODUCTION__
? 'http://beam.noip.me:4202/api/'
: 'http://192.168.1.151:4202/api/'

const margin = 10

export const MANGA_ITEM_CARD_HEIGHT = 180 + (margin * 2)

export const MANGA_ITEM_CARD_WIDTH = 130 + (margin * 2)

export const MAIN_SOURCE = 'mangaeden'
