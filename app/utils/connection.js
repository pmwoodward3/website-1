export default function connnection(dispatch){
  //Listen for connection events
  const connectionHandler = () => {
    if(navigator.onLine){
      dispatch({type: 'ONLINE'})
    }else{
      dispatch({type: 'OFFLINE'})
    }
  }

  connectionHandler()

  window.addEventListener('online', connectionHandler)
  window.addEventListener('offline', connectionHandler)
}
