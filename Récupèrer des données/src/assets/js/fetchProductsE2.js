
const button = document.getElementById("toggleBtn");

// état : les produits sont-ils affichés ?
let productsLoaded = false;

async function loadProducts() {

    const container = document.getElementById("product-list");

    if (!container) return;

    try {

        // appel du JSON distant
        const response = await fetch("https://dummyjson.com/products");

        if (!response.ok) {
            throw new Error("Erreur lors du chargement des produits");
        }

        const data = await response.json();

        // ⚠️ ici les produits sont dans data.products
        const products = data.products;

        const html = products.map(product => `

        <div class="product-item">

            <img src="${product.thumbnail}" alt="${product.title}">

            <div class="product-info">

                <h3 class="product-title">${product.title}</h3>

                <p>${product.description}</p>

                <p class="product-price">$${product.price}</p>

                <a href="#" class="btn">Add to Cart</a>

            </div>

        </div>

        `).join("");

        container.innerHTML = html;

    } catch (error) {

        console.error("Erreur :", error);

    }

}

// événement bouton
button.addEventListener("click", async () => {

    const container = document.getElementById("product-list");

    if (!productsLoaded) {

        await loadProducts();

        button.textContent = "Clear data";

        productsLoaded = true;

    } else {

        container.innerHTML = "";

        button.textContent = "Load products";

        productsLoaded = false;

    }
});
