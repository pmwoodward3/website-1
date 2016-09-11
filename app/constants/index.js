const __PRODUCTION__ = __PRODUCTION__ || process.env.NODE_ENV === 'production' // eslint-disable-line

export const DEV_URL = __PRODUCTION__
? '/dist/'
: 'http://localhost:3000/dist/'

export const API_URL = __PRODUCTION__
? 'https://beam.noip.me:4002/api/'
: 'https://beam.noip.me:4002/api/'

const margin = 7

export const MANGA_ITEM_CARD_HEIGHT = 140 + (margin * 2)

export const MANGA_ITEM_CARD_WIDTH = 100 + (margin * 2)

export const MAIN_SOURCE = 'mangaeden'

export const GENRE_LIST = [
  'Action',
  'Adult',
  'Adventure',
  'Comedy',
  'Doujinshi',
  'Drama',
  'Ecchi',
  'Fantasy',
  'Gender-Bender',
  'Harem',
  'Hentai',
  'Historical',
  'Horror',
  'Lolicon',
  'Mature',
  'Mystery',
  'Romance',
  'Scifi',
  'Shotacon',
  'Shoujo Ai',
  'Shounen Ai',
  'Smut',
  'School Life',
  'Seinen',
  'Shoujo',
  'Shounen',
  'Slice of Life',
  'Sports',
  'Supernatural',
  'Tragedy',
  'Yaoi',
  'Yuri',
  'Josei',
  'Martial Arts',
  'Mecha',
  'Psychological',
]
.map((x) => x
.trim()
.toLowerCase()
.replace(/[^a-zA-Z0-9\ ]/g, '')
.replace(/\ /g, '-'))
.sort()

export const GA_TRACKING_ID = 'UA-71580391-4'
