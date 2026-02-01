import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const instance = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom',
});

export function createGallery(images) {
  const markup = images
    .map(image => {
      const {
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = image;
      return `<li class="gallery-item">
    <a href="${largeImageURL}" class="gallery-link">
      <img
        src="${webformatURL}"
        alt="${tags}"
        class="gallery-image"
      />
    </a>

    <div class="info">
      <p>Likes <span>${likes}</span></p>
      <p>Views <span>${views}</span></p>
      <p>Comments <span>${comments}</span></p>
      <p>Downloads <span>${downloads}</span></p>
    </div>
  </li>`;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  instance.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('is-hidden');
}

export function hideLoader() {
  loader.classList.add('is-hidden');
}
