const products = document.querySelectorAll('.product');
const cartTable = document.querySelector('#cart-table');
const cartItems = document.querySelector('#cart-items');
const total = document.querySelector('#total');


// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyB5GM3zuUazBs_s0niQm1Mf5sz4e32BfeQ",
  authDomain: "deneme-68b5e.firebaseapp.com",
  projectId: "deneme-68b5e",
  storageBucket: "deneme-68b5e.appspot.com",
  messagingSenderId: "782607030414",
  appId: "1:782607030414:web:33b8c196c76acf7c9111df",
  measurementId: "G-NVEB15VFDT",
  databaseURL: "https://deneme-68b5e-default-rtdb.firebaseio.com/"
};
firebase.initializeApp(firebaseConfig);

// Get a reference to the database
var database = firebase.database();

let cart = [];

function addToCart(name, price, description) {
  // Add the item to the cart array
  cart.push({ name, price, description });
  // Update the cart in Firebase
  database.ref('/cart').set(cart);
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = '';
  let grandTotal = 0;

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    grandTotal += item.price;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.name}</td>
      <td>${item.price}</td>
      <td>${item.description}</td>
      <td><button onclick="removeFromCart(${i})">DEL</button></td>
    `;
    cartItems.appendChild(tr);
  }

  total.innerHTML = `Total: $${grandTotal}`;
}

function removeFromCart(index) {
  // Remove the item from the cart array
  cart.splice(index, 1);
  // Update the cart in Firebase
  database.ref('/cart').set(cart);
  updateCart();
}

products.forEach(product => {
  product.addEventListener('click', () => {
    const name = product.dataset.name;
    const price = parseFloat(product.dataset.price);
    const description = product.dataset.description;
    addToCart(name, price, description);
  });
});

// Get the cart from Firebase when the page loads
database.ref('/cart').once('value').then(function(snapshot) {
  cart = snapshot.val() || [];
  updateCart();
});