// const loadingVideo = document.getElementById('loadingVideo');
// document.body.classList.add('loading');
// const loading = document.getElementById('loading');

// loadingVideo.playbackRate = 2.5;
// loadingVideo.addEventListener('ended', () => {
//   loading.style.display = 'none';
//   document.body.classList.remove('loading');  

//   AOS.init({ once: true });
// });


  AOS.init({ once: true });
 
 
// menu-button
const menuButton = document.querySelector('.menu-button');
const menuContainer = document.querySelector('.navbar nav');
const navContainer = document.querySelector('.menuContainer');
const socialLinks = document.querySelectorAll('.socialLink');

menuButton.addEventListener('click', () => {
  menuButton.classList.toggle('active')
  navContainer.classList.toggle('active')
  menuContainer.classList.toggle('active')
})

socialLinks.forEach(socialLink => {
  socialLink.addEventListener('click', () => {
    menuButton.classList.remove('active')
    navContainer.classList.remove('active')
    menuContainer.classList.remove('active')
  })
})


// image change face
// const container = document.querySelector('.image-container');
// const img = container.querySelector('img');
// const changeFaceBtn = document.getElementById('changeFaceBtn');

// // Array gambar
// const images = [
//   './assets/images/smilingsmirk.jpeg',
//   './assets/images/$SMIRKMAINIMAGE.png',
//   './assets/images/smirk7.jpeg',
//   './assets/images/smirk6.jpeg',
//   './assets/images/smirk8.jpeg',
//   './assets/images/smirk1.jpeg',
//   './assets/images/smirk11.jpeg'
// ];

// function changeImage() {
//   let randomImage;
//   do {
//     randomImage = images[Math.floor(Math.random() * images.length)];
//   } while (randomImage === img.src.split('/').pop());  

//   img.src = randomImage;
// }

// Rotasi 3D saat mouse bergerak
// container.addEventListener('mousemove', (e) => {
//   const rect = container.getBoundingClientRect();
//   const x = e.clientX - rect.left;
//   const y = e.clientY - rect.top;

//   const centerX = rect.width / 2;
//   const centerY = rect.height / 2;

//   const rotateX = ((y - centerY) / centerY) * 10;
//   const rotateY = ((x - centerX) / centerX) * 10;

//   img.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
// });

// container.addEventListener('mouseleave', () => {
//   img.style.transform = `rotateX(0) rotateY(0)`;
// });

// // Click the button → change
// container.addEventListener('click', changeImage);

// // Click the button → change
// changeFaceBtn.addEventListener('click', changeImage);


// launch countdown 
const launchDate = new Date("2025-08-15T09:00:00Z").getTime(); // Change date & time as needed 

// ==== COUNTDOWN TIMER ====
const countdown = setInterval(() => {
  const now = new Date().getTime();
  const distance = launchDate - now;

  if (distance <= 0) {
    clearInterval(countdown);
    document.getElementById("countdown").innerHTML = "<strong>Launched!</strong>";
    activateCA();
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days.toString().padStart(2, '0');
  document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
  document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
  document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
}, 1000);

// ==== AKTIFKAN CONTRACT ADDRESS ====
const copyTextEl = document.getElementById("copyText");
const copyBtn = document.getElementById("copyBtn");

function activateCA() {
  const ca = "000000000000000000000000";

  // change CA in html text
  copyTextEl.textContent = ca;

  // btn active
  copyBtn.disabled = false;
  copyBtn.style.opacity = "1";
  copyBtn.style.cursor = "pointer";

  // click Event  copy
  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(ca).then(() => {
      copyBtn.textContent = "COPIED!";
      setTimeout(() => copyBtn.textContent = "COPY", 2000);
    });
  });
}

// slider 
const slideContainers = document.querySelectorAll('.slide-container');
const animationDuration = 30;

slideContainers.forEach(container => {
  const items = container.querySelectorAll('.wrapper .item');
  const totalItems = items.length;

  items.forEach((item, i) => {
    const delay = (animationDuration / totalItems) * (totalItems - i) * -1;
    item.style.animationDelay = `${delay}s`;
  });
});


// dropdown btn
// JavaScript
const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach(dropdown => {
  const btn = dropdown.querySelector(".btn");

  btn.addEventListener("click", () => {
    // Tutup semua dropdown lain
    dropdowns.forEach(d => {
      if (d !== dropdown) {
        d.classList.remove("active");
      }
    });

    // Toggle dropdown yang diklik
    dropdown.classList.toggle("active");
  });
});
