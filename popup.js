document.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: extractCSSWithUsage
    }, (res) => {
      const { allCSS, cleanCSS } = res[0].result;
      const container = document.getElementById('css-output');
      container.innerHTML = allCSS;
      document.getElementById('copy-clean').addEventListener('click', () => {
        navigator.clipboard.writeText(cleanCSS).then(() => alert('Clean CSS copied to clipboard!'));
      });
    });
  });
});

function extractCSSWithUsage() {
  let styledOutput = '', cleanedOutput = '';

  for (const sheet of document.styleSheets) {
    try {
      const rules = sheet.cssRules || [];
      for (const rule of rules) {
        if (rule.type === CSSRule.STYLE_RULE) {
          const selector = rule.selectorText;
          const body = rule.style.cssText;
          const isUsed = !!document.querySelector(selector);
          const properties = body
            .split(';')
            .filter(Boolean)
            .map(line => {
              const [prop, val] = line.split(':');
              return `  <span class="property">${prop.trim()}</span><span class="punctuation">:</span> <span class="value">${val.trim()}</span><span class="punctuation">;</span>`;
            })
            .join('<br>');

          const formatted = `<span class="selector">${selector}</span> <span class="punctuation">{</span><br>${properties}<br><span class="punctuation">}</span><br><br>`;

          if (isUsed) {
            styledOutput += formatted;
            cleanedOutput += `${selector} {\n${body.split(';').filter(Boolean).map(p => `  ${p.trim()};`).join('\n')}\n}\n\n`;
          } else {
            styledOutput += `<div class="unused">${formatted}</div>`;
          }
        }
      }
    } catch (e) {
      console.warn('Could not access stylesheet:', e);
    }
  }

  return { allCSS: styledOutput, cleanCSS: cleanedOutput };
}
