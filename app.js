const imagesWrapper = document.querySelector('.image-wrapper');
const totalImages = 3; // Number of images
let currentIndex = 0;
const changeInterval = 5000; // 5 seconds


function slideImages() {
  currentIndex = (currentIndex + 1) % totalImages;
  // Animate the sliding
  $(".image-wrapper").animate({
    left: `-${currentIndex * 100}vw`
  }, 'slow');

  // Reset to the first image when reaching the end
  if (currentIndex === totalImages - 1) {
    setTimeout(() => {
      $(".image-wrapper").css('left', '0');
      currentIndex = -1; // Reset the index for next iteration
    }, changeInterval);
  }
}

// Start the slider
setInterval(slideImages, changeInterval);
