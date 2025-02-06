'use strict';
const $globalDiv = document.querySelector('#entry-list');
const $select = document.querySelector('select');
const $h1NumberListing = document.querySelector('.number-listing');
const $h1Viewing = document.querySelector('.viewing');
const $h1NewArrivals = document.querySelector('.body-h1');
const $h1Bazzar = document.querySelector('.header-h1');
// select is an array of options
// [i] = jewelry to show all values $select.value
// it not showing all the select options, but it shows the length which is 5
if (
  !$globalDiv ||
  !$select ||
  !$h1NumberListing ||
  !$h1Viewing ||
  !$h1NewArrivals ||
  !$h1Bazzar
) {
  throw new Error(
    '$globalDiv or $select or $h1NumberListing or $h1Viewing or $h1NewArrivals or $h1Bazzar not exist',
  );
}
let listingData = [];
// -----------------filter unresponsive images--------------------------------------------
// using it for the second API
// // -----------------filter unresponsive images--------------------------------------------
// ---------------------------fetchListings() callback------------------------------
async function fetchListings() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    // no data existed or some error generated while fetching from server
    if (!response.ok) {
      throw new Error(`http error status:${response.status}`);
    }
    listingData = await response.json();
  } catch (error) {
    // only for developers to see the error
    console.error('Error', error);
  }
}
// ---------------------------fetchListings() callback------------------------------
// ---------------------------DOMContentLoaded() eventListener------------------------------
// we are calling the async callback function with event parameter which is not included here in()
// the code starts from here or the reading on the initial view and when refresh
document.addEventListener('DOMContentLoaded', async () => {
  await fetchListings(); // calling fetch first to use creating render function
  // using await with promise functions. Without await im getting
  // nothing. we don't need to do a return for promise function in the top because
  // we have access to a global listingData
  // calling filter unresponsive images with await
  for (let i = 0; i < listingData.length; i++) {
    $globalDiv.append(creatingListing(listingData[i]));
  }
});
// ---------------------------DOMContentLoaded() eventListener------------------------------
// ---------------------------creatingListing()---------------------------------------------
function creatingListing(listingData) {
  const $parentDiv = document.createElement('div');
  $parentDiv.setAttribute('class', 'column-fifth mock-image-align item-design'); // each column is an element
  const $img = document.createElement('img');
  $img.setAttribute('class', 'mock-image');
  // assigning first image in the array of images. Using this line with fakeplatzi api
  $img.setAttribute('src', listingData.image);
  $img.setAttribute('alt', listingData.title);
  $parentDiv.appendChild($img);
  const $p = document.createElement('p');
  $p.textContent = listingData.title;
  $parentDiv.appendChild($p);
  return $parentDiv;
}
// ---------------------------creatingListing()---------------------------------------------
// -------------------------select eventListener()----------------------------------------
// click event happens whenever i click. Using change, it will happen whenever i change the option in select
$select.addEventListener('change', (event) => {
  const eventTarget = event.target;
  console.log(eventTarget.value); // test hold the DOM object, so it has all its properties
  // event.target is the actual DOM element
  // doing filtering by array.filter
  // acting as event.target. so whenever i click on option, it will show what i clicked
  const result = listingData.filter(
    (listing) => listing.category === eventTarget.value,
  ); // or use $select.value with .category.name in fakeplatzi api
  console.log(result); // holds my filtered listings
  $globalDiv.innerHTML = ''; // remove all the children
  for (let i = 0; i < result.length; i++) {
    $globalDiv.append(creatingListing(result[i]));
  }
  $h1NewArrivals.className = 'hidden';
  $h1NumberListing.className = 'number-listing';
  $h1Viewing.className = 'viewing';
  $h1NumberListing.textContent = `${result.length} items`;
});
// -------------------------select eventListener()----------------------------------------
// --------------------------h1 click eventListener()---------------------------------------
$h1Bazzar.addEventListener('click', async () => {
  await fetchListings();
  $globalDiv.innerHTML = '';
  for (let i = 0; i < listingData.length; i++) {
    $globalDiv.append(creatingListing(listingData[i]));
  }
  $h1NewArrivals.className = 'body-h1';
  $select.selectedIndex = 0;
  $h1Viewing.className = 'hidden';
  $h1NumberListing.className = 'hidden';
});
// -------------------------- h1 click eventListener()---------------------------------------
