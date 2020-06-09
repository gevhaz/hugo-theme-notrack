// MODALS FOR PHOTO GALLERY

// Get the modal
var modal = document.getElementById("myModal");
var modalImg = document.getElementById("modal-img");
var captionText = document.getElementById("caption");
var loader = document.getElementById("loader");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Array of all images in gallery
const imgs = [...document.querySelectorAll('.gallery-photo > img')];

// Add index and event listener to all gallery images
imgs.forEach((img, i) => {
  img.dataset.index = i;
  img.addEventListener('click', e => { openModal(e.target); });
});

preloadModalImage = index => {
  let loadingImg = new Image();
  loadingImg.src = imgs[index].src.replace("thumbnails", "fullsize");
}

// Returns indices of current and surrounding images
getSurroundingIndices = img => {
  let i = parseInt(img.dataset.index);
  let prevIndex = i != 0 ? (i - 1) % imgs.length : imgs.length - 1;
  let nextIndex = (i + 1) % imgs.length;
  return {prev: prevIndex, current: i, next: nextIndex};
};

// Image currently shown in modal
let currentImage; 

openModal = img => {
  // Get the image and insert it inside the modal - use 
  // its "alt" text as a caption
  currentImage = img;
  modalImg.src = currentImage.src.replace("thumbnails", "fullsize");
  captionText.innerHTML = img.alt;

  // While loading, show loader and hide image and text
  modal.style.display = 'block';
  loader.style.display = 'block';
  modalImg.style.display = 'none';
  captionText.style.display = 'none';

  // After image is loaded, show image and text and hide loader
  modalImg.addEventListener('load', () => {
    console.log("loaded image");
    captionText.style.display = 'block';
    modalImg.style.display = 'block';
    loader.style.display = 'none';
  });

  // Preload for faster display of images
  const indices = getSurroundingIndices(currentImage);
  preloadModalImage(indices.next);
  preloadModalImage(indices.prev);
};

closeModal = () => {
  modal.style.display = "none";
  modalImg.src = "";

  // Image get selected upon closing on mobile so deselect
  if(window.getSelection) {
    window.getSelection().removeAllRanges();
  }
  if (document.selection) {
    document.selection.empty();
  }
};

changeModalImage = direction => {
  if (modal.style.display == "block") {
    const indices = getSurroundingIndices(currentImage);
    switch (direction) {
      case 'ArrowRight':
        openModal(imgs[indices.next]);
        break;
      case 'ArrowLeft':
        openModal(imgs[indices.prev]);
        break;
    }
  }
};


// CLOSING MODAL

// When <span> (x) is clicked, close the modal
span.onclick = function() {
  closeModal();
};

// Pressing escape closes modal
document.onkeydown = event => {
  switch (event.key) {
    case 'Escape':     closeModal(); break;
    case 'ArrowRight': changeModalImage(event.key); break;
    case 'ArrowLeft':  changeModalImage(event.key); break;
  }
};

// Close modal when it is clicked
modal.addEventListener('click', closeModal, false);


// SWITCH IMAGE BY SWIPING OR MOUSE DRAG

// Unify touch and click cases
unify = e => { return e.changedTouches ? e.changedTouches[0] : e };

// Where swipe or mousedown starts
let x0 = null;

lock = event => { x0 = unify(event).clientX };

move = event => {
  if (x0 || x0 === 0) {
    let dx = unify(event).clientX - x0;
    sign = Math.sign(dx);

    switch (sign) {
      case -1: changeModalImage('ArrowRight'); break;
      case  1: changeModalImage('ArrowLeft'); break;
    }
  }
};

modal.addEventListener('mousedown', lock, false);
modal.addEventListener('touchstart', lock, false);
modal.addEventListener('mouseup', move, false);
modal.addEventListener('touchend', move, false);
modal.addEventListener('touchmove', e => {e.preventDefault()}, false);
modal.addEventListener('mousemove', e => {e.preventDefault()}, false);
