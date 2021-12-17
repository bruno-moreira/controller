import React from "react";
import { TouchableOpacity } from 'react-native';
import { Card, CardContent, CardImage } from 'react-native-cards';
import {
    Avatar,
    NomeProduto,
    DataProduto,
    PrecoProduto,
    EsquerdaDaMesmaLinha,
    CentralizadoNaMesmaLinha
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
                            <CentralizadoNaMesmaLinha>
                                <Avatar source={getImagem(feed.company.avatar)} />
                                <NomeProduto>{feed.product.name}</NomeProduto>
                                <PrecoProduto>{"  R$ " + feed.product.price}</PrecoProduto>
                            </CentralizadoNaMesmaLinha>
                        </EsquerdaDaMesmaLinha>
                    </CardContent>
                    <CardContent>
                       <CentralizadoNaMesmaLinha>
                       <DataProduto>{feed.product.date}</DataProduto>
                       </CentralizadoNaMesmaLinha>
                    </CardContent>
                </Card>
            </TouchableOpacity>
        );
    }
}