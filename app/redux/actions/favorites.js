export const addFavoritesItem = (payload) => ({
  type: 'ADD_MY_LIST_ITEM',
  payload,
})

export const removeFavoritesItem = (payload) => ({
  type: 'REMOVE_MY_LIST_ITEM',
  payload,
})
