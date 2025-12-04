from mongoengine import (connect, ConnectionFailure)
from dotenv import load_dotenv

load_dotenv()

# Conecta ao MongoDB
def connect_db():
    try:
        connect(
            db="vendas",
            host="localhost",
            port=27017,
                )

    except ConnectionFailure:
        raise ("Erro ao conectar ao banco de dados ",ConnectionFailure)
