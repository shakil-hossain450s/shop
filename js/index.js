const loadAllProducts = async () => {
    const url = `https://fakestoreapi.com/products`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
const showAllMenu = async () => {
    const products = await loadAllProducts();
    const menuBar = document.getElementById('all-menu');
    const uniqueArray = [];
    products.forEach(product => {
        if (uniqueArray.indexOf(product.category) === -1) {
            uniqueArray.push(product.category);

            const li = document.createElement('li');
            li.innerHTML = `
                <a>${product.category}</a>
            `;
            menuBar.appendChild(li);
        }
    })
}
showAllMenu();

const searchField = document.getElementById('search-field');
searchField.addEventListener('keypress', async (event) => {
    const spiner = document.getElementById('spinner');
    spiner.classList.remove('hidden');
    if (event.key === 'Enter') {
        const searchValue = searchField.value;
        const products = await loadAllProducts();
        spiner.classList.add('hidden')
        const foundProducts = products.filter(product => product.category.includes(searchValue));

        const productsContainer = document.getElementById('produts-container');
        productsContainer.textContent = '';

        const notFound = document.getElementById('not-found-message');
        notFound.textContent = '';
        if (foundProducts.length === 0) {
            notFound.innerHTML = `
            <h2 class="text-3xl text-yellow-500 text-center font-semibold">No Product Found 😰😰😰</h2>
            `;
            return;
        }

        foundProducts.forEach(product => {
            console.log(product);
            const productDiv = document.createElement('div');
            productDiv.innerHTML = `
            <div class="card card-compact w-full bg-base-100 shadow-xl my-3">
            <figure><img src="${product.image}" class =" h-60 w-full" alt="Shoes" /></figure>
            <div class="card-body">
              <h2 class="card-title">${product.category}</h2>
              <p>${product.title.length > 20 ? product.title.slice(0, 20) + '...' : product.title}</p>
              <div class="card-actions justify-end">
                <label for="my-modal-3"
                onclick ="showModal('${product.description}', '${product.image}', ${product.rating.count},${product.rating.rate})" 
                class="btn btn-primary modal-button">Show Details</label>
              </div>
            </div>
          </div>
            `;
            productsContainer.appendChild(productDiv);
        })
    }
})

const showModal = (description, image, count, rate) => {
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
    <p class="py-4">${description}</p>
    <img src ="${image}"/>
    <p class = "text-center mt-5">
        <span><b>Count</b>: ${count}</span>
        <span><b>Rating</b>: ${rate}</span>
    </p>
    `;
}