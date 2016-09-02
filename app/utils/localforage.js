import LocalforageWorker from 'worker!./localforageWorker'

const worker = new LocalforageWorker()

export const getItem = (key) => new Promise((resolve, reject) => {
  worker.postMessage({
    type: 'get',
    key,
  })
  const handler = (e) => {
    const res = e.data
    if(res.key == key){
      if(res.type == 'success'){
        resolve(res.payload)
      }else{
        reject(res.error)
      }
      worker.removeEventListener('message', handler)
    }
  }

  worker.addEventListener('message', handler)
})

export const setItem = (key, value) => new Promise((resolve, reject) => {
  worker.postMessage({
    type: 'set',
    key,
    value,
  })
  const handler = (res) => {
    if(res.key == key){
      if(res.type == 'success'){
        resolve(res.payload)
      }else{
        reject(res.error)
      }
      worker.removeEventListener('message', handler)
    }
  }

  worker.addEventListener('message', handler)
})
