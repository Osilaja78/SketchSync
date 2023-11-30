"use client"
// frontend/whiteboard/[boardId]/page.jsx

import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import rough from 'roughjs';
import Image from 'next/image';
import Logo from '../../../public/images/logo-only.png';
import Undo from '../../../public/icons/undo.svg';
import Redo from '../../../public/icons/redo.svg';
import Clear from '../../../public/icons/clear.svg';
import blackDrop from '../../../public/icons/blackDrop.svg';
import Download from '../../../public/icons/download.svg';


const roughGenerator = rough.generator();


export default function WhitBoardPage() {

  const [elements, setElements] = useState([]);
  const [undoHistory, setUndoHistory] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("black");
  const [websocket, setWebsocket] = useState(null);
  const [imageSRC, setImageSRC] = useState("");

  const params = useParams();
  const searchParams = useSearchParams();
  const isHost = searchParams.get('h');
  const boardId = params.boardId;

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const winWidth = window.innerWidth;
  const winHeight = window.innerHeight;


  if (isHost) {
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
  
      // ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
  
      ctxRef.current = ctx;
    }, []);
  }

  // useEffect(() => {
  //   ctxRef.current.strokeStyle = color;
  // }, [color]);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8000/ws/${boardId}`);

    ws.onopen = () => {
      console.log("WebSocket connected");
      setWebsocket(ws);
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === "canvas_update") {
        const imgURL = data.imageURL;
        setImageSRC(imgURL);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => {
      ws.close();
    };
  }, []);

  if (isHost) {
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
  
      if (isHost) {
        const imageURL = canvas.toDataURL();
        setImageSRC(imageURL);
  
        if (websocket) {
          websocket.send(JSON.stringify({ type: "canvas_update", imageURL }));
        }
      }
    }, [elements]);
  }

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
    if (isHost) {
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
  }

  const handleMouseUp = (e) => {
    setIsDrawing(false);
  }

  const handleColorChange = (e) => {
    setColor(e.target.value);
  }

  const handleUndoButtonClick = () => {
    setUndoHistory((prev) => [
      ...prev,
      elements[elements.length - 1]
    ]);

    setElements((prev) => prev.slice(0, prev.length - 1));
  }

  const handleRedoButtonClick = () => {
    setElements((prev) => [
      ...prev,
      undoHistory[undoHistory.length - 1]
    ]);

    setUndoHistory((prev) => prev.slice(0, prev.length - 1));
  }

  
  return (
    <>
      {isHost && <canvas
        className='canvas'
        ref={canvasRef}
        id="whiteboard-canvas"
        width={winWidth}
        height={winHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      ></canvas>}
      <div className='absolute top-5 left-5'>
        <div className='p-5 bg-white'>
          <Image src={Logo} alt='logo' width={40} height={40} />
        </div>
        <hr />
        <div className='bg-white h-full mt-3 max-w-max'>
          <Image src={blackDrop} alt='color' className='cursor-pointer bg-gray-100 hover:bg-gray-200 p-4' />
          <hr />
          <Image src={Undo} alt='undo' onClick={handleUndoButtonClick} className='cursor-pointer bg-gray-100 hover:bg-gray-200 p-3' />
          <hr />
          <Image src={Redo} alt='redo' onClick={handleRedoButtonClick} className='cursor-pointer bg-gray-100 hover:bg-gray-200 p-3' />
          <hr />
          <Image src={Clear} alt='clear' onClick={handleClearCanvas} className='cursor-pointer bg-gray-100 hover:bg-gray-200 p-4' />
          <Image src={Download} alt='download'  className='cursor-pointer bg-gray-100 hover:bg-gray-200 p-4' />
        </div>
      </div>
    </>
  )


  // return (
  //   <div>
  //     <h1 className='text-center text-xl mt-10'>New Board</h1>
  //     {isHost && <div className='max-w-[60%] mx-auto flex justify-between p-4 items-center' >
  //       <div>
  //         <label htmlFor="color">Select Color</label>
  //         <input type="color" name="color" id="color" onChange={handleColorChange} />
  //       </div>
  //       <div className='flex gap-5'>
  //         <button
  //           className='border-2 border-red-700 rounded-xl p-2'
  //           onClick={handleUndoButtonClick}
  //           disabled={elements.length === 0}
  //         >Undo</button>
  //         <button
  //           className='border-2 border-green-700 rounded-xl p-2'
  //           onClick={handleRedoButtonClick}
  //           disabled={undoHistory.length < 1}
  //         >Redo</button>
  //       </div>
  //       <button className='border-2 border-blue-700 rounded-xl p-2' onClick={handleClearCanvas}>Clear Canvas</button>
  //     </div>}
  //     {isHost && <canvas
  //       className='border border-5 border-black max-w-max m-auto'
  //       ref={canvasRef}
  //       id="whiteboard-canvas"
  //       width="800"
  //       height="500"
  //       onMouseDown={handleMouseDown}
  //       onMouseMove={handleMouseMove}
  //       onMouseUp={handleMouseUp}
  //     ></canvas>}
  //     {!isHost && <div className='border border-black h-[500px] w-[800px] mx-auto'>
  //       {imageSRC && <Image src={imageSRC} width={800} height={500} alt='canvas' />}
  //     </div>}
  //   </div>
  // );
};
