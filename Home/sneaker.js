const slides = document.querySelectorAll('.slider');
let currentIndex = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

function nextBtn() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

function preBtn() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
}

// Khởi tạo slide đầu tiên
showSlide(currentIndex);

// Tự chuyển slide mỗi 3 giây
setInterval(() => {
  nextBtn();
}, 5000);

const selectorLinks = document.querySelectorAll('.selector .type');

selectorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); 
        selectorLinks.forEach(l => l.classList.remove('highlight'));
        link.classList.add('highlight');
    });
});

const navItems = document.querySelectorAll('.nav');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        // Xóa class active của tất cả nav
        navItems.forEach(nav => nav.classList.remove('active'));

        // Thêm class active cho nav vừa click
        item.classList.add('active');
    });
});



function loadProducts() {
  const productsContainer = document.querySelector("#products");
  productsContainer.innerHTML = '';

  db.collection("products").get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const product = doc.data();
        const card = createProductCard(product, doc.id);
        productsContainer.appendChild(card);
      });
      document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', () => {
          const productId = btn.getAttribute('data-id');
          alert(`Sản phầm đã được thêm vào giỏ hàng`);
          updateProductOnCart(productId);
        });
      });
    })
    .catch((error) => {
      console.error("Error getting documents: ", error);
    });
}

// Lọc giày theo mục đích
function loadProductsByType(type) {
  const productsContainer = document.querySelector("#products");
  productsContainer.innerHTML = '';

  db.collection("products").where("type", "==", type).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const product = doc.data();
        const card = createProductCard(product, doc.id);
        productsContainer.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Error getting documents: ", error);
    });
}

// Lọc giày theo giới tính
function loadProductsByGender(gender) {
  const productsContainer = document.querySelector("#products");
  productsContainer.innerHTML = '';

  db.collection("products").where("gender", "==", gender).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const product = doc.data();
        const card = createProductCard(product, doc.id);
        productsContainer.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Error getting documents: ", error);
    });
}

function scrollDown() {
  const element = document.getElementById("products");
  if(element) {
    const yOffset = -100; // offset lên trên 100px, chỉnh theo bạn muốn
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

function createProductCard(product, productId) {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <div class="container">
      <img class="image-container" src="${product.image}" alt="${product.name}">
      <h4 class="product-name">${product.name}</h4>
      <h5 class="price">${Number(product.price).toLocaleString('vi-VN')}&nbsp;VND</h5>
      <button class="add-to-cart" data-id="${productId}">Add to cart</button>
      <button class="showMore">Show more</button>
    </div>
  `;
  card.querySelector('.showMore').addEventListener('click', () => {
    window.location.href = `show.html?id=${productId}`;
  });
  return card;
}

// Hàm cập nhật sản phẩm đã được thêm vào giỏ hàng trên Firestore
function updateProductOnCart(productId) {
  db.collection('products').doc(productId).update({
    "onCart": true
  })
    .then(() => {
      console.log("Sản phẩm đã được thêm vào giỏ hàng (onCart: true)");
      loadProducts();
    })
    .catch((error) => {
      console.error("Lỗi không thêm được sản phẩm vào giỏ hàng:", error);
    });
}

function showMore(productID) {

}

// Load mặc định tất cả sản phẩm khi trang vừa load
window.onload = function () {
  loadProducts();
};

// Sự kiện click theo loại
document.querySelectorAll('.type').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('.type').forEach(el => el.classList.remove('highlight'));
    link.classList.add('highlight');

    const selected = link.innerText.trim().toUpperCase();

    if (selected === "ALL") {
      loadProducts();
    } else if (["MEN", "WOMEN", "KIDS"].includes(selected)) {
      loadProductsByGender(capitalizeFirstLetter(selected));
    } else {
      loadProductsByType(capitalizeFirstLetter(selected));
    }
  });
});

// Hàm hỗ trợ viết hoa chữ đầu tiên
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

