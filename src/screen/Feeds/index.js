import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { Card, CardContent, CardImage } from 'react-native-cards';
import feedsEstaticos from '../../assets/dicionarios/feeds.json';
import avatar from '../../assets/img/avatar.png';
import produto from '../../assets/img/produto.png';
import {
    Avatar,
    NomeProduto,
    DescricaoProduto,
    DataProduto,
    NomeEmpresa
} from '../../assets/styles';

const FEEDS_POR_PAGINA = 4;

export default class Feeds extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            proximaPagina: 0,
            feeds: [],
            carregando: false
        };
    }

    carregarFeeds = () => {
        const { proximaPagina, feeds} = this.state;

        // avisa que esta carregando
        this.setState({
            carregando: true
        });

        // carregar o total de feeds por pagina da pagina atual
        const idInicial = proximaPagina * FEEDS_POR_PAGINA + 1;
        const idFinal = idInicial + FEEDS_POR_PAGINA - 1;
        const maisFeeds = feedsEstaticos.feeds.filter((feed) => feed._id >= idInicial && feed._id <= idFinal);

        if (maisFeeds.length) {
            //icrementar pagina e guarda os feeds
            this.setState({
                proximaPagina: proximaPagina + 1,
                feeds : [...feeds, ...maisFeeds],
                carregando: false
            });
        } else{
            this.setState({
                carregando: false
            });
        }
    }

    componentDidMount = () => {
        this.carregarMaisFeeds();
    }

    carregarMaisFeeds = () => {
        const { carregando } = this.state;

        if(carregando){
            return;
        }
        this.carregarFeeds();
    }

    mostrarFeed = (feed) => {
        return(
            <TouchableOpacity>
                <Card>
                    <Avatar source={avatar}/>
                    <CardContent>
                        <CardImage source={produto}/>
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

    mostrarFeeds = (feeds) =>{
        return (
            <FlatList
                data={feeds}
                numColumns={2}

                onEndReached = {() => this.carregarMaisFeeds()}
                onEndReachedThreshold = {0.1}

                keyExtractor={(item) => String(item._id)}
                renderItem={({item}) => {
                    return(
                        <View style={{width: '50%'}}>
                            {this.mostrarFeed(item)}
                        </View>
                    )
                }}
            >
            </FlatList>
        );
    }

    render = () => {
        const { feeds } = this.state;

        if(feeds.length){            
            return (
              this.mostrarFeeds(feeds)
            );    
        }else{
            return (
                <View></View>
            );
        }        
    }
}