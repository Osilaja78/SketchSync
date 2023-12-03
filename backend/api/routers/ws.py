# This module contains logic for websocket connection
#  and creation of a new witeboard with unique id.

from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import JSONResponse
from fastapi.websockets import WebSocket, WebSocketDisconnect
from typing import Dict, Set
import json
import uuid

router = APIRouter(tags=['Websocket'])

# In-memory storage for board IDs
board_manager: Dict[str, Set[WebSocket]] = {}


class WebSocketManager:
    """Manager for initiating and disconnecting websocket connection"""

    def __init__(self):
        self.clients: Dict[str, Set[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, board_id: str):
        """Connect to websocket"""

        await websocket.accept()
        if board_id not in self.clients:
            self.clients[board_id] = set()
        self.clients[board_id].add(websocket)

    async def disconnect(self, board_id: str, websocket: WebSocket):
        """Disconnect from websocket"""

        if board_id in self.clients:
            self.clients[board_id].remove(websocket)

    async def broadcast_canvas_update(self, board_id: str, image_url: str):
        """Broadcast board data to all connected users"""

        if board_id in self.clients:
            for client in self.clients[board_id]:
                await client.send_text(json.dumps({"type": "canvas_update", "imageURL": image_url}))


# Initialize websocket manager instance
websocket_manager = WebSocketManager()


@router.post("/create_board")
async def create_board():
    """
    Route for creating a new board (for host)
    with unique ID.

    Return:
        board_id: ID of the board created.
    """

    new_board_id = str(uuid.uuid4())

    # Store the new board ID in memory
    board_manager[new_board_id] = set()

    return JSONResponse(content={"board_id": new_board_id})


@router.websocket("/ws/{board_id}")
async def websocket_endpoint(websocket: WebSocket, board_id: str):
    """
    Endpoint for connecting to websocket.

    Parameters:
        board_id: from the board created.
    """

    await websocket_manager.connect(websocket, board_id)
    try:
        while True:
            # Get board data from host's websocket broadcast.
            data = await websocket.receive_text()
            data = json.loads(data)

            if data["type"] == "canvas_update":
                # Send the recieved board data to all viewers.
                await websocket_manager.broadcast_canvas_update(board_id, data["imageURL"])
    except WebSocketDisconnect:
        await websocket_manager.disconnect(board_id, websocket)
