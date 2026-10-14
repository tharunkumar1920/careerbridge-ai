import { useEffect, useRef, useCallback } from 'react';

export interface SmoothNavIndicatorOptions {
  restWidth?: number;
  bottomOffset?: number;
}

export function useSmoothNavIndicator(
  activeKey: string,
  options: SmoothNavIndicatorOptions = {}
) {
  const {
    restWidth = 6,
    bottomOffset = 2,
  } = options;

  const navRef = useRef<HTMLElement | null>(null);
  const pillRef = useRef<HTMLSpanElement | null>(null);
  const indicatorRef = useRef<HTMLSpanElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLElement | null>>({});
  const prevCenterRef = useRef<number | null>(null);
  const isInitialMount = useRef<boolean>(true);

  const setItemRef = useCallback((key: string, el: HTMLElement | null) => {
    itemRefs.current[key] = el;
  }, []);

  const getActiveElement = useCallback(() => {
    if (!activeKey) return null;
    if (itemRefs.current[activeKey]) {
      return itemRefs.current[activeKey];
    }
    // Match by longest prefix if direct key match is not found
    const keys = Object.keys(itemRefs.current).filter(Boolean);
    const sortedKeys = keys.sort((a, b) => b.length - a.length);
    for (const key of sortedKeys) {
      if (itemRefs.current[key]) {
        if (activeKey.startsWith(key) || key.startsWith(activeKey)) {
          return itemRefs.current[key];
        }
      }
    }
    return null;
  }, [activeKey]);

  const updatePosition = useCallback((animate = true) => {
    const navEl = navRef.current;
    const dot = indicatorRef.current;
    const pill = pillRef.current;
    const activeEl = getActiveElement();

    if (!navEl || (!dot && !pill)) return;

    if (!activeEl) {
      if (dot) dot.style.opacity = '0';
      if (pill) pill.style.opacity = '0';
      return;
    }

    const navRect = navEl.getBoundingClientRect();
    const activeRect = activeEl.getBoundingClientRect();

    if (activeRect.width === 0 && activeRect.height === 0) {
      return;
    }

    // Active item coordinates relative to nav container
    const itemLeft = Math.round(activeRect.left - navRect.left);
    const itemWidth = Math.round(activeRect.width);
    const itemCenter = itemLeft + itemWidth / 2;

    const dotLeft = Math.round(itemCenter - restWidth / 2);
    const dotRight = Math.round(navRect.width - (itemCenter + restWidth / 2));
    const dotTop = Math.round((activeRect.bottom - navRect.top) - 4 - bottomOffset);

    const pillLeft = itemLeft;
    const pillWidth = itemWidth;
    const pillTop = Math.round(activeRect.top - navRect.top);
    const pillHeight = Math.round(activeRect.height);

    // Initial mount or instant update (e.g. window resize)
    if (!animate || isInitialMount.current || prevCenterRef.current === null) {
      if (pill) {
        pill.style.transition = 'none';
        pill.style.left = `${pillLeft}px`;
        pill.style.width = `${pillWidth}px`;
        pill.style.top = `${pillTop}px`;
        pill.style.height = `${pillHeight}px`;
        pill.style.opacity = '1';
      }
      if (dot) {
        dot.style.transition = 'none';
        dot.style.left = `${dotLeft}px`;
        dot.style.right = `${dotRight}px`;
        dot.style.top = `${dotTop}px`;
        dot.style.opacity = '1';
      }
      prevCenterRef.current = itemCenter;
      isInitialMount.current = false;
      return;
    }

    const distance = itemCenter - prevCenterRef.current;
    if (Math.abs(distance) < 1) {
      if (pill) {
        pill.style.left = `${pillLeft}px`;
        pill.style.width = `${pillWidth}px`;
      }
      if (dot) {
        dot.style.left = `${dotLeft}px`;
        dot.style.right = `${dotRight}px`;
      }
      prevCenterRef.current = itemCenter;
      return;
    }

    // Apply continuous smooth sliding transitions
    if (pill) {
      pill.style.transition = `
        left 0.38s cubic-bezier(0.2, 0.85, 0.25, 1),
        width 0.38s cubic-bezier(0.2, 0.85, 0.25, 1),
        top 0.3s ease,
        height 0.3s ease,
        opacity 0.2s ease
      `;
      pill.style.left = `${pillLeft}px`;
      pill.style.width = `${pillWidth}px`;
      pill.style.top = `${pillTop}px`;
      pill.style.height = `${pillHeight}px`;
      pill.style.opacity = '1';
    }

    if (dot) {
      if (distance > 0) {
        // Moving Right: right edge surges forward first, left edge follows smoothly
        dot.style.transition = `
          right 0.32s cubic-bezier(0.12, 0.9, 0.25, 1),
          left 0.44s cubic-bezier(0.25, 0.1, 0.25, 1),
          top 0.3s ease,
          opacity 0.2s ease
        `;
      } else {
        // Moving Left: left edge surges backward first, right edge follows smoothly
        dot.style.transition = `
          left 0.32s cubic-bezier(0.12, 0.9, 0.25, 1),
          right 0.44s cubic-bezier(0.25, 0.1, 0.25, 1),
          top 0.3s ease,
          opacity 0.2s ease
        `;
      }
      dot.style.left = `${dotLeft}px`;
      dot.style.right = `${dotRight}px`;
      dot.style.top = `${dotTop}px`;
      dot.style.opacity = '1';
    }

    prevCenterRef.current = itemCenter;
  }, [getActiveElement, restWidth, bottomOffset]);

  useEffect(() => {
    updatePosition(true);
  }, [activeKey, updatePosition]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isInitialMount.current) {
        updatePosition(false);
      }
    }, 60);

    const handleResize = () => {
      updatePosition(false);
    };

    window.addEventListener('resize', handleResize);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && navRef.current) {
      resizeObserver = new ResizeObserver(() => {
        if (isInitialMount.current) {
          updatePosition(false);
        }
      });
      resizeObserver.observe(navRef.current);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [updatePosition]);

  return {
    navRef,
    pillRef,
    indicatorRef,
    setItemRef,
    updatePosition,
  };
}
