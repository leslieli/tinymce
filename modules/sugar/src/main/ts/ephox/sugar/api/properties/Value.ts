import { HTMLButtonElement, HTMLInputElement, HTMLOptionElement, HTMLSelectElement, HTMLTextAreaElement } from '@ephox/dom-globals';
import Element from '../node/Element';

type TogglableElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLOptionElement | HTMLButtonElement;

const get = (element: Element<TogglableElement>): string =>
  element.dom().value;

const set = (element: Element<TogglableElement>, value: string): void => {
  if (value === undefined) {
    throw new Error('Value.set was undefined');
  }
  element.dom().value = value;
};

export {
  set,
  get
};
