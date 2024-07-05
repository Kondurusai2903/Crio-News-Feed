function createAccordinItem(name, id) {
  return `
    <div class="accordion-item" id="card${id}">
        <h2 class="accordion-header" id="heading${id}">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${id}" aria-expanded="true" aria-controls="collapse${id}">
                ${name}
            </button>
        </h2>
        <div id="collapse${id}" class="accordion-collapse collapse" aria-labelledby="heading${id}" data-bs-parent="#accordionExample">

        <div class="accordion-body" id="accordion-body${id}">

        </div>

        </div>
    </div>
    `;
}

function createCarouselOuterSkeleton(id) {
  return `
    <div id="carouselExampleControls${id}" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner" id="carousel-inner${id}">

            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls${id}" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls${id}" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
    </div>
    `;
}
function carouselInner(active, id) {
  return `
    <div id="carousel-item${id}" class="carousel-item ${
    active ? "active" : ""
  }">

    </div>
    `;
}
function createCard(item) {
  const {
    title,
    pubDate,
    link: postList,
    guid,
    author,
    thumbnail,
    description,
    content,
    enclosure,
    categories,
  } = item;
  const { link: postImagelink } = enclosure;
  return `
    <div class="card"">
        <a href="${postList}">
            <img class="card-img-top" alt="card-image" src=${postImagelink}>
        </a>
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <h6 class="card-subtitle d-inline">${author}</h6>
                <p class="card-subtitle d-inline"><span class="dot">•</span>${pubDate}</p>
                <p class="card-text">${description}</p>
            </div>

    </div>
    `;
}

const ID = () => {
  return Math.random().toString(36).substring(2, 9);
};

async function mainFunction() {
  // console.log(magazines);
  magazines = [
    "https://flipboard.com/@thenewsdesk/the-latest-on-coronavirus-covid-19-t82no8kmz.rss",
    "https://flipboard.com/@dfletcher/india-tech-b2meqpd6z.rss",
    "https://flipboard.com/@thehindu/sportstarlive-rj3ttinvz.rss",
  ];
  for (let i = 0; i < magazines.length; i++) {
    const url = `https://api.rss2json.com/v1/api.json?rss_url=${magazines[i]}`;
    let response = await fetch(url);
    let data = await response.json();

    //
    // console.log(data)
    // const {feed,items}=data;

    const accordinTite = data["feed"]["title"];
    const accordinId = ID();
    // console.log(accordinTite);
    // console.log(feed.title);
    const accordianBody = createAccordinItem(accordinTite, accordinId);
    document.getElementById("accordionExample").innerHTML += accordianBody;
    // if (i == 0) {
    //   document.getElementById(`collapse${accordinId}`).classList.add("show");
    // }

    // // -----------create carousel -----------------

    const carouselId = ID();
    const createCarouselOuterSkeletonhtml =
      createCarouselOuterSkeleton(carouselId);
    document.getElementById(`accordion-body${accordinId}`).innerHTML =
      createCarouselOuterSkeletonhtml;

    // ---------add the cards;
    const items = data["items"];
    // console.log(items)
    // console.log(document.getElementById("accordionExample"))
    for (let i in items) {
      // console.log(items[i]);

      const item = items[i];
      const cardHtml = createCard(item);
      // console.log(cardHtml);

      const carouselCardItemId = ID();
      const carouselCardInnerHtml = carouselInner(i == 0, carouselCardItemId);

      document.getElementById(`carousel-inner${carouselId}`).innerHTML +=
        carouselCardInnerHtml;
      document.getElementById(`carousel-item${carouselCardItemId}`).innerHTML +=
        cardHtml;
    }
  }
}
mainFunction();

// const accordinBody = (name, id) => {
//   return `<div class="accordion-item" id="card${id}">
//     <h2 class="accordion-header" id="heading${id}">
//       <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${id}" aria-expanded="true" aria-controls="collapse${id}">
//        ${name}
//       </button>
//     </h2>
//     <div id="collapse${id}" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
//       <div class="accordion-body" id="accordion-body${id}">

//     </div>
//   </div>`;
// };
// const carouselBody = (id) => {
//   return `
//   <div id="carouselExampleControls${id}" class="carousel slide" data-bs-ride="carousel">
//   <div class="carousel-inner" id="carousel-inner${id}">

//   </div>
//   <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
//     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
//     <span class="visually-hidden">Previous</span>
//   </button>
//   <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
//     <span class="carousel-control-next-icon" aria-hidden="true"></span>
//     <span class="visually-hidden">Next</span>
//   </button>
// </div>
//     `;
// };
// let Id = () => {
//   return Math.random().toString(36).substring(2, 9);
// };
// async function main() {
//   magazines = [
//     "https://flipboard.com/@thenewsdesk/the-latest-on-coronavirus-covid-19-t82no8kmz.rss",
//     "https://flipboard.com/@dfletcher/india-tech-b2meqpd6z.rss",
//     "https://flipboard.com/@thehindu/sportstarlive-rj3ttinvz.rss",
//   ];
//   for (let i = 0; i < magazines.length; i++) {
//     const url = `https://api.rss2json.com/v1/api.json?rss_url=${magazines[i]}`;
//     let response = await fetch(url);
//     let data = await response.json();
//     // console.log(data);
//     const { feed, items } = data;
//     const accordionTitle = data["feed"]["title"];
//     const accordionId = Id();
//     const accordionbody = accordinBody(accordionTitle, accordionId);
//     document.getElementById("accordionExample").innerHTML += accordionbody;

//     const carouselId = Id();
//     const carouselbody = carouselBody(carouselId);
//     document.getElementById("accordion-body${accordionId}").innerHTML =
//       carouselbody;
//     for (let i in items) {
//       console.log(i);
//     }
//   }
// }
// main();
// const Card = (item) => {
//   let [] = item;
// };
// const accordinBody = (name, id) => {
//   return `<div class="accordion-item" id="card${id}">
//     <h2 class="accordion-header" id="heading${id}">
//       <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${id}" aria-expanded="true" aria-controls="collapse${id}">
//         ${name}
//       </button>
//     </h2>
//     <div id="collapse${id}" class="accordion-collapse collapse" aria-labelledby="heading${id}" data-bs-parent="#accordionExample">
//       <div class="accordion-body" id="accordion-body${id}">

//       </div>
//     </div>
//   </div>`;
// };
// const carouselBody = (id) => {
//   returnn`<div id="carouselExampleControls${id}" class="carousel slide" data-bs-ride="carousel">
//   <div class="carousel-inner" id="carousel-inner${id}">

//   </div>
//   <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
//     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
//     <span class="visually-hidden">Previous</span>
//   </button>
//   <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
//     <span class="carousel-control-next-icon" aria-hidden="true"></span>
//     <span class="visually-hidden">Next</span>
//   </button>
// </div>`;
// };
// const Id = () => {
//   return Math.random().toString(36).substring(2, 9);
// };
// async function main() {
//   magazines = [
//     "https://flipboard.com/@thenewsdesk/the-latest-on-coronavirus-covid-19-t82no8kmz.rss",
//     "https://flipboard.com/@dfletcher/india-tech-b2meqpd6z.rss",
//     "https://flipboard.com/@thehindu/sportstarlive-rj3ttinvz.rss",
//   ];
//   for (let i = 0; i < magazines.length; i++) {
//     const url = `https://api.rss2json.com/v1/api.json?rss_url=${magazines[i]}`;
//     let response = await fetch(url);
//     let data = await response.json();
//     let { feed, items } = data;
//     const accordinTitle = data["feed"]["title"];
//     const accordinId = Id();
//     const accordinbody = accordinBody(accordinTitle, accordinId);
//     console.log(accordinbody);
//     document.getElementById("accordionExample").innerHTML += accordinbody;

//     const carouselId = Id();
//       const carouselbody = carouselBody(carouselId);
//       for (let i in items) {
//       // console.log(items[i]);

//       const item = items[i];
//       const cardHtml = createCard(item);
//       // console.log(cardHtml);

//       const carouselCardItemId = Id();
//       const carouselCardInnerHtml = carouselInner(i == 0, carouselCardItemId);

//       document.getElementById(`carousel-inner${carouselId}`).innerHTML +=
//         carouselCardInnerHtml;
//       document.getElementById(`carousel-item${carouselCardItemId}`).innerHTML +=
//         cardHtml;
//     }
// //     for (let i in items) {
// //       let carditem = createCard(items[i]);
// //       document.getElementById("carousel-inner${carouselId}").innerHTML +=
// //         carditem;
// //       //
// //     }
// //     document.getElementById("accordion-body${accordinId}").innerHTML =
// //       carouselbody;
// //   }
//   //   accordion-body${id}
//   // console.log(accordinTitle);
//   // for (let i in items) {
//   //   let item = items[i];
//   //   console.log(item);
//   // }
// }
// // }
// main();
