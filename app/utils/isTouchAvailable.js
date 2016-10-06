const isTouchAvailable = 'ontouchstart' in window || navigator.maxTouchPoint

export default !!isTouchAvailable
