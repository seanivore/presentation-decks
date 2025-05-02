class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // Get attributes
        const year = this.getAttribute('year') || new Date().getFullYear();
        
        // Create main container
        const container = document.createElement('div');
        container.className = 'footer-copyright';
        
        // Create content
        const p = document.createElement('p');
        p.textContent = 'Sean August Horvath © ';
        
        const yearSpan = document.createElement('span');
        yearSpan.className = 'year';
        yearSpan.textContent = year;
        
        p.appendChild(yearSpan);
        container.appendChild(p);
        
        // Append to component
        this.appendChild(container);
    }
}

// Register the custom element
customElements.define('site-footer', Footer); 