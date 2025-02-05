interface ListingData {
  title: string;

  images: string[];
}

const $globalDiv = document.querySelector('#entry-list');

if (!$globalDiv) {
  throw new Error('$globalDiv does not exist');
}

let listingData: ListingData[] = [];

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
      } catch (
        error // if its rejects to error the image
      ) {
        console.error(error); // Log the invalid image URL
      }
    }
    if (validImages.length > 0) {
      results.push({ ...item, images: validImages }); // Add object with filtered images
    }
  }

  return results;
}

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
  } catch (error) {
    // only for developers to see the error
    console.error('Error', error);
  }
}

// ---------------------------fetchListings() callback------------------------------

// ---------------------------DOMContentLoaded() eventListener------------------------------
// we are calling the async callback function with event parameter which is not included here in()
document.addEventListener('DOMContentLoaded', async () => {
  await fetchListings(); // calling fetch first to use creating render function
  // using await with promise functions. Without await im getting
  // nothing. we don't need to do a return for promise function in the top because
  // we have access to a global listingData
  listingData = await filterValidImages(listingData);
  console.log(listingData);
  for (let i = 0; i < listingData.length; i++) {
    $globalDiv.append(creatingListing(listingData[i]));
  }
});

// ---------------------------DOMContentLoaded() eventListener------------------------------

function creatingListing(listingData: ListingData): HTMLDivElement {
  const $parentDiv = document.createElement('div');
  $parentDiv.setAttribute('class', 'column-fifth mock-image-align'); // each column is an element
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
