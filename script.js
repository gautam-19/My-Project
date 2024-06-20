let cart = [];

document.addEventListener("DOMContentLoaded", function() {
    const products = document.querySelectorAll(".products li");
    const cartList = document.getElementById("cart-list");
    const totalPriceElement = document.getElementById("total-price");
    const checkoutBtn = document.getElementById("checkout-btn");

    products.forEach((product) => {
        product.addEventListener("click", (e) => {
            const productName = product.querySelector("h3").textContent;
            const productPrice = parseFloat(product.querySelector("p").textContent.replace("$", ""));
            const productImage = product.querySelector("img").src;

            const cartItem = {
                name: productName,
                price: productPrice,
                image: productImage,
            };

            cart.push(cartItem);

            updateCart();
        });
    });

    checkoutBtn.addEventListener("click", () => {
        alert("Checkout successful!");
        cart = [];
        updateCart();
    });

    function updateCart() {
        cartList.innerHTML = "";
        let totalPrice = 0;

        cart.forEach((item) => {
            const cartItemHTML = `
                <li>
                    <img src="${item.image}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>$${item.price.toFixed(2)}</p>
                    <button class="remove-btn">Remove</button>
                </li>
            `;

            cartList.innerHTML += cartItemHTML;

            totalPrice += item.price;
        });

        totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;

        const removeBtns = document.querySelectorAll(".remove-btn");

        removeBtns.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const index = cart.findIndex((item) => item.name === e.target.parentNode.querySelector("h3").textContent);
                cart.splice(index, 1);
                updateCart();
            });
        });
    }
});