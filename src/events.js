const MouseEvents = {
  ['onClick'.toLowerCase()]: 'onClick',
  ['onContextMenu'.toLowerCase()]: 'onContextMenu',
  ['onDoubleClick'.toLowerCase()]: 'onDoubleClick',
  ['onDrag'.toLowerCase()]: 'onDrag',
  ['onDragEnd'.toLowerCase()]: 'onDragEnd',
  ['onDragEnter'.toLowerCase()]: 'onDragEnter',
  ['onDragExit'.toLowerCase()]: 'onDragExit',
  ['onDragLeave'.toLowerCase()]: 'onDragLeave',
  ['onDragOver'.toLowerCase()]: 'onDragOver',
  ['onDragStart'.toLowerCase()]: 'onDragStart',
  ['onDrop'.toLowerCase()]: 'onDrop',
  ['onMouseDown'.toLowerCase()]: 'onMouseDown',
  ['onMouseEnter'.toLowerCase()]: 'onMouseEnter',
  ['onMouseLeave'.toLowerCase()]: 'onMouseLeave',
  ['onMouseMove'.toLowerCase()]: 'onMouseMove',
  ['onMouseOut'.toLowerCase()]: 'onMouseOut',
  ['onMouseOver'.toLowerCase()]: 'onMouseOver',
  ['onMouseUp'.toLowerCase()]: 'onMouseUp',
  ['Click'.toLowerCase()]: 'onClick',
  ['ContextMenu'.toLowerCase()]: 'onContextMenu',
  ['DoubleClick'.toLowerCase()]: 'onDoubleClick',
  ['Drag'.toLowerCase()]: 'onDrag',
  ['DragEnd'.toLowerCase()]: 'onDragEnd',
  ['DragEnter'.toLowerCase()]: 'onDragEnter',
  ['DragExit'.toLowerCase()]: 'onDragExit',
  ['DragLeave'.toLowerCase()]: 'onDragLeave',
  ['DragOver'.toLowerCase()]: 'onDragOver',
  ['DragStart'.toLowerCase()]: 'onDragStart',
  ['Drop'.toLowerCase()]: 'onDrop',
  ['MouseDown'.toLowerCase()]: 'onMouseDown',
  ['MouseEnter'.toLowerCase()]: 'onMouseEnter',
  ['MouseLeave'.toLowerCase()]: 'onMouseLeave',
  ['MouseMove'.toLowerCase()]: 'onMouseMove',
  ['MouseOut'.toLowerCase()]: 'onMouseOut',
  ['MouseOver'.toLowerCase()]: 'onMouseOver',
  ['MouseUp'.toLowerCase()]: 'onMouseUp',
};

const TouchEvents = {
  ['onTouchCancel'.toLowerCase()]: 'onTouchCancel',
  ['onTouchEnd'.toLowerCase()]: 'onTouchEnd',
  ['onTouchMove'.toLowerCase()]: 'onTouchMove',
  ['onTouchStart'.toLowerCase()]: 'onTouchStart',
  ['TouchCancel'.toLowerCase()]: 'onTouchCancel',
  ['TouchEnd'.toLowerCase()]: 'onTouchEnd',
  ['TouchMove'.toLowerCase()]: 'onTouchMove',
  ['TouchStart'.toLowerCase()]: 'onTouchStart',
};

export default function(_eventName) {
  const eventName = _eventName.toLowerCase();
  let event = null;
  if (event = MouseEvents[eventName]) {
    return event;
  }

  if (event = TouchEvents[eventName]) {
    return event;
  }

  console.log('UNKNOWN EVENT:', _eventName);
}
