# Resources 

## Updates 

I was having too much trouble with my website that had all of these research documents in markdown using a Jekyll theme we created publishing and linking to the two presentation decks about the research. Very frustrating, we tried everything on the internet. But then I was like, well why not just make presentations stand alone anyways? And so that is what this is: We'll be prepping this to publish to GitHub Pages; I have the _config.yaml file and CNAME all set up. 

Before pushing it out, I wanted to first double check the components setup on ./ai-voice-sales-development.html - the Claude who set it up seemed to be in a rush lol. I don't think the footer component was fully added. And then, for the nav-sidebar, we set up the CSS separately and then the JS separately, but in the end it sort of looks like they might have also put the JS in the HTML file. Let's get that sorted out, please. 

./assets/components/nav-sidebar.html 
./assets/components/footer.html
./assets/css/main.css

Oh I just went to grab a file from JS and realized that the components are HTML. Any reason for that? Just curious. 

And then we should do the same for ./implement-ai-voice-marketing.html - but we will need a new component for the nav-sidebar. The footer should be super simple so it is probably the same component. This slideshow has its own CSS to add the nav-sidebar CSS to ./assets/css/alt-slides.css 

I need to update the navigation on both once we're good to go. 

## Project Directory Structure 

Users/seanivore/Development/presentation-decks/
├── _config.yaml
├── ai-voice-sales-development.html
├── assets
│   ├── audio
│   │   ├── 130-hz-trust-frequency-ai-voice-mkt.mp3
│   │   └── 130-hz-trust-frequency-ai-voice-mkt.sesx
│   ├── components
│   │   ├── footer.html
│   │   └── nav-sidebar.html
│   ├── css
│   │   ├── alt-slides.css
│   │   ├── home.css
│   │   ├── main.css
│   │   ├── pixel-animation.css
│   │   └── wave-animation.css
│   ├── favicon
│   │   ├── apple-touch-icon.png
│   │   ├── favicon-96x96.png
│   │   ├── favicon.ico
│   │   ├── favicon.svg
│   │   ├── site.webmanifest
│   │   ├── web-app-manifest-192x192.png
│   │   └── web-app-manifest-512x512.png
│   ├── images
│   │   ├── avatar-black.png
│   │   ├── avatar-colored.png
│   │   ├── brand-text-art-1.svg
│   │   ├── brand-text-art-2.svg
│   │   ├── character-styles.png
│   │   ├── inspo-bland-ai-raining-giant-pixels.png
│   │   ├── inspo-bland-ai-web-design.png
│   │   └── thumbnail-presentation-1.webp
│   └── js
│       ├── pixel-animation.js
│       ├── slideshow.js
│       └── wave-animation.js
├── CLAUDE.md
├── CNAME
├── implement-ai-voice-marketing.html
├── index.html
└── README.md

8 directories, 34 files

Hidden project directories:
./.cursor
./.vscode

Hidden project files:
./.example.env
./.gitignore
