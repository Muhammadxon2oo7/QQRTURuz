document.addEventListener('DOMContentLoaded', function() {
  const card = document.querySelector('.card');
  const imagesContainer = document.querySelector('.images');
  let interval;

  card.addEventListener('mouseenter', function() {
    const width = -imagesContainer.offsetWidth / 2; // Ikki marta takrorlangan rasmlar yarmi
    let currentPosition = 0;

    interval = setInterval(() => {
      currentPosition -= 300; // Har bir rasm kengligi
      if (currentPosition < width) {
        currentPosition = 0; // Boshiga qaytarish
      }
      imagesContainer.style.transition = 'none'; // Sakrashsiz siljish
      imagesContainer.style.transform = `translateX(${currentPosition}px)`;
      setTimeout(() => {
        imagesContainer.style.transition = 'transform 0.5s ease'; // Animatsiyani qayta yoqish
      });
    }, 2000);
  });

  card.addEventListener('mouseleave', function() {
    clearInterval(interval);
    imagesContainer.style.transform = 'translateX(0)'; // Dastlabki rasmni ko'rsatish
  });
});





document.querySelectorAll('.card').forEach(card => {
    let carouselInterval;
    const coverImage = card.querySelector('.cover-image');
    const carouselImages = card.querySelectorAll('.carousel-images img');
    let currentIndex = 0;
  
    card.addEventListener('mouseover', () => {
      coverImage.style.display = 'none';
      carouselImages[currentIndex].style.display = 'block';
      
      carouselInterval = setInterval(() => {
        carouselImages[currentIndex].style.display = 'none';
        currentIndex = (currentIndex + 1) % carouselImages.length;
        carouselImages[currentIndex].style.display = 'block';
      }, 500); // Rasmlar har 0.5 soniyada almashinadi
    });
  
    card.addEventListener('mouseout', () => {
      clearInterval(carouselInterval);  
      carouselImages.forEach(img => img.style.display = 'none');
      coverImage.style.display = 'block';
    });
  });


















document.addEventListener("DOMContentLoaded", function() {
  const paths = document.querySelectorAll('svg path');
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  document.body.appendChild(tooltip);

  paths.forEach(path => {
      path.addEventListener('mousemove', function(e) {
        
          this.style.strokeWidth = '2'; // Increase stroke width
      });

      path.addEventListener('mouseout', function() {
          // Hide tooltip
          tooltip.style.display = 'none';

          // Reset the path style to default
          this.style.fill = '';  // Reset fill color
          this.style.stroke = ''; // Reset stroke color
          this.style.strokeWidth = ''; // Reset stroke width
      });
  });
});


document.addEventListener("DOMContentLoaded", function() {
  const paths = document.querySelectorAll('svg path');
  const tooltip = document.createElement('div');
  // tooltip.className = 'tooltip';
  document.body.appendChild(tooltip);
  const infoPanel = document.getElementById('infoPanel');

  paths.forEach(path => {
      path.addEventListener('mousemove', function(e) {
          // // Show tooltip
          // tooltip.style.display = 'block';
          // tooltip.style.left = e.pageX + 10 + 'px';
          // tooltip.style.top = e.pageY + 10 + 'px';
          // tooltip.textContent = this.getAttribute('title');

          // Highlight this path
          // this.style.fill = 'aqua';
          this.style.stroke = 'white';
          this.style.strokeWidth = '2';

          
          // Update info panel
          // Tekshirish
          
          infoPanel.innerHTML = `
          <img src="${this.getAttribute('src')}" class='pointer__image' alt="Image of ${this.getAttribute('id')}" style="height:300px">
              <h4 class="title"> ${this.getAttribute('id')}</h4>
              
              <p class='map-dec'>${this.getAttribute('dec')}</p>
          `;
      });

      path.addEventListener('mouseout', function() {
          // Hide tooltip
          tooltip.style.display = 'none';

          // Reset the path style
          this.style.fill = '';
          this.style.stroke = '';
          this.style.strokeWidth = '';

          // Reset info panel
          // infoPanel.textContent = 'Hover over a region to see information.';

          this.style.zIndex = '';
          this.style.transform = '';
          
      });
  });
});


window.addEventListener('scroll', function() {
  const header = document.getElementById('main-header');
  const firstSectionHeight = document.querySelector('#first-section').offsetHeight;

  // Agar scroll birinchi bo'limdan o'tsa, header fixed bo'ladi
  if (window.scrollY > firstSectionHeight) {
    header.classList.add('fixed');
  } else {
    // Birinchi bo‘limda esa header birga skroll bo‘ladi
    header.classList.remove('fixed');
  }
});

let hamburger = document.querySelector('.ham__Wrapper')
let navItem = document.querySelector('.nav__Wrapper')
hamburger.addEventListener('click',()=>{
    navItem.classList.toggle("display")
 
})

var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});





// Elementlarni olish
let modal = document.getElementById("myModal");
let btn = document.getElementById("openModalBtn");
let span = document.getElementsByClassName("close")[0];

// Tugmani bosganda modalni ochish
btn.onclick = function() {
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Skrollni yo'qotish
}

// Yopish tugmasini bosganda modalni yopish
span.onclick = function() {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Skrollni qayta yoqish
}

// Modal tashqarisiga bosilganda modalni yopish
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Skrollni qayta yoqish
    }
}





document.querySelectorAll('#shopbtn').forEach(button => {
    button.addEventListener('click', function() {
        const productElement = this.parentElement;
        const productId = document.getElementById('cardImage').getAttribute('data-id');
        const productName = document.querySelector('#product-name').innerText;
        const productPrice =document.querySelector('#product-price').innerText;
        const productImage = document.getElementById('cardImage').getAttribute('data-src');

        const product = {
            productId: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        };

        fetch('http://localhost:3000/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Savatcha yangilandi:', data);
            alert('Mahsulot savatchaga qo\'shildi!');
        })
        .catch(error => console.error('Xato:', error));
    });
});
































