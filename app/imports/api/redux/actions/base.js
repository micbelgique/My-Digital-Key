export function toggleMenu() {
  return {
    type: 'MENU_TOGGLE',
  };
}

export function closeMenu() {
  return {
    type: 'MENU_CLOSE',
  };
}

export function bodyClicked() {
  return {
    type: 'BODY_CLICKED',
  };
}

export function openMenu() {
  return {
    type: 'MENU_OPEN',
  };
}

export function enableLock() {
  return {
    type: 'MENU_LOCK',
  };
}

export function toggleLock() {
  return {
    type: 'MENU_TOGGLELOCK',
  };
}

export function disableLock() {
  return {
    type: 'MENU_UNLOCK',
  };
}
