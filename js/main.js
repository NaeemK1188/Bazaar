'use strict';
let listingData = [];
// ---------------------------fetchListings() callback------------------------------
async function fetchListings() {
  try {
    const response = await fetch('https://api.escuelajs.co/api/v1/products');
    // no data existed or some error generated while fetching from server
    if (!response.ok) {
      throw new Error(`http error status:${response.status}`);
    }
    listingData = await response.json();
    // console.log(listingData[0].title);
    // console.log(listingData[0].images)
    // console.log(listingData[0].images[0])
  } catch (error) {
    // only for developers to see the error
    console.error('Error', error);
  }
}
// ---------------------------fetchListings() callback------------------------------
// ---------------------------DOMContentLoaded() eventListener------------------------------
document.addEventListener('DOMContentLoaded', async () => {
  await fetchListings(); // calling fetch first to use creating render function
  // using await with promise functions. Without await im getting
  // nothing. we don't need to do a return for promise function in the top because
  // we have access to a global listingData
  console.log(listingData);
});
// ---------------------------DOMContentLoaded() eventListener------------------------------
