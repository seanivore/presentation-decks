class NavSidebar extends HTMLElement {
    constructor() {
        super();
        // Store attributes but don't manipulate DOM yet
        this.navTitle = this.getAttribute('title') || 'Slides';
        this.navLinks = JSON.parse(this.getAttribute('links') || '[]');
    }

    // Move DOM operations to connectedCallback
    connectedCallback() {
        // Create HTML
        const html = `
            <div class="nav-sidebar">
                <h3 class="nav-title"></h3>
                <div class="nav-links"></div>
            </div>
        `;

        // Set inner HTML
        this.innerHTML = html;
        
        // Set content
        this.querySelector('.nav-title').textContent = this.navTitle;

        // Create links
        const navLinks = this.querySelector('.nav-links');
        this.navLinks.forEach(link => {
            const a = document.createElement('a');
            a.href = link.href;
            a.className = 'nav-link';
            a.textContent = link.text;
            navLinks.appendChild(a);
        });

        // Update active link on hash change
        this.updateActiveLink = () => {
            const hash = window.location.hash || '#slide1';
            this.querySelectorAll('.nav-link').forEach(link => {
                if (link.getAttribute('href') === hash) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        };

        // Add event listener
        window.addEventListener('hashchange', this.updateActiveLink);
        
        // Initial update
        this.updateActiveLink();
    }

    disconnectedCallback() {
        // Clean up event listeners when element is removed
        window.removeEventListener('hashchange', this.updateActiveLink);
    }
}

// Register the custom element
customElements.define('nav-sidebar', NavSidebar);