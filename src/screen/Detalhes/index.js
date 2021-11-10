import React from 'react';
import { SliderBox } from 'react-native-image-slider-box';
import CardView from 'react-native-cardview';
import { NomeProduto, DescricaoProduto, DataProduto, PrecoProduto } from '../../assets/styles';

import feedsEstaticos from '../../assets/dicionarios/feeds.json';
import slide1 from '../../assets/img/slide1.jpeg'
import slide2 from '../../assets/img/slide2.jpg'
import slide3 from '../../assets/img/slide3.png'


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
        const feeds = feedsEstaticos.feeds;
        const feedsFiltrados = feeds.filter((feed) => feed._id === feedId);

        if (feedsFiltrados.length) {
            this.setState({
                feed: feedsFiltrados[0]
            })
        }
    }

    componentDidMount = () => {
        this.carregarFeed();
    }

    mostrarSlides = () => {
        const slides = [ slide1, slide2, slide3 ];

        return(
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
                <CardView
                    cardElevation={2}
                    cornerRadius={0}
                >
                    { this.mostrarSlides() }
                    <NomeProduto>{feed.product.name}</NomeProduto>
                    <DescricaoProduto>{feed.product.description}</DescricaoProduto>
                    <PrecoProduto>{"R$ "+feed.product.price}</PrecoProduto>
                    <DataProduto>{feed.product.date}</DataProduto>
                </CardView>
            );
        }else{
            return(null);
        }
    }
}