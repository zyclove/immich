<script lang="ts" context="module">
  import type { HTMLButtonAttributes, HTMLLinkAttributes } from 'svelte/elements';

  export type Color = 'transparent' | 'light' | 'dark' | 'gray' | 'primary' | 'opaque' | 'alert';
  export type Padding = '1' | '2' | '3';

  type BaseProps = {
    icon: string;
    title: string;
    class?: string;
    color?: Color;
    padding?: Padding;
    size?: string;
    hideMobile?: true;
    buttonSize?: string;
    viewBox?: string;
  };

  export type ButtonProps = HTMLButtonAttributes &
    BaseProps & {
      href?: never;
    };

  export type LinkProps = HTMLLinkAttributes &
    BaseProps & {
      type?: never;
    };

  export type Props = ButtonProps | LinkProps;
</script>

<script lang="ts">
  import Icon from '$lib/components/elements/icon.svelte';
  import { scale } from 'svelte/transition';
  import { tick } from 'svelte';
  import { activePopoverId, getHoverMode, hoverDelay, setHoverMode } from '$lib/utils/popover-timer';
  import { generateId } from '$lib/utils/generate-id';

  type $$Props = Props;

  export let type: $$Props['type'] = 'button';
  export let href: $$Props['href'] = undefined;
  export let icon: string;
  export let color: Color = 'transparent';
  export let title: string;
  /**
   * The padding of the button, used by the `p-{padding}` Tailwind CSS class.
   */
  export let padding: Padding = '3';
  /**
   * Size of the button, used for a CSS value.
   */
  export let size = '24';
  export let hideMobile = false;
  export let buttonSize: string | undefined = undefined;
  /**
   * viewBox attribute for the SVG icon.
   */
  export let viewBox: string | undefined = undefined;

  /**
   * Override the default styling of the button for specific use cases, such as the icon color.
   */
  let className = '';
  export { className as class };

  const colorClasses: Record<Color, string> = {
    transparent: 'bg-transparent hover:bg-[#d3d3d3] dark:text-immich-dark-fg',
    opaque: 'bg-transparent hover:bg-immich-bg/30 text-white hover:dark:text-white',
    light: 'bg-white hover:bg-[#d3d3d3]',
    dark: 'bg-[#202123] hover:bg-[#d3d3d3]',
    alert: 'text-[#ff0000] hover:text-white',
    gray: 'bg-[#d3d3d3] hover:bg-[#e2e7e9] text-immich-dark-gray hover:text-black',
    primary:
      'bg-immich-primary dark:bg-immich-dark-primary hover:bg-immich-primary/75 hover:dark:bg-immich-dark-primary/80 text-white dark:text-immich-dark-gray',
  };

  const paddingClasses: Record<Padding, string> = {
    '1': 'p-1',
    '2': 'p-2',
    '3': 'p-3',
  };

  $: colorClass = colorClasses[color];
  $: mobileClass = hideMobile ? 'hidden sm:flex' : '';
  $: paddingClass = paddingClasses[padding];
  $: recalculatePosition(title);

  const id = $$restProps.id ?? generateId();

  let popover: HTMLElement;
  let element: HTMLElement;
  let top = 0;
  let left = 0;
  let showPopover = false;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const togglePopover = (show: boolean) => {
    if (!show) {
      clearTimeout(timeoutId);
      setHoverMode(false);
      showPopover = false;
      return;
    }
    if (getHoverMode()) {
      onShowPopover();
    } else {
      timeoutId = setTimeout(onShowPopover, hoverDelay);
    }
  };

  const onShowPopover = () => {
    const box = element.getBoundingClientRect();
    top = box.top + box.height + 5;
    left = box.left;
    showPopover = true;
    setHoverMode(true);
    $activePopoverId = id;
    void tick().then(() => {
      const offsetWidth = popover?.offsetWidth ?? 10;
      const spaceBelow = (window.visualViewport?.height ?? window.innerHeight) - box.top - box.height;
      if (spaceBelow < popover.offsetHeight) {
        top = box.top - popover.offsetHeight - 5;
      }
      left = box.left + box.width / 2 - offsetWidth / 2;
    });
  };

  const recalculatePosition = (title: string) => {
    if (showPopover && title) {
      onShowPopover();
    }
  };
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svelte:element
  this={href ? 'a' : 'button'}
  bind:this={element}
  type={href ? undefined : type}
  {href}
  {id}
  style:width={buttonSize ? buttonSize + 'px' : ''}
  style:height={buttonSize ? buttonSize + 'px' : ''}
  class="flex place-content-center place-items-center rounded-full select-none {colorClass} {paddingClass} transition-all disabled:cursor-default hover:dark:text-immich-dark-gray {className} {mobileClass}"
  aria-label={title}
  on:mouseenter={() => togglePopover(true)}
  on:mouseleave={() => togglePopover(false)}
  on:touchstart={() => togglePopover(true)}
  on:touchend={() => togglePopover(false)}
  on:focus={() => {
    if (!element.matches(':focus-visible')) {
      return;
    }
    togglePopover(true);
  }}
  on:blur={() => togglePopover(false)}
  on:click
  {...$$restProps}
>
  <Icon path={icon} {size} ariaHidden {viewBox} color="currentColor" />
</svelte:element>
{#if showPopover && $activePopoverId === id}
  <div
    in:scale={{ duration: 150, opacity: 0, start: 0.9 }}
    out:scale={{ duration: 150, opacity: 0, start: 0.9 }}
    class="fixed inset-[unset] rounded-md border bg-gray-500 p-2 text-[12px] text-gray-100 shadow-md dark:bg-immich-dark-gray"
    style:top={top + 'px'}
    style:left={left + 'px'}
    bind:this={popover}
  >
    {title}
  </div>
{/if}
