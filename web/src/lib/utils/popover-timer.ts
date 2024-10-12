let _hoverMode = false;
let timeoutId: ReturnType<typeof setTimeout> | undefined;
const hoverDelay = 600;
const getHoverMode = () => _hoverMode;
const setHoverMode = (mode: boolean) => {
  if (mode) {
    clearTimeout(timeoutId);
    _hoverMode = true;
    return;
  }
  timeoutId = setTimeout(() => {
    _hoverMode = false;
  }, hoverDelay);
};
export { getHoverMode, hoverDelay, setHoverMode };
