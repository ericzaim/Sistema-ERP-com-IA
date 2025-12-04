from fastapi import FastAPI
from app.routes import ai_routes
app = FastAPI( title="API IA Japinha",
               description="API para consultar tendências de roupas infantis.",
               version="1.0.0"
               )

app.include_router(ai_routes.router)
