import uvicorn

if __name__ == "__main__":
    uvicorn.run("djchat.asgi:application", port=8000, log_level="debug", reload=True)
