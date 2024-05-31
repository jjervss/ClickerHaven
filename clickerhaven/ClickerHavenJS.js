

var attempt = 0;

        function Login(){
            var username = document.getElementById("username").value;
            var password = document.getElementById("password").value;

            if(username == "Jervie" && password == "Jervie2004"){
                window.location.href = "ClickerHaven.html";
                return true;
            } else{
                attempt ++
                if (attempt >= 3){
                    alert("Cannot Login. Attempts exceeded!");
                    document.getElementById("btnLogin").disabled = true;
                    document.getElementById("username").disabled = true;
                    document.getElementById("password").disabled = true;
                    document.getElementById("username").value = null;
                    document.getElementById("password").value = null;
                }
                else{
                    alert("Incorrect username or password. Try again");
                    return false;
                }
            }
        }

        function increaseQuantity() {
            var quantityInput = document.getElementById("quantity");
            var quantity = parseInt(quantityInput.value);
            quantityInput.value = quantity + 1;
        }
        
        function decreaseQuantity() {
            var quantityInput = document.getElementById("quantity");
            var quantity = parseInt(quantityInput.value);
            if (quantity > 1) {
                quantityInput.value = quantity - 1;
            }
        }


        var current_product = null;
var shopping_cart = [];

function displayProduct(product) {
    toggle_popup();

    current_product = product;

    document.getElementById("product_name").innerHTML = product.name;
    document.getElementById("product_desc").innerHTML = product.description;

    document.getElementById("product_img").src = product.image;

    document.getElementById("quantity").value = 1; // Set default quantity to 1
    document.getElementById("price").innerHTML = product.price;
}

function toggle_popup() {
    var productCart = document.getElementById("product_cart");
    productCart.classList.toggle("active");
}

function toggle_remove() {
    var productCart = document.getElementById("product_cart");
    productCart.classList.remove("active");
}

function add_to_cart() {
    var quantity = document.getElementById("quantity").value;

    if (quantity > 0) {
        var cart_item = {
            name: current_product.name,
            price: current_product.price,
            quantity: parseInt(quantity),
            image: current_product.image
        };

        shopping_cart.push(cart_item);
        update_cart();

        var confirmDialog = confirm("Successfully added to cart! Do you want to view your shopping cart?");

        if (confirmDialog) {
            toggle_remove();
            popup_cart();
        }

        document.getElementById("quantity").value = 0;

    } else {
        alert("Enter a valid quantity!!");
    }
}

function buy_now(){
    toggle_remove()
    display_deliveryinfo()
}

function display_deliveryinfo(){
    document.getElementById("place_order").classList.toggle("active");
}

function update_cart() {
    var item_list = document.getElementById('item_list');
    var total_price = document.getElementById('total_price');
    item_list.innerHTML = '';
    var total = 0;

    for (var p = 0; p < shopping_cart.length; p++) {
        var item = shopping_cart[p];

        var row = document.createElement('tr');

        var image_cell = document.createElement('td');
        var image_element = document.createElement('img');
        image_element.src = item.image;
        image_element.classList.add('imgcart');
        image_cell.appendChild(image_element);
        row.appendChild(image_cell);

        var name_cell = document.createElement('td');
        var truncated_name = item.name.split(' ').slice(0, 3).join(' ') + '...';
        name_cell.textContent = truncated_name;
        name_cell.setAttribute('data-fullname', item.name);
        row.appendChild(name_cell);

        var quantity_cell = document.createElement('td');
        quantity_cell.textContent = item.quantity + 'X';
        row.appendChild(quantity_cell);

        var price_cell = document.createElement('td');
        price_cell.textContent = '₱' + (item.price * item.quantity).toFixed(2);
        row.appendChild(price_cell);

        var delete_button = document.createElement('td');
        var delete_icon = document.createElement('span');
        delete_icon.className = 'delete_icon fas fa-trash';
        delete_icon.setAttribute('onclick', 'delete_item(' + p + ')');
        delete_button.appendChild(delete_icon);
        row.appendChild(delete_button);

        item_list.appendChild(row);

        total += item.price * item.quantity;
    }

    total_price.textContent = ' ₱ ' + total.toFixed(2);
}


function go_to_next() {
    var item_list = document.getElementById('item_list');
    var row_count = item_list.rows.length;

  
        document.getElementById("place_order").classList.toggle("active");

        remove_cart();
    }


function back_to_cart() {
    var popup = document.getElementById("place_order");
    popup.classList.remove("active");
    
    popup_cart();
}
    

function display_success() {
    var full_name = document.getElementById("full_name").value;
    var mobile_num = document.getElementById("mobile_num").value;
    var address = document.getElementById("address").value;

    var pay_method = document.getElementById("pay_method").value;
    var name_on_card = document.getElementById("name_on_card").value;
    var card_num = document.getElementById("card_num").value;

    if (full_name.trim() == "" || mobile_num.trim() == "" || address.trim() == "") {
        alert("Please fill in all the required fields.");
    } else if (pay_method == "Card" && (name_on_card.trim() == "" || card_num.trim() == "")) {
        alert("Please provide valid card details.");
    }  else {
        document.getElementById("display_success").classList.toggle("active");

        var popup = document.getElementById("place_order");
        popup.classList.remove("active");
    }
}

function successfully_ordered() {
    var popup = document.getElementById("display_success");
    popup.classList.remove("active");

    location.reload();
}

function popup_cart() {
    document.getElementById("shopping_cart").classList.toggle("active");
}

function remove_cart() {
    var popup = document.getElementById("shopping_cart");
    popup.classList.remove("active");
}

function delete_item(index) {
    shopping_cart.splice(index, 1);
    update_cart();
}

