import localforage from 'localforage'

//Setup up browser storage
localforage.config({
  name: 'SausageBrain',
  description: 'User data',
  storeName: 'state',
})

self.addEventListener('message', (e) => {
  const { type, key, value } = e.data;

  (() => {
    if(type == 'get'){
      return localforage.getItem(key)
    }else{
      return localforage.setItem(key, value)
    }
  })()
  .then((payload) => {
    postMessage({
      type: 'success',
      key,
      payload,
    })
  })
  .catch((error) => {
    postMessage({
      type: 'failure',
      error,
    })
  })
})
