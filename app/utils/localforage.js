import localforage from 'localforage'

//Setup up browser storage
localforage.config({
  name: 'SausageBrain',
  description: 'User data',
  storeName: 'state',
})

export default localforage
