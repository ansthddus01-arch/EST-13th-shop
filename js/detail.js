import { addToCart, updateCartCount } from "./untils/common.js";

const detailSection = document.querySelector(".detail-section");
const detailImage = document.querySelector(".detail-image");
const detailThumbs = document.querySelector(".detail-thumbs");
const brand = document.querySelector(".detail-brand");
const title = document.querySelector(".detail-title");
const rating = document.querySelector(".detail-rating");
const desc = document.querySelector(".detail-desc");
const price = document.querySelector(".detail-price");
const discount = document.querySelector(".detail-discount");
const shipping = document.querySelector(".detail-shipping");
const stock = document.querySelector(".detail-stock");
const warranty = document.querySelector(".detail-warranty");
const qtyInput = document.querySelector(".detail-qty");
const cartButton = document.querySelector(".detail-cart");
const specList = document.querySelector(".spec-list");
const reviewList = document.querySelector(".review-list");

let currentProduct = null;

async function fetchProduct() {
  try {
    const id = Number(new URLSearchParams(window.location.search).get("id"));
    const res = await fetch("./data/products.json");
    const data = await res.json();
    currentProduct = data.products.find(product => product.id === id) || data.products[0];

    if (!currentProduct) {
      renderEmpty();
      return;
    }

    renderProduct(currentProduct);
  } catch (error) {
    console.error("상품 상세 정보를 불러오지 못했습니다.", error);
    renderEmpty();
  }
}

function renderProduct(product) {
  const images = product.images?.length ? product.images : [product.thumbnail];

  document.title = `${product.title} | ShopMall`;
  detailImage.src = images[0];
  detailImage.alt = product.title;
  brand.textContent = product.brand || product.category;
  title.textContent = product.title;
  rating.textContent = `★ ${product.rating} / 5`;
  desc.textContent = product.description;
  price.textContent = `$${product.price.toLocaleString()}`;
  discount.textContent = `${product.discountPercentage}% 할인`;
  shipping.textContent = product.shippingInformation;
  stock.textContent = `${product.availabilityStatus} · ${product.stock}개 남음`;
  warranty.textContent = product.warrantyInformation;

  detailThumbs.innerHTML = images
    .map(
      (image, index) => `
        <button type="button" class="detail-thumb ${index === 0 ? "is-active" : ""}" data-image="${image}">
          <img src="${image}" alt="${product.title} 이미지 ${index + 1}" />
        </button>
      `,
    )
    .join("");

  specList.innerHTML = `
    <div><dt>카테고리</dt><dd>${product.category}</dd></div>
    <div><dt>SKU</dt><dd>${product.sku}</dd></div>
    <div><dt>무게</dt><dd>${product.weight}kg</dd></div>
    <div><dt>크기</dt><dd>${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth}</dd></div>
    <div><dt>반품</dt><dd>${product.returnPolicy}</dd></div>
    <div><dt>최소 주문</dt><dd>${product.minimumOrderQuantity}개</dd></div>
  `;

  reviewList.innerHTML = product.reviews
    .map(
      review => `
        <article class="review-item">
          <strong>${review.reviewerName} · ★ ${review.rating}</strong>
          <p>${review.comment}</p>
        </article>
      `,
    )
    .join("");
}

function renderEmpty() {
  detailSection.outerHTML = `
    <section class="detail-empty container">
      <h1>상품을 찾을 수 없습니다.</h1>
      <p>상품 목록에서 다시 선택해주세요.</p>
      <a href="./index.html" class="btn btn-primary">목록으로 돌아가기</a>
    </section>
  `;
}

detailThumbs.addEventListener("click", event => {
  const button = event.target.closest(".detail-thumb");
  if (!button) return;

  detailImage.src = button.dataset.image;
  detailThumbs.querySelectorAll(".detail-thumb").forEach(thumb => thumb.classList.remove("is-active"));
  button.classList.add("is-active");
});

cartButton.addEventListener("click", () => {
  const qty = Math.max(1, Number(qtyInput.value) || 1);
  addToCart(currentProduct, qty);
});

fetchProduct();
updateCartCount();
