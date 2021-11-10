import React from "react";
import { TouchableOpacity } from 'react-native';
import { Card, CardContent, CardImage } from 'react-native-cards';
import avatar from '../../assets/img/avatar.jpeg';
import produto from '../../assets/img/produto.png';
import {
    Avatar,
    NomeProduto,
    DescricaoProduto,
    DataProduto,
    NomeEmpresa
} from '../../assets/styles';

export default class FeedCard extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            feed: this.props.feed,
            navegador: this.props.navegador
        }
    }

    render = () => {
        const { feed, navegador } = this.state;
        return(
            <TouchableOpacity onPress={
                () => {
                    navegador.navigate("Detalhes", {feedId: feed._id})
                }
            }>
                <Card>
                    <CardImage source={produto}/>
                    <CardContent>
                        <Avatar source={avatar}/>
                        <NomeEmpresa>{feed.company.name}</NomeEmpresa>
                    </CardContent>
                    <CardContent>
                        <NomeProduto>{feed.product.name}</NomeProduto>
                    </CardContent>
                    <CardContent>
                        <DescricaoProduto>{feed.product.description}</DescricaoProduto>
                    </CardContent>
                    <CardContent>
                        <DataProduto>{feed.product.price}</DataProduto>
                    </CardContent>
                </Card>
            </TouchableOpacity>
        );
    }
}