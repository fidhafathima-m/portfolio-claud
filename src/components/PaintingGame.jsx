import { useRef, useState, useEffect, useCallback } from 'react';
import './PaintingGame.css';

const COLORS = [
  { hex: '#c9993a', name: 'Old Gold' },
  { hex: '#8b2635', name: 'Crimson' },
  { hex: '#5a7a5c', name: 'Sage' },
  { hex: '#c4612a', name: 'Rust' },
  { hex: '#3b5fa0', name: 'Cobalt' },
  { hex: '#f0e8d8', name: 'Ivory' },
  { hex: '#7a3b7a', name: 'Violet' },
  { hex: '#2d7d6a', name: 'Teal' },
  { hex: '#d4a853', name: 'Amber' },
  { hex: '#ffffff', name: 'White' },
];

const BRUSHES = [
  { name: 'Fine', size: 3, icon: '✒' },
  { name: 'Round', size: 10, icon: '●' },
  { name: 'Broad', size: 24, icon: '◼' },
  { name: 'Splash', size: 40, icon: '✦' },
];

const PROMPTS = [
  'Paint a sunset over the sea 🌅',
  'Draw a minimalist mountain 🏔',
  'Paint abstract emotions 🎭',
  'Sketch a cozy night sky 🌙',
  'Create a digital garden 🌿',
  "Paint Kerala's monsoon 🌧",
  'Draw the spirit of code 💻',
  'Paint your favourite season 🍂',
];

export default function PaintingGame() {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const isDrawing = useRef(false);
  const lastPos = useRef(null);
  const historyRef = useRef([]);
  const historyIdx = useRef(-1);

  const [color, setColor] = useState(COLORS[0].hex);
  const [brush, setBrush] = useState(BRUSHES[1]);
  const [opacity, setOpacity] = useState(0.9);
  const [promptIdx, setPromptIdx] = useState(() => Math.floor(Math.random() * PROMPTS.length));
  const [tool, setTool] = useState('brush');
  const [strokes, setStrokes] = useState(0);
  const [saved, setSaved] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setRevealed(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const fillBg = useCallback((ctx, canvas) => {
    ctx.fillStyle = '#1a1410';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(240,232,216,0.025)';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 10) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
    }
    for (let j = 0; j < canvas.height; j += 10) {
      ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(canvas.width, j); ctx.stroke();
    }
  }, []);

  const saveSnap = useCallback(() => {
    const canvas = canvasRef.current;
    const snap = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
    historyRef.current = historyRef.current.slice(0, historyIdx.current + 1);
    historyRef.current.push(snap);
    if (historyRef.current.length > 40) historyRef.current.shift();
    historyIdx.current = historyRef.current.length - 1;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const resize = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w;
      canvas.height = h;
      fillBg(ctx, canvas);
      saveSnap();
    };
    resize();
  }, [fillBg, saveSnap]);

  const undo = () => {
    if (historyIdx.current <= 0) return;
    historyIdx.current--;
    const canvas = canvasRef.current;
    canvas.getContext('2d').putImageData(historyRef.current[historyIdx.current], 0, 0);
  };

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const sx = canvas.width / rect.width;
    const sy = canvas.height / rect.height;
    const src = e.touches ? e.touches[0] : e;
    return { x: (src.clientX - rect.left) * sx, y: (src.clientY - rect.top) * sy };
  };

  const hexRgba = (hex, a) => {
    const r = parseInt(hex.slice(1,3),16);
    const g = parseInt(hex.slice(3,5),16);
    const b = parseInt(hex.slice(5,7),16);
    return `rgba(${r},${g},${b},${a})`;
  };

  const doSplash = (ctx, x, y) => {
    const col = tool === 'eraser' ? '#1a1410' : color;
    const sz = brush.size;
    for (let i = 0; i < 10; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * sz;
      const r = Math.random() * sz * 0.28 + 2;
      ctx.beginPath();
      ctx.arc(x + Math.cos(angle)*dist, y + Math.sin(angle)*dist, r, 0, Math.PI*2);
      ctx.fillStyle = hexRgba(col, opacity * (0.4 + Math.random()*0.6));
      ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(x, y, sz * 0.22, 0, Math.PI*2);
    ctx.fillStyle = hexRgba(col, opacity);
    ctx.fill();
  };

  const startDraw = (e) => {
    e.preventDefault();
    isDrawing.current = true;
    const canvas = canvasRef.current;
    const pos = getPos(e, canvas);
    lastPos.current = pos;

    if (tool === 'fill') {
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = hexRgba(color, opacity);
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      setStrokes(s => s+1);
      saveSnap();
      return;
    }
    if (brush.name === 'Splash') {
      doSplash(canvas.getContext('2d'), pos.x, pos.y);
    }
  };

  const draw = (e) => {
    e.preventDefault();
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const pos = getPos(e, canvas);

    if (brush.name === 'Splash') {
      if (Math.random() > 0.55) doSplash(ctx, pos.x, pos.y);
      lastPos.current = pos;
      return;
    }

    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.lineWidth = tool === 'eraser' ? brush.size * 2.5 : brush.size;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = tool === 'eraser' ? '#1a1410' : hexRgba(color, opacity);
    ctx.stroke();
    lastPos.current = pos;
  };

  const stopDraw = () => {
    if (isDrawing.current) {
      isDrawing.current = false;
      setStrokes(s => s+1);
      saveSnap();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    fillBg(canvas.getContext('2d'), canvas);
    setStrokes(0);
    setSaved(false);
    saveSnap();
  };

  const saveCanvas = () => {
    const link = document.createElement('a');
    link.download = 'my-painting.png';
    link.href = canvasRef.current.toDataURL();
    link.click();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const newPrompt = () => setPromptIdx(i => (i + 1) % PROMPTS.length);

  return (
    <section className="atelier" ref={sectionRef} id="studio">
      <div className={`atelier__inner ${revealed ? 'revealed' : ''}`}>

        <div className="atelier__header">
          <p className="section-label">Interactive Studio</p>
          <h2 className="atelier__title">The <em>Atelier</em></h2>
          <p className="atelier__subtitle">
            Every developer needs a creative outlet. Pick up a brush and paint something.
          </p>
        </div>

        <div className="atelier__workspace">

          {/* Left toolbar */}
          <aside className="atelier__tools">

            <div className="tool-group">
              <span className="tool-label">Brush Type</span>
              {BRUSHES.map(b => (
                <button
                  key={b.name}
                  className={`tool-btn ${brush.name === b.name && tool === 'brush' ? 'active' : ''}`}
                  onClick={() => { setBrush(b); setTool('brush'); }}
                  title={b.name}
                >
                  <span className="tool-btn-icon">{b.icon}</span>
                  <span className="tool-btn-label">{b.name}</span>
                </button>
              ))}
            </div>

            <div className="tool-group">
              <span className="tool-label">Tools</span>
              <button
                className={`tool-btn ${tool === 'eraser' ? 'active' : ''}`}
                onClick={() => setTool('eraser')}
              >
                <span className="tool-btn-icon">⌫</span>
                <span className="tool-btn-label">Erase</span>
              </button>
              <button
                className={`tool-btn ${tool === 'fill' ? 'active' : ''}`}
                onClick={() => setTool('fill')}
              >
                <span className="tool-btn-icon">▣</span>
                <span className="tool-btn-label">Fill</span>
              </button>
            </div>

            <div className="tool-group">
              <span className="tool-label">Opacity — {Math.round(opacity*100)}%</span>
              <input
                type="range" min="0.05" max="1" step="0.05"
                value={opacity}
                onChange={e => setOpacity(parseFloat(e.target.value))}
                className="opacity-slider"
              />
            </div>

            <div className="tool-group">
              <span className="tool-label">Actions</span>
              <button className="tool-btn" onClick={undo}>
                <span className="tool-btn-icon">↩</span>
                <span className="tool-btn-label">Undo</span>
              </button>
              <button className="tool-btn tool-btn--danger" onClick={clearCanvas}>
                <span className="tool-btn-icon">✕</span>
                <span className="tool-btn-label">Clear</span>
              </button>
              <button className={`tool-btn tool-btn--save ${saved ? 'saved' : ''}`} onClick={saveCanvas}>
                <span className="tool-btn-icon">{saved ? '✓' : '↓'}</span>
                <span className="tool-btn-label">{saved ? 'Saved!' : 'Save'}</span>
              </button>
            </div>

            <div className="stroke-counter">
              <span className="stroke-num">{strokes}</span>
              <span className="stroke-lbl">strokes</span>
            </div>
          </aside>

          {/* Canvas */}
          <div className="atelier__canvas-col">
            <div className="canvas-prompt-bar">
              <span className="canvas-prompt-text">🎨 {PROMPTS[promptIdx]}</span>
              <button className="canvas-prompt-btn" onClick={newPrompt} title="New prompt">↻</button>
            </div>
            <canvas
              ref={canvasRef}
              className="paint-canvas"
              style={{ cursor: tool === 'eraser' ? 'cell' : 'crosshair' }}
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={stopDraw}
              onMouseLeave={stopDraw}
              onTouchStart={startDraw}
              onTouchMove={draw}
              onTouchEnd={stopDraw}
            />
          </div>

          {/* Right palette */}
          <aside className="atelier__palette">
            <span className="tool-label">Colours</span>
            <div className="swatch-grid">
              {COLORS.map(c => (
                <button
                  key={c.hex}
                  className={`swatch ${color === c.hex && tool !== 'eraser' ? 'swatch--active' : ''}`}
                  style={{ background: c.hex }}
                  onClick={() => { setColor(c.hex); setTool('brush'); }}
                  title={c.name}
                />
              ))}
            </div>

            <div className="custom-color">
              <span className="tool-label">Custom</span>
              <input
                type="color" value={color}
                onChange={e => { setColor(e.target.value); setTool('brush'); }}
                className="color-picker-input"
              />
            </div>

            <div className="active-swatch">
              <div
                className="active-swatch-blob"
                style={{
                  background: tool === 'eraser' ? '#1a1410' : color,
                  opacity: tool === 'eraser' ? 0.4 : opacity,
                  border: tool === 'eraser' ? '1px dashed rgba(240,232,216,0.3)' : 'none',
                }}
              />
              <span className="active-swatch-name">
                {tool === 'eraser' ? 'Erasing' : (COLORS.find(c => c.hex === color)?.name ?? 'Custom')}
              </span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
