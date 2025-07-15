function getUnusedInlineStyles(element) {
  const computed = window.getComputedStyle(element);
  const inline = element.style;
  const unusedInline = {};
  const usedInline = {};

  for (let i = 0; i < inline.length; i++) {
    const prop = inline[i];
    const inlineValue = inline.getPropertyValue(prop).trim();
    const computedValue = computed.getPropertyValue(prop).trim();

    if (inlineValue !== computedValue) {
      unusedInline[prop] = inlineValue;
    } else {
      usedInline[prop] = inlineValue;
    }
  }

  return { unusedInline, usedInline };
}

function createStylePanel(unusedInline, rect) {
  removeStylePanel();

  const panel = document.createElement("div");
  panel.id = "__css_inspector_panel";

  const title = document.createElement("div");
  title.textContent = "❌ Unused Inline Styles";
  Object.assign(title.style, {
    fontWeight: "bold",
    marginBottom: "6px",
    fontSize: "14px"
  });
  panel.appendChild(title);

  for (const [prop, value] of Object.entries(unusedInline)) {
    const item = document.createElement("div");
    item.textContent = `${prop}: ${value};`;
    Object.assign(item.style, {
      fontSize: "12px",
      fontFamily: "monospace",
      padding: "2px 4px",
      background: "#ffe5e5",
      borderLeft: "3px dashed red"
    });
    panel.appendChild(item);
  }

  Object.assign(panel.style, {
    position: "absolute",
    top: `${rect.top + window.scrollY + rect.height + 10}px`,
    left: `${rect.left + window.scrollX}px`,
    background: "white",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px",
    maxHeight: "300px",
    overflowY: "auto",
    maxWidth: "300px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
    zIndex: 999999999
  });

  document.body.appendChild(panel);
}

function highlightElement(element, unusedInline) {
  removeOverlay();

  const rect = element.getBoundingClientRect();
  const overlay = document.createElement("div");
  overlay.id = "__css_inspector_overlay";

  const hasUnused = Object.keys(unusedInline).length > 0;

  Object.assign(overlay.style, {
    position: "absolute",
    top: `${rect.top + window.scrollY}px`,
    left: `${rect.left + window.scrollX}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    border: hasUnused ? "2px dashed red" : "2px solid green",
    pointerEvents: "none",
    zIndex: 999999
  });

  document.body.appendChild(overlay);
}

function removeOverlay() {
  const el = document.getElementById("__css_inspector_overlay");
  if (el) el.remove();
}

function removeStylePanel() {
  const panel = document.getElementById("__css_inspector_panel");
  if (panel) panel.remove();
}

function onHover(e) {
  e.stopPropagation();
  e.preventDefault();

  const el = e.target;
  const { unusedInline } = getUnusedInlineStyles(el);
  const rect = el.getBoundingClientRect();

  highlightElement(el, unusedInline);

  if (Object.keys(unusedInline).length > 0) {
    createStylePanel(unusedInline, rect);
  } else {
    removeStylePanel(); // keep green highlight, just remove panel
  }
}

document.addEventListener("mouseover", onHover, true);

window.__cssInspectorCleanup = () => {
  document.removeEventListener("mouseover", onHover, true);
  removeOverlay();
  removeStylePanel();
};
