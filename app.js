const imagesWrapper = document.querySelector('.image-wrapper');
const totalImages = 3; // Number of images
let currentIndex = 0;
const changeInterval = 5000; // 5 seconds

// Keep track of each card's slide index
let slideIndices = {};

function slide(element, button, offset,buttonName) {
  // Get a unique identifier for the card (e.g., class name or data attribute)
  let cardId = $(element).attr('class').split(' ')[0]; // Use the first class as a unique identifier
  // Initialize the slide index if it doesn't exist for this card
  if (!slideIndices[cardId]) {
    slideIndices[cardId] = 0;
  }

  // Determine the new left value based on the direction
  let newval = 0;

  if (offset < 0) { // Moving right
    slideIndices[cardId]++;
    newval = -slideIndices[cardId] * Math.abs(offset); // Move by -125% each time
  } else if (offset > 0) { // Moving left
    slideIndices[cardId]--;
    newval = -slideIndices[cardId] * Math.abs(offset); // Move back by 125% each time
  }

  // Animate the element to the new value in '%'
  $(element).animate({
    left: newval + '%'
  }, 'slow');

  console.log("New left value:", newval);

  // Disable right button if sliding past last card (beyond -250%)
  if (newval <= -250) {
    button.css('visibility', 'hidden').attr("disabled", "disabled");
  }
  else {
    button.css('visibility', 'visible').removeAttr("disabled");
  }

  // Enable the left button if the card is not at the starting position
  if (slideIndices[cardId] > 0) {
    $(".ctrl-left[name=" + buttonName + "]").removeClass('disable');
  } else {
    $(".ctrl-left[name=" + buttonName + "]").addClass('disable');
  }
}


// Handle right control click
$(".ctrl-right").on("click", function () {
  let buttonName = $(this).attr("name");
  let image = $("." + buttonName);
  let button = $(this);
  let offset = -125;
  slide(image, button, offset,buttonName);
});

// Handle left control click
$(".ctrl-left").on("click", function () {
  let buttonName = $(this).attr("name");
  let image = $("." + buttonName);
  let button = $(this);
  let offset = 125;
  slide(image, button, offset);
});
