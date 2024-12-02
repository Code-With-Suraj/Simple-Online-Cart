const addToCartButton = document.querySelectorAll(".addToCart")
const cartItemsContainer = document.getElementById("cartItems")
const cartTotalEle = document.getElementById('cartTotal')
const removeButton = document.querySelectorAll(".remove")
const fInput = document.querySelectorAll(".inputQty")

let cart = []

const renderCart = () => {
    cartItemsContainer.innerHTML = ""
    cart.forEach(item => {
        const row = document.createElement('tr')
        row.innerHTML = `<td>${item.name}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td><input class="inputQty" data-id="${item.id}" type="number" min="1" value=${item.qty}></td>
                    <td>${item.price * item.qty}</td>
                    <td><button class="remove" data-id="${item.id}">Remove</button></td>`
        cartItemsContainer.appendChild(row)
    })

}


addToCartButton.forEach(button => {
    button.addEventListener('click', (e) => {
        const productE = e.target.closest('.product')
        const id = parseInt(productE.dataset.id)
        const name = productE.querySelector('h3').textContent
        const price = parseFloat(productE.dataset.price)

        const exitstingProduct = cart.find(item => {
            return item.id === id
        })
        if (exitstingProduct) {
            exitstingProduct.qty += 1
        }
        else {
            cart.push({ id, name, price, qty: 1 })
        }

        renderCart()
        updataCartTotal()

    })
})



cartItemsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove')) {
        const id = parseInt(e.target.dataset.id)
        cart = cart.filter(product => product.id !== id)
        renderCart()
        updataCartTotal()

    }
})

cartItemsContainer.addEventListener('change', (e) => {
    if (e.target.classList.contains('inputQty')) {
        const id = parseInt(e.target.dataset.id)
        const newQty = parseInt(e.target.value)
        // console.log(newQty)
        const item = cart.find(product => product.id === id)
        item.qty = newQty
        renderCart()
        updataCartTotal()
    }
})

const updataCartTotal = () => {
    const total = cart.reduce((sum, item) =>
        sum + item.price * item.qty, 0

    )
    cartTotalEle.textContent = total.toFixed(2)
}