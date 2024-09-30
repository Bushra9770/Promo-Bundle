const dataJson = {
    '5331C044': { items: ['2439C005', '0585C011', '9967B002'], discount: 15 },
    '5077C007': { items: ['3304V876', '3 x 5138C001'], discount: 10 },
    '5803C017': { items: ['3 x 5823C005'], discount: 10 }
  };
  
  // Fetch data from the website using SKU
  async function fetchPrice(sku) {
    const url = `https://store.canon.co.uk/search?q=${sku}`;
  
    try {
      const response = await fetch(url); 
      const text = await response.text();
  
      const doc = new DOMParser().parseFromString(text, 'text/html');
      const priceElement = doc.querySelector('.price');
  

      return priceElement ? parseFloat(priceElement.innerText.replace(/[^0-9.]/g, '')) : 0;
    } catch (error) {
      console.error(`Error fetching price for SKU: ${sku}`, error); 
      return 0; 
    }
  }
  
  // Helper function to calculate the total price of all items in a bundle
  async function calculateTotalPrice(skuList) {
    let totalPrice = 0;
  
   
    for (const sku of skuList) {
      let [quantity, itemSku] = sku.includes(' x ') ? sku.split(' x ') : [1, sku]; 
      quantity = parseInt(quantity); 
      const price = await fetchPrice(itemSku.trim()); 
      totalPrice += price * quantity; 
    }
  
    return totalPrice;
  }
  
  // Main function to calculate and log the promo bundle prices
  async function finalCodeExeFunc(sku) {
    const bundle = dataJson[sku];
  
    if (!bundle) {
      console.log(`SKU ${sku} not found.`);
      return;
    }
  
    const { items, discount } = bundle;
    const mainItemPrice = await fetchPrice(sku); 
    const accessoriesTotalPrice = await calculateTotalPrice(items); // Fetch total price for accessories
    const undiscountedPrice = mainItemPrice + accessoriesTotalPrice; // Calculate undiscounted price
  
    const discountAmount = (undiscountedPrice * discount) / 100; // Calculate the discount amount
    const discountedPrice = undiscountedPrice - discountAmount; // Calculate the final price after discount
  
    console.log(`Undiscounted Price: £${undiscountedPrice.toFixed(2)}`);
    console.log(`Discounted Price: £${discountedPrice.toFixed(2)}`);
    console.log(`You Save: £${discountAmount.toFixed(2)}`);
  }
  

  finalCodeExeFunc('5331C044');
  