class Footer extends HTMLElement {
    constructor() {
        super();

        // Create template content
        const template = document.createElement('template');
        template.innerHTML = `
            <div class="footer-copyright">
                <p>Sean August Horvath © <span class="year">2025</span></p>
            </div>
        `;

        // Set year dynamically if not provided
        const year = this.getAttribute('year') || new Date().getFullYear();
        
        // Clone template and set content
        const content = template.content.cloneNode(true);
        content.querySelector('.year').textContent = year;

        // Append to DOM
        this.appendChild(content);
    }
}

// Register the custom element
customElements.define('site-footer', Footer); 