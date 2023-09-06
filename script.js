
document.addEventListener("DOMContentLoaded", async function () {
    // Randomly select a background palette
    var backgrounds = ['background-modern-muted', 'background-pastelo'];
    var randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    document.body.classList.add(randomBackground, 'background');

    var spinner = document.getElementById('spinner');
    var myImage = document.getElementById('catImg');

    myImage.onload = function () {
        // Hide spinner when image is loaded
        spinner.style.display = 'none';
    };

    myImage.onclick = function () {
        fetchCat();
    };

    // Show spinner before fetching image
    spinner.style.display = 'block';

    async function fetchCat() {
        fetch('https://cataas.com/cat')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.blob();
            })
            .then(blob => {
                // You will get a blob for the image, you can create a URL for it and use it in img src.
                let objectURL = URL.createObjectURL(blob);

                // set the src of the image to the blob URL
                myImage.src = objectURL;
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
                // Hide spinner in case of error
                spinner.style.display = 'none';
            });
    }

    fetchCat();
});
