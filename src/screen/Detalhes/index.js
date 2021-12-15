import React from 'react';
import { View } from 'react-native';
import { Header } from 'react-native-elements';
import { SliderBox } from 'react-native-image-slider-box';
import CardView from 'react-native-cardview';
import Icon from 'react-native-vector-icons/AntDesign';
import { Avatar, NomeProduto, DescricaoProduto, DataProduto, PrecoProduto, NomeEmpresa, CentralizadoNaMesmaLinha, Espacador } from '../../assets/styles';

import { getFeed, getImagem } from '../../api';
import Compartilhador from '../../components/Compartilhador';

const TOTAL_IMAGENS_SLIDE = 3;
export default class Detalhes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            feedId: this.props.navigation.state.params.feedId,
            feed: null
        }
    }

    carregarFeed = () => {
        const { feedId } = this.state;

        getFeed(feedId).then((feedAtualizado) => {
            this.setState({
                feed: feedAtualizado
            })
        }).catch((erro) => {
            console.error("error atualizando o detalhe do produto: " + erro);
        });
    }

    componentDidMount = () => {
        this.carregarFeed();
    }

    mostrarSlides = () => {
        const { feed } = this.state;
        let slides = [];
        for (let i = 0; i < TOTAL_IMAGENS_SLIDE; i++) {
            if (feed.product.blobs[i].file) {
                slides = [...slides, getImagem(feed.product.blobs[i].file)]
            }
        }
        return (
            <SliderBox
                dotColor={"#ffad05"}
                inactiveDotColor={"#5995ed"}
                resizeMethod={'resize'}
                resizeMode={'cover'}
                dotStyle={{
                    width: 15,
                    height: 15,
                    borderRadius: 15,
                    marginHorizontal: 5
                }}
                images={slides}
            />
        )
    }

    render = () => {
        const { feed } = this.state;
        if (feed) {
            return (
                <>
                    <Header
                        leftComponent={
                            <Icon size={28} name="left" onPress={() => {
                                this.props.navigation.goBack();
                            }} />
                        }
                        centerComponent={
                            <CentralizadoNaMesmaLinha>
                                <Avatar source={getImagem(feed.company.avatar)} />
                                <NomeEmpresa>{feed.company.name}</NomeEmpresa>
                            </CentralizadoNaMesmaLinha>
                        }
                        rightComponent={
                            <>
                                <Compartilhador feed={feed} />
                            </>
                        }
                    >
                    </Header>
                    <CardView
                        cardElevation={2}
                        cornerRadius={0}
                    >
                        {this.mostrarSlides()}
                        <View style={{ padding: 8 }}>
                            <Espacador />
                            <NomeProduto>{feed.product.name}</NomeProduto>
                            <Espacador />
                            <DescricaoProduto>{feed.product.description}</DescricaoProduto>
                            <Espacador />
                            <CentralizadoNaMesmaLinha>
                                <PrecoProduto>{"R$ " + feed.product.price}  </PrecoProduto>
                                <DataProduto>{feed.product.date}</DataProduto>
                            </CentralizadoNaMesmaLinha>
                            <Espacador />
                        </View>
                    </CardView>
                </>
            );
        } else {
            return (null);
        }
    }
}