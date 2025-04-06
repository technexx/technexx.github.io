/*
	Strata by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

//Gallery pop up code start

const imagePopups = document.querySelectorAll('.popup-overlay'); // Get all popups

document.addEventListener('click', (event) => {
    // Open Popup
    if (event.target.matches('[id^="openPopup"]')) {
        const index = event.target.id.slice(-1); // Extract the number from the ID
        const popup = document.getElementById(`imagePopup${index}`);
        if (popup) {
            popup.style.display = 'flex';
            setTimeout(() => {
                popup.classList.add('show');
            }, 10);
            // Reset slider counter for this popup (optional, if you want each to start at the first image)
            const slider = popup.querySelector('.image-slider');
            if (slider) {
                slider.style.transform = 'translateX(0%)';
            }
            const counterObj = {}; // You might need a way to track counters per popup
            counterObj[index] = 0;
        }
    }

    // Close Popup

    const imagePopups = document.querySelectorAll('.popup-overlay');
    imagePopups.forEach(popup => {
        if (popup.classList.contains('show')) {
            const popupContent = popup.querySelector('.popup-content');
            console.log('Click detected. Popup shown:', popup.id, 'Target:', event.target, 'Content:', popupContent);
            if (popupContent && !popupContent.contains(event.target)) {
                console.log('Clicked OUTSIDE content:', popup.id);
                popup.classList.remove('show');
                setTimeout(() => {
                    popup.style.display = 'none';
                }, 300);
            } else {
                console.log('Clicked INSIDE content:', popup.id);
            }
        }
    });

    // Next Image
    if (event.target.matches('.arrow-right')) {
        const index = parseInt(event.target.onclick.toString().match(/nextImage\((\d+)\)/)[1]);
        const slider = document.getElementById(`imagePopup${index}`).querySelector('.image-slider');
        const images = slider.querySelectorAll('img');
        let counter = parseInt(slider.dataset.counter || 0);
        counter++;
        if (counter >= images.length) {
            counter = 0;
        }
        slider.style.transform = `translateX(-${counter * 100}%)`;
        slider.dataset.counter = counter;
    }

    // Previous Image
    if (event.target.matches('.arrow-left')) {
        const index = parseInt(event.target.onclick.toString().match(/prevImage\((\d+)\)/)[1]);
        const slider = document.getElementById(`imagePopup${index}`).querySelector('.image-slider');
        const images = slider.querySelectorAll('img');
        let counter = parseInt(slider.dataset.counter || 0);
        counter--;
        if (counter < 0) {
            counter = images.length - 1;
        }
        slider.style.transform = `translateX(-${counter * 100}%)`;
        slider.dataset.counter = counter;
    }

    // Close popup by clicking outside
    imagePopups.forEach(popup => {
        if (event.target === popup && popup.style.display === 'flex') {
            popup.classList.remove('show');
            setTimeout(() => {
                popup.style.display = 'none';
            }, 300);
        }
    });
});

//Gallery pop up code end

(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		settings = {

			// Parallax background effect?
				parallax: true,

			// Parallax factor (lower = more intense, higher = less intense).
				parallaxFactor: 20

		};

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1800px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ],
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch?
		if (browser.mobile) {

			// Turn on touch mode.
				$body.addClass('is-touch');

			// Height fix (mostly for iOS).
				window.setTimeout(function() {
					$window.scrollTop($window.scrollTop() + 1);
				}, 0);

		}

	// Footer.
		breakpoints.on('<=medium', function() {
			$footer.insertAfter($main);
		});

		breakpoints.on('>medium', function() {
			$footer.appendTo($header);
		});

	// Header.

		// Parallax background.

			// Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
				if (browser.name == 'ie'
				||	browser.mobile)
					settings.parallax = false;

			if (settings.parallax) {

				breakpoints.on('<=medium', function() {

					$window.off('scroll.strata_parallax');
					$header.css('background-position', '');

				});

				breakpoints.on('>medium', function() {

					$header.css('background-position', 'left 0px');

					$window.on('scroll.strata_parallax', function() {
						$header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
					});

				});

				$window.on('load', function() {
					$window.triggerHandler('scroll');
				});

			}

	// Main Sections: Two.

		// Lightbox gallery.
			$window.on('load', function() {

				$('#two').poptrox({
					caption: function($a) { return $a.next('h3').text(); },
					overlayColor: '#2c2c2c',
					overlayOpacity: 0.85,
					popupCloserText: '',
					popupLoaderText: '',
					selector: '.work-item a.image',
					usePopupCaption: true,
					usePopupDefaultStyling: false,
					usePopupEasyClose: false,
					usePopupNav: true,
					windowMargin: (breakpoints.active('<=small') ? 0 : 50)
				});

			});

})(jQuery);