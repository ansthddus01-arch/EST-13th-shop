import { readCart, updateCartCount } from "./utils/common.js";
//실행한 결과
updateCartCount();
const cart = readCart();
console.log(cart);

function cartList(all, brand, id) {
  const cartHTML = cart.map(
    p => `
      <article class="cart-item">
              <span class="item-check"><span class="check-box" aria-hidden="true"></span></span>
              <div class="cart-thumb">
                <img
                  src="${p.thumb}"
                  alt="${p.title}"
                />  
              </div>
              <div class="cart-item-info"> 
                <h2>${p.title}</h2>
                <p>${p.brand} | 블랙</p>
                <strong>${p.price}</strong>
              </div>
              <div class="quantity-box" aria-label="수량">
                <button type="button" aria-label="수량 줄이기">-</button>
                <span>${p.qty}</span>
                <button type="button" aria-label="수량 늘리기">+</button>
              </div>
              <button type="button" class="remove-item" aria-label="프리미엄 무선 블루투스 헤드폰 삭제"></button>
            </article>
    `,
  );

  document.querySelector(".cart-list").innerHTML += cartHTML.join("");
}
cartList();
