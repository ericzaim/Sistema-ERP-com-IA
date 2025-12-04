from mongoengine import Document, IntField, DictField, ObjectIdField


class VendaMensal(Document):
    id = ObjectIdField(primary_key=True)  # corresponde ao _id do MongoDB
    mes = IntField(required=True, min_value=1, max_value=12)
    ano = IntField(required=True)
    produtos = DictField(field=IntField(), required=True)

    meta = {"collection": "vendas"}
