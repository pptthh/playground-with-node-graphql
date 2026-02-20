const eventTypes = [
  'mouseup',
  'mousedown',
  'mousemove',
  'mouseenter',
  'mouseout',
  'mouseleave',
  'mouseover',
  'click',
  'dblclick',
  'contextmenu',
  'keydown',
  'keyup',
  'touchstart',
  'touchend',
  'scroll',
  'scrollend',
  'resize',
  'load'
]

const eventHandler = (event: unknown, props?: unknown): void => {
  if (event instanceof UIEvent) {
    console.debug('Wrapper event type:', {event, props})
  }
}

const addEventListener = (displayObject: HTMLElement): void => {
  eventTypes.map(
    eventType => displayObject.addEventListener(eventType, eventHandler)
  );
}

export default addEventListener;
