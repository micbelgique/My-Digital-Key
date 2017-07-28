const isMenuOpen = (state = false, action) => {
  switch (action.type) {
    case 'MENU_TOGGLE':
      return !state;
    case 'MENU_OPEN':
      return true;
    case 'MENU_CLOSE':
      return false;
    case 'BODY_CLICKED':
      return false;
    default:
      return state;
  }
};

const menu = (state = {}, action) => {
  switch (action.type) {
    case 'MENU_TOGGLE':
      return { ...state, isOpen: isMenuOpen(state.isOpen, action) };
    case 'MENU_OPEN':
      return { ...state, isOpen: isMenuOpen(state.isOpen, action) };
    case 'MENU_CLOSE':
      return { ...state, isOpen: isMenuOpen(state.isOpen, action) };
    case 'MENU_LOCK':
      return { ...state, isLocked: true, isOpen: true };
    case 'MENU_UNLOCK':
      return { ...state, isLocked: false };
    case 'MENU_TOGGLELOCK':
      return {
        ...state,
        isLocked: !state.isLocked,
        isOpen: (state.isLocked === false ? true : state.isOpen),
      };
    case 'BODY_CLICKED':
      return state.isLocked ? state : { ...state, isOpen: isMenuOpen(state.isOpen, action) };
    default:
      return state;
  }
};

export default menu;
