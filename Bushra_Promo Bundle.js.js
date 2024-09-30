const dataJson = {
    '5331C044': { items: ['2439C005', '0585C011', '9967B002'], discount: 15 },
    '5077C007': { items: ['3304V876', '3 x 5138C001'], discount: 10 },
    '5803C017': { items: ['3 x 5823C005'], discount: 10 }
  };
  
  // Manually entered prices
  const priceList = {
   '5331C044': 999.99,
        '2439C005': 509.99,
        '0585C011': 274.99,
        '9967B002': 53.99,
        '5077C007': 3999.99,
        '3304V876': 59.99,
        '5138C001': 399.99,
        '5803C017': 1699.99,
        '5823C005': 379.99
  };
  
  async function fetchPrice(sku) {
    return priceList[sku] || 0;
  }
  
  // function to calculate the total price of all items in a bundle
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
    const mainItemPrice = await fetchPrice(sku); // Fetch price for the main item
    const accessoriesTotalPrice = await calculateTotalPrice(items); // Fetch total price for accessories
    const undiscountedPrice = mainItemPrice + accessoriesTotalPrice; // Calculate undiscounted price
  
    const discountAmount = (undiscountedPrice * discount) / 100; // Calculate the discount amount
    const discountedPrice = undiscountedPrice - discountAmount; // Calculate the final price after discount
  
    console.log(`Undiscounted Price: £${undiscountedPrice.toFixed(2)}`);
    console.log(`Discounted Price: £${discountedPrice.toFixed(2)}`);
    console.log(`You Save: £${discountAmount.toFixed(2)}`);
  }
  
  finalCodeExeFunc('5803C017');//you can give as per the requirement

  
  
