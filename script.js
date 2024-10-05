// JavaScript
const subscribeButton = document.getElementById('subscribe-button');
const subscribeMessage = document.querySelector('.subscribe-message');



subscribeButton.addEventListener('click', () => {
  subscribeButton.textContent = 'Вы подписаны';
  subscribeButton.disabled = true;
});
 

// JavaScript
const likeButton = document.querySelector('.like-button');

likeButton.addEventListener('click', () => {
  likeButton.classList.add('animate');
  likeButton.querySelector('.fas').classList.add('animate');
  setTimeout(() => {
    likeButton.classList.remove('animate');
    likeButton.querySelector('.fas').classList.remove('animate');
  }, 1000);
});

// Получаем все кнопки лайков
const likeButtons = document.querySelectorAll('.like-button');

// Создаем объект для хранения состояния лайков
const likes = {};

// Проходим по всем кнопкам лайков
likeButtons.forEach((button) => {
  // Получаем ID видео, для которого эта кнопка лайка
  const videoId = button.getAttribute('data-video-id');

  // Если у кнопки лайка есть атрибут data-video-id, то сохраняем его в объект likes
  if (videoId) {
    likes[videoId] = false;
  }

  // Добавляем обработчик события для кнопки лайка
  button.addEventListener('click', () => {
    // Получаем текущее состояние лайка для этого видео
    const currentState = likes[videoId];

    // Если лайк уже поставлен, то снимаем его
    if (currentState) {
      likes[videoId] = false;
      button.classList.remove('active');
      button.textContent = 'Лайк';
    } else {
      // Если лайк не ставился, то ставим его
      likes[videoId] = true;
      button.classList.add('active');
      button.textContent = 'Лайкнуто';
    }
  });
});



const video = document.querySelector('video');
video.addEventListener('click', () => {
  video.play();
});



// функция для отображения избранных видео
function displayFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const favoritesContainer = document.getElementById('favorites-container');
  favoritesContainer.innerHTML = '';
  favorites.forEach((videoId) => {
      const video = document.querySelector(`[data-video-id="${videoId}"]`);
      const videoClone = video.cloneNode(true);
      const favoriteVideo = document.createElement('div');
      favoriteVideo.classList.add('favorite-video');
      favoriteVideo.appendChild(videoClone);
      favoritesContainer.appendChild(favoriteVideo);
  });
}

// вызов функции при загрузке страницы
window.onload = displayFavorites;



   // Get all the favorite buttons
   const favoriteButtons = document.querySelectorAll('.favorite-button');

   // Add a click event listener to each button
   favoriteButtons.forEach(button => {
     button.addEventListener('click', event => {
       // Get the video ID and source from the button's data attributes
       const videoId = event.target.dataset.videoId;
       const videoSrc = event.target.dataset.videoSrc;

       // Add the video to the favorites list
       addToFavorites(videoId, videoSrc);

       // Navigate to the favorites page
       window.location.href = 'favorites.html';
     });
   });

   // Function to add a video to the favorites list




  
favoriteButtons.forEach(button => {
  button.addEventListener('click', event => {
    const videoSrc = event.target.dataset.videoSrc;
    addToFavorites(videoSrc);
  });
});

function addToFavorites(videoSrc) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites.push(videoSrc);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  displayFavorites();
}

function displayFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const favoritesContainer = document.getElementById('favorites-container');
  const favoritesList = favoritesContainer.querySelector('.favorites-list');
  favoritesList.innerHTML = '';
  favorites.forEach((videoSrc, index) => {
    const videoElement = document.createElement('div');
    videoElement.classList.add('favorite-video');
    const thumbnailElement = document.createElement('img');
    thumbnailElement.src = getThumbnailUrl(videoSrc);
    videoElement.appendChild(thumbnailElement);
    const videoTitleElement = document.createElement('span');
    videoTitleElement.textContent = getVideoTitle(videoSrc);
    videoElement.appendChild(videoTitleElement);
    const removeButtonElement = document.createElement('button');
    removeButtonElement.classList.add('remove-button');
    removeButtonElement.textContent = 'Удалить';
    removeButtonElement.addEventListener('click', () => {
      removeFavorite(videoSrc);
    });
    videoElement.appendChild(removeButtonElement);
    favoritesList.appendChild(videoElement);
  });
}

function removeFavorite(videoSrc) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const index = favorites.indexOf(videoSrc);
  if (index !== -1) {
    favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites();
  }
}

function getThumbnailUrl(videoSrc) {
  // Return a thumbnail URL for the video
  // For example, you can use a service like YouTube's thumbnail API
  // or a library like video.js to generate a thumbnail
  return `https://example.com/thumbnail/${videoSrc}`;
}

function getVideoTitle(videoSrc) {
  // Return the title of the video
  // For example, you can use a service like YouTube's API
  // or a library like video.js to get the video title
  return `Video ${videoSrc}`;
}


   


function displayFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const favoritesContainer = document.getElementById('favorites-container');
  const favoritesList = favoritesContainer.querySelector('.favorites-list');
  favoritesList.innerHTML = '';
  favorites.forEach((video, index) => {
    const li = document.createElement('li');
    li.textContent = video.title;
    const a = document.createElement('a');
    a.href = video.url;
    a.textContent = video.title;
    li.appendChild(a);
    const removeBtn = document.createElement('span');
    removeBtn.textContent = 'Удалить';
    removeBtn.className = 'remove-button';
    removeBtn.onclick = () => removeFromFavorites(index);
    li.appendChild(removeBtn);
    favoritesList.appendChild(li);
  });
}




   