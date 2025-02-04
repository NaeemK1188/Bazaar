'use strict';
/* exported data */
// interface Address {
//   street: string;
//   suite: string;
//   city: string;
//   zipcode: string;
// }
// interface Geo {
//   lat: string;
//   lng: string;
// }
// interface Company {
//   name: string;
//   catchPhrase: string;
//   bs: string;
// }
// interface UserData {
//   id: number;
//   name: string;
//   username: string;
//   email: string;
//   address: Address;
//   geo: Geo;
//   phone: string;
//   website: string;
//   company: Company;
//   images: string[];
// }
// async function fetchUsers(): Promise<void> {
//   try {
//     // const response = await fetch('https://jsonplaceholder.typicode.com/users'); // default for fetch() is GET method
//     // let response = await fetch('https://api.escuelajs.co/api/v1/products');
//     const response = await fetch('https://api.escuelajs.co/api/v1/products');
//     //     method:"POST",
//     //     headers: {
//     //     'Content-Type': "application/json"
//     //     },
//     //     body: JSON.stringify({
//     //       title: 'Jordan travis scott edition mocha color',
//     //         price: 150,
//     //         description:
//     //           'Travis scott special edition with unique style mocha color',
//     //         categoryId: 1,
//     //         images: ['https://i.imgur.com/LQx7Fd0.jpeg'],
//     //     })
//     // })
//     //   {
//     //     method: 'POST',
//     //     body: JSON.stringify({
//     //       // id: 11,
//     //       // title: 'Jordan travis scott edition mocha color',
//     //       // price: 1500,
//     //       // description: "Travis scott special edition with unique style mocha color",
//     //       // images: [
//     //       //   'https://i.imgur.com/LQx7Fd0.jpeg',
//     //       //   'https://i.imgur.com/NvYT9Fa.jpeg',
//     //       //   'https://i.imgur.com/02qbDpc.jpeg',
//     //       // ],
//     //       // categoryId: {
//     //       //   id: 1,
//     //       //   name: "Clothes",
//     //       //   creationAt: "2025-01-29"
//     //       // }
//     //       title: 'Jordan travis scott edition mocha color',
//     //       price: 150,
//     //       description:
//     //         'Travis scott special edition with unique style mocha color',
//     //       categoryId: 1,
//     //       images: ['https://i.imgur.com/LQx7Fd0.jpeg'],
//     //     }),
//     //   }
//     // );
//     if (!response.ok) {
//       throw new Error(`HTTP error status:${response.status}`);
//       // using template literal lets us avoid the error type here
//     }
//     // console.log(response); // here output the status is 200 okay
//     // console.log(response.ok); // return true because ok is boolean
//     // const data:Data[] = (await response.json()) as Data; //using Data[] to access each index
//     const data = (await response.json()) as UserData[];
//     // console.log(data); // the output is not organized as the data model on the top when we collapse each array element ?
//     // console.log(data[0].company.catchPhrase); // accessing the array data
//     console.log(data);
//     // const $image = document.querySelector('img') as HTMLElement;
//     // console.log($image); // testing the array of images
//     // $image.src = data[0].images[0]; // testing one image and assigned it to DOM element
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }
// // console.log(fetchData());
// // const newData = fetchData();
// // console.log(newData); // unable to access the data ?
// fetchUsers();
// // ------------------------------UserData------------------------------------------
// // -------------------------------PokemonData--------------------------------------
// interface Ability {
//   name: string;
//   url: string;
//   is_hidden: boolean;
//   slot: number;
// }
// interface Form {
//   name: string;
//   url: string;
// }
// interface Version {
//   name: string;
//   url: string;
// }
// interface GameIndex {
//   game_index: number;
//   version: Version;
// }
// interface Move {
//   name: string;
//   url: string;
// }
// interface Species {
//   name: string;
//   url: string;
// }
// interface Sprite {
//   back_default: string;
//   back_female: null;
//   back_shiny: string;
// }
// interface Stat {
//   name: string;
//   url: string;
// }
// interface Stats {
//   base_stat: number;
//   effort: number;
//   stat: Stat;
// }
// interface Type {
//   name: string;
//   url: string;
// }
// interface Types {
//   slot: number;
//   type: Type;
// }
// interface PokemonData {
//   abilities: Ability;
//   base_experience: number;
//   forms: Form;
//   game_indices: GameIndex;
//   height: number;
//   held_items: [];
//   id: number;
//   is_default: boolean;
//   location_area_encounters: string;
//   moves: Move;
//   name: string;
//   order: number;
//   species: Species;
//   sprites: Sprite;
//   stats: Stats;
//   types: Types;
//   weight: number;
// }
// // async function fetchPokemon(): Promise<void> {
// //   try {
// //     // use name or id of your favorite pokemon to get the limited number of pokemons
// //     // const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=5');
// //     const response = await fetch('https://pokeapi.co/api/v2/pokemon/4');
// //     if (!response.ok) {
// //       throw new Error(`HTTP error status:${response.status}`);
// //     }
// //     // we dont need to create an interface for the pokemon. It will output all the properties in each pokemon
// //     // we only create interface to manipulate data in the
// //     // do we need to create interface ?
// //     const pokemon = (await response.json()) as PokemonData[];
// //     console.log(pokemon);
// //   } catch (error) {
// //     console.error('Error', error);
// //   }
// // }
// // fetchPokemon();
// // // -------------------------------PokemonData--------------------------------------
// mock up structure
//  <!-- row 1 -->
//
//         <!-- row 3 -->
//         <div class="row">
//           <div class="column-fifth mock-image-align">
//             <img
//               class="mock-image"
//               src="images/appleearpods4.webp"
//               alt="apple earbuds 4" />
//             <p>apple earbuds gen 4</p>
//           </div>
//           <div class="column-fifth mock-image-align">
//             <img
//               class="mock-image"
//               src="images/applesmartwatch.webp"
//               alt="apple smartwatch black" />
//             <p>apple smartwatch black gen3</p>
//           </div>
//           <div class="column-fifth mock-image-align">
//             <img
//               class="mock-image"
//               src="images/beatsheadphones.webp"
//               alt="beats headphones black" />
//             <p>beats headphones black</p>
//           </div>
//           <div class="column-fifth mock-image-align">
//             <img
//               class="mock-image"
//               src="images/generic gaminglaptop.webp"
//               alt="hp gaming laptop gen10" />
//             <p>HP gaming laptop Gen10</p>
//           </div>
//           <div class="column-fifth mock-image-align">
//             <img
//               class="mock-image"
//               src="images/generic laptop.webp"
//               alt="AOC generic laptop Gen11" />
//             <p>AOC generic laptop Gen11</p>
//           </div>
//         </div>
//         <!-- row 3 -->
//         <!-- row 4 -->
//         <div class="row">
//           <div class="column-fifth mock-image-align">
//             <img
//               class="mock-image"
//               src="images/genericheadphone.webp"
//               alt="KVIDIO generic headphones" />
//             <p>KVIDIO headphones</p>
//           </div>
//           <div class="column-fifth mock-image-align">
//             <img
//               class="mock-image"
//               src="images/genericsmartwatch.webp"
//               alt="KIVIDIO smartwatch" />
//             <p>KIVIDIO smartwatch</p>
//           </div>
//           <div class="column-fifth mock-image-align">
//             <img
//               class="mock-image"
//               src="images/hp-laptop.webp"
//               alt="HP intel celeron " />
//             <p>HP intel celeron</p>
//           </div>
//           <div class="column-fifth mock-image-align">
//             <img
//               class="mock-image"
//               src="images/jblheadphones.jpg"
//               alt="JBL blue headphones" />
//             <p>JBL blue headphones</p>
//           </div>
//           <div class="column-fifth mock-image-align">
//             <img
//               class="mock-image"
//               src="images/tshirt.jpg"
//               alt="Generic T-shirt multiple colors" />
//             <p>Generic T-shirt multiple colors</p>
//           </div>
//         </div>
//         <!-- row 4 -->
//         <!-- row 5 -->
//         <div class="row">
//           <div class="column-fifth mock-image-align">
//             <img
//               class="mock-image"
//               src="images/Tshirt gray.jpg"
//               alt="Generic gray and black T-shirt" />
//             <p>Generic gray and black T-shirt</p>
//           </div>
//           <div class="column-fifth mock-image-align">
//             <img
//               class="mock-image"
//               src="images/smartwatchsamsung6.webp"
//               alt="smartwatch Samsung Gen 6" />
//             <p>smartwatch Samsung Gen 6</p>
//           </div>
//           <div class="column-fifth mock-image-align">
//             <img
//               class="mock-image"
//               src="images/sonyheadphones.webp"
//               alt="Sony headphones black" />
//             <p>Sony headphones black</p>
//           </div>
//           <div class="column-fifth mock-image-align">
//             <img
//               class="mock-image"
//               src="images/jeansmen.jpg"
//               alt="Jeans men dark blue" />
//             <p>Jeans men dark blue</p>
//           </div>
//           <div class="column-fifth mock-image-align">
//             <img
//               class="mock-image"
//               src="images/jeanswomen.jpg"
//               alt="Jeans women light blue" />
//             <p>Jeans women light blue</p>
//           </div>
//         </div>
//         <!-- row 5 -->
