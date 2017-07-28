export default function scrollPrevented(state = false, action) {
  switch (action.type) {
    case 'SCROLL_TOGGLE':
      return !state;
    case 'SCROLL_ENABLE':
      return false;
    case 'SCROLL_DISABLE':
      return true;
    case 'BODY_SCROLLED':
      return false;
    case 'BODY_CLICKED':
      return false;
    default:
      return state;
  }
}

