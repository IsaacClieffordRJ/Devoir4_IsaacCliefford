
let shopItemsData = [
  {
    id: 1,
    name: "Bose S1 Pro",
    price: 599.99,
    desc: "Le Bose S1 Pro est un speaker Bluetooth puissant.",
    img: "images/bose.jpg"
  },
  {
    id: 2,
    name: "Transparent Speaker",
    price: 300,
    desc: "Transparent Speaker est une enceinte innovante et futuriste.",
    img: "images/transparent.jpg"
  },
  {
    id: 3,
    name: "Yahama ChR10",
    price: 279.99,
    desc: "Son puissant, design élégant, durable, polyvalent, innovant.",
    img: "images/yamaha.jpg"
  },
  {
    id: 4,
    name: "JBL Xtreme 3",
    price: 349.95,
    desc: "Puissante, portable, basses profondes, robuste, immersive.",
    img: "images/jbl.jpg"
  },
  {
    id: 5,
    name: "Airpods Pro Max",
    price: 549.99,
    desc: "Son spatial, premium, isolant, intuitif, élégant.",
    img: "images/airpods_pro_max.jpg"
  },
  {
    id: 6,
    name: "Beats Solo4",
    price: 299.95,
    desc: "Basses puissantes, ANC, léger, moderne, confortable.",
    img: "images/beats_solo.jpg"
  },
  {
    id: 7,
    name: "Bose Quiet",
    price: 329.99,
    desc: "Confort, réduction bruit active, précis, léger, équilibré.",
    img: "images/bose_quiet.jpg"
  },
  {
    id: 8,
    name: "Sennheiser",
    price: 349.95,
    desc: "Son haute fidélité, confortable, précis, autonome, élégant.",
    img: "images/sennheiser.jpg"
  },
  {
    id: 9,
    name: "Airpods Pro 2",
    price: 229.99,
    desc: "Enceinte Bluetooth avec un son vintage, idéale pour les mélomanes.",
    img: "images/airpods.jpg"
  },
  {
    id: 10,
    name: "Samsung Ear Buds 2",
    price: 149.99,
    desc: "Enceinte Bluetooth portable et étanche, conçue pour des soirées en extérieur avec un son 360°.",
    img: "images/samsung.jpg"
  },
  {
    id: 11,
    name: "Jabra Elite 85T",
    price: 2999.99,
    desc: "Enceinte haut de gamme avec un design épuré, son exceptionnel et connectivité sans fil.",
    img: "images/jabra.jpg"
  },
  {
    id: 12,
    name: "Sennheiser Momentum True Wireless 2",
    price: 199.99,
    desc: "Écouteurs sans fil avec une excellente réduction de bruit et une qualité sonore supérieure.",
    img: "images/senn.jpg"
  },
];



let basket = JSON.parse(localStorage.getItem("data")) || [];
let ShoppingCart = document.getElementById("shopping-cart");
let label = document.getElementById("label");

let generateCartItems = () => {
  if (basket.length !== 0) {
    ShoppingCart.innerHTML = basket.map(({id, item}) => {
      let search = shopItemsData.find(x => x.id === id) || [];
      return `
        <div class="cart-item">
          <img width="100" src=${search.img} alt="" />
          <div class="details">
            <div class="title-price-x">
              <h4 class="title-price">
                <p>${search.name}</p>
                <p class="cart-item-price">$ ${search.price}</p>
              </h4>
              <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
            </div>
            <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">${item}</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
            <h3>$ ${item * search.price}</h3>
          </div>
        </div>
      `;
    }).join("");
  } else {
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
      <h2>Cart is Empty</h2>
      <a href="index.html">
        <button class="HomeBtn">Back to home</button>
      </a>
    `;
  }
};

let increment = (id) => {
  let search = basket.find(x => x.id === id);

  if (search === undefined) {
    basket.push({id: id, item: 1});
  } else {
    search.item += 1;
  }

  localStorage.setItem("data", JSON.stringify(basket));
  generateCartItems();
  calculation();
  TotalAmount();
};

let decrement = (id) => {
  let search = basket.find(x => x.id === id);

  if (search === undefined) return;
  if (search.item === 0) return;

  search.item -= 1;

  if (search.item === 0) {
    basket = basket.filter(x => x.id !== id);
  }

  localStorage.setItem("data", JSON.stringify(basket));
  generateCartItems();
  calculation();
  TotalAmount();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  let totalItems = basket.map(x => x.item).reduce((x, y) => x + y, 0);
  cartIcon.innerHTML = totalItems;
};

let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket.map(({item, id}) => {
      let search = shopItemsData.find(x => x.id === id) || [];
      return item * search.price;
    }).reduce((x, y) => x + y, 0);

    label.innerHTML = `
      <h2>Total Bill : $ ${amount}</h2>
      <button class="checkout">Checkout</button>
      <button onclick="clearCart()" class="removeAll">Clear Cart</button>
    `;
  } else {
    label.innerHTML = ``;
  }
};

let removeItem = (id) => {
  basket = basket.filter(x => x.id !== id);
  localStorage.setItem("data", JSON.stringify(basket));
  generateCartItems();
  calculation();
  TotalAmount();
};

let clearCart = () => {
  basket = [];
  localStorage.setItem("data", JSON.stringify(basket));
  generateCartItems();
  calculation();
  label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="index.html">
      <button class="HomeBtn">Back to home</button>
    </a>
  `;
};

generateCartItems();
calculation();
TotalAmount();
