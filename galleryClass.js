export default class Gallery {
    constructor({ items, parentGallery, lightboxParent, lightboxImage }) {
        this.items = items;
        this.parentGallery = parentGallery;
        this.lightboxParent = lightboxParent;
        this.lightboxImage = lightboxImage;
        this.buttonsTrack = this.buttonsTrack.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.prevImg = this.prevImg.bind(this);
        this.nextImg = this.nextImg.bind(this);

        this.renderHtml();
    }
    renderHtml() {
        const obRender = this.items.map((element, index) => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            const img = document.createElement('img');

            li.classList.add('gallery__item');
            a.classList.add('gallery__link');
            a.setAttribute('href', element.original);

            img.classList.add('gallery__image');
            img.setAttribute('src', element.preview);
            img.setAttribute('data-source', element.original);
            img.setAttribute('alt', element.description);
            img.setAttribute('data-index', index);

            li.append(a);
            a.append(img);

            return li;

        });
        this.parentGallery.append(...obRender);
        this.addEventClickPhoto();
    }
    addOpenClass() {
        this.lightboxParent.classList.add('is-open');
    }
    removeOpenClass() {
        this.lightboxParent.classList.remove('is-open');
    }
    getSource(event) {
        return event.target.nodeName === "IMG" ? event.target.dataset.source : null;
    }
    getAlt(event) {
        return event.target.nodeName === "IMG" ? event.target.alt : null;
    }
    getIndex(event) {
        return event.target.nodeName === "IMG" ? event.target.dataset.index : null;
    }
    insertModalPhoto(event) {
        this.lightboxImage.setAttribute('src', this.getSource(event));
        this.lightboxImage.setAttribute('alt', this.getAlt(event));
        this.lightboxImage.setAttribute('data-index', this.getIndex(event));
    }
    clearModalPhoto() {
        this.lightboxImage.setAttribute('src', '');
        this.lightboxImage.setAttribute('alt', '');
        this.lightboxImage.setAttribute('data-index', '');
    }
    openModal(event) {
        event.preventDefault();
        this.addOpenClass();
        this.insertModalPhoto(event);
        this.addEventClickModal();
        this.removeEventClickPhoto();
        this.addEventEscape();
    }
    closeModal(event) {
        event.preventDefault();
        if (event.target.nodeName !== "IMG") {
            this.removeOpenClass();
            this.clearModalPhoto();
            this.addEventClickPhoto();
            this.removeEventClickModal();
            this.removeEventEscape();
        }
        this.removeEventEscape();
    }
    addEventClickPhoto() {
        this.parentGallery.addEventListener('click', this.openModal);
    }
    removeEventClickPhoto() {
        this.parentGallery.removeEventListener('click', this.openModal);
    }
    addEventClickModal() {
        this.lightboxParent.addEventListener('click', this.closeModal);
    }
    removeEventClickModal() {
        this.lightboxParent.removeEventListener('click', this.closeModal);
    }
    buttonsTrack(event) {
        event.code === "Escape" ? this.closeModal(event) : null;
    }
    prevImg(event) {
        if (event.code === "ArrowLeft") {
            let previmage = Number(this.lightboxImage.dataset.index) - 1;

            previmage === -1 ? previmage = this.items.length - 1 : null;

            this.lightboxImage.dataset.index = previmage;
            this.lightboxImage.setAttribute('src', this.items[previmage].original);
            this.lightboxImage.setAttribute('alt', this.items[previmage].description)
        }
    }
    nextImg(event) {
        if (event.code === "ArrowRight") {
            let nextimage = Number(this.lightboxImage.dataset.index) + 1;

            nextimage >= this.items.length ? nextimage = 0 : null;

            this.lightboxImage.dataset.index = nextimage;
            this.lightboxImage.setAttribute('src', this.items[nextimage].original);
            this.lightboxImage.setAttribute('alt', this.items[nextimage].description);
        }
    }
    addEventEscape() {
        window.addEventListener('keydown', this.buttonsTrack);
        window.addEventListener('keydown', this.prevImg);
        window.addEventListener('keydown', this.nextImg);
    }
    removeEventEscape() {
        window.removeEventListener('keydown', this.buttonsTrack);
        window.removeEventListener('keydown', this.prevImg);
        window.removeEventListener('keydown', this.nextImg);
    }



}