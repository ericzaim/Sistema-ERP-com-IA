from http import HTTPStatus

from fastapi import APIRouter, HTTPException, Query

from app.schemas.ProdutoSchema import ProdutoSchema
from app.services.mongo_services import get_vendas, find_by_month, prediction_by_months, get_vendas_by_range, \
    registra_dados

router = APIRouter()


@router.get("/prediction")
def prediction(meses:list[str] = Query(...)):
    try:
        final_month = meses[1]
        if find_by_month(final_month):
            return get_vendas_by_range(meses)
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex))

@router.get("/roupas")
def listar_roupas():
    try:
        return get_vendas()
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex))

@router.get("/roupas/{mes}")
def listar_roupas_mes(mes:str):
    try:
        roupas = find_by_month(mes.lower())
        if not roupas:
            raise HTTPException(status_code=404, detail="Nenhuma roupa encontrada para este mês")
        return roupas
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/roupas")
def registra_roupas(roupas:ProdutoSchema):
    try:
        registra_dados(roupas)
        return HTTPStatus.CREATED
    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex))