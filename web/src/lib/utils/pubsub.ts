
type Listener =  (...arg: unknown[]) => any

const listeners: {
  [channel: string]: Listener[]
} = {}

export function on(channel: string, listener: Listener)  {
  if (!listeners[channel]) {
    listeners[channel] = [];
  }
  listeners[channel].push(listener);
}

export function off(channel: string, listener: Listener)  {
  if (listeners[channel]) {
    const idx = listeners[channel].indexOf( listener )
    if (idx>-1) {
      listeners[channel].splice(idx,1)
    }
  }
}

 export function emit(channel: string, ...arg: unknown[]) {
  if (listeners[channel]) {
    const listeners_copy = [... listeners[channel]];
    for (const listener of listeners_copy) {
      listener.apply(undefined, arg);
    }
  }
}

export function removeAssets(assetIds: string[]) {
  emit('remove-assets', assetIds)
}

