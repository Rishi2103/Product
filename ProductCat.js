document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search-bar');
    const categoryFilter = document.getElementById('category-filter');
    const products = document.querySelectorAll('.product');
    const categories = document.querySelectorAll('.category');

    function filterProducts() {
        const searchQuery = searchBar.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        products.forEach(product => {
            const productName = product.querySelector('h3').textContent.toLowerCase();
            const productDescription = product.querySelector('.description').textContent.toLowerCase();
            const productCategory = product.closest('.category').id;

            const matchesSearch = productName.includes(searchQuery) || productDescription.includes(searchQuery);
            const matchesCategory = selectedCategory === 'all' || selectedCategory === productCategory;

            if (matchesSearch && matchesCategory) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });

        categories.forEach(category => {
            const visibleProducts = category.querySelectorAll('.product[style*="display: block"]');
            if (visibleProducts.length > 0) {
                category.style.display = 'block';
            } else {
                category.style.display = 'none';
            }
        });
    }

    searchBar.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
});

document.addEventListener('DOMContentLoaded', () => {
    const updateProductForm = document.getElementById('update-product-form');
    const productForm = document.getElementById('product-form');
    const cancelUpdateButton = document.getElementById('cancel-update');

    // Handle edit button click
    document.querySelectorAll('.edit-product').forEach(button => {
        button.addEventListener('click', (event) => {
            const product = event.target.closest('.product');
            const productId = product.getAttribute('data-id');
            const productName = product.querySelector('h3').innerText;
            const productDescription = product.querySelector('.description').innerText;
            const productPrice = product.querySelector('.price').innerText.replace(' Rs', '');

            // Fill the form with existing product data
            document.getElementById('product-id').value = productId;
            document.getElementById('product-name').value = productName;
            document.getElementById('product-description').value = productDescription;
            document.getElementById('product-price').value = productPrice;

            // Show the form
            updateProductForm.style.display = 'block';
        });
    });

    // Handle form submission
    productForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const productId = document.getElementById('product-id').value;
        const productName = document.getElementById('product-name').value;
        const productDescription = document.getElementById('product-description').value;
        const productPrice = document.getElementById('product-price').value;

        // Find the product element in the DOM
        const product = document.querySelector(`.product[data-id="${productId}"]`);
        product.querySelector('h3').innerText = productName;
        product.querySelector('.description').innerText = productDescription;
        product.querySelector('.price').innerText = `${productPrice} Rs`;

        // Hide the form
        updateProductForm.style.display = 'none';
    });

    // Handle form cancellation
    cancelUpdateButton.addEventListener('click', () => {
        updateProductForm.style.display = 'none';
    });
});
