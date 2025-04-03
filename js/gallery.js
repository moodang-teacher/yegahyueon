import PhotoSwipeLightbox from 'https://unpkg.com/photoswipe/dist/photoswipe-lightbox.esm.js';

// 갤러리 초기화 함수
function initializeGallery(galleryId) {
    const lightbox = new PhotoSwipeLightbox({
        gallery: galleryId,
        children: 'a',
        pswpModule: () => import('https://unpkg.com/photoswipe@5.2.2'),
    });
    lightbox.init();
}
// 갤러리 초기화
initializeGallery('#webdesign');
initializeGallery('#graphicdesign');
