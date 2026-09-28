import type { RefObject } from "react";

interface DragStartPayload {
  event: PointerEvent;
  startX: number;
  startY: number;
}

interface DragPayload {
  event: PointerEvent;
  x: number;
  y: number;
  deltaX: number;
  deltaY: number;
}

interface DragEndPayload {
  event: PointerEvent;
  x: number;
  y: number;
  deltaX: number;
  deltaY: number;
}

interface WheelPayload {
  event: WheelEvent;
  deltaX: number;
  deltaY: number;
  isPinch: boolean;
}

interface PinchZoomPayload {
  event: TouchEvent;
  scale: number;
  deltaDistance: number;
  center: { x: number; y: number };
}

interface InertiaPayload {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
}

interface MouseActionOptions<T extends HTMLElement = HTMLDivElement> {
  /** Optional external ref to attach event listeners to */
  ref?: RefObject<T | null>;

  // Standard Pointer & Click Callbacks
  onClick?: (event: PointerEvent) => void;
  onDoubleClick?: (event: PointerEvent) => void;
  onRightClick?: (event: PointerEvent) => void;
  onLongPress?: (event: PointerEvent) => void;
  onPointerEnter?: (event: PointerEvent) => void;
  onPointerLeave?: (event: PointerEvent) => void;
  onPointerMove?: (event: PointerEvent) => void;
  onClickOutside?: (event: PointerEvent | MouseEvent) => void;

  // Drag Callbacks
  onDragStart?: (payload: DragStartPayload) => void;
  onDrag?: (payload: DragPayload) => void;
  onDragEnd?: (payload: DragEndPayload) => void;

  // Wheel & Pinch Callbacks
  onWheel?: (payload: WheelPayload) => void;
  onPinchZoom?: (payload: PinchZoomPayload) => void;

  // Inertia & Physics Configuration
  enableInertia?: boolean;
  /** Friction coefficient between 0 and 1. Higher values mean longer slides. Defaults to 0.95. */
  friction?: number;
  /** Minimum velocity threshold below which inertia stops (px/ms). Defaults to 0.01. */
  minVelocity?: number;
  onInertia?: (payload: InertiaPayload) => void;
  onInertiaEnd?: () => void;

  longPressDelay?: number;
  preventGestureDefault?: boolean;
}

export type {
  DragStartPayload,
  DragPayload,
  DragEndPayload,
  WheelPayload,
  PinchZoomPayload,
  InertiaPayload,
  MouseActionOptions,
};