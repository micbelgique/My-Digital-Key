export default function lightbox(state = { isOpen: false, list: [] }, action) {
  switch (action.type) {

    case 'LIGHTBOX_OPEN': {
      return { ...state, isOpen: true };
    }

    case 'LIGHTBOX_CLOSE': {
      return { ...state, isOpen: false };
    }

    case 'LIGHTBOX_CREATE': {
      return {
        isOpen: false,
        list: action.list,
        current: action.current,
        next: (action.current + 1) % action.list.length,
        prev: (action.current + (action.list.length - 1)) % action.list.length,
      };
    }

    case 'LIGHTBOX_UPDATE': {
      return {
        ...state,
        list: action.list,
        current: state.current,
        next: (state.current + 1) % action.list.length,
        prev: (state.current + (action.list.length - 1)) % action.list.length,
      };
    }

    case 'LIGHTBOX_NEXT': {
      const lightboxNext = {
        prev: state.current,
        current: state.next,
        next: (state.next + 1) % state.list.length,
      };
      return { ...state, ...lightboxNext };
    }

    case 'LIGHTBOX_PREV': {
      const lightboxPrev = {
        prev: (state.prev + (state.list.length - 1)) % state.list.length,
        current: state.prev,
        next: state.current,
      };
      return { ...state, ...lightboxPrev };
    }

    case 'LIGHTBOX_CURRENT': {
      return {
        ...state,
        current: action.current,
        next: (action.current + 1) % state.list.length,
        prev: (action.current + (state.list.length - 1)) % state.list.length,
      };
    }

    default:
      return state;

  }
}
