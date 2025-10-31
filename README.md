# multiplexer-search

Small Chrome/Edge/Firefox extension that opens multiple finance/search pages for a stock ticker.

## How to load locally

### Chrome / Edge (Load unpacked)

1. Open Chrome and go to chrome://extensions (or Edge: edge://extensions)
2. Enable "Developer mode" (top-right)
3. Click "Load unpacked" and select the `multiplexer-search` folder (the folder containing `manifest.json`)

### Firefox (Temporary Add-on)

1. Open Firefox and go to about:debugging#/runtime/this-firefox
2. Click "Load Temporary Add-on"
3. In the file picker, select the `manifest.json` file inside the `multiplexer-search` folder

Note: Firefox loads the extension temporarily; it will be removed when you restart the browser.

## Usage

1. Click the extension toolbar button (title: "Multiplexer Search")
2. Enter a ticker symbol (e.g. AAPL)
3. Check the sites you want and click "Open tabs"

New tabs will open to the selected sites with the ticker substituted.

## Testing and Troubleshooting

- If tabs don't open, open the popup DevTools: right-click inside the popup and choose "Inspect" (Chrome) or open the extension's debug console in Firefox from about:debugging.
- Console errors will indicate problems with the popup script or API usage.
- If a site requires a specific ticker format (exchange suffix, different path), update the URL template in `popup.html` or ask me to add exchange handling logic.

## Notes

- This uses Manifest V3 and the `tabs` permission to open tabs. For this simple popup-only behavior it works in Chrome and should work in Firefox, but some MV3 features may differ between browsers.
- `popup.js` includes a small compatibility wrapper to prefer `browser` (Firefox) and fall back to `chrome` (Chrome).