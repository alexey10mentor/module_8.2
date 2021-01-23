import galleryItems from '../gallery-items.js';
import Gallery from '../galleryClass.js';



const lightbox = document.querySelector('.js-lightbox');
const imageLightbox = document.querySelector('.js-lightbox .lightbox__image');
const parentGallery = document.querySelector('.js-gallery');

const gallery = new Gallery({
    items: galleryItems,
    parentGallery: parentGallery,
    lightboxParent: lightbox,
    lightboxImage: imageLightbox
});