export default function storageAvailable() {
  try {
    var storage = window.localStorage,
    x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true
  }
  catch(e) {
    return false
  }
}
