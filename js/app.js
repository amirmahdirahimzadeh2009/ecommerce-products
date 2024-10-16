const apiURL = "https://fakestoreapi.com/products";
const productGrid = document.getElementById("product-grid");
const searchBox = document.getElementById("search");
const categoryButtons = document.getElementById("category-buttons");
let products = [];
let categories = [];

fetch(apiURL)
  .then((response) => response.json())
  .then((data) => {
    products = data;
    categories = [...new Set(products.map((p) => p.category))];
    displayProducts(products);
    createCategoryButtons();
  });

function displayProducts(productsToShow) {
  productGrid.innerHTML = "";
  productsToShow.forEach((product) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
                    <img src="${product.image}" alt="${product.title}" width="100%">
                    <h3>${product.title}</h3>
                    <p>${product.price} $</p>
                `;
    productGrid.appendChild(card);
  });
}

function createCategoryButtons() {
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.textContent = category;
    button.addEventListener("click", () => filterByCategory(category));
    categoryButtons.appendChild(button);
  });
}

function filterByCategory(category) {
  const filteredProducts = products.filter((p) => p.category === category);
  displayProducts(filteredProducts);

  searchBox.oninput = () => {
    const searchTerm = searchBox.value.toLowerCase();
    const searchFiltered = filteredProducts.filter((p) =>
      p.title.toLowerCase().includes(searchTerm)
    );
    displayProducts(searchFiltered);
  };
}

searchBox.oninput = () => {
  const searchTerm = searchBox.value.toLowerCase();
  const searchFiltered = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm)
  );
  displayProducts(searchFiltered);
};
