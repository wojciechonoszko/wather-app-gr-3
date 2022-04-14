const axios = require('axios');


//Read
axios
.get("https://jsonplaceholder.typicode.com/posts?_sort=id&-order=desc")
.then((posts) =>{
  console.log(posts);
})
.catch((error) => console.log(error));

//Create
axios
.post("https://jsonplaceholder.typicode.com/posts", {
  author: "Mango",
  body: "CRUD is awesome",
})
.then((post) => console.log(post))
.catch((error) => console.log(error));

//Update
const postToUpdate = {
  id: 1,
  body: "CRUD is really awesome",
};

axios
  .patch(
    `https://jsonplaceholder.typicode.com/posts/${postToUpdate.id}`
  )
  .then((post) => console.log(post))
  .catch((error) => console.log("ERROR" + error));

//Delete
const postIdToDelete = 1;

axios
    .delete(`https://jsonplaceholder.typicode.com/posts/${postIdToDelete}`)
    .then(() => console.log("Post deleted"))
    .catch((error) => console.log("Error:", error));


//fasada projektowa AXIOS
//tworzymy funkcję, która umozliwi podmiane fetcha na axiosa i odwrotnie
axios({
  method: "get",
  url: "https://jsonplaceholder.typicode.com/posts",
  params: {
    _sort: "id",
    _order: "desc",
  },

}).then((response) => {
  console.log(response);
});

function requestXhr(settings) {
  return axios(settings);
  // lub
  // return fetch(settings);
}



const axios = require('axios');
const searchButton = document.querySelector('button');
let inputValue = document.querySelector('input').value;
const userList = document.querySelector(".user-list");
const apiKey = '26533268-30a2ee0a159414a5d568a668e';

searchButton.addEventListener('click', getUser());

searchButton.addEventListener("click", async () => {
  try {
    const users = await getUser();
    renderUserListItems(users);
  } catch (error) {
    console.log(error.message);
  }
});

console.log(inputValue);
async function getUser() {
  try {
    const response = await axios.get(`https://pixabay.com/api/`,{
    params: {
      key: apiKey,
      q: 'yellow flowers',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true
    }
  })
    console.log(response);
    console.log(response.data);
    console.log(response.data.hits[0]);
    console.log(response.data.hits[0].id);
    console.log(response.data.hits[0].webformatURL);
    console.log(response.data.hits[0].largeImageURL);
    console.log(response.data.hits[0].tags);
    console.log(response.data.hits[0].likes);
    console.log(response.data.hits[0].views);
    console.log(response.data.hits[0].comments);
    console.log(response.data.hits[0].downloads);
  } catch (error) {
    console.error(error);
  }
  const users = await Promise.all(arrayOfPromises);
  console.log(users);
  return users;
}

//getUser();

function renderUserListItems(users) {
  const markup = users
    .map(
    
    (user) => `<ul class="item">
        <p><b>Name</b>: ${user.hits[0]}</p>
        <p><b>Email</b>: ${user[1]}</p>
        <p><b>Company</b>: ${user[2]}</p>
      </ul>`
    )
    .join("");
  userList.innerHTML = markup;
}


//==============================================


