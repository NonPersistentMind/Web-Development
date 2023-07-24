document.addEventListener("DOMContentLoaded", function () {
    var mainVideo = document.querySelector("#prime-video");

    // Set up a scroll event listener.
    window.addEventListener("scroll", () => {
        const videoRect = mainVideo.getBoundingClientRect();
        const viewportRect = window.innerRect;

        if (videoRect.top < viewportRect.top ||
            videoRect.bottom > viewportRect.bottom ||
            videoRect.left < viewportRect.left ||
            videoRect.right > viewportRect.right) {
            // Pause the video.
            mainVideo.pause();
        } else {
            // Resume the video.
            mainVideo.play();
        }
    });



    const burgerElement = document.getElementsByClassName("navbar-burger")[0];
    const menuElement = document.getElementsByClassName("navbar-menu")[0];

    burgerElement.addEventListener("click", (event) => {
        burgerElement.classList.toggle("is-active");
        menuElement.classList.toggle("is-active");

        event.stopPropagation();
    });

    menuElement.addEventListener("click", (event) => {
        event.stopPropagation();
    });

    document.getElementById('main').addEventListener("click", () => {
        burgerElement.classList.remove("is-active");
        menuElement.classList.remove("is-active");
    });

    const messageElements = document.querySelectorAll(".navbar-menu .message");
    Array.from(messageElements).forEach(el => {
        el.addEventListener("click", (event) => {
            event.currentTarget.classList.toggle("mobile-visible");
            event.currentTarget.getElementsByClassName("message-header")[0].classList.toggle("no-bottom-border");
        })
    });



    function findFlippingParent(el) {
        let flipContainer = el.parentElement;

        // Loop through the parent element's ancestors until we find an element with the class "detailed-card".
        while (flipContainer && !flipContainer.classList.contains("detailed-card")) {
            // Continue looping through the ancestors.
            flipContainer = flipContainer.parentElement;
        }

        return flipContainer.children[0] ? flipContainer : null;
    }

    function findActiveElementIndex(elements) {
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].classList && elements[i].classList.contains("active")) {
                return i;
            }
        }
        // Return -1 if no element with the active class is found
        return -1;
    }

    const flexSliders = document.querySelectorAll('.flex-slider');
    flexSliders.forEach((slider) => {
        const flexPhotos = Array.from(slider.children);
        const flipContainer = findFlippingParent(slider);
        const picturesButton = flipContainer.querySelector('.pictures-button');
        const backButton = flipContainer.querySelector('.back-button');
        let intervalID;

        // Function to start the slideshow
        function startSlideshow() {
            let currentIndex = findActiveElementIndex(flexPhotos);

            intervalID = setInterval(() => {
                flexPhotos[currentIndex].classList.remove("active");
                currentIndex = (currentIndex + 1) % flexPhotos.length;
                flexPhotos[currentIndex].classList.add("active");
            }, 3000); // Change the interval duration (in milliseconds) as needed
        }

        // Function to stop the slideshow
        function stopSlideshow() {
            if(intervalID) {
                clearInterval(intervalID);
                intervalID = null;
            }
            // slides.forEach((slide) => slide.classList.remove("active"));
        }


        picturesButton.addEventListener('click', () => {
            flipContainer.classList.add('flipped');
            startSlideshow();
        })

        backButton.addEventListener('click', () => {
            flipContainer.classList.remove('flipped');
            stopSlideshow();
        })


        function setActiveClass(event) {
            stopSlideshow();
            const clickedElement = event.currentTarget;

            // Remove "active" class from all siblings
            flexPhotos.forEach((child) => {
                if (child !== clickedElement) {
                    child.classList.remove('active');
                }
            });

            // Add "active" class to the clicked element
            clickedElement.classList.add('active');
        }

        // Add event listener to each child element
        flexPhotos.forEach((child) => {
            child.addEventListener('click', setActiveClass);
        });
    })



    const anchors = document.querySelectorAll('.navbar-menu .navbar-dropdown a');
    anchors.forEach((anchor) => {
        function scrollFunction() {
            const id = anchor.getAttribute('to');

            // Get the anchor element with the specified id.
            const anchorElement = document.getElementById(id);
            console.log(anchor);

            // Get the scroll position of the anchor element.
            const anchorScrollTop = anchorElement.offsetTop;

            // Scroll smoothly to the anchor element.
            window.scrollTo({
                top: anchorScrollTop,
                behavior: "smooth"
            });

            burgerElement.click();
        }

        anchor.addEventListener('click', scrollFunction);
    });


    const avatars = document.querySelectorAll('.front>.left .blurable .image');
    avatars.forEach((avatar) => {
        let container = avatar.parentElement.parentElement;
        avatar.addEventListener('click', () => container.classList.toggle('cleared'));
    })
});