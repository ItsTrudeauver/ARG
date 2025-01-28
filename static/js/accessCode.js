let tabsVisible = false;

function toggleTabs() {
    const rail = document.querySelector('.tab-rail');
    const handle = document.querySelector('.tab-handle');
    tabsVisible = !tabsVisible;
    rail.style.left = tabsVisible ? '0' : '-200px';
    handle.innerHTML = tabsVisible ? '◀' : '▶';
}

let attempts = 0;

document.getElementById('accessCode').addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
        const input = e.target.value.trim();
        const response = document.getElementById('response');

        try {
            const res = await fetch('/verify-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: input }),
                credentials: 'same-origin'
            });
            
            const data = await res.json();

            if (res.ok) {
                window.location.href = data.redirect || 'unlocked';
            } else {
                attempts++;
                response.innerHTML = `> ERR 0x${(attempts * 0xDEAD).toString(16).toUpperCase()}<br>`;
                if (attempts >= 3) {
                    document.body.classList.add('crash-active');
                    setTimeout(() => {
                        window.close();
                    }, 2000);
                }
            }
        } catch (error) {
            response.innerHTML = '> ERR 0xSERVER<br>';
        }
    }
});
