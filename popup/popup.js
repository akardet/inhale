document.addEventListener(
  "DOMContentLoaded",
  function () {
    start();
  },
  false
);

function start() {
  const theme = document.getElementById("theme");
  const themeBtnArr = [...theme.lastElementChild.children];
  themeBtnArr.map((button) => {
    button.onclick = onClick;
  });

  fetchSavedPreferences();
}

function onClick(e) {
  e.preventDefault();

  getFromStorage(INHALE_OBJ_KEY, (result) => {
    const obj = {};
    const key = e.target.attributes["key"].value;
    const value = e.target.value;
    console.log("You clicked on ", e.target.value);
    obj[key] = value;

    const updatedObj = { ...obj };
    console.log("updatedObj", updatedObj);
    addToStorage(updatedObj);
  });
}

function fetchSavedPreferences() {
  getFromStorage(INHALE_OBJ_KEY, (result) => {
    console.log("Theme color is", result);
  });
}
