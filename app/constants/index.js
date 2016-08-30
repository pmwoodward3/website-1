const __PRODUCTION__ = __PRODUCTION__ || process.env.NODE_ENV === 'production' // eslint-disable-line

// set location dist folder and api url for 4 differents run modes

export const DEV_URL = __PRODUCTION__
? '/dist/'
: 'http://localhost:3000/dist/'

export const API_URL = __PRODUCTION__
? 'http://192.168.1.151:4202/api/'
: 'http://beam.noip.me:4202/api/'

const margin = 10

export const MANGA_ITEM_CARD_HEIGHT = 236 + (margin * 2)

export const MANGA_ITEM_CARD_WIDTH = 130 + (margin * 2)
