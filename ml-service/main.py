from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/predict/{server_id}")
def predict(server_id: int):
    return {
        "serverId": server_id,
        "predictedLoad": random.uniform(10, 90),
        "predictedAt": "2026-04-28T12:00:00Z"
    }
