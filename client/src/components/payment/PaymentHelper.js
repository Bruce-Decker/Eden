// Compute the total for the payment based on the line items (SKUs and quantity).
export function getPaymentTotal() {
    return Object.values(this.lineItems).reduce(
        (total, {product, sku, quantity}) =>
            total + quantity * this.products[product].skus.data[0].price,
        0
    );
}

// Expose the line items for the payment using products and skus stored in Stripe.
export function getLineItems() {
    let items = [];
    this.lineItems.forEach(item =>
        items.push({
            type: 'sku',
            parent: item.sku,
            quantity: item.quantity,
        })
    );
    return items;
}

// Retrieve the configuration from the API.
export async function getConfig() {
    try {
        const response = await fetch('/config');
        const config = await response.json();
        if (config.stripePublishableKey.includes('live')) {
            // Hide the demo notice if the publishable key is in live mode.
            document.querySelector('#order-total .demo').style.display = 'none';
        }
        return config;
    } catch (err) {
        return {error: err.message};
    }
}

// Retrieve a SKU for the Product where the API Version is newer and doesn't include them on v1/product
export async function loadSkus(product_id) {
    try {
        const response = await fetch(`/products/${product_id}/skus`);
        const skus = await response.json();
        this.products[product_id].skus = skus;
    } catch (err) {
        return {error: err.message};
    }
}

// Load the product details.
export function loadProducts() {
    if (!this.productsFetchPromise) {
        this.productsFetchPromise = new Promise(async resolve => {
            const productsResponse = await fetch('/products');
            const products = (await productsResponse.json()).data;
            if (!products.length) {
                throw new Error(
                    'No products on Stripe account! Make sure the setup script has run properly.'
                );
            }
            // Check if we have SKUs on the product, otherwise load them separately.
            for (const product of products) {
                this.products[product.id] = product;
                if (!product.skus) {
                    await this.loadSkus(product.id);
                }
            }
            resolve();
        });
    }
    return this.productsFetchPromise;
}

// Create the PaymentIntent with the cart details.
export async function createPaymentIntent(currency, items) {
    try {
        const response = await fetch('/payment_intents', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                currency,
                items,
            }),
        });
        const data = await response.json();
        if (data.error) {
            return {error: data.error};
        } else {
            return data;
        }
    } catch (err) {
        return {error: err.message};
    }
}

// Create the PaymentIntent with the cart details.
export async function updatePaymentIntentWithShippingCost(
    paymentIntent,
    items,
    shippingOption
) {
    try {
        const response = await fetch(
            `/payment_intents/${paymentIntent}/shipping_change`,
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    shippingOption,
                    items,
                }),
            }
        );
        const data = await response.json();
        if (data.error) {
            return {error: data.error};
        } else {
            return data;
        }
    } catch (err) {
        return {error: err.message};
    }
}

// Format a price (assuming a two-decimal currency like EUR or USD for simplicity).
export function formatPrice(amount, currency) {
    let price = (amount / 100).toFixed(2);
    let numberFormat = new Intl.NumberFormat(['en-US'], {
        style: 'currency',
        currency: currency,
        currencyDisplay: 'symbol',
    });
    return numberFormat.format(price);
}

export async function displayPaymentSummary() {
    await this.loadProducts();
    const orderItems = document.getElementById('order-items');
    const orderTotal = document.getElementById('order-total');
    let currency;
    for (let [id, product] of Object.entries(this.products)) {
        const randomQuantity = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        const quantity = randomQuantity(1, 2);
        let sku = product.skus.data[0];
        let skuPrice = this.formatPrice(sku.price, sku.currency);
        let lineItemPrice = this.formatPrice(sku.price * quantity, sku.currency);
        let lineItem = document.createElement('div');
        lineItem.classList.add('line-item');
        lineItem.innerHTML = `
    <img class="image" src="/images/products/${product.id}.png">
    <div class="label">
      <p class="product">${product.name}</p>
      <p class="sku">${Object.values(sku.attributes).join(' ')}</p>
    </div>
    <p class="count">${quantity} x ${skuPrice}</p>
    <p class="price">${lineItemPrice}</p>`;
        orderItems.appendChild(lineItem);
        currency = sku.currency;
        this.lineItems.push({
            product: product.id,
            sku: sku.id,
            quantity,
        });
    }
    // Add the subtotal and total to the payment summary.
    const total = this.formatPrice(this.getPaymentTotal(), currency);
    orderTotal.querySelector('[data-subtotal]').innerText = total;
    orderTotal.querySelector('[data-total]').innerText = total;
}


