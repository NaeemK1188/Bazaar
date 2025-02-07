interface ListingData {
  title: string;

  image: string;

  category: string;
}

const $globalDiv = document.querySelector('#entry-list');
const $select = document.querySelector('select') as HTMLSelectElement;
const $h1NumberListing = document.querySelector('.number-listing');
const $h1Viewing = document.querySelector('.viewing');
const $h1NewArrivals = document.querySelector('.body-h1');
const $h1Bazzar = document.querySelector('.header-h1');
const $body = document.querySelector('body');
const $divCartPage = document.querySelector('div[data-view=cart-page]');
const $divHomePage = document.querySelector('div[data-view=home-page]');
const $cartHeader = document.querySelector('.header-h4');

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
    '$globalDiv, $select, $h1NumberListing, $h1Viewing, $h1NewArrivals, or $h1Bazzar not exist',
  );
}

if (!$body || !$divCartPage || !$divHomePage || !$cartHeader) {
  throw new Error('$body, $divHomePage, or $divHomePage do not exist');
}

let listingData: ListingData[] = [];

// -----------------filter unresponsive images--------------------------------------------
// using it for the second API

// // -----------------filter unresponsive images--------------------------------------------

// ---------------------------fetchListings() callback------------------------------
async function fetchListings(): Promise<void> {
  try {
    const response = await fetch('https://fakestoreapi.com/products');

    // no data existed or some error generated while fetching from server
    if (!response.ok) {
      throw new Error(`http error status:${response.status}`);
    }

    listingData = (await response.json()) as ListingData[];
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

function creatingListing(listingData: ListingData): HTMLDivElement {
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
  const $addToCartBtn = document.createElement('button');
  $addToCartBtn.setAttribute('class', 'add-to-cart-btn');
  // to use font awesome we need to add its link in the html file similar to code journal
  // using innerHTML to put an actual html code in typescript file
  $addToCartBtn.innerHTML =
    'Add to Cart <i class="fa-solid fa-cart-shopping"></i>';
  // $addToCartBtn.textContent = 'Add to Cart'; // using old way .textContent
  $parentDiv.appendChild($addToCartBtn);

  return $parentDiv;
}

// ---------------------------creatingListing()---------------------------------------------

// -------------------------select eventListener()----------------------------------------
// click event happens whenever i click. Using change, it will happen whenever i change the option in select
$select.addEventListener('change', (event: Event) => {
  const eventTarget = event.target as HTMLSelectElement;
  console.log(eventTarget.value); // test hold the DOM object, so it has all its properties
  // $body.classList.add('view-blur');
  // event.target is the actual DOM element

  // doing filtering by array.filter
  // acting as event.target. so whenever i click on option, it will show what i clicked
  // or use $select.value with .category.name in fakeplatzi api
  const result = listingData.filter(
    (listing) => listing.category === eventTarget.value,
  );
  console.log(result); // holds my filtered listings
  $globalDiv.innerHTML = ''; // remove all the children

  for (let i = 0; i < result.length; i++) {
    $globalDiv.append(creatingListing(result[i]));
  }

  // or if result.length

  // when we have listing remove the blur. it only works for one time
  // when it goes back to zero listing its blur again

  $body.classList.remove('view-blur'); // when we change option
  $select.blur(); // event through code not user interaction or if we change the option immediately
  // inside the select box not after clicking outside

  $h1NewArrivals.className = 'hidden';
  $h1NumberListing.className = 'number-listing';
  $h1Viewing.className = 'viewing';
  $h1NumberListing.textContent = `${result.length} items`;
});

// -------------------------select eventListener()----------------------------------------
// works with change eventListener to add blur
// fired when we are inside the select because select is part of control elements inside form
$select.addEventListener('focus', () => {
  $body.classList.add('view-blur');
});

// works with change eventListener to add blur
// this happens when user click outside the select box which is also part of the control elements inside form
$select.addEventListener('blur', () => {
  $body.classList.remove('view-blur');
});

// --------------------------h1 click eventListener()---------------------------------------

$h1Bazzar.addEventListener('click', async () => {
  $divCartPage.classList.add('hidden');
  $divHomePage.classList.remove('hidden');

  await fetchListings();

  $globalDiv.innerHTML = '';
  for (let i = 0; i < listingData.length; i++) {
    $globalDiv.append(creatingListing(listingData[i]));
  }
  $h1NewArrivals.className = 'body-h1';
  $select.selectedIndex = 0;
  $h1Viewing.className = 'hidden';
  $h1NumberListing.className = 'hidden';
  console.log('bazaar firing');
});

// -------------------------- h1 click eventListener()---------------------------------------

$cartHeader.addEventListener('click', () => {
  $divHomePage.classList.add('hidden');
  $divCartPage.classList.remove('hidden');
});
