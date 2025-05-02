class AltNavSidebar extends HTMLElement {
    constructor() {
        super();
        // Store attributes but don't manipulate DOM yet
        this.navTitle = this.getAttribute('title') || 'BLAND AI Research';
        
        // Parse links from attribute or use default if not provided
        try {
            this.navLinks = JSON.parse(this.getAttribute('links') || '[]');
        } catch (e) {
            console.error('Failed to parse links attribute:', e);
            this.navLinks = [
                { "href": "#slide1", "text": "Introduction" },
                { "href": "#slide2", "text": "Challenges" },
                { "href": "#slide3", "text": "Solutions" }
            ];
        }
    }

    // Move DOM operations to connectedCallback
    connectedCallback() {
        // Create HTML
        const html = `
            <div class="nav-sidebar">
                <h3></h3>
                <div class="nav-links"></div>
            </div>
        `;

        // Set inner HTML
        this.innerHTML = html;
        
        // Set content
        this.querySelector('h3').textContent = this.navTitle;

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
customElements.define('alt-nav-sidebar', AltNavSidebar); 