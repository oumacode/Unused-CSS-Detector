let isInspecting = false;

document.getElementById("toggleInspector").addEventListener("click", async () => {
  isInspecting = !isInspecting;

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Update button UI
  document.getElementById("buttonText").textContent = isInspecting ? "Stop Inspecting" : "Start Inspecting";
  document.getElementById("toggleInspector").classList.toggle("active", isInspecting);

  // Inject appropriate script
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: [isInspecting ? "inspector.js" : "remove-inspector.js"]
  });
});
