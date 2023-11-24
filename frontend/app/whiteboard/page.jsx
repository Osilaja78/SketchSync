"use client"
// frontend/whiteboard/page.jsx

import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import rough from "roughjs";


const roughGenerator = rough.generator();


export default function WhitBoardPage() {

  const canvasRef = useRef(null);
  const [elements, setElements] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("black");
  const ctxRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";

    ctxRef.current = ctx;
  }, []);

  // useEffect(() => {
  //   ctxRef.current.strokeStyle = color;
  // }, [color]);

  useLayoutEffect(() => {
    const roughCanvas = rough.canvas(canvasRef.current);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (elements.length > 0) {
      ctxRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    }

    elements.forEach((element) => {
      ctx.strokeStyle = element.color;
      roughCanvas.linearPath(element.path, {
        stroke: element.stroke,
        roughness: 0,
        strokeWidth: 3
      });
    });
  }, [elements]);

  const handleMouseDown = (e) => {
    const {offsetX, offsetY} = e.nativeEvent;

    setElements((prevElem) => [
      ...prevElem,
      {
        type: "pencil",
        offsetX,
        offsetY,
        path: [[offsetX, offsetY]],
        color: color
      },
    ]);

    setIsDrawing(true);
  }

  const handleMouseMove = (e) => {
    const {offsetX, offsetY} = e.nativeEvent;

    if (isDrawing) {
      const {path} = elements[elements.length - 1];
      const newPath = [...path, [offsetX, offsetY]];

      setElements((prevElem) =>
        prevElem.map((elem, idx) => {
          if (idx === elements.length - 1) {
            return {
              ...elem,
              path: newPath
            }
          } else {
            return  elem;
          }
        })
      );
    }
  }
  
  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.fillRect = "white";
    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );
    setElements([]);
  }

  const handleMouseUp = (e) => {
    setIsDrawing(false);
  }

  const handleColorChange = (e) => {
    setColor(e.target.value);
  }


  return (
    <div>
      <h1 className='text-center text-xl mt-10'>New Board</h1>
      <div className='max-w-[60%] mx-auto flex justify-between p-4' >
        <div>
          <label htmlFor="color">Select Color</label>
          <input type="color" name="color" id="color" onChange={handleColorChange} />
        </div>
        <button className='border border-3 border-blue-700 rounded-xl p-2' onClick={handleClearCanvas}>Clear Canvas</button>
      </div>
      <canvas
        className='border border-5 border-black max-w-max m-auto'
        ref={canvasRef}
        id="whiteboard-canvas"
        width="800"
        height="500"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      ></canvas>
    </div>
  );
};
