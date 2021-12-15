import React from 'react';
import FeedCard from '../../components/FeedCard';
import { View, FlatList } from 'react-native';
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import DrawerLayout from 'react-native-drawer-layout';

import Menu from '../../components/Menu';
import { getFeeds, getFeedsPorProduto, getFeedsPorEmpresa } from '../../api';
import { EntradaNomeProduto, CentralizadoNaMesmaLinha } from '../../assets/styles';

export default class Feeds extends React.Component {

    constructor(props) {
        super(props);

        this.filtrarPorEmpresa = this.filtrarPorEmpresa.bind(this);

        this.state = {
            proximaPagina: 1,
            feeds: [],

            empresaEscolhida: null,
            nomeProduto: null,
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
        const { proximaPagina, nomeProduto, empresaEscolhida } = this.state;

        // avisa que esta carregando
        this.setState({
            carregando: true
        });

        // filtragem pela empresa
        if (empresaEscolhida) {
            getFeedsPorEmpresa(empresaEscolhida._id, proximaPagina).then((maisFeeds) => {
                this.mostrarMaisFeeds(maisFeeds);
            }).catch((erro) => {
                console.error("erro acessando feeds por empresa: " + erro)
            })
        } else if (nomeProduto) {
            getFeedsPorProduto(nomeProduto, proximaPagina).then((maisFeeds) => {
                this.mostrarMaisFeeds(maisFeeds);
            }).catch((erro) => {
                console.error("Error acessando feeds por produto: " + erro);
            });
        } else {
            getFeeds(proximaPagina).then((maisFeeds) => {
                this.mostrarMaisFeeds(maisFeeds);
            }).catch((erro) => {
                console.error("Error acessando feeds geral: " + erro);
            })
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
        this.setState({ atualizando: true, feeds: [], proximaPagina: 1, nomeProduto: null, empresaEscolhida: null }, () => {
            this.carregarFeeds();
        });
    }

    mostrarFeed = (feed) => {
        return (
            <FeedCard feed={feed} navegador={this.props.navigation} />
        );
    }

    atualizarNomeProduto = (nome) => {
        this.setState({
            nomeProduto: nome
        })
    }

    mostrarBarraPesquisa = () => {
        const { nomeProduto } = this.state;
        return (
            <CentralizadoNaMesmaLinha>
                <EntradaNomeProduto
                    onChangeText={(nome) => { this.atualizarNomeProduto(nome) }}
                    value={nomeProduto}>
                </EntradaNomeProduto>
                <Icon style={{ padding: 8 }} size={28} name="search1" onPress={
                    () => {
                        this.setState({
                            proximaPagina: 1,
                            feeds: []
                        }, () => {
                            this.carregarFeeds();
                        })
                    }
                }></Icon>
                <Icon size={28} name="calendar" onPress={
                    () => {
                        this.props.navigation.navigate("Validade")
                    }
                } />
            </CentralizadoNaMesmaLinha>
        );
    }

    mostrarMenu = () => {
        this.menu.openDrawer();
    }

    filtrarPorEmpresa = (empresa) => {
        this.setState({
            empresaEscolhida: empresa,
            proximaPagina: 1,
            feeds: []
        }, () => {
            this.carregarFeeds();
        })

        this.menu.closeDrawer();
    }

    mostrarFeeds = (feeds) => {
        const { atualizando } = this.state;

        return (
            <DrawerLayout
                drawerWidth={250}
                drawerPosition={DrawerLayout.positions.Right}
                ref={drawerElement => {
                    this.menu = drawerElement
                }}
                renderNavigationView={() => <Menu filtragem={this.filtrarPorEmpresa} />}
            >
                <CentralizadoNaMesmaLinha>
                    <Header
                        leftComponent={
                            <></>
                        }
                        centerComponent={
                            this.mostrarBarraPesquisa()
                        }
                        rightComponent={
                            <Icon style={{ padding: 8 }} size={28} name="menu-unfold" onPress={() => {
                                this.mostrarMenu()
                            }} />
                        }
                    ></Header>
                </CentralizadoNaMesmaLinha>
                <FlatList
                    data={feeds}
                    numColumns={2}

                    onEndReached={() => this.carregarMaisFeeds()}
                    onEndReachedThreshold={0.1}

                    onRefresh={() => this.atualizar()}
                    refreshing={atualizando}

                    keyExtractor={(item) => String(item._id)}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ width: '50%' }}>
                                {this.mostrarFeed(item)}
                            </View>
                        )
                    }}
                >
                </FlatList>
            </DrawerLayout>
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