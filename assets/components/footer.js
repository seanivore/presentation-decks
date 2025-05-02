class Footer extends HTMLElement {
    constructor() {
        super();

        // Create template HTML
        const html = `
            <div class="footer-copyright">
                <p>Sean August Horvath © <span class="year">2025</span></p>
            </div>
        `;

        // Create element
        this.innerHTML = html;

        // Set year dynamically if not provided
        const year = this.getAttribute('year') || new Date().getFullYear();
        
        // Set content
        this.querySelector('.year').textContent = year;
    }
}

// Register the custom element
customElements.define('site-footer', Footer); 