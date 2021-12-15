const FEEDS_URL = "http://172.29.1.1:5000/"
const EMPRESAS_URL = "http://172.29.1.2:5000/"
const ARQUIVOS_URL = "http://172.29.1.10:80/"

export const acessarUrl = async(url) => {
    let promise = null;

    try {
        resposta = await fetch(url, { method: "GET"});
        if (resposta.ok) {
            promise = Promise.resolve(resposta.json());
        }else{
            promise = Promise.reject(resposta);
        }
    } catch (error) {
        promise = Promise.reject(error)
    }

    return promise;
}

export const getFeeds = async(pagina) => {
    return acessarUrl(FEEDS_URL + "feeds/" + pagina);
}

export const getFeed = async(feedId) => {
    return acessarUrl(FEEDS_URL + "feed/" + feedId);
}

export const getFeedsPorProduto = async(nomeProduto, pagina) => {
    return acessarUrl(FEEDS_URL + "feeds_por_produto/" + nomeProduto + "/" + pagina);
}

export const getFeedsPorEmpresa = async(empresaId, pagina) => {
    return acessarUrl(FEEDS_URL + "feeds_por_empresa/" + empresaId + "/" + pagina);
}

export const getEmpresa = async() => {
    return acessarUrl(EMPRESAS_URL + "empresas");
}

export const getImagem = (imagem) => {
    return { uri: ARQUIVOS_URL + imagem };
}