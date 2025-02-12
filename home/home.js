document.addEventListener("DOMContentLoaded", function () {
    const img = document.querySelector(".welcome-image"); // find img
    const imgs = ["home/sweplus_photos/photo1.jpg", "home/sweplus_photos/photo2.jpg", "home/sweplus_photos/photo3.jpg"]; // list of imgs

    let index = 0; // start @ first img

    setInterval(() => {
        index = (index + 1) % imgs.length; // move to next img
        img.src = imgs[index]; // Change the image
    }, 2200); // runs every 2 seconds

        function animateCounter(element, start, end, duration) {
            let startTime = null;

            function updateCounter(timestamp) {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                const currentValue = Math.floor(progress * (end - start) + start);


                const label = element.getAttribute("data-label");
                element.innerHTML = `${currentValue}+<br><span class="modify_stats">${label}</span>`;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            }

            requestAnimationFrame(updateCounter);
        }

        const statsSection = document.querySelector(".stats");
        const statsElements = [
            { element: document.querySelector(".stats1"), endValue: 400 },
            { element: document.querySelector(".stats2"), endValue: 30 },
            { element: document.querySelector(".stats3"), endValue: 100 }
        ];


        statsElements.forEach(stat => {
            const span = stat.element.querySelector(".modify_stats");
            if (span) {
                stat.element.setAttribute("data-label", span.innerText);
            }
        });

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    statsElements.forEach(stat => {
                        animateCounter(stat.element, 0, stat.endValue, 1500);
                    });
                    observer.disconnect();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);

});
