class AltNavSidebar extends HTMLElement {
    constructor() {
        super();

        // Create template content
        const template = document.createElement('template');
        template.innerHTML = `
            <div class="nav-sidebar">
                <h3></h3>
                <div class="nav-links"></div>
            </div>
        `;

        // Get attributes
        const title = this.getAttribute('title') || 'BLAND AI Research';
        
        // Parse links from attribute or use default if not provided
        let links = [];
        try {
            links = JSON.parse(this.getAttribute('links') || '[]');
        } catch (e) {
            console.error('Failed to parse links attribute:', e);
            links = [
                { "href": "#slide1", "text": "Introduction" },
                { "href": "#slide2", "text": "Challenges" },
                { "href": "#slide3", "text": "Solutions" }
            ];
        }

        // Clone template and set content
        const content = template.content.cloneNode(true);
        content.querySelector('h3').textContent = title;

        // Create links
        const navLinks = content.querySelector('.nav-links');
        links.forEach(link => {
            const a = document.createElement('a');
            a.href = link.href;
            a.className = 'nav-link';
            a.textContent = link.text;
            navLinks.appendChild(a);
        });

        // Append to DOM
        this.appendChild(content);
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
customElements.define('alt-nav-sidebar', AltNavSidebar); 