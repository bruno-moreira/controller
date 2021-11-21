import React from 'react';
import ProdutoCard from '../../components/ProdutoCard';
import { View, FlatList } from 'react-native';
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import feedsEstaticos from '../../assets/dicionarios/feeds.json';
import { CentralizadoNaMesmaLinha } from '../../assets/styles';

const FEEDS_POR_PAGINA = 4;

export default class Feeds extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            proximaPagina: 0,
            feeds: [],

            atualizando: false,
            carregando: false
        };
    }

    carregarFeeds = () => {
        const { proximaPagina, feeds } = this.state;

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
        this.setState({ atualizando: true, feeds: [], proximaPagina: 0 }, () => {
            this.carregarFeeds();
        });
    }

    mostrarFeed = (feed) => {
        return (
            <ProdutoCard feed={feed} navegador={this.props.navigation} />
        );
    }

    mostrarProdutos = (feeds) => {
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
                this.mostrarProdutos(feeds)
            );
        } else {
            return (null);
        }
    }
}