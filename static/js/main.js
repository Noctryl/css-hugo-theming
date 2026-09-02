(() => {
  const root = document.documentElement;
  const storageKey = "noctryl-theme";
  const media = window.matchMedia("(prefers-color-scheme: dark)");

  const getTheme = () => {
    const saved = localStorage.getItem(storageKey);
    return saved === "dark" || saved === "light"
      ? saved
      : (media.matches ? "dark" : "light");
  };

  const applyTheme = (theme) => {
    const isDark = theme === "dark";
    root.classList.toggle("dark", isDark);
    root.style.colorScheme = theme;

    const button = document.getElementById("theme-toggle");
    const label = document.getElementById("theme-toggle-label");

    if (button && label) {
      label.textContent = isDark ? "LIGHT" : "DARK";
      button.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
      );
      button.setAttribute("title", isDark ? "Switch to light mode" : "Switch to dark mode");
    }
  };

  applyTheme(getTheme());

  const button = document.getElementById("theme-toggle");
  if (button) {
    button.addEventListener("click", () => {
      const next = root.classList.contains("dark") ? "light" : "dark";
      localStorage.setItem(storageKey, next);
      applyTheme(next);
    });
  }

  media.addEventListener("change", (event) => {
    if (!localStorage.getItem(storageKey)) {
      applyTheme(event.matches ? "dark" : "light");
    }
  });
})();