import styled from 'styled-components/native';

export const Avatar = styled.Image`
    padding: 4px;
    width: 40px;
    height: 40px;
    border-radius: 30px;
`;

export const NomeEmpresa = styled.Text`
    padding: 8px;
    font-size: 16px;
    color: #59594a;
`;

export const NomeEmpresaMenu = styled.Text`
    padding: 8px;
    font-size: 16px;
    color: #FFFFFF;
`;

export const NomeProduto = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #59594a;
`;

export const DescricaoProduto = styled.Text`
    font-size: 16px;
    color: #59594a;
`;

export const PrecoProduto = styled.Text`
    font-size: 16px;
    color: #59594a;
`;

export const DataProduto = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: red;
`;

export const EntradaNomeProduto = styled.TextInput`
    height: 40px;
    width: 100%;
    background-color: #fff;
    border-color: #c7c7c7;
    border-width: 1px;
    border-radius: 8px;
`; 

export const CentralizadoNaMesmaLinha = styled.View`
    flexDirection: row;
    justify-content: center;
    align-items: center;
`;

export const EsquerdaDaMesmaLinha = styled.View`
    flexDirection: row;
    justify-content: flex-start;
    align-items: flex-start;
`;

export const Espacador = styled.View`
    flexDirection: row;
    padding: 15px;
`;

export const ContainerMenu = styled.View`
    flex: 1;
    font-size: 18px;
    background-color: #fff;
`;

export const DivisorMenu = styled.View`
    marginVertical: 5;
    marginHorizontal: 5;
    borderBottomWidth: 1;
    borderColor: #3f6ea3;
`;