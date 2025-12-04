from http import HTTPStatus
from typing import List

from mongoengine import ValidationError, NotUniqueError

from app.database.connection import connect_db
from app.models.vendas import VendaMensal

con = connect_db()

def serialize_roupa(p: VendaMensal):
    data = p.to_mongo().to_dict()
    data["_id"] = str(data["_id"])
    data.pop("_cls", None)
    return data

def registra_dados(dados):
    try:
        if not dados.get('mes') or not isinstance(dados['mes'], str):
            raise ValueError("Mês inválido")

        produtos = dados.get('produtos', [])

        if not produtos or not isinstance(produtos, list):
            raise ValueError("Produtos devem ser uma lista válida")

        saida = VendaMensal(mes=dados['mes'], produtos=produtos)

        saida.save()

        return f"Dados de vendas do mês {dados['mes']} registrados com sucesso."
    except ValueError as ve:
        print(f"Erro de validação: {ve}")
    except ValidationError as ve:
        print(f"Erro de validação no MongoDB: {ve}")
    except NotUniqueError as e:
        print(f"Erro de unicidade (provavelmente duplicado): {e}")
    except Exception as ex:
        print(f"Erro inesperado: {ex}")

def find_by_month(mes):
    documentos = VendaMensal.objects(mes=mes)
    res = []

    for doc in documentos:
        res.append({
            "mes": doc.mes,
            "ano": doc.ano,
            "produtos": doc.produtos
        })
    return sorted(res, key=lambda x: x["ano"], reverse=True)

def get_vendas():
    vendas = VendaMensal.objects()
    if not vendas:
        return HTTPStatus.NOT_FOUND
    return [serialize_roupa(r) for r in vendas]

def get_vendas_by_range(meses:List[str]):
    print(meses[0],meses[1])
    vendas = VendaMensal.objects(valores_mensais__gte=meses[0],valores_mensais__lte=meses[1])
    print(vendas)
    return vendas


def find_by_product(produto):
    try:
        if not isinstance(produto, str) or not produto:
            raise ValueError("Nome inválido")

        dados = VendaMensal.objects(nome=produto)

        if not dados:
            return HTTPStatus.NOT_FOUND

        return dados
    except FileNotFoundError as fnf:
        raise fnf

def prediction_by_months(meses:List[str]):
    return meses