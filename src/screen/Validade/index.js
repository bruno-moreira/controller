import React from 'react';
import FeedCard from '../../components/ProdutoCard';
import { View, FlatList } from 'react-native';
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import { getFeedsValidade } from '../../api';
import { CentralizadoNaMesmaLinha } from '../../assets/styles';

export default class Feeds extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            proximaPagina: 1,
            feeds: [],
            atualizando: false,
            carregando: false
        };
    }

    mostrarMaisFeeds = (maisFeeds) => {
        const { proximaPagina, feeds } = this.state;
        if (maisFeeds.length) {
            //icrementar pagina e guarda os feeds
            this.setState({
                proximaPagina: proximaPagina + 1,
                feeds: [...feeds, ...maisFeeds],
                atualizando: false,
                carregando: false
            });
        } else {
            this.setState({
                atualizando: false,
                carregando: false
            });
        }
    }

    carregarFeeds = () => {
        const { proximaPagina } = this.state;

        // avisa que esta carregando
        this.setState({
            carregando: true
        });

        getFeedsValidade(proximaPagina).then((maisFeeds) => {
            this.mostrarMaisFeeds(maisFeeds);
        }).catch((erro) => {
            console.error("Error acessando feeds geral: " + erro);
        })
    }

    componentDidMount = () => {
        this.carregarMaisFeeds();
    }

    carregarMaisFeeds = () => {
        const { carregando } = this.state;

        if (carregando) {
            return;
        }
        this.carregarFeeds();
    }

    atualizar = () => {
        this.setState({ atualizando: true, feeds: [], proximaPagina: 1, nomeProduto: null, empresaEscolhida: null }, () => {
            this.carregarFeeds();
        });
    }

    mostrarFeed = (feed) => {
        return (
            <FeedCard feed={feed} navegador={this.props.navigation} />
        );
    }

    mostrarFeeds = (feeds) => {
        const { atualizando } = this.state;

        return (
            <>
                <CentralizadoNaMesmaLinha>
                    <Header
                        leftComponent={
                            <Icon size={28} name="left" onPress={() => {
                                this.props.navigation.goBack();
                            }} />
                        }
                        centerComponent={
                            <></>
                        }
                        rightComponent={
                            <></>
                        }
                    ></Header>
                </CentralizadoNaMesmaLinha>
                <FlatList
                    data={feeds}
                    numColumns={1}

                    onEndReached={() => this.carregarMaisFeeds()}
                    onEndReachedThreshold={0.1}

                    onRefresh={() => this.atualizar()}
                    refreshing={atualizando}

                    keyExtractor={(item) => String(item._id)}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ width: '100%' }}>
                                {this.mostrarFeed(item)}
                            </View>
                        )
                    }}
                >
                </FlatList>
            </>
        );
    }

    render = () => {
        const { feeds } = this.state;

        if (feeds.length) {
            return (
                this.mostrarFeeds(feeds)
            );
        } else {
            return (null);
        }
    }
}