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
def gerar_feed(registro):
    feed = {
        "_id": registro["feed_id"],
        "datatime": registro["data"],
        "company":{
            "_id": registro["empresa_id"],
            "name": registro["nome_empresa"],
            "avatar": registro["avatar"]
        },
        "product":{
            "name": registro["nome_produto"],
            "description": registro["descricao"],
            "price": registro["preco"],
            "url": registro["url"],
            "blobs":[
                {
                    "type": "image",
                    "file": registro["imagem1"]
                },
                {
                    "type": "image",
                    "file": registro["imagem2"]
                },
                {
                    "type": "image",
                    "file": registro["imagem3"]
                }
            ]

        }
    }

    return feed

@servico.route("/feeds/<int:pagina>")
def get_feeds(pagina):
    feeds = []

    conexao = get_conexao_db()
    cursor = conexao.cursor(dictionary=True)
    cursor.execute(
        "select feeds.id as feed_id, DATE_FORMAT(feeds.data, '%Y-%m-%d %H:%i') as data, " +
        "empresas.id as empresa_id, empresas.nome as nome_empresa, empresas.avatar, " +
        "produtos.nome as nome_produto, produtos.descricao, FORMAT(produtos.preco, 2) as preco, " +
        "produtos.url, produtos.imagem1, IFNULL(produtos.imagem2, '') as imagem2, IFNULL(produtos.imagem3, '') as imagem3 " +
        "from feeds, produtos, empresas " +
        "where produtos.id = feeds.produto " +
        "and empresas.id = produtos.empresa " +
        "order by data desc " +
        "limit " + str((pagina - 1) * TAMANHO_PAGINA) + ", " + str(TAMANHO_PAGINA))

    resultado = cursor.fetchall()
    for registro in resultado:
        feeds.append(gerar_feed(registro))

    return jsonify(feeds)

@servico.route("/feeds_por_produto/<string:nome_produto>/<int:pagina>")
def get_feeds_por_produto(nome_produto, pagina):
    feeds = []

    conexao = get_conexao_db()
    cursor = conexao.cursor(dictionary=True)
    cursor.execute(
        "select feeds.id as feed_id, DATE_FORMAT(feeds.data, '%Y-%m-%d %H:%i') as data, " +
        "empresas.id as empresa_id, empresas.nome as nome_empresa, empresas.avatar, " +
        "produtos.nome as nome_produto, produtos.descricao, FORMAT(produtos.preco, 2) as preco, " +
        "produtos.url, produtos.imagem1, IFNULL(produtos.imagem2, '') as imagem2, IFNULL(produtos.imagem3, '') as imagem3 " +
        "from feeds, produtos, empresas " +
        "where produtos.id = feeds.produto " +
        "and empresas.id = produtos.empresa " +
        "and produtos.nome LIKE '%"+ nome_produto +"%' "+
        "order by data desc " +
        "limit " + str((pagina - 1) * TAMANHO_PAGINA) + ", " + str(TAMANHO_PAGINA))

    resultado = cursor.fetchall()
    for registro in resultado:
        feeds.append(gerar_feed(registro))

    return jsonify(feeds)

@servico.route("/feeds_por_empresa/<int:empresa_id>/<int:pagina>")
def get_feeds_por_empresa(empresa_id, pagina):
    feeds = []

    conexao = get_conexao_db()
    cursor = conexao.cursor(dictionary=True)
    cursor.execute(
        "select feeds.id as feed_id, DATE_FORMAT(feeds.data, '%Y-%m-%d %H:%i') as data, " +
        "empresas.id as empresa_id, empresas.nome as nome_empresa, empresas.avatar, " +
        "produtos.nome as nome_produto, produtos.descricao, FORMAT(produtos.preco, 2) as preco, " +
        "produtos.url, produtos.imagem1, IFNULL(produtos.imagem2, '') as imagem2, IFNULL(produtos.imagem3, '') as imagem3 " +
        "from feeds, produtos, empresas " +
        "where produtos.id = feeds.produto " +
        "and empresas.id = produtos.empresa " +
        "and empresas.id = "+ str(empresa_id) + " order by data desc " +
        "limit " + str((pagina - 1) * TAMANHO_PAGINA) + ", " + str(TAMANHO_PAGINA))

    resultado = cursor.fetchall()
    for registro in resultado:
        feeds.append(gerar_feed(registro))

    return jsonify(feeds)

@servico.route("/feed/<int:feed_id>")
def get_feed(feed_id):
    feed = {}

    conexao = get_conexao_db()
    cursor = conexao.cursor(dictionary=True)
    cursor.execute(
        "select feeds.id as feed_id, DATE_FORMAT(feeds.data, '%Y-%m-%d %H:%i') as data, " +
        "empresas.id as empresa_id, empresas.nome as nome_empresa, empresas.avatar, " +
        "produtos.nome as nome_produto, produtos.descricao, FORMAT(produtos.preco, 2) as preco, " +
        "produtos.url, produtos.imagem1, IFNULL(produtos.imagem2, '') as imagem2, IFNULL(produtos.imagem3, '') as imagem3 " +
        "from feeds, produtos, empresas " +
        "where produtos.id = feeds.produto " +
        "and empresas.id = produtos.empresa " +
        "and feeds.id = " + str(feed_id))
    registro = cursor.fetchone()
    if registro:
        feed = gerar_feed(registro)

    return jsonify(feed)

if __name__  == "__main__":
    servico.run(
        host="0.0.0.0",
        debug=DEBUG
    )