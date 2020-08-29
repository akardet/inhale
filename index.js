document.addEventListener(
  "DOMContentLoaded",
  function () {
    fetchSavedPreferences();
  },
  false
);

function fetchSavedPreferences() {
  const styles = getComputedStyle(document.documentElement);
  getFromStorage(INHALE_OBJ_KEY, ({ [INHALE_OBJ_KEY]: result }) => {
    setThemeColor(styles, result);
  });
}

function setThemeColor(globalStyle, { theme }) {
  const container = document.getElementById("container");
  const themeKey = theme;
  const themeColorHex = globalStyle.getPropertyValue(`--${themeKey}`);
  container.style.backgroundColor = themeColorHex;
}
