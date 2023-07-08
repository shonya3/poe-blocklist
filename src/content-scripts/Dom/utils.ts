import { consts } from './consts';

export const hideElement = (element: Element): void => element.classList.add(consts.class.hidden);
export const showElement = (element: Element): void => element.classList.remove(consts.class.hidden);
