import React, { useEffect, useRef } from "react";
import { useMouseActions } from "../../hooks/useMouseActions/useMouseActions";

// export const MomentumCanvas: React.FC = () => {
export const TestPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Position, zoom scale, and drag references to avoid re-render lag
  const offset = useRef({ x: 0, y: 0 });
  const dragStartOffset = useRef({ x: 0, y: 0 });
  const scale = useRef(1);

  // High-performance canvas render loop
  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = 1000;
    const height = 700;

    // Handle high-DPI scaling
    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    // Translate and scale relative to user gestures
    ctx.translate(offset.current.x, offset.current.y);
    ctx.scale(scale.current, scale.current);

    // Render interactive canvas content
    ctx.fillStyle = "#0070f3";
    ctx.fillRect(150, 150, 200, 200);

    ctx.fillStyle = "#ffffff";
    ctx.font = "16px sans-serif";
    ctx.fillText("Interactive Canvas", 175, 255);

    ctx.restore();
  };

  useEffect(() => {
    draw();
  }, []);

  useMouseActions<HTMLCanvasElement>({
    ref: canvasRef,
    enableInertia: true,
    friction: 0.94,

    onDragStart: () => {
      dragStartOffset.current = { ...offset.current };
    },

    onDrag: ({ deltaX, deltaY }) => {
      offset.current = {
        x: dragStartOffset.current.x + deltaX,
        y: dragStartOffset.current.y + deltaY,
      };
      draw();
    },

    onInertia: ({ velocityX, velocityY }) => {
      offset.current = {
        x: offset.current.x + velocityX * 16.6,
        y: offset.current.y + velocityY * 16.6,
      };
      draw();
    },

    onWheel: ({ deltaY, isPinch }) => {
      const zoomFactor = isPinch ? 0.02 : 0.005;
      scale.current = Math.min(
        Math.max(0.1, scale.current - deltaY * zoomFactor),
        10
      );
      draw();
    },

    onPinchZoom: ({ deltaDistance }) => {
      scale.current = Math.min(
        Math.max(0.1, scale.current + deltaDistance * 0.01),
        10
      );
      draw();
    },

    preventGestureDefault: true,
  });

  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
      <canvas
        ref={canvasRef}
        style={{
          width: "1000px",
          height: "700px",
          touchAction: "none", // Stops native browser scrolling/swiping on touch devices
          background: "#fafafa",
          border: "1px solid #ccc",
          cursor: "grab",
        }}
      />
    </div>
  );
};

// export default MomentumCanvas;
export default TestPage;