
var productsContainer = [];

if (localStorage.getItem("products") == null) {
    productsContainer = [];
    var addbutton = `<button onclick="addProducts()" class="btn btn-outline-info float-right">ADD PRODUCT</button>`;
    document.getElementById("btn").innerHTML = addbutton;
}
else {
    productsContainer = JSON.parse(localStorage.getItem("products"));
    var addbutton = `<button onclick="addProducts()" class="btn btn-outline-info float-right">ADD PRODUCT</button>`;
    document.getElementById("btn").innerHTML = addbutton;
    displayProducts();
}

function addProducts() {
    var productName = document.getElementById("productNameInp").value;
    var productPrice = document.getElementById("productPriceInp").value;
    var productCategory = document.getElementById("productCategoryInp").value;
    var paymentMethod = document.getElementById("paymentMethodInp").value;
    var productDiscussion = document.getElementById("productDiscussionInp").value;
    var radioButtons = document.getElementsByName("sale");
    var onsale;
    if (radioButtons[0].checked == true) {
        onsale = true;
    }
    else {
        onsale = false;
    }

    if (typeof paymentMethod == 'undefined') {
        paymentMethod = 'cash';
    }

    if (validationName(productName) == true) {
        if (validationPrice(productPrice) == true) {
            if (validationCategory(productCategory) == true) {
                if (validationDiscussion(productDiscussion) == true) {
                    var product =
                    {
                        name: productName,
                        price: productPrice,
                        category: productCategory,
                        pay: paymentMethod,
                        desc: productDiscussion,
                        sale: onsale
                    }
                    productsContainer.push(product);
                    localStorage.setItem("products", JSON.stringify(productsContainer));
                    document.getElementById("productNameInp").value = "";
                    document.getElementById("productPriceInp").value = "";
                    document.getElementById("productCategoryInp").value = "";
                    document.getElementById("paymentMethodInp").value = "cash";
                    document.getElementById("productDiscussionInp").value = "";
                    radioButtons[1].checked = true;
                    radioButtons[0].checked = false;
                    displayProducts();
                } else {
                    alert("Enter valid product Discussion!");
                }
            } else {
                alert("Enter valid product category!");
            }
        } else {
            alert("Enter valid product price!");
        }
    } else {
        alert("Enter valid product name!");
    }
}

function displayProducts() {
    var temp = ``;
    for (var i = 0; i < productsContainer.length; i++) {
        temp += `<div class="col-md-3">
        <div class="shadow p-4 bg-white">
                    <h2 class="text-center">`+ productsContainer[i].name + `</h2>
                    <h4 class="text-center">`+ productsContainer[i].price + `</h4>
                 <div class="product">
                 <img src="img/1.jpg" class="img-fluid mb-3">
                 <h5>`+ productsContainer[i].category + `<span class="ml-3 badge badge-info float-right">` + productsContainer[i].pay + `</span>
                 <div class="clearfix"></div> </h5>
                 <p class="text-center">`+ productsContainer[i].desc + `</p>
                 <div class="text-center">
                    <button onclick="deleteProducts(`+ i + `)" class="btn btn-danger">DELETE</button>
                    <button onclick="updateProducts(`+ i + `)" class="btn btn-Warning">UPDATE</button>
                </div> </div>`
            ;

        if (productsContainer[i].sale == true) {
            temp += `<div class="sale">sale</div>`;
        }

        temp += `</div></div>`;
    }
    document.getElementById("products").innerHTML = temp;
}

function searchProducts(word) {
    var temp = ``;
    for (var i = 0; i < productsContainer.length; i++) {
        if (productsContainer[i].name.toLowerCase().includes(word.toLowerCase())) {
            temp += `<div class="col-md-3">
            <div class="shadow p-4 bg-white">
                        <h2 class="text-center">`+ productsContainer[i].name + `</h2>
                        <h4 class="text-center">`+ productsContainer[i].price + `</h4>
                     <div class="product">
                     <img src="img/1.jpg" class="img-fluid">
                     <h5>`+ productsContainer[i].category + `<span class="ml-3 badge badge-info float-right">` + productsContainer[i].pay +
                `<div class="clearfix"></div> </span> </h5>
                     <p class="text-center">`+ productsContainer[i].desc + `</p>
                     <div class="text-center">
                        <button onclick="deleteProducts()" class="btn  btn-danger">DELETE</button>
                        <button onclick="updateProducts()" class="btn btn-Warning">UPDATE</button>
                        </div> </div>`;

            if (productsContainer[i].sale == true) {
                temp += `<div class="sale">sale</div>`;
            }

            temp += `</div></div>`;
        }
    }
    document.getElementById("products").innerHTML = temp;
}

function deleteProducts(num) {
    productsContainer.splice(num, 1);
    localStorage.setItem("products", JSON.stringify(productsContainer));
    displayProducts();
}

function updateProducts(num) {
    var addbutton = `<button onclick="newProduct(` + num + `)" class="btn btn-outline-info float-right">Update PRODUCT</button>`;
    document.getElementById("btn").innerHTML = addbutton;
    document.getElementById("productNameInp").value = productsContainer[num].name;
    document.getElementById("productPriceInp").value = productsContainer[num].price;
    document.getElementById("productCategoryInp").value = productsContainer[num].category;
    document.getElementById("paymentMethodInp").value = productsContainer[num].pay;
    document.getElementById("productDiscussionInp").value = productsContainer[num].desc;
    var radioButtons = document.getElementsByName("sale");
    if (productsContainer[num].sale == true) {
        radioButtons[0].checked = true;
        radioButtons[1].checked = false;
    }
    else {
        radioButtons[0].checked = false;
        radioButtons[1].checked = true;
    }
}

function newProduct(num) {
    productsContainer[num].name = document.getElementById("productNameInp").value;
    productsContainer[num].price = document.getElementById("productPriceInp").value;
    productsContainer[num].category = document.getElementById("productCategoryInp").value;
    productsContainer[num].pay = document.getElementById("paymentMethodInp").value;
    productsContainer[num].desc = document.getElementById("productDiscussionInp").value;
    var radioButtons = document.getElementsByName("sale");
    if (radioButtons[0].checked == true) {
        productsContainer[num].sale = true;
    } else {
        productsContainer[num].sale = false;
    }
    if (validationName(productsContainer[num].name) == true) {
        if (validationPrice(productsContainer[num].price) == true) {
            if (validationCategory(productsContainer[num].category) == true) {
                if (validationDiscussion(productsContainer[num].desc) == true) {
                    localStorage.setItem("products", JSON.stringify(productsContainer));
                    var addbutton = `<button onclick="addProducts()" class="btn btn-outline-info float-right">ADD PRODUCT</button>`;
                    document.getElementById("btn").innerHTML = addbutton;
                    document.getElementById("productNameInp").value = "";
                    document.getElementById("productPriceInp").value = "";
                    document.getElementById("productCategoryInp").value = "";
                    document.getElementById("paymentMethodInp").value = "cash";
                    document.getElementById("productDiscussionInp").value = "";
                    radioButtons[0].checked = false;
                    radioButtons[1].checked = true;
                    displayProducts();
                } else {
                    alert("Enter valid product Discussion!");
                }
            } else {
                alert("Enter valid product category!");
            }
        } else {
            alert("Enter valid product price!");
        }
    } else {
        alert("Enter valid product name!");
    }
}

function validationName(word) {
    var nameRegex = /^[A-Z][a-zA-Z ]{2,14}$/;
    if (nameRegex.test(word) == true) {
        return true;
    } else {
        return false;
    }
}

function validationPrice(word) {
    var nameRegex = /^[1-9][0-9]{1,6}$/;
    if (nameRegex.test(word) == true) {
        return true;
    } else {
        return false;
    }
}

function validationCategory(word) {
    var nameRegex = /[a-z]{3,10}-[0-9]{1,7}$/i;
    if (nameRegex.test(word) == true) {
        return true;
    } else {
        return false;
    }
}

function validationDiscussion(word) {
    var nameRegex = /^[a-zA-Z 0-9.]+$/i;
    if (nameRegex.test(word) == true) {
        return true;
    } else {
        return false;
    }
}