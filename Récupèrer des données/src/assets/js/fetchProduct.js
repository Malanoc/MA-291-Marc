fetch("../../data/products.json")

    .then(response => response.json())

    .then(products => {

        const container = document.getElementById("product-list");

        products.forEach(product => {

            const html = `

        <div class="product-item">

            <img src="${product.image}" alt="${product.alt}">

            <div class="product-info">

                <h3 class="product-title">${product.title}</h3>

                <p>${product.description}</p>

                <p class="product-price">$${product.price}</p>

                <a href="#" class="btn">Add to Cart</a>

            </div>

        </div>

        `;

            container.innerHTML += html;

        });

    });