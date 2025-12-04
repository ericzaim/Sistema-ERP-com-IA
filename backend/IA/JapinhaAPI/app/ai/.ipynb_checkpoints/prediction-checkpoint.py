import numpy as np
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as plt

from app.models.vendas import Produto

mapa_meses = {
    "janeiro": 1, "fevereiro": 2, "março": 3, "abril": 4,
    "maio": 5, "junho": 6, "julho": 7, "agosto": 8,
    "setembro": 9, "outubro": 10, "novembro": 11, "dezembro": 12
}

# 4️⃣ Função para prever tendências
def prever_tendencias(nome_produto: str, meses_previstos=3):
    produto = Produto.objects(nome=nome_produto).first()
    if not produto:
        print(f"Produto '{nome_produto}' não encontrado.")
        return

    # Ordena os meses corretamente
    meses = sorted(produto.valores_mensais.items(), key=lambda x: mapa_meses[x[0].lower()])
    X = np.array([mapa_meses[m[0].lower()] for m in meses]).reshape(-1, 1)
    y = np.array([m[1] for m in meses])

    # Cria o modelo
    modelo = LinearRegression()
    modelo.fit(X, y)

    # Gera previsões para os próximos meses
    ultimo_mes = max(X)[0]
    X_future = np.array([i for i in range(ultimo_mes + 1, ultimo_mes + meses_previstos + 1)]).reshape(-1, 1)
    y_pred = modelo.predict(X_future)

    # Exibe resultados
    print("=== Previsão ===")
    for i, valor in enumerate(y_pred, start=1):
        print(f"Mês {ultimo_mes + i}: {valor:.2f}")

    # (Opcional) Visualização
    plt.figure(figsize=(8, 4))
    plt.plot(X, y, 'o-', label="Histórico")
    plt.plot(X_future, y_pred, 'r--', label="Previsão")
    plt.xlabel("Mês (1–12)")
    plt.ylabel("Vendas")
    plt.title(f"Tendência de vendas para '{produto.nome}'")
    plt.legend()
    plt.show()

# 5️⃣ Exemplo de uso
prever_tendencias("Camiseta", meses_previstos=3)
