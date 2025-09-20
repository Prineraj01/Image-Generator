document.addEventListener('DOMContentLoaded', () => {

    // API Key and Shortener URL - Replace these with your own!
    const IMAGEN_API_KEY = '8f7d0303-5aa1-46ed-ae9d-4a4f295df379';
    const SHORTENER_URL = 'https://indianshortner.com/api?api=d7de22c94425d0d78b6b8fb541247aa53291b3a7&url=yourdestinationlink.com&alias=CustomAlias';

    // DOM Elements
    const generateBtn = document.getElementById('generate-btn');
    const promptInput = document.getElementById('prompt-input');
    const pinModal = document.getElementById('pin-modal');
    const verifyBtn = document.getElementById('verify-btn');
    const loadingSpinner = document.getElementById('loading-spinner');
    const generatedImage = document.getElementById('generated-image');
    const downloadLink = document.getElementById('download-link');
    const imageGallery = document.getElementById('image-gallery');
    const imageContainer = document.getElementById('image-container');
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    // --- Modal Logic ---
    function showModal() {
        pinModal.classList.add('visible');
    }

    function hideModal() {
        pinModal.classList.remove('visible');
    }

    // --- Image Generation Logic ---
    async function generateImage(prompt) {
        if (!prompt) {
            alert("Please enter a prompt to generate an image.");
            return;
        }

        // Hide previous image and download link
        generatedImage.style.display = 'none';
        downloadLink.style.display = 'none';
        
        // Show loading spinner
        loadingSpinner.style.display = 'block';

        // Placeholder API call simulation
        // In a real-world scenario, you would make a fetch() call to the Imagen AI API here.
        // Example: const response = await fetch('YOUR_IMAGEN_API_ENDPOINT', { ... });
        // const data = await response.json();
        // const imageUrl = data.image_url;

        console.log(`Simulating image generation for prompt: "${prompt}"`);

        // Simulating a delay for the "generation" process
        setTimeout(() => {
            // Replace with the actual generated image URL from your API response
            const imageUrl = 'https://picsum.photos/800/600?' + new Date().getTime(); 
            
            // Hide loading spinner
            loadingSpinner.style.display = 'none';

            // Display the new image
            generatedImage.src = imageUrl;
            generatedImage.style.display = 'block';

            // Show download button
            downloadLink.href = imageUrl;
            downloadLink.style.display = 'block';

            // Store the generated image locally
            saveImageLocally(prompt, imageUrl);

        }, 3000); // 3-second delay
    }

    // --- Local Storage Management ---
    function getImagesFromStorage() {
        const images = localStorage.getItem('generatedImages');
        return images ? JSON.parse(images) : [];
    }

    function saveImageLocally(prompt, imageUrl) {
        const images = getImagesFromStorage();
        const newImage = { prompt, url: imageUrl, timestamp: Date.now() };
        images.unshift(newImage); // Add to the beginning
        localStorage.setItem('generatedImages', JSON.stringify(images));
        renderGallery();
    }

    // --- Gallery Rendering ---
    function renderGallery() {
        const images = getImagesFromStorage();
        imageGallery.innerHTML = ''; // Clear gallery

        if (images.length === 0) {
            imageGallery.innerHTML = '<p class="no-images">No images generated yet. Start creating!</p>';
            return;
        }

        images.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.src = image.url;
            imgElement.alt = `Generated image from prompt: "${image.prompt}"`;
            imgElement.classList.add('gallery-image');
            imageGallery.appendChild(imgElement);
        });
    }

    // --- Event Listeners ---
    generateBtn.addEventListener('click', () => {
        showModal();
    });

    verifyBtn.addEventListener('click', () => {
        // Redirect to the shortener URL for verification
        window.open(SHORTENER_URL, '_blank');
        
        // Immediately start image generation after opening the new tab
        // In a real-world scenario, a callback from the shortener would trigger this
        const prompt = promptInput.value;
        generateImage(prompt);

        // Hide the modal
        hideModal();
    });

    // Dark Mode Toggle
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
    });

    // Initial render of the gallery
    renderGallery();

});
