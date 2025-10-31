
function $(sel) { return document.querySelector(sel); }

function normalizeTicker(input) {
	if (!input) return '';
	return input.trim().toUpperCase().replace(/\s+/g, '');
}

// Small cross-browser wrapper: use `browser` (Promise-based) when available, else fall back to `chrome`.
const ext = (typeof browser !== 'undefined') ? browser : (typeof chrome !== 'undefined' ? chrome : null);

function openTab(url) {
	// If WebExtensions `browser` API is available (Firefox), it returns a Promise.
	if (ext && ext.tabs && typeof ext.tabs.create === 'function') {
		// For `chrome` in Chrome, tabs.create takes a callback. We'll normalize to a Promise.
		if (typeof ext.tabs.create === 'function' && typeof browser !== 'undefined') {
			return ext.tabs.create({ url });
		}
		return new Promise((resolve, reject) => {
			try {
				ext.tabs.create({ url }, resolve);
			} catch (e) {
				reject(e);
			}
		});
	}
	return Promise.reject(new Error('tabs API not available'));
}

document.addEventListener('DOMContentLoaded', () => {
	const tickerInput = $('#ticker');
	const openBtn = $('#open');
	const status = $('#status');

	function showStatus(msg, isError = false) {
		status.textContent = msg;
		status.style.color = isError ? 'crimson' : '#333';
	}

	openBtn.addEventListener('click', async () => {
		const raw = tickerInput.value;
		const ticker = normalizeTicker(raw);
		if (!ticker) {
			showStatus('Please enter a ticker symbol.', true);
			return;
		}

		// collect selected site templates
		const checks = Array.from(document.querySelectorAll('input[type="checkbox"]'));
		const selected = checks.filter(c => c.checked).map(c => c.getAttribute('data-site'));
		if (selected.length === 0) {
			showStatus('Select at least one site to open.', true);
			return;
		}

		const urls = selected.map(t => t.replace(/\{T\}/g, encodeURIComponent(ticker)));

		showStatus(`Opening ${urls.length} tabs for ${ticker}...`);

		// Open each URL in a new tab (sequential to avoid popup blockers in some browsers)
		try {
			for (const url of urls) {
				await openTab(url);
			}
			showStatus(`Opened ${urls.length} tabs for ${ticker}.`);
		} catch (err) {
			console.error(err);
			showStatus('Failed to open tabs: ' + (err.message || err), true);
		}
	});
});
