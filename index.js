document.addEventListener(
  "DOMContentLoaded",
  function () {
    fetchSavedPreferences();
  },
  false
);

function fetchSavedPreferences() {
  // Fetch the root styles
  const styles = getComputedStyle(document.documentElement);
  getFromStorage(STORED_OBJ_KEY, ({ [STORED_OBJ_KEY]: result }) => {
    setThemeColor(styles, result);
  });
}

function setThemeColor(globalStyle, { theme }) {
  const container = document.getElementById("container");
  const themeKey = theme;
  const themeColorHex = globalStyle.getPropertyValue(`--${themeKey}`);
  container.style.backgroundColor = themeColorHex;
}
