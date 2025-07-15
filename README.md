# 🔍 CSS Inspector Extension

A Chrome extension that helps you analyze **inline CSS styles** on any webpage. When hovering over an element, this tool highlights unused inline styles .

---

## 🚀 Features

- ✨ Highlights hovered elements with:
  - ✅ Green border for fully used inline styles
  - ❌ Red dashed border for unused inline styles
- 📋 Floating style panel showing:
  - ❌ **Unused Inline Styles** (red dashed)

---

## 📁 File Structure

| File               | Purpose                                                                 |
|--------------------|-------------------------------------------------------------------------|
| `popup.html`        | Extension popup UI                                                      |
| `popup.js`          | Toggles inspection mode on/off                                          |
| `inspector.js`      | Injected into the webpage to inspect and display CSS                   |
| `remove-inspector.js`| Cleans up overlays and event listeners                                 |
| `manifest.json`     | Chrome extension metadata and permissions                              |

---

## 🧩 How to Use

1. Clone or download this repo.
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer Mode**.
4. Click **Load unpacked** and select the project folder.
5. Click on the extension icon and hit “Start Inspecting”.
6. Hover over any element on the page — watch the magic happen!
7. Click “Copy” buttons to easily extract styles.

---

## 🛠️ Tech Stack

- HTML, CSS, JavaScript
- Chrome Extension Manifest V3
- DOM API, `getComputedStyle()`

---

## 🤝 Contributing

Feel free to fork the repo and submit pull requests. Feature ideas, bug fixes, and style improvements are welcome!

---

## 📄 License

MIT License. Free to use and modify.

---

Built with ❤️ by Ouma.
