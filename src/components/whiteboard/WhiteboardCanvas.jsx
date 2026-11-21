import React, { useRef, useEffect, useState, useCallback } from 'react';

export const WhiteboardCanvas = ({
  elements,
  onChangeElements,
  activeTool,
  strokeColor,
  strokeWidth,
  backgroundType = 'grid',
  zoom = 1,
  panOffset = { x: 0, y: 0 },
  onPanChange,
  isStudentViewOnly = false,
  laserPointerActive = false,
  onLaserMove,
  remoteLaser = null,
  canvasRef
}) => {
  const internalCanvasRef = useRef(null);
  const activeCanvas = canvasRef || internalCanvasRef;
  const overlayCanvasRef = useRef(null);

  // Drawing state
  const isDrawing = useRef(false);
  const currentPoints = useRef([]);
  const dragStart = useRef(null);
  const isPanning = useRef(false);
  const panStart = useRef({ x: 0, y: 0 });
  const isSpacePressed = useRef(false);

  // Laser pointer trails
  const laserTrail = useRef([]);
  const laserAnimFrame = useRef(null);

  // Inline text input state
  const [textInputPos, setTextInputPos] = useState(null);
  const [textInputValue, setTextInputValue] = useState('');

  // Selected element for move/delete
  const [selectedElementId, setSelectedElementId] = useState(null);
  const isMovingElement = useRef(false);
  const moveOffset = useRef({ x: 0, y: 0 });

  // Coordinate conversion: Screen client coordinates -> Whiteboard Virtual Canvas coordinates
  const getCanvasCoords = useCallback(
    (e) => {
      const canvas = activeCanvas.current;
      if (!canvas) return { x: 0, y: 0 };
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0]?.clientY) || 0;

      return {
        x: (clientX - rect.left - panOffset.x) / zoom,
        y: (clientY - rect.top - panOffset.y) / zoom
      };
    },
    [activeCanvas, panOffset, zoom]
  );

  // Setup High-DPI canvas resolution
  useEffect(() => {
    const handleResize = () => {
      const canvas = activeCanvas.current;
      const overlay = overlayCanvasRef.current;
      if (!canvas) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const width = rect.width || window.innerWidth;
      const height = rect.height || window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      if (overlay) {
        overlay.width = width * dpr;
        overlay.height = height * dpr;
      }

      drawScene();
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [elements, backgroundType, zoom, panOffset, selectedElementId]);

  // Space key detection for Panning
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && !e.repeat && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        isSpacePressed.current = true;
      }
    };
    const handleKeyUp = (e) => {
      if (e.code === 'Space') {
        isSpacePressed.current = false;
        isPanning.current = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Main Render Loop
  const drawScene = useCallback(() => {
    const canvas = activeCanvas.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply scale and transform
    ctx.scale(dpr, dpr);

    // Render Background Pattern
    renderBackground(ctx, canvas.width / dpr, canvas.height / dpr);

    // Apply Pan and Zoom to elements
    ctx.translate(panOffset.x, panOffset.y);
    ctx.scale(zoom, zoom);

    // Render all elements
    elements.forEach((el) => {
      drawElement(ctx, el, el.id === selectedElementId);
    });

    ctx.restore();
  }, [elements, backgroundType, zoom, panOffset, selectedElementId]);

  // Draw Background Patterns
  const renderBackground = (ctx, width, height) => {
    ctx.save();
    const isDark = backgroundType === 'cyber';
    ctx.fillStyle = isDark ? '#050714' : '#ffffff';
    ctx.fillRect(0, 0, width, height);

    const step = 28 * zoom;
    const offsetX = panOffset.x % step;
    const offsetY = panOffset.y % step;

    if (backgroundType === 'grid') {
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = offsetX; x < width; x += step) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = offsetY; y < height; y += step) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
    } else if (backgroundType === 'dots') {
      ctx.fillStyle = '#cbd5e1';
      for (let x = offsetX; x < width; x += step) {
        for (let y = offsetY; y < height; y += step) {
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    } else if (backgroundType === 'ruled') {
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let y = offsetY; y < height; y += step) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Red/Purple margin guide line
      const marginX = 80 * zoom + panOffset.x;
      if (marginX > 0 && marginX < width) {
        ctx.strokeStyle = '#f43f5e33';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(marginX, 0);
        ctx.lineTo(marginX, height);
        ctx.stroke();
      }
    } else if (backgroundType === 'cyber') {
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.12)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = offsetX; x < width; x += step) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = offsetY; y < height; y += step) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
    }
    ctx.restore();
  };

  // Draw Individual Element
  const drawElement = (ctx, el, isSelected = false) => {
    ctx.save();

    if (el.type === 'pen' || el.type === 'highlighter') {
      if (!el.points || el.points.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(el.points[0].x, el.points[0].y);

      for (let i = 1; i < el.points.length; i++) {
        ctx.lineTo(el.points[i].x, el.points[i].y);
      }

      ctx.strokeStyle = el.color || '#000000';
      ctx.lineWidth = el.width || 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      if (el.type === 'highlighter') {
        ctx.globalAlpha = 0.35;
        ctx.lineWidth = (el.width || 12) * 2;
      }
      ctx.stroke();
    } else if (el.type === 'line') {
      ctx.beginPath();
      ctx.moveTo(el.startX, el.startY);
      ctx.lineTo(el.endX, el.endY);
      ctx.strokeStyle = el.color || '#000000';
      ctx.lineWidth = el.width || 3;
      ctx.lineCap = 'round';
      ctx.stroke();
    } else if (el.type === 'arrow') {
      ctx.beginPath();
      ctx.moveTo(el.startX, el.startY);
      ctx.lineTo(el.endX, el.endY);
      ctx.strokeStyle = el.color || '#000000';
      ctx.lineWidth = el.width || 3;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Arrowhead
      const angle = Math.atan2(el.endY - el.startY, el.endX - el.startX);
      const headLength = 16;
      ctx.beginPath();
      ctx.moveTo(el.endX, el.endY);
      ctx.lineTo(
        el.endX - headLength * Math.cos(angle - Math.PI / 6),
        el.endY - headLength * Math.sin(angle - Math.PI / 6)
      );
      ctx.moveTo(el.endX, el.endY);
      ctx.lineTo(
        el.endX - headLength * Math.cos(angle + Math.PI / 6),
        el.endY - headLength * Math.sin(angle + Math.PI / 6)
      );
      ctx.stroke();
    } else if (el.type === 'rectangle') {
      const x = Math.min(el.startX, el.endX);
      const y = Math.min(el.startY, el.endY);
      const w = Math.abs(el.endX - el.startX);
      const h = Math.abs(el.endY - el.startY);

      if (el.fill && el.fill !== 'transparent') {
        ctx.fillStyle = el.fill;
        ctx.fillRect(x, y, w, h);
      }
      ctx.strokeStyle = el.color || '#000000';
      ctx.lineWidth = el.width || 3;
      ctx.strokeRect(x, y, w, h);
    } else if (el.type === 'circle') {
      const radiusX = Math.abs(el.endX - el.startX) / 2;
      const radiusY = Math.abs(el.endY - el.startY) / 2;
      const centerX = Math.min(el.startX, el.endX) + radiusX;
      const centerY = Math.min(el.startY, el.endY) + radiusY;

      ctx.beginPath();
      ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
      if (el.fill && el.fill !== 'transparent') {
        ctx.fillStyle = el.fill;
        ctx.fill();
      }
      ctx.strokeStyle = el.color || '#000000';
      ctx.lineWidth = el.width || 3;
      ctx.stroke();
    } else if (el.type === 'text') {
      ctx.font = `${el.fontSize || 18}px ${el.fontFamily || 'Plus Jakarta Sans, sans-serif'}`;
      ctx.fillStyle = el.color || '#000000';
      ctx.fillText(el.text, el.x, el.y);
    } else if (el.type === 'coordinate_axes') {
      // Draw Cartesian axes
      const cx = el.centerX;
      const cy = el.centerY;
      const s = el.size || 240;

      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2;

      // X Axis
      ctx.beginPath();
      ctx.moveTo(cx - s, cy);
      ctx.lineTo(cx + s, cy);
      // X Arrow
      ctx.lineTo(cx + s - 10, cy - 6);
      ctx.moveTo(cx + s, cy);
      ctx.lineTo(cx + s - 10, cy + 6);
      ctx.stroke();

      // Y Axis
      ctx.beginPath();
      ctx.moveTo(cx, cy + s);
      ctx.lineTo(cx, cy - s);
      // Y Arrow
      ctx.lineTo(cx - 6, cy - s + 10);
      ctx.moveTo(cx, cy - s);
      ctx.lineTo(cx + 6, cy - s + 10);
      ctx.stroke();

      // Labels
      ctx.fillStyle = '#06b6d4';
      ctx.font = '12px JetBrains Mono';
      ctx.fillText('X', cx + s - 14, cy + 20);
      ctx.fillText('Y', cx + 12, cy - s + 14);
      ctx.fillText('(0,0)', cx + 6, cy + 16);
    }

    // Selection Bounding Box
    if (isSelected) {
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      const bounds = getElementBounds(el);
      ctx.strokeRect(bounds.x - 4, bounds.y - 4, bounds.w + 8, bounds.h + 8);
    }

    ctx.restore();
  };

  // Get Element Bounding Box for Hit Testing
  const getElementBounds = (el) => {
    if (el.startX !== undefined && el.endX !== undefined) {
      return {
        x: Math.min(el.startX, el.endX),
        y: Math.min(el.startY, el.endY),
        w: Math.max(10, Math.abs(el.endX - el.startX)),
        h: Math.max(10, Math.abs(el.endY - el.startY))
      };
    }
    if (el.points && el.points.length > 0) {
      let minX = Infinity,
        minY = Infinity,
        maxX = -Infinity,
        maxY = -Infinity;
      el.points.forEach((p) => {
        minX = Math.min(minX, p.x);
        minY = Math.min(minY, p.y);
        maxX = Math.max(maxX, p.x);
        maxY = Math.max(maxY, p.y);
      });
      return { x: minX, y: minY, w: maxX - minX || 10, h: maxY - minY || 10 };
    }
    if (el.type === 'text') {
      return { x: el.x, y: el.y - (el.fontSize || 18), w: (el.text.length * (el.fontSize || 18)) * 0.6, h: (el.fontSize || 18) * 1.3 };
    }
    if (el.type === 'coordinate_axes') {
      return { x: el.centerX - el.size, y: el.centerY - el.size, w: el.size * 2, h: el.size * 2 };
    }
    return { x: 0, y: 0, w: 20, h: 20 };
  };

  // Hit test for selection
  const hitTest = (pos) => {
    for (let i = elements.length - 1; i >= 0; i--) {
      const el = elements[i];
      const bounds = getElementBounds(el);
      if (
        pos.x >= bounds.x - 10 &&
        pos.x <= bounds.x + bounds.w + 10 &&
        pos.y >= bounds.y - 10 &&
        pos.y <= bounds.y + bounds.h + 10
      ) {
        return el;
      }
    }
    return null;
  };

  // Laser Pointer Animation Loop
  useEffect(() => {
    const overlay = overlayCanvasRef.current;
    if (!overlay) return;
    const ctx = overlay.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const animateLaser = () => {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, overlay.width, overlay.height);
      ctx.scale(dpr, dpr);

      const now = Date.now();
      // Filter out points older than 700ms
      laserTrail.current = laserTrail.current.filter((p) => now - p.time < 700);

      // Render decaying laser trail
      if (laserTrail.current.length > 1) {
        ctx.save();
        ctx.translate(panOffset.x, panOffset.y);
        ctx.scale(zoom, zoom);

        for (let i = 1; i < laserTrail.current.length; i++) {
          const p1 = laserTrail.current[i - 1];
          const p2 = laserTrail.current[i];
          const age = now - p2.time;
          const alpha = 1 - age / 700;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(244, 63, 94, ${alpha * 0.8})`;
          ctx.lineWidth = 5 * alpha;
          ctx.lineCap = 'round';
          ctx.shadowColor = '#f43f5e';
          ctx.shadowBlur = 10;
          ctx.stroke();
        }

        // Glowing red dot at head
        const head = laserTrail.current[laserTrail.current.length - 1];
        ctx.beginPath();
        ctx.arc(head.x, head.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#f43f5e';
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.restore();
      }

      // Render remote laser if active
      if (remoteLaser && remoteLaser.active) {
        ctx.save();
        ctx.translate(panOffset.x, panOffset.y);
        ctx.scale(zoom, zoom);

        ctx.beginPath();
        ctx.arc(remoteLaser.x, remoteLaser.y, 7, 0, Math.PI * 2);
        ctx.fillStyle = '#06b6d4';
        ctx.shadowColor = '#06b6d4';
        ctx.shadowBlur = 15;
        ctx.fill();

        // Remote user tag
        ctx.font = '11px Plus Jakarta Sans';
        ctx.fillStyle = '#06b6d4';
        ctx.fillText(remoteLaser.userName || 'Teacher', remoteLaser.x + 12, remoteLaser.y - 4);
        ctx.restore();
      }

      ctx.restore();
      laserAnimFrame.current = requestAnimationFrame(animateLaser);
    };

    laserAnimFrame.current = requestAnimationFrame(animateLaser);
    return () => cancelAnimationFrame(laserAnimFrame.current);
  }, [panOffset, zoom, remoteLaser]);

  // Pointer Down
  const handlePointerDown = (e) => {
    // If panning via Space or middle click
    if (isSpacePressed.current || e.button === 1 || activeTool === 'pan') {
      isPanning.current = true;
      panStart.current = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y };
      return;
    }

    if (isStudentViewOnly) return;

    const pos = getCanvasCoords(e);

    // Laser Tool
    if (activeTool === 'laser') {
      isDrawing.current = true;
      laserTrail.current.push({ x: pos.x, y: pos.y, time: Date.now() });
      onLaserMove && onLaserMove(pos.x, pos.y, true);
      return;
    }

    // Select Tool
    if (activeTool === 'select') {
      const hit = hitTest(pos);
      if (hit) {
        setSelectedElementId(hit.id);
        isMovingElement.current = true;
        dragStart.current = pos;
        const bounds = getElementBounds(hit);
        moveOffset.current = { x: pos.x - bounds.x, y: pos.y - bounds.y };
      } else {
        setSelectedElementId(null);
      }
      return;
    }

    // Text Tool Click
    if (activeTool === 'text') {
      setTextInputPos(pos);
      setTextInputValue('');
      return;
    }

    // Eraser Tool
    if (activeTool === 'eraser') {
      isDrawing.current = true;
      eraseAtPosition(pos);
      return;
    }

    // Drawing Tools
    isDrawing.current = true;
    dragStart.current = pos;

    if (activeTool === 'pen' || activeTool === 'highlighter') {
      currentPoints.current = [pos];
    }
  };

  // Pointer Move
  const handlePointerMove = (e) => {
    if (isPanning.current) {
      onPanChange({
        x: e.clientX - panStart.current.x,
        y: e.clientY - panStart.current.y
      });
      return;
    }

    const pos = getCanvasCoords(e);

    // Laser Pointer
    if (activeTool === 'laser' && isDrawing.current) {
      laserTrail.current.push({ x: pos.x, y: pos.y, time: Date.now() });
      onLaserMove && onLaserMove(pos.x, pos.y, true);
      return;
    }

    if (!isDrawing.current && !isMovingElement.current) return;

    // Moving Selected Element
    if (isMovingElement.current && selectedElementId) {
      const dx = pos.x - dragStart.current.x;
      const dy = pos.y - dragStart.current.y;
      dragStart.current = pos;

      onChangeElements((prev) =>
        prev.map((el) => {
          if (el.id !== selectedElementId) return el;
          if (el.startX !== undefined) {
            return {
              ...el,
              startX: el.startX + dx,
              startY: el.startY + dy,
              endX: el.endX + dx,
              endY: el.endY + dy
            };
          }
          if (el.x !== undefined) {
            return { ...el, x: el.x + dx, y: el.y + dy };
          }
          if (el.points) {
            return {
              ...el,
              points: el.points.map((p) => ({ x: p.x + dx, y: p.y + dy }))
            };
          }
          return el;
        })
      );
      return;
    }

    // Eraser drag
    if (activeTool === 'eraser') {
      eraseAtPosition(pos);
      return;
    }

    // Pen / Highlighter Drag
    if (activeTool === 'pen' || activeTool === 'highlighter') {
      currentPoints.current.push(pos);

      // Realtime canvas stroke update
      const canvas = activeCanvas.current;
      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;

      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      ctx.translate(panOffset.x, panOffset.y);
      ctx.scale(zoom, zoom);

      ctx.beginPath();
      const pts = currentPoints.current;
      if (pts.length >= 2) {
        ctx.moveTo(pts[pts.length - 2].x, pts[pts.length - 2].y);
        ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
      }
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = activeTool === 'highlighter' ? strokeWidth * 2 : strokeWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      if (activeTool === 'highlighter') ctx.globalAlpha = 0.35;
      ctx.stroke();
      ctx.restore();
      return;
    }

    // Shape Live Preview
    if (['line', 'arrow', 'rectangle', 'circle'].includes(activeTool)) {
      drawScene();
      const canvas = activeCanvas.current;
      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;

      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      ctx.translate(panOffset.x, panOffset.y);
      ctx.scale(zoom, zoom);

      drawElement(ctx, {
        type: activeTool,
        startX: dragStart.current.x,
        startY: dragStart.current.y,
        endX: pos.x,
        endY: pos.y,
        color: strokeColor,
        width: strokeWidth
      });

      ctx.restore();
    }
  };

  // Pointer Up
  const handlePointerUp = (e) => {
    if (isPanning.current) {
      isPanning.current = false;
      return;
    }

    if (!isDrawing.current && !isMovingElement.current) return;
    const pos = getCanvasCoords(e);

    // Laser finish
    if (activeTool === 'laser') {
      isDrawing.current = false;
      onLaserMove && onLaserMove(pos.x, pos.y, false);
      return;
    }

    if (isMovingElement.current) {
      isMovingElement.current = false;
      drawScene();
      return;
    }

    isDrawing.current = false;

    // Commit Pen / Highlighter
    if (activeTool === 'pen' || activeTool === 'highlighter') {
      if (currentPoints.current.length > 1) {
        const newEl = {
          id: `el-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          type: activeTool,
          points: [...currentPoints.current],
          color: strokeColor,
          width: strokeWidth
        };
        onChangeElements((prev) => [...prev, newEl]);
      }
      currentPoints.current = [];
      return;
    }

    // Commit Shapes
    if (['line', 'arrow', 'rectangle', 'circle'].includes(activeTool)) {
      const newEl = {
        id: `el-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        type: activeTool,
        startX: dragStart.current.x,
        startY: dragStart.current.y,
        endX: pos.x,
        endY: pos.y,
        color: strokeColor,
        width: strokeWidth
      };
      onChangeElements((prev) => [...prev, newEl]);
    }
  };

  // Erase intersecting element
  const eraseAtPosition = (pos) => {
    const hit = hitTest(pos);
    if (hit) {
      onChangeElements((prev) => prev.filter((el) => el.id !== hit.id));
      if (selectedElementId === hit.id) setSelectedElementId(null);
    }
  };

  // Submit Inline Text
  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (!textInputValue.trim() || !textInputPos) {
      setTextInputPos(null);
      return;
    }

    const newEl = {
      id: `el-${Date.now()}`,
      type: 'text',
      x: textInputPos.x,
      y: textInputPos.y,
      text: textInputValue,
      color: strokeColor,
      fontSize: Math.max(16, strokeWidth * 3.5),
      fontFamily: 'Plus Jakarta Sans'
    };

    onChangeElements((prev) => [...prev, newEl]);
    setTextInputPos(null);
    setTextInputValue('');
  };

  // Redraw when elements or transforms change
  useEffect(() => {
    drawScene();
  }, [drawScene]);

  // Keyboard Delete Selected Element
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedElementId) {
        if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
          onChangeElements((prev) => prev.filter((el) => el.id !== selectedElementId));
          setSelectedElementId(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedElementId, onChangeElements]);

  return (
    <div className="relative w-full h-full overflow-hidden select-none bg-[#050713]">
      {/* Primary Whiteboard Canvas */}
      <canvas
        ref={activeCanvas}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="absolute inset-0 w-full h-full touch-none"
        style={{
          cursor: isSpacePressed.current
            ? 'grab'
            : activeTool === 'laser'
            ? 'crosshair'
            : activeTool === 'select'
            ? 'default'
            : activeTool === 'eraser'
            ? 'cell'
            : 'crosshair'
        }}
      />

      {/* Transparent Overlay Canvas for Laser Pointer & Transients */}
      <canvas
        ref={overlayCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none touch-none"
      />

      {/* Inline Text Tool Popover */}
      {textInputPos && (
        <form
          onSubmit={handleTextSubmit}
          style={{
            position: 'absolute',
            left: textInputPos.x * zoom + panOffset.x,
            top: textInputPos.y * zoom + panOffset.y,
            zIndex: 40
          }}
          className="animate-in fade-in zoom-in-95"
        >
          <input
            type="text"
            autoFocus
            value={textInputValue}
            onChange={(e) => setTextInputValue(e.target.value)}
            onBlur={handleTextSubmit}
            placeholder="Type text note..."
            className="px-3 py-1.5 rounded-lg bg-slate-900/95 border border-cyan-400 text-sm text-white font-sans shadow-2xl focus:outline-none"
            style={{ color: strokeColor }}
          />
        </form>
      )}
    </div>
  );
};
