(async () => {
    const container = document.getElementById("container")
    const searchvalue = document.getElementById("searchvalue")
    const url = "https://fakestoreapi.com/products"
    const fetchproduct = async () => {
        try {
            const res = await fetch(url)
            return res.json()
        } catch (error) {
            return error;
        };
    };
    const products = await fetchproduct();
    const product_card = (product) => {
        return `<div class="product_container">
        <div class="product_image">
            <img src="${product.image}" alt="image">
        </div>
        <div class="product_data">
            <h2>${product.title}</h2>
            <p>${product.description.split(" ").slice(0, 20).join(" ")}</p>
            <button>$${product.price}</button>
        </div>
    </div>`
    };
    const renderproduct = (products) => {
        container.innerHTML = ""
        products.forEach(element => {
            container.innerHTML += product_card(element)
        });
    };
    renderproduct(products);

    const checktextcontains = (text, searchtext) => {
        return text.toString().toLowerCase().includes(searchtext)
    }
    const filterhandler = (event) => {
        const searchtext = event.target.value.toLowerCase();
        const filteredresult = products.filter((element) => {
            return (
                checktextcontains(element.title, searchtext) ||
                checktextcontains(element.description, searchtext) ||
                checktextcontains(element.price, searchtext)

            );

        });
        renderproduct(filteredresult);
    }
    searchvalue.addEventListener("keyup", filterhandler)
})() //it is a call back function