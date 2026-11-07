// MODALS FOR PHOTO GALLERY

// Get the modal
var modal = document.getElementById("myModal");
var modalImg = document.getElementById("modal-img");
var captionText = document.getElementById("caption");
var loader = document.getElementById("loader");

// Get the button that closes the modal
var closeButton = document.getElementsByClassName("close")[0];

// Array of all images in gallery
const imgs = [...document.querySelectorAll('.gallery-photo > img')];

// Number the images and put each in a button that opens it, so that it
// can also be reached and opened with the keyboard
imgs.forEach((img, i) => {
  img.dataset.index = i;
  const button = document.createElement('button');
  button.type = 'button';
  img.replaceWith(button);
  button.append(img);
  button.addEventListener('click', () => { openModal(img); });
});

const preloadModalImage = index => {
  let loadingImg = new Image();
  loadingImg.src = imgs[index].src.replace("thumbnails", "fullsize");
}

// Returns indices of current and surrounding images
const getSurroundingIndices = img => {
  let i = parseInt(img.dataset.index);
  let prevIndex = i != 0 ? (i - 1) % imgs.length : imgs.length - 1;
  let nextIndex = (i + 1) % imgs.length;
  return {prev: prevIndex, current: i, next: nextIndex};
};

// Image currently shown in modal
let currentImage; 

// After image is loaded, show image and text and hide loader
modalImg.addEventListener('load', () => {
  captionText.style.display = 'block';
  modalImg.style.display = 'block';
  loader.style.display = 'none';
});

const openModal = img => {
  // Get the image and insert it inside the modal - use 
  // its "alt" text as a caption
  currentImage = img;
  modalImg.src = currentImage.src.replace("thumbnails", "fullsize");
  modalImg.alt = img.alt;
  captionText.textContent = img.alt;

  // showModal moves focus into the dialog and makes the rest of the page
  // unreachable until it's closed
  if (!modal.open) modal.showModal();

  // While loading, show loader and hide image and text
  loader.style.display = 'block';
  modalImg.style.display = 'none';
  captionText.style.display = 'none';

  // Preload for faster display of images
  const indices = getSurroundingIndices(currentImage);
  preloadModalImage(indices.next);
  preloadModalImage(indices.prev);
};

// Closing the dialog returns focus to the button that opened it
const closeModal = () => { modal.close(); };

// The dialog also closes by itself on Escape
modal.addEventListener('close', () => {
  modalImg.src = "";

  // Image get selected upon closing on mobile so deselect
  if(window.getSelection) {
    window.getSelection().removeAllRanges();
  }
  if (document.selection) {
    document.selection.empty();
  }
});

const changeModalImage = direction => {
  if (modal.open) {
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

// When the button (x) is clicked, close the modal
closeButton.onclick = function() {
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

// Close modal when it is clicked, but not at the end of a mouse drag,
// which also ends in a click
modal.addEventListener('click', event => { if (!dragged(event)) closeModal(); }, false);


// SWITCH IMAGE BY SWIPING OR MOUSE DRAG

// Unify touch and click cases
const unify = e => { return e.changedTouches ? e.changedTouches[0] : e };

// Where swipe or mousedown starts
let x0 = null;

const lock = event => { x0 = unify(event).clientX };

// How far the pointer has moved since it went down on the modal
const distance = event => unify(event).clientX - x0;

// Whether it moved far enough to count as a swipe or drag, not a click
const dragged = event => x0 !== null && Math.abs(distance(event)) >= 10;

const move = event => {
  if (dragged(event)) {
    changeModalImage(distance(event) < 0 ? 'ArrowRight' : 'ArrowLeft');
  }
};

modal.addEventListener('mousedown', lock, false);
modal.addEventListener('touchstart', lock, false);
modal.addEventListener('mouseup', move, false);
modal.addEventListener('touchend', move, false);
modal.addEventListener('touchmove', e => {e.preventDefault()}, false);
modal.addEventListener('mousemove', e => {e.preventDefault()}, false);
