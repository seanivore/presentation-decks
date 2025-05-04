class NavSidebar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        console.log('NavSidebar connected');
        
        // Get attributes
        const title = this.getAttribute('title') || 'Slides';
        const linksAttr = this.getAttribute('links');
        
        // Parse links
        let links = [];
        try {
            links = JSON.parse(linksAttr || '[]');
            console.log('Successfully parsed links:', links);
        } catch (e) {
            console.error('Failed to parse links JSON:', e);
            console.log('Raw links attribute:', linksAttr);
        }
        
        // Create main container
        const container = document.createElement('div');
        container.className = 'nav-sidebar';
        
        // Create title
        const titleEl = document.createElement('h3');
        titleEl.className = 'nav-title';
        titleEl.textContent = title;
        container.appendChild(titleEl);
        
        // Create links container
        const linksContainer = document.createElement('div');
        linksContainer.className = 'nav-links';
        
        // Add links
        links.forEach(link => {
            const a = document.createElement('a');
            a.href = link.href;
            a.className = 'nav-link';
            a.textContent = link.text;
            
            // Handle external links differently - don't add custom click handlers
            // Just set the target for external links to open in a new tab
            if (!link.href.startsWith('#')) {
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
            }
            
            linksContainer.appendChild(a);
            console.log('Added link:', a);
        });
        
        container.appendChild(linksContainer);
        
        // Clear and append
        while (this.firstChild) {
            this.removeChild(this.firstChild);
        }
        this.appendChild(container);
        
        // Set up active link handling
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
        
        window.addEventListener('hashchange', this.updateActiveLink);
        this.updateActiveLink();
        
        console.log('NavSidebar initialization complete:', this.innerHTML);
    }

    disconnectedCallback() {
        window.removeEventListener('hashchange', this.updateActiveLink);
    }
}

customElements.define('nav-sidebar', NavSidebar);