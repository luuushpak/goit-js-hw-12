import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  hideLoadMoreButton,
  showLoadMoreButton,
} from './js/render-functions';

const formElement = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;
let curQuery = '';
let totalHits = 0;
const perPage = 15;

formElement.addEventListener('submit', handleFormSubmit);
loadMoreBtn.addEventListener('click', handleLoadMore);

async function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const query = form.elements['search-text'].value.trim();
  if (query === '') {
    iziToast.warning({
      message: 'Value cannot be an empty string!',
      position: 'topRight',
    });
    return;
  }

  curQuery = query;
  page = 1;

  hideLoadMoreButton();
  clearGallery();
  showLoader();
  try {
    const data = await getImagesByQuery(curQuery, page);
    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      hideLoadMoreButton();
      return;
    }
    totalHits = data.totalHits;
    createGallery(data.hits);
    if (page * perPage >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      message: 'Oops...something wrong :(',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    form.reset();
  }
}

async function handleLoadMore() {
  page += 1;
  showLoader();
  hideLoadMoreButton();
  try {
    const data = await getImagesByQuery(curQuery, page);
    createGallery(data.hits);
    const card = document.querySelector('.gallery-item');
    const height = card.getBoundingClientRect().height;

    window.scrollBy({ top: height * 2.88, behavior: 'smooth' });
    if (page * perPage >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      message: 'Oops...something wrong :(',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}
