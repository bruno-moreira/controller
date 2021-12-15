import React from "react";
import { TouchableOpacity } from 'react-native';
import { Card, CardContent, CardImage } from 'react-native-cards';
import {
    Avatar,
    NomeProduto,
    DescricaoProduto,
    DataProduto,
    PrecoProduto,
    NomeEmpresa,
    EsquerdaDaMesmaLinha
} from '../../assets/styles';
import { getImagem } from "../../api";
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
                    <CardImage source={getImagem(feed.product.blobs[0].file)} />
                    <CardContent>
                        <EsquerdaDaMesmaLinha>
                            <Avatar source={getImagem(feed.company.avatar)} />
                            <NomeEmpresa>{feed.company.name}</NomeEmpresa>
                        </EsquerdaDaMesmaLinha>
                    </CardContent>
                    <CardContent>
                        <NomeProduto>{feed.product.name}</NomeProduto>
                    </CardContent>
                    <CardContent>
                        <DescricaoProduto>{feed.product.description}</DescricaoProduto>
                    </CardContent>
                    <CardContent>
                        <DataProduto>{feed.product.date}</DataProduto>
                    </CardContent>
                    <CardContent>
                        <PrecoProduto>{"R$ " + feed.product.price}</PrecoProduto>
                    </CardContent>
                </Card>
            </TouchableOpacity>
        );
    }
}