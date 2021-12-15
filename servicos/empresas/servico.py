from flask import Flask, jsonify
import mysql.connector as mysql
from mysql.connector import Error

servico = Flask(__name__)

IS_ALIVE = "yes"
DEBUG = True
TAMANHO_PAGINA = 4

MYSQL_SERVER = "bancodados"
MYSQL_USER = "root"
MYSQL_PASS = "admin"
MYSQL_BANCO = "controller"

def get_conexao_db():
    conexao = mysql.connect(
        host=MYSQL_SERVER, 
        user=MYSQL_USER,
        password=MYSQL_PASS,
        database=MYSQL_BANCO
    )

    return conexao

def gerar_empresa(registro):
    empresa = {
        "_id": registro["id"],
        "name": registro["nome"],
        "avatar": registro["avatar"]
    }

    return empresa

@servico.route("/empresas")
def get_empresas():
    empresas = []

    conexao = get_conexao_db()
    cursor = conexao.cursor(dictionary=True)
    cursor.execute("select id, nome, avatar from empresas")
    resultado = cursor.fetchall()
    for registro in resultado:
        empresas.append(gerar_empresa(registro))

    return jsonify(empresas)

if __name__  == "__main__":
    servico.run(
        host="0.0.0.0",
        debug=DEBUG
    )