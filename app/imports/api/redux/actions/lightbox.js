export const lightboxOpen = () => ({
  type: 'LIGHTBOX_OPEN',
});

export const lightboxClose = () => ({
  type: 'LIGHTBOX_CLOSE',
});

export const lightboxCreate = (list, current) => ({
  type: 'LIGHTBOX_CREATE',
  list,
  current,
});

export const lightboxUpdate = list => ({
  type: 'LIGHTBOX_UPDATE',
  list,
});

export const lightboxNext = () => ({
  type: 'LIGHTBOX_NEXT',
});

export const lightboxPrev = () => ({
  type: 'LIGHTBOX_PREV',
});

export const lightboxCurrent = current => ({
  type: 'LIGHTBOX_CURRENT',
  current,
});
