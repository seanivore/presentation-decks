class Footer extends HTMLElement {
    constructor() {
        super();
        // Store the year attribute
        this.footerYear = this.getAttribute('year') || new Date().getFullYear();
    }

    connectedCallback() {
        // Create template HTML
        const html = `
            <div class="footer-copyright">
                <p>Sean August Horvath © <span class="year">2025</span></p>
            </div>
        `;

        // Create element
        this.innerHTML = html;
        
        // Set content
        this.querySelector('.year').textContent = this.footerYear;
    }
}

// Register the custom element
customElements.define('site-footer', Footer); 