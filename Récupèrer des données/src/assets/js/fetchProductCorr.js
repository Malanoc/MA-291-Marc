async function loadProducts() {

    const container = document.getElementById("product-list");

    if (!container) return;

    try {

        const response = await fetch("../../data/products.json");

        if (!response.ok) {
            throw new Error("Erreur chargement JSON");
        }

        const products = await response.json();

        const html = products.map(product => `

        <div class="product-item">

            <img src="${product.image}" alt="${product.alt}">

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

        console.error(error);

    }

}

loadProducts();