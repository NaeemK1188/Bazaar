interface Category {
  // searching by id or result
  name: string;
  id: number;
}

interface ListingData {
  title: string;
  images: string[];
  category: Category;
}

const $globalDiv = document.querySelector('#entry-list');
const $select = document.querySelector('select') as HTMLSelectElement;
// select is an array of options
// console.log($select?.options[1].value);  [i] = jewelry to show all values $select.value
// console.log($select?.options); // it not showing all the select options, but it shows the length which is 5

if (!$globalDiv || !$select) {
  throw new Error('$globalDiv or $select not exist');
}

let listingData: ListingData[] = [];

// -----------------filter unresponsive images--------------------------------------------
async function validateImage(url: string): Promise<string> {
  const img = new Image(); // creating a dom element with width and height
  img.src = url;
  // Await the loading or error event
  return await new Promise((resolve, reject) => {
    img.onload = (): void => resolve(url); // Resolve if image loads successfully, eventlistener waiting to resolve
    img.onerror = (): void => reject(new Error(`Invalid image URL: ${url}`)); // Reject if image fails to load waiting to reject
  });
}

// Function to validate images for each object
// the Promise ListingData[] it will return promise resolved to listingData array of objects
async function filterValidImages(
  itemsArray: ListingData[],
): Promise<ListingData[]> {
  const results = [];
  for (const item of itemsArray) {
    const validImages = [];
    for (const imageUrl of item.images) {
      try {
        await validateImage(imageUrl); // Validate each image URL
        validImages.push(imageUrl); // Add to validImages if successful
      } catch (error) {
        // if its rejects to error the image
        console.error(error); // Log the invalid image URL
      }
    }
    if (validImages.length > 0) {
      results.push({ ...item, images: validImages }); // Add object with filtered images
    }
  }

  return results;
}

// -----------------filter unresponsive images--------------------------------------------

// ---------------------------fetchListings() callback------------------------------
async function fetchListings(): Promise<void> {
  try {
    const response = await fetch('https://api.escuelajs.co/api/v1/products');

    // no data existed or some error generated while fetching from server
    if (!response.ok) {
      throw new Error(`http error status:${response.status}`);
    }

    listingData = (await response.json()) as ListingData[];
    console.log(listingData);
    console.log(listingData[15].category.id); // category electronic
    console.log(listingData[15].category.name); // category electronics
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
  listingData = await filterValidImages(listingData);

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
  $img.setAttribute('src', listingData.images[0]); // assigning first image in the array of images
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
$select.addEventListener('change', (event: Event) => {
  const eventTarget = event.target as HTMLSelectElement;
  console.log(eventTarget); // test hold the DOM object, so it has all its properties

  // event.target is the actual DOM element
  // $globalDiv.classList.add('hidden'); when click select, the the listing becomes hidden
  // if ($select.options[1].value === 'Jewelry') doing filter by if statement
  // {
  //   $globalDiv.classList.add('hidden'); // its applied on Select first before jewelry

  // }

  // doing filtering by array.filter
  // console.log($select.value); // acting as event.target. so whenever i click on option, it will show what i clicked
  const result = listingData.filter(
    (listing) => listing.category.name === eventTarget.value,
  ); // or use $select.value
  console.log(result); // holds my filtered listings
  $globalDiv.innerHTML = ''; // remove all the children
  // $globalDiv.children[1].remove(); //delete specific categories

  for (let i = 0; i < result.length; i++) {
    $globalDiv.append(creatingListing(result[i]));
  }
});

// -------------------------select eventListener()----------------------------------------
