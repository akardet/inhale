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
  setupIntervalSliders();
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

    const savedIntervals = result.intervals || {};
    INTERVAL_KEYS.forEach((key) => {
      const value = savedIntervals[key] || 0;
      const valueElement = document.getElementById(`${key}`);
      valueElement.innerHTML = value;

      const sliderElement = document.getElementById(`rangeSlider-${key}`);
      sliderElement.value = value;
    });
  });
}

function setupIntervalSliders() {
  INTERVAL_KEYS.forEach((key) => {
    const slider = document.getElementById(`rangeSlider-${key}`);
    const value = document.getElementById(`${key}`);
    value.innerHTML = slider.value;
    slider.oninput = function () {
      value.innerHTML = this.value;
      console.log(value.id);
      getFromStorage(STORED_OBJ_KEY, ({ [STORED_OBJ_KEY]: result }) => {
        addToStorage({ ...result });
      });
    };
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
