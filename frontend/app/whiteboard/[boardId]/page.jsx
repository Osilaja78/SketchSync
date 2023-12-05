"use client";
// frontend/whiteboard/[boardId]/page.jsx

import { useEffect, useRef, useState, useLayoutEffect, useContext } from "react";
import { useParams, useSearchParams } from "next/navigation";
import rough from "roughjs";
import Image from "next/image";
import Logo from "../../../public/images/logo-only.png";
import Undo from "../../../public/icons/undo.svg";
import Redo from "../../../public/icons/redo.svg";
import Clear from "../../../public/icons/clear.svg";
import Download from "../../../public/icons/download.svg";
import shareIcon from "../../../public/icons/shareIcon.svg";
import { ToastContainer } from "react-toastify";
import { notify, warn } from "@/app/layout";
import Link from "next/link";
import { AuthContext } from "@/components/auth/AuthContext";
import { baseApiUrl } from "@/app/layout";

// const roughGenerator = rough.generator();

export default function WhitBoardPage() {
  const [ elements, setElements ] = useState([]);
  const [ undoHistory, setUndoHistory ] = useState([]);
  const [ isDrawing, setIsDrawing ] = useState(false);
  const [ color, setColor ] = useState("black");
  const [ websocket, setWebsocket ] = useState(null);
  const [ imageSRC, setImageSRC ] = useState("");
  const [ winWidth, setWinWidth ] = useState();
  const [ winHeight, setWinHeight ] = useState();
  const [ colorMenuOpen, setColorMenuOpen ] = useState(false);
  const [ isClient, setIsClient ] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  const params = useParams();
  const searchParams = useSearchParams();
  const isHost = searchParams.get("h");
  const boardId = params.boardId;

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  if (isHost) {
    useEffect(() => {
      setIsClient(true);
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // canvas.style.backgroundColor = "white"

      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctxRef.current = ctx;
    }, []);
  }

  useEffect(() => {
    // Get window width and height for the canvas size.
    const width = window.innerWidth;
    const height = window.innerHeight;

    setWinWidth(width);
    setWinHeight(height);

    // Initialize a websocket connection.
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

      // ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = "blue";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      console.log(ctx);

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
          strokeWidth: 3,
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

  // Logic for drawing on whiteboard.
  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;

    setElements((prevElem) => [
      ...prevElem,
      {
        type: "pencil",
        offsetX,
        offsetY,
        path: [[offsetX, offsetY]],
        color: color,
      },
    ]);

    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;

    if (isDrawing) {
      const { path } = elements[elements.length - 1];
      const newPath = [...path, [offsetX, offsetY]];

      setElements((prevElem) =>
        prevElem.map((elem, idx) => {
          if (idx === elements.length - 1) {
            return {
              ...elem,
              path: newPath,
            };
          } else {
            return elem;
          }
        })
      );
    }
  };

  // Logic for clear canvas.
  const handleClearCanvas = () => {
    if (isHost) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      ctx.fillRect = "white";
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setElements([]);
    }
  };

  const handleMouseUp = (e) => {
    setIsDrawing(false);
  };

  const handleColorChange = (e) => {
    setColor(e);
    setColorMenuOpen(false);
  };

  // Logic for Undo button.
  const handleUndoButtonClick = () => {
    setUndoHistory((prev) => [...prev, elements[elements.length - 1]]);

    setElements((prev) => prev.slice(0, prev.length - 1));
  };

  // Logic for redo button.
  const handleRedoButtonClick = () => {
    setElements((prev) => [...prev, undoHistory[undoHistory.length - 1]]);

    setUndoHistory((prev) => prev.slice(0, prev.length - 1));
  };

  // Logic for share button.
  const [ isLinkCopied, setIsLinkCopied ] = useState(false);

  const handleShareButtonClick = async () => {
    try {
      await navigator.clipboard.writeText(`${baseApiUrl}/whiteboard/${boardId}`);
      setIsLinkCopied(true);
      notify("Link copied!")

      // Reset "Link copied" after a short delay
      setTimeout(() => {
        setIsLinkCopied(false);
      }, 3000);
    } catch (error) {
      console.error('Error copying link to clipboard', error);
    }
  };

  const colorOptions = ['#000000', '#ff0000', '#0000ff', '#ffff00', '#00ff00'];

  // show color pallet to change pencil color
  const handleColorMenuClick = () => {
    setColorMenuOpen(!colorMenuOpen);
  }

  // Logic for downloading canvas image (for authenticated users)
  const handleCanvasDownload = () => {
    if (isLoggedIn == true) {
      const canvas = canvasRef.current;
      console.log(canvas.style.backgroundColor);
      const dataURL = canvas.toDataURL("image/png");
      
      const a = document.createElement('a');
      a.href = dataURL;
      a.download = 'whiteboard.png';
      a.click();
    } else if (isLoggedIn == false) {
      warn("Only authenticated users can download a canvas!")
    }
  };

  return (
    <>
      <ToastContainer />
      {/* ******************** TEMPLATE FOR HOST ********************** */}
      {isHost && (
        <canvas
          className="canvas"
          ref={canvasRef}
          id="whiteboard-canvas"
          width={winWidth}
          height={winHeight}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        ></canvas>
      )}
      {isHost && <div>
        <div className="p-5 bg-white absolute top-5 left-5">
          <Link href="/"><Image src={Logo} alt="logo" width={40} height={40} /></Link>
        </div>
        <div className="max-h-max mt-3 max-w-max absolute top-28 left-5">
          <div className="flex">
            {!colorMenuOpen && <div className="cursor-pointer bg-gray-100 hover:bg-gray-200 max-w-max p-[14px]" onClick={handleColorMenuClick}>
              <div
                className="w-8 h-8 rounded-full"
                style={{ backgroundColor: color }}
              ></div>
            </div>}
            {colorMenuOpen && <div className="flex cursor-pointer bg-gray-100 p-[14px]">
            {colorOptions.map((color) => (
              <div
                key={color}
                className="w-8 h-8 cursor-pointer mr-2 rounded-full"
                style={{ backgroundColor: color }}
                onClick={() => handleColorChange(color)}
              ></div>
            ))}
            </div>}
          </div>
          <hr className="max-w-min" />
          <Image
            src={Undo}
            alt="undo"
            onClick={handleUndoButtonClick}
            className={`cursor-pointer bg-gray-100 hover:bg-gray-200 p-3 ${
              elements.length === 0 ? 'disabled' : ''
            }`}
          />
          <hr className="max-w-min" />
          <Image
            src={Redo}
            alt="redo"
            onClick={handleRedoButtonClick}
            className={`cursor-pointer bg-gray-100 hover:bg-gray-200 p-3 ${undoHistory.length < 1 ? 'disabled' : ''}`}
          />
          <hr className="max-w-min" />
          <Image
            src={Clear}
            alt="clear"
            onClick={handleClearCanvas}
            className="cursor-pointer bg-gray-100 hover:bg-gray-200 p-4"
          />
          <hr className='max-w-min'/>
          <Image
            src={shareIcon}
            alt="download"
            onClick={handleShareButtonClick}
            className="cursor-pointer bg-gray-100 hover:bg-gray-200 p-4"
          />
          <hr className='max-w-min'/>
          <Image
            src={Download}
            alt="download"
            onClick={handleCanvasDownload}
            className="cursor-pointer bg-gray-100 hover:bg-gray-200 p-4"
          />
        </div>
      </div>}
      {/* ******************* VIEW ONLY TEMPLATE ********************* */}
      {!isHost && <div className='canvas w-screen h-screen'>
      <div className="absolute top-5 left-[45%] p-3 max-w-max rounded-xl bg-gray-800 text-white">View Only</div>
        <div className="p-5 bg-white absolute top-5 left-5">
            <Image src={Logo} alt="logo" width={40} height={40} />
        </div>
        {imageSRC && <Image src={imageSRC} width={winWidth} height={winHeight} alt='canvas' />}
      </div>}
    </>
  );
}
