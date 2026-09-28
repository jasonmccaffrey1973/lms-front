import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import type {
  MouseActionOptions,
  DragPayload,
  PinchZoomPayload,
} from "./useMouseActions.types";

export const useMouseActions = <T extends HTMLElement = HTMLDivElement>({
  ref: externalRef,
  onClick,
  onDoubleClick,
  onRightClick,
  onLongPress,
  onPointerEnter,
  onPointerLeave,
  onPointerMove,
  onClickOutside,
  onDragStart,
  onDrag,
  onDragEnd,
  onWheel,
  onPinchZoom,
  enableInertia = false,
  friction = 0.95,
  minVelocity = 0.01,
  onInertia,
  onInertiaEnd,
  longPressDelay = 500,
  preventGestureDefault = true,
}: MouseActionOptions<T> = {}): RefObject<T | null> => {
  const internalRef = useRef<T | null>(null);
  const targetRef = externalRef || internalRef;

  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isDragging = useRef<boolean>(false);
  const dragStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const activePointerId = useRef<number | null>(null);

  // Velocity Tracking History
  const positionHistory = useRef<{ x: number; y: number; time: number }[]>([]);

  // Physics Animation Handles
  const inertiaRafId = useRef<number | null>(null);
  const currentVelocity = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // rAF Batching Handles
  const dragRafId = useRef<number | null>(null);
  const pendingDragPayload = useRef<DragPayload | null>(null);

  const moveRafId = useRef<number | null>(null);
  const pendingMoveEvent = useRef<PointerEvent | null>(null);

  const pinchRafId = useRef<number | null>(null);
  const pendingPinchPayload = useRef<PinchZoomPayload | null>(null);

  // Pinch Tracking
  const initialPinchDist = useRef<number | null>(null);
  const lastPinchDist = useRef<number | null>(null);

  const callbacks = useRef({
    onClick,
    onDoubleClick,
    onRightClick,
    onLongPress,
    onPointerEnter,
    onPointerLeave,
    onPointerMove,
    onClickOutside,
    onDragStart,
    onDrag,
    onDragEnd,
    onWheel,
    onPinchZoom,
    onInertia,
    onInertiaEnd,
  });

  useEffect(() => {
    callbacks.current = {
      onClick,
      onDoubleClick,
      onRightClick,
      onLongPress,
      onPointerEnter,
      onPointerLeave,
      onPointerMove,
      onClickOutside,
      onDragStart,
      onDrag,
      onDragEnd,
      onWheel,
      onPinchZoom,
      onInertia,
      onInertiaEnd,
    };
  });

  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    // --- Cleanup Helpers ---
    const cancelInertia = () => {
      if (inertiaRafId.current !== null) {
        cancelAnimationFrame(inertiaRafId.current);
        inertiaRafId.current = null;
      }
    };

    const cancelLongPress = () => {
      if (pressTimer.current) {
        clearTimeout(pressTimer.current);
        pressTimer.current = null;
      }
    };

    const cancelAllRafs = () => {
      if (dragRafId.current !== null) {
        cancelAnimationFrame(dragRafId.current);
        dragRafId.current = null;
      }
      if (moveRafId.current !== null) {
        cancelAnimationFrame(moveRafId.current);
        moveRafId.current = null;
      }
      if (pinchRafId.current !== null) {
        cancelAnimationFrame(pinchRafId.current);
        pinchRafId.current = null;
      }
    };

    // --- Geometry Helpers ---
    const getTouchDistance = (e: TouchEvent): number => {
      if (e.touches.length < 2) return 0;
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      return Math.hypot(dx, dy);
    };

    const getTouchCenter = (e: TouchEvent): { x: number; y: number } => {
      if (e.touches.length < 2) return { x: 0, y: 0 };
      return {
        x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
        y: (e.touches[0].clientY + e.touches[1].clientY) / 2,
      };
    };

    const calculateVelocity = (): { vx: number; vy: number } => {
      const now = performance.now();
      const recent = positionHistory.current.filter((p) => now - p.time < 100);

      if (recent.length < 2) return { vx: 0, vy: 0 };

      const oldest = recent[0];
      const newest = recent[recent.length - 1];
      const dt = newest.time - oldest.time;

      if (dt <= 0) return { vx: 0, vy: 0 };

      return {
        vx: (newest.x - oldest.x) / dt,
        vy: (newest.y - oldest.y) / dt,
      };
    };

    // --- Inertia Loop ---
    const startInertiaLoop = (initialPos: { x: number; y: number }) => {
      let currentX = initialPos.x;
      let currentY = initialPos.y;
      let lastFrameTime = performance.now();

      const step = (now: number) => {
        const dt = now - lastFrameTime;
        lastFrameTime = now;

        currentVelocity.current.x *= Math.pow(friction, dt / 16.6);
        currentVelocity.current.y *= Math.pow(friction, dt / 16.6);

        const vx = currentVelocity.current.x;
        const vy = currentVelocity.current.y;
        const speed = Math.hypot(vx, vy);

        if (speed < minVelocity) {
          cancelInertia();
          callbacks.current.onInertiaEnd?.();
          return;
        }

        currentX += vx * dt;
        currentY += vy * dt;

        callbacks.current.onInertia?.({
          x: currentX,
          y: currentY,
          velocityX: vx,
          velocityY: vy,
        });

        inertiaRafId.current = requestAnimationFrame(step);
      };

      inertiaRafId.current = requestAnimationFrame(step);
    };

    // --- Pointer Handlers ---
    const handlePointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;

      cancelInertia();
      cancelLongPress();

      activePointerId.current = e.pointerId;
      positionHistory.current = [
        { x: e.clientX, y: e.clientY, time: performance.now() },
      ];

      if (callbacks.current.onLongPress) {
        pressTimer.current = setTimeout(() => {
          callbacks.current.onLongPress?.(e);
        }, longPressDelay);
      }

      if (
        callbacks.current.onDragStart ||
        callbacks.current.onDrag ||
        callbacks.current.onDragEnd
      ) {
        isDragging.current = true;
        dragStartPos.current = { x: e.clientX, y: e.clientY };

        try {
          element.setPointerCapture(e.pointerId);
        } catch {
          console.error("Failed to set pointer capture");
        }

        callbacks.current.onDragStart?.({
          event: e,
          startX: e.clientX,
          startY: e.clientY,
        });
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (pressTimer.current && isDragging.current) {
        const moveDist = Math.hypot(
          e.clientX - dragStartPos.current.x,
          e.clientY - dragStartPos.current.y
        );
        if (moveDist > 10) cancelLongPress();
      }

      if (isDragging.current && e.pointerId === activePointerId.current) {
        const now = performance.now();
        positionHistory.current.push({ x: e.clientX, y: e.clientY, time: now });
        if (positionHistory.current.length > 20) {
          positionHistory.current.shift();
        }

        pendingDragPayload.current = {
          event: e,
          x: e.clientX,
          y: e.clientY,
          deltaX: e.clientX - dragStartPos.current.x,
          deltaY: e.clientY - dragStartPos.current.y,
        };

        if (dragRafId.current === null) {
          dragRafId.current = requestAnimationFrame(() => {
            if (pendingDragPayload.current && callbacks.current.onDrag) {
              callbacks.current.onDrag(pendingDragPayload.current);
            }
            dragRafId.current = null;
          });
        }
      } else if (callbacks.current.onPointerMove) {
        pendingMoveEvent.current = e;

        if (moveRafId.current === null) {
          moveRafId.current = requestAnimationFrame(() => {
            if (pendingMoveEvent.current && callbacks.current.onPointerMove) {
              callbacks.current.onPointerMove(pendingMoveEvent.current);
            }
            moveRafId.current = null;
          });
        }
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      cancelLongPress();

      if (isDragging.current && e.pointerId === activePointerId.current) {
        isDragging.current = false;
        activePointerId.current = null;

        if (dragRafId.current !== null) {
          cancelAnimationFrame(dragRafId.current);
          dragRafId.current = null;
        }

        try {
          element.releasePointerCapture(e.pointerId);
        } catch {
          console.error("Failed to release pointer capture");
        }

        callbacks.current.onDragEnd?.({
          event: e,
          x: e.clientX,
          y: e.clientY,
          deltaX: e.clientX - dragStartPos.current.x,
          deltaY: e.clientY - dragStartPos.current.y,
        });

        if (enableInertia) {
          const { vx, vy } = calculateVelocity();
          currentVelocity.current = { x: vx, y: vy };

          if (Math.hypot(vx, vy) >= minVelocity) {
            startInertiaLoop({ x: e.clientX, y: e.clientY });
          }
        }
      }
    };

    const handlePointerCancel = () => {
      cancelLongPress();
      cancelAllRafs();
      cancelInertia();
      if (isDragging.current) {
        isDragging.current = false;
        activePointerId.current = null;
      }
    };

    const handlePointerLeave = (e: PointerEvent) => {
      cancelLongPress();
      callbacks.current.onPointerLeave?.(e);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) {
        initialPinchDist.current = null;
        lastPinchDist.current = null;
        if (pinchRafId.current !== null) {
          cancelAnimationFrame(pinchRafId.current);
          pinchRafId.current = null;
        }
      }
    };

    const handleClick = (e: MouseEvent) => {
      callbacks.current.onClick?.(e as unknown as PointerEvent);
    };

    const handleDoubleClick = (e: MouseEvent) => {
      callbacks.current.onDoubleClick?.(e as unknown as PointerEvent);
    };

    const handleContextMenu = (e: MouseEvent) => {
      if (callbacks.current.onRightClick) {
        e.preventDefault();
        callbacks.current.onRightClick(e as unknown as PointerEvent);
      }
    };

    const handlePointerEnter = (e: PointerEvent) =>
      callbacks.current.onPointerEnter?.(e);

    // --- Wheel & Touch Pinch Handlers ---
    const handleWheel = (e: WheelEvent) => {
      if (!callbacks.current.onWheel) return;
      const isPinch = e.ctrlKey;
      if (preventGestureDefault || isPinch) {
        e.preventDefault();
      }
      callbacks.current.onWheel({
        event: e,
        deltaX: e.deltaX,
        deltaY: e.deltaY,
        isPinch,
      });
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2 && callbacks.current.onPinchZoom) {
        cancelLongPress();
        cancelInertia();
        const dist = getTouchDistance(e);
        initialPinchDist.current = dist;
        lastPinchDist.current = dist;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (
        e.touches.length === 2 &&
        initialPinchDist.current !== null &&
        callbacks.current.onPinchZoom
      ) {
        if (preventGestureDefault) e.preventDefault();

        const currentDist = getTouchDistance(e);
        const scale = currentDist / initialPinchDist.current;
        const deltaDistance = currentDist - (lastPinchDist.current ?? currentDist);
        const center = getTouchCenter(e);

        lastPinchDist.current = currentDist;

        pendingPinchPayload.current = {
          event: e,
          scale,
          deltaDistance,
          center,
        };

        if (pinchRafId.current === null) {
          pinchRafId.current = requestAnimationFrame(() => {
            if (pendingPinchPayload.current && callbacks.current.onPinchZoom) {
              callbacks.current.onPinchZoom(pendingPinchPayload.current);
            }
            pinchRafId.current = null;
          });
        }
      }
    };

    // --- Attach Listeners ---
    element.addEventListener("pointerdown", handlePointerDown);
    element.addEventListener("pointermove", handlePointerMove);
    element.addEventListener("pointerup", handlePointerUp);
    element.addEventListener("pointercancel", handlePointerCancel);
    element.addEventListener("pointerenter", handlePointerEnter);
    element.addEventListener("pointerleave", handlePointerLeave);
    element.addEventListener("click", handleClick);
    element.addEventListener("dblclick", handleDoubleClick);
    element.addEventListener("contextmenu", handleContextMenu);

    element.addEventListener("wheel", handleWheel, { passive: false });
    element.addEventListener("touchstart", handleTouchStart);
    element.addEventListener("touchmove", handleTouchMove, { passive: false });
    element.addEventListener("touchend", handleTouchEnd);

    return () => {
      element.removeEventListener("pointerdown", handlePointerDown);
      element.removeEventListener("pointermove", handlePointerMove);
      element.removeEventListener("pointerup", handlePointerUp);
      element.removeEventListener("pointercancel", handlePointerCancel);
      element.removeEventListener("pointerenter", handlePointerEnter);
      element.removeEventListener("pointerleave", handlePointerLeave);
      element.removeEventListener("click", handleClick);
      element.removeEventListener("dblclick", handleDoubleClick);
      element.removeEventListener("contextmenu", handleContextMenu);

      element.removeEventListener("wheel", handleWheel);
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
      element.removeEventListener("touchend", handleTouchEnd);

      cancelLongPress();
      cancelAllRafs();
      cancelInertia();
    };
  }, [
    targetRef,
    enableInertia,
    friction,
    minVelocity,
    longPressDelay,
    preventGestureDefault,
  ]);

  // --- Click Outside Listener ---
  useEffect(() => {
    const handleClickOutside = (event: PointerEvent) => {
      if (
        targetRef.current &&
        !targetRef.current.contains(event.target as Node) &&
        callbacks.current.onClickOutside
      ) {
        callbacks.current.onClickOutside(event);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [targetRef]);

  return targetRef;
};

export default useMouseActions;