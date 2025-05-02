class NavSidebar extends HTMLElement {
    constructor() {
        super();

        // Create template HTML
        const html = `
            <div class="nav-sidebar">
                <h3 class="nav-title"></h3>
                <div class="nav-links"></div>
            </div>
        `;

        // Create element
        this.innerHTML = html;

        // Get attributes
        const title = this.getAttribute('title') || 'Slides';
        const links = JSON.parse(this.getAttribute('links') || '[]');

        // Set content
        this.querySelector('.nav-title').textContent = title;

        // Create links
        const navLinks = this.querySelector('.nav-links');
        links.forEach(link => {
            const a = document.createElement('a');
            a.href = link.href;
            a.className = 'nav-link';
            a.textContent = link.text;
            navLinks.appendChild(a);
        });
    }

    // Handle active state updates
    connectedCallback() {
        const updateActiveLink = () => {
            const hash = window.location.hash || '#slide1';
            this.querySelectorAll('.nav-link').forEach(link => {
                if (link.getAttribute('href') === hash) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        };

        // Update active link on hash change
        window.addEventListener('hashchange', updateActiveLink);
        // Initial update
        updateActiveLink();
    }
}

// Register the custom element
customElements.define('nav-sidebar', NavSidebar);