from datetime import datetime

from pydantic import BaseModel
from typing import Dict

class ProdutoSchema(BaseModel):
    mes:datetime
    ano:datetime
    produtos: Dict[str, int]

    class Config:
        orm_mode = True  # permite serializar objetos MongoEngine
