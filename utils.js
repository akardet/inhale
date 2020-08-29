const INHALE_OBJ_KEY = "inhaleObj";

function getFromStorage(key, fn) {
  chrome.storage.sync.get([key], function (result) {
    fn(result);
  });
}

function addToStorage(obj) {
  const storedObj = {};
  storedObj[INHALE_OBJ_KEY] = obj;
  console.log("addToStorage: ", storedObj);
  chrome.storage.sync.set(storedObj);
}
