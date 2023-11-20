# backend/main.py

from fastapi import APIRouter, WebSocket
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles

router = APIRouter(tags=["Websocket"])

# Serve the frontend static files
# app.mount("/", StaticFiles(directory="frontend", html=True), name="static")

# WebSocket manager to keep track of connected clients
class WebSocketManager:
    def __init__(self):
        self.clients = set()

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.clients.add(websocket)

    def disconnect(self, websocket: WebSocket):
        self.clients.remove(websocket)

    async def broadcast(self, data: dict):
        for client in self.clients:
            await client.send_json(data)

manager = WebSocketManager()

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_json()
            await manager.broadcast(data)
    except Exception as e:
        print(e)
    finally:
        manager.disconnect(websocket)
