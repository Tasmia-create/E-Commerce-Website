// Cart Functionality

const cartItems = [];
const cartTotalElement = document.getElementById('cart-total');
const cartItemsElement = document.getElementById('cart-items');

// Function to Add Items to the Cart
function addToCart(productName, productPrice) {
  const item = { name: productName, price: productPrice };
  cartItems.push(item);
  updateCart();
}

// Function to Update Cart
function updateCart() {
  // Clear the cart list
  cartItemsElement.innerHTML = '';

  // Add items to the cart list
  cartItems.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - ₹${item.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
    
    // Add a remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = () => removeFromCart(index);
    
    li.appendChild(removeBtn);
    cartItemsElement.appendChild(li);
  });

  // Update the total
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  cartTotalElement.textContent = total.toLocaleString('en-IN', { minimumFractionDigits: 2 });
}

// Function to Remove Items from the Cart
function removeFromCart(index) {
  cartItems.splice(index, 1);
  updateCart();
}

// Add Event Listeners to Product Cards
document.querySelectorAll('.product').forEach(product => {
  product.addEventListener('click', () => {
    const productName = product.querySelector('h3').textContent;

    // Clean and convert price string: remove ₹ and commas
    const priceText = product.querySelector('p').textContent;
    const productPrice = parseFloat(priceText.replace(/[^0-9.]/g, ''));

    // Add item to cart
    addToCart(productName, productPrice);
  });
});
