const get_list = "https://dummyjson.com/products";
const product_container = document.getElementById("products");
const description = document.getElementsByClassName("product__description");
const load_btn = document.getElementById("load-btn");
const clear_list = document.getElementById("clear_products");
const search_buttom = document.getElementById("search-button");
const search_input = document.getElementById("search-input");
const total_products = document.getElementById("total_products");
const loader = document.querySelector(".loader");
const total_products_full_name = document.querySelector(".total_container p");
const detail_section = document.querySelector("#detail_section");
let data;

load_btn.addEventListener("click", () => {
  fetchProducts(get_list);
});

clear_list.addEventListener("click", () => {
  product_container.innerHTML = "";
  totalProducts(0);
});

search_buttom.addEventListener("click", () => {
  data = encodeURIComponent(search_input.value.trim());
  data = `${get_list}/search?q=${data}`;
  product_container.innerHTML = "";
  fetchProducts(data);
});

detail_section.addEventListener("click", function (event) {
  if (event.target.id == "detail_section") closeModal();
});

function totalProducts(totalLength) {
  total_products.textContent = totalLength;
}

async function fetchProducts(list) {
  total_products_full_name.style.display = "none";
  loader.style.display = "inline-block";

  try {
    const response = await fetch(list);

    if (response.ok) {
      const data = await response.json();
      const products = data.products;
      addProducts(products);
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    loader.style.display = "none";
    total_products_full_name.style.display = "block";
  }
}

function addProducts(products) {
  totalProducts(products.length);

  products.forEach((product) => {
    product_container.innerHTML += `<div class="product" id="${product.id}" onclick="detailFetch(${product.id})">
          <figure class="product__img">
            <img
              src="${product.images[0]}"
              alt="${product.title}"
            />
          </figure>
          <span class="product__category">${product.category}</span>
          <h3 class="product__header">${product.title}</h3>
          <p class="product__description">${product.description}</p>
          <div class="product__footer">
            <span class="product__price">$${product.price}</span>
            <span class="product__raiting "><i class="fa-solid fa-star"></i> ${product.rating}</span>
          </div>
        </div>`;
  });
}

async function detailFetch(productId) {
  try {
    const productUrl = `${get_list}/${productId}`;
    const productDetail = await fetch(productUrl);
    if (productDetail.ok) {
      const single_data = await productDetail.json();
      showDetail(single_data);
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function showDetail(product) {
  detail_section.style.display = "block";
  detail_section.innerHTML = `<div class="detail">
        <div class="detail__header">
        <i class="fa-regular fa-circle-xmark detail__header__close_modal" onclick="closeModal()">
        </i></div>
          <figure class="detail__img">
            <img src="${product.images[0]}" alt="${product.title}" />
          </figure>
          <div class="detail__info">
           <h1 class="detail__title">${product.title}</h1>
            <span class="detail__category">${product.category}</span>
            <p class="detail__description">${product.description}</p>
            <div class="detail__footer">
            <span class="detail__price">$${product.price}</span>
            <span class="detail__raiting "><i class="fa-solid fa-star"></i> ${product.rating}</span>
            </div>
          </div>
        </div>`;
}

function closeModal() {
  detail_section.style.display = "none";
}
