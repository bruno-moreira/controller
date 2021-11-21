import React from "react";
import { TouchableOpacity } from 'react-native';
import { Card, CardContent } from 'react-native-cards';
import {
    NomeProduto,
    DescricaoProduto,
    DataProduto,
    NomeEmpresa,
    CentralizadoNaMesmaLinha
} from '../../assets/styles';

export default class FeedCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            feed: this.props.feed,
            navegador: this.props.navegador
        }
    }

    render = () => {
        const { feed, navegador } = this.state;
        return (
            <TouchableOpacity onPress={
                () => {
                    navegador.navigate("Detalhes", { feedId: feed._id })
                }
            }>
                <Card>
                    <CardContent>
                        <CentralizadoNaMesmaLinha>
                            <DataProduto>{feed.product.date}</DataProduto>
                        </CentralizadoNaMesmaLinha>                    
                        <CentralizadoNaMesmaLinha>
                            <NomeProduto>{feed.product.name}</NomeProduto>
                            <NomeEmpresa>{"("+feed.company.name+")"}</NomeEmpresa>
                        </CentralizadoNaMesmaLinha>                    
                        <DescricaoProduto>{feed.product.description}</DescricaoProduto>
                    </CardContent>
                </Card>
            </TouchableOpacity>
        );
    }
}