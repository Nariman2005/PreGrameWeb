const image = document.querySelectorAll('.carousel-image');

let current = 0;
let timer;

function showImage(index) {
  image.forEach((img, i) => {
    img.classList.toggle('active', i === index);
  });
  current = index;
}

function nextImage() {
  let next = (current + 1) % image.length;
  showImage(next);
  resetAuto();
}

function prevImage() {
  let prev = (current - 1 + image.length) % image.length;
  showImage(prev);
  resetAuto();
}

function autoSwap() {
  timer = setInterval(nextImage, 7000); // 7 seconds per slide
}

function resetAuto() {
  clearInterval(timer);
  autoSwap();
}


// Start the slideshow
autoSwap();

//Cards code
const images = ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg'];
const carousel = document.getElementById('cardCarousel');

images.forEach(src => {
  const img = document.createElement('img');
  img.src = src;
  carousel.appendChild(img);
});

