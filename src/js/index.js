import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createGalleryMarkup } from './module/createMarkup';
import { SearchQuery } from './module/fetchSearch';

const searchFormRef = document.querySelector('.js-search-form');
const galleryRef = document.querySelector('.js-gallery');
const btnLoadRef = document.querySelector('.js-load-more');
const warnMessage = 'Sorry, there are no images matching your search query. Please try again.';

const searchQuery = new SearchQuery();
const lightbox = new SimpleLightbox('.gallery a', {
  navText: ['&lArr;', '&rArr;'],
});

searchFormRef.addEventListener('submit', onSearchFormSubmit);
btnLoadRef.addEventListener('click', onBtnLoadClick);

async function onSearchFormSubmit(e) {
  e.preventDefault();
  btnLoadRef.classList.add('isHidden');
  galleryRef.innerHTML = '';

  const query = e.target.elements.searchQuery.value.trim();
  if (!query) {
    Notify.info('Please, enter key word for search!');
    return;
  }
  searchQuery.setPage();
  try {
    const response = await searchQuery.getResponse(query);
    const { hits, totalHits } = response.data;
    if (!hits.length) {
      throw new Error(warnMessage);
    }
    renderImages(hits);
    Notify.success(`Hooray! We found ${totalHits} images.`);
    btnLoadRef.classList.remove('isHidden');
    searchQuery.increasePage();
  } catch (err) {
    Notify.warning(err.message);
  }
}

function renderImages(arr) {
  const markup = createGalleryMarkup(arr);
  galleryRef.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

async function onBtnLoadClick() {
  try {
    const response = await searchQuery.getResponse();
    const { hits, totalHits } = response.data;
    renderImages(hits);
    searchQuery.increasePage();

    const { height } = galleryRef.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: height * 2.5,
      behavior: 'smooth',
    });

    const {
      params: { page, per_page },
    } = searchQuery;
    if (page > totalHits / per_page) {
      btnLoadRef.classList.add('isHidden');
      throw new Error("We're sorry, but you've reached the end of search results.");
    }
  } catch (err) {
    Notify.info(err.message);
  }
}
