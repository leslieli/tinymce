import { Arr, Option } from '@ephox/katamari';
import { SugarElement } from '../../api/node/SugarElement';
import * as SugarText from '../../api/node/SugarText';
import * as Geometry from '../alien/Geometry';

const locateOffset = (doc: SugarElement<Document>, textnode: SugarElement<Text>, x: number, y: number, rect: ClientRect | DOMRect) => {
  const rangeForOffset = (o: number) => {
    const r = doc.dom().createRange();
    r.setStart(textnode.dom(), o);
    r.collapse(true);
    return r;
  };

  const rectForOffset = (o: number) => {
    const r = rangeForOffset(o);
    return r.getBoundingClientRect();
  };

  const length = SugarText.get(textnode).length;
  const offset = Geometry.searchForPoint(rectForOffset, x, y, rect.right, length);
  return rangeForOffset(offset);
};

const locate = (doc: SugarElement<Document>, node: SugarElement<Text>, x: number, y: number) => {
  const r = doc.dom().createRange();
  r.selectNode(node.dom());
  const rects = r.getClientRects();
  const foundRect = Arr.findMap<ClientRect | DOMRect, ClientRect | DOMRect>(rects, (rect) =>
    Geometry.inRect(rect, x, y) ? Option.some(rect) : Option.none());

  return foundRect.map((rect) => locateOffset(doc, node, x, y, rect));
};

export { locate };
