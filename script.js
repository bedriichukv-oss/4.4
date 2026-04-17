const productCard = document.getElementById("product-card");
const modal = document.getElementById("modal");
const openModalBtn = document.getElementById("open-modal-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const detailsForm = document.getElementById("details-form");

function formatCurrency(value, currency = "USD", locale = "en-US") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
}

function createProductMarkup(product) {
  const imageAlt = product.title ? `${product.title} image` : "Product image";

  return `
    <h1 class="product-title">${product.title}</h1>
    <img class="product-image" src="${product.image}" alt="${imageAlt}" />
    <p class="product-description">${product.description}</p>
    <p class="product-price">Price: ${formatCurrency(product.price)}</p>
    <button class="primary-btn" type="button" id="add-to-cart-btn">Add to Cart</button>
  `;
}

async function loadProduct() {
  try {
    const response = await fetch("./ProductsList.json");
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const products = await response.json();
    if (!Array.isArray(products) || products.length === 0) {
      throw new Error("Products list is empty or invalid");
    }

    const product = products[0];
    productCard.innerHTML = createProductMarkup(product);

    const addToCartBtn = document.getElementById("add-to-cart-btn");
    addToCartBtn.addEventListener("click", () => {
      addToCartBtn.textContent = "Added!";
      addToCartBtn.disabled = true;
    });
  } catch (error) {
    productCard.innerHTML = `<p class="status">Could not load product data.</p>`;
    console.error(error);
  }
}

openModalBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.add("hidden");
  }
});

detailsForm.addEventListener("submit", (event) => {
  event.preventDefault();
  modal.classList.add("hidden");
  detailsForm.reset();
});

loadProduct();
