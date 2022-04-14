import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/styles.css'


const axios = require('axios');
const form = document.querySelector('.search-form');

const loadMoreButton = document.querySelector('.load-more');
const buttonHideText = document.querySelector('.button-hide-text');
const gallery = document.querySelector(".gallery");
const userList = document.querySelector(".user-list");
const apiKey = '26533268-30a2ee0a159414a5d568a668e';

let page =1;
let limit = 40;






form.addEventListener('submit', getUser);

loadMoreButton.addEventListener("click", loadMore);
loadMoreButton.style.display='none';
buttonHideText.style.visibility='hidden';
  


async function getUser(event) {
  event.preventDefault();
  loadMoreButton.style.display='none';
  buttonHideText.style.visibility='hidden';
  const val = document.querySelector('input').value;
  page = 1;
  try {
    const response = await axios.get(`https://pixabay.com/api/`,{
    params: {
      key: apiKey,
      q: val,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: limit,
      page: page
    }
  })
  let elements = response.data.hits;
    //console.log("This is users" + elements);  
  const arrayOfPromises = elements.map(function(elem){
    return `${elem.tags}`;
    
  })
  console.log("dlugosc tablicy " + elements.length)
  let totalFound = response.data.total;
  // console.log(arrayOfPromises);
  
     console.log(response);
     console.log(response.data.total);
  //   console.log(response.data.hits[0]);
  //   console.log(response.data.hits[0].id);
  //   console.log(response.data.hits[0].webformatURL);
  //   console.log(response.data.hits[0].largeImageURL);
  //   console.log(response.data.hits[0].tags);
  //   console.log(response.data.hits[0].likes);
  //   console.log(response.data.hits[0].views);
  //   console.log(response.data.hits[0].comments);
  //   console.log(response.data.hits[0].downloads);

if (elements.length > 0)
       {Notiflix.Notify.success(`Hooray! We found ${totalFound} images.`);
         console.log(elements)
        const markup = elements
           .map(
           
          
           (elem) => `<div class="photo-card">
           <a href="${elem.largeImageURL}"><img src="${elem.webformatURL}" alt="${elem.tags}" loading="lazy" /></a>
           <div class="info">
             <p class="info-item">
               <b>Likes</b> ${elem.likes}
             </p>
             <p class="info-item">
               <b>Views</b> ${elem.views}
             </p>
             <p class="info-item">
               <b>Comments</b> ${elem.comments}
             </p>
             <p class="info-item">
               <b>Downloads</b> ${elem.downloads}
             </p>
           </div>
         </div>`
           )
           .join("");
           
        //console.log(galleryItems);  
        gallery.innerHTML = markup;}


         
         
    else {
      console.log("Nic nie znaleziono");
      Notiflix.Notify.failure('"Sorry, there are no images matching your search query. Please try again."');
    }
    
    
    const lightbox = new SimpleLightbox('.photo-card a',{
      showCaptions: true,
      captionSelector: 'img',
      captionType: 'attr',
      captionsData: 'alt',
      captionPosition: 'bottom',
      captionDelay: 250,
      animationSpeed: 250,
      });
     
    


  
 
    
  } catch (error) {
    console.error(error);
    
  }
  
  
  loadMoreButton.style.display='block';
}


//========================================================================
async function loadMore(event) {
  event.preventDefault();
  
  
  loadMoreButton.style.display='none';
  
  
  const val = document.querySelector('input').value;
  page += 1;
  
  var images = ('.gallery a').simpleLightbox();
  try {
    const response = await axios.get(`https://pixabay.com/api/`,{
    params: {
      key: apiKey,
      q: val,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: limit,
      page: page
    }
  })
  let elements = response.data.hits;
    
  const arrayOfPromises = elements.map(function(elem){
    return `${elem.tags}`;
    
  })
  console.log("dlugosc tablicy " + elements.length)
  let totalFound = response.data.total;
  
  
     console.log(response);
     console.log(response.data.total);

     
  
if (elements.length > 0)
       {//Notiflix.Notify.success(`Found ${totalFound} matches`);
         
        const markup = elements
           .map(
           
          
           (elem) => `<div class="photo-card">
           <a href="${elem.largeImageURL}"><img src="${elem.webformatURL}" alt="${elem.tags}" loading="lazy" /></a>
           <div class="info">
             <p class="info-item">
               <b>Likes</b> ${elem.likes} 
             </p>
             <p class="info-item">
               <b>Views</b> ${elem.views}
             </p>
             <p class="info-item">
               <b>Comments</b> ${elem.comments}
             </p>
             <p class="info-item">
               <b>Downloads</b> ${elem.downloads}
             </p>
           </div>
         </div>`
           )
           .join("");
         //gallery.innerHTML = markup;

        gallery.insertAdjacentHTML('beforeend', markup)}
        
    else {
      console.log("Nic nie znaleziono");
      Notiflix.Notify.failure('"Sorry, there are no images matching your search query. Please try again."');
    }
    
    const lightbox = new SimpleLightbox('.photo-card a',{
      showCaptions: true,
      captionSelector: 'img',
      captionType: 'attr',
      captionsData: 'alt',
      captionPosition: 'bottom',
      captionDelay: 250,
      animationSpeed: 250,
      });

      
     
    
    
    loadMoreButton.style.display='block';
    console.log("page " + page);
    console.log("limit " + limit*page);
    console.log("total " + totalFound);
    if (page*limit > totalFound) {
      loadMoreButton.style.display='none';
      
      buttonHideText.style.visibility='visible';
          
      console.log("Finish");
    }

  } catch (error) {
    console.error(error);
    
  }
  
}



