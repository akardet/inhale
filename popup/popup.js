document.addEventListener(
  "DOMContentLoaded",
  function () {
    start();
  },
  false
);

function start() {
  const themeBtnArr = getThemeBtnArray();
  themeBtnArr.map((button) => {
    button.onclick = onClick;
  });

  fetchSavedPreferences();
}

function onClick(e) {
  e.preventDefault();

  const newDisabledBtn = updateDisabledTheme(e.target);

  getFromStorage(STORED_OBJ_KEY, ({ [STORED_OBJ_KEY]: result }) => {
    addToStorage({ ...result, ...newDisabledBtn });
  });
}

function fetchSavedPreferences() {
  getFromStorage(STORED_OBJ_KEY, ({ [STORED_OBJ_KEY]: result }) => {
    const themeBtnArr = getThemeBtnArray();
    const selected = themeBtnArr.find(
      (button) => button.value === result.theme
    );
    selected.classList.add("disabled");
  });
}

function getThemeBtnArray() {
  const theme = document.getElementById("theme");
  return [...theme.lastElementChild.children];
}

function updateDisabledTheme({ attributes, value, classList }) {
  // Remove disable class from previous button
  const themeBtnArr = getThemeBtnArray();
  themeBtnArr.map((button) => {
    if (button.classList.contains("disabled")) {
      button.classList.remove("disabled");
    }
  });
  // Setting clicked theme button to disabled
  const obj = {};
  const key = attributes["key"].value;
  const themeValue = value;
  classList.add("disabled");
  obj[key] = themeValue;
  return obj;
}
