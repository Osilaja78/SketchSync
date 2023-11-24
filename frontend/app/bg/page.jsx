"use client"
// frontend/pages/index.js

import { useEffect, useRef } from 'react';

const WebSocketPage = () => {
  const canvasRef = useRef();
  const socketRef = useRef(null);

  useEffect(() => {
    const canvas = document.getElementById('whiteboard-canvas');
    const context = canvas.getContext('2d');

    const ws = new WebSocket("ws://localhost:8000/ws");

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      handleSocketData(data);
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
    };

    socketRef.current = ws;

    const handleCanvasDrawing = (event) => {
      const { color, strokeWidth, path } = event;

      context.strokeStyle = color;
      context.lineWidth = strokeWidth;
      context.lineJoin = 'round';
      context.lineCap = 'round';

      context.beginPath();
      context.moveTo(path[0].x * canvas.width, path[0].y * canvas.height);

      path.forEach((point) => {
        context.lineTo(point.x * canvas.width, point.y * canvas.height);
      });

      context.stroke();
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleSocketData = (data) => {
    const { type, options } = data;

    if (type === 'drawing') {
      handleCanvasDrawing(options);
    }
  };

  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const data = {
      type: 'drawing',
      options: {
        color: 'black', // You can customize color and strokeWidth
        strokeWidth: 5,
        path: [{ x, y }],
      },
    };

    socketRef.current.send(JSON.stringify(data));
  };

  return (
    <div>
      <canvas
        id="whiteboard-canvas"
        width="800"
        height="600"
        onClick={handleCanvasClick}
        style={{ border: '1px solid #ccc' }}
        ref={canvasRef}
      ></canvas>
    </div>
  );
};

export default WebSocketPage;
