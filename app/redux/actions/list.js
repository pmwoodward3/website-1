export const getList = (ids) => ({
  mode: 'GET',
  type: 'GET_LIST',
  url: `list/${ids.join('\ ')}`,
})
