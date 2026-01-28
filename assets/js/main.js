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

load_btn.addEventListener("click", () => {
  fetchProducts(get_list);
});

clear_list.addEventListener("click", () => {
  product_container.innerHTML = "";
  totalProducts(0);
});

search_buttom.addEventListener("click", () => {
  let data = encodeURIComponent(search_input.value.trim());
  data = `${get_list}/search?q=${data}`;
  product_container.innerHTML = "";
  fetchProducts(data);
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
    product_container.innerHTML += `<div class="product">
          <figure class="product__img">
            <img
              src="${product.images[0]}"
              alt=""
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
