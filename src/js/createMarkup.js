export function createGalleryMarkup(arr) {
  return arr.reduce(
    (acc, { largeImageURL, webformatURL, tags, likes, views, comments, downloads }) =>
      acc +
      `<a class="photo-card gallery__item" href=${largeImageURL}">
  <div class="thumb">
  <img class="photo gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy"/>
  </div>
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${downloads}
    </p>
  </div>
</a>`,
    ''
  );
}
