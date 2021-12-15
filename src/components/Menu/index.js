import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { LoginOptionsMenu } from '../../components/Login';
import { getEmpresa, getImagem  } from '../../api';
import empresasEstaticas from '../../assets/dicionarios/empresas.json';
import Icon from 'react-native-vector-icons/AntDesign';
import feedsEstaticos from '../../assets/dicionarios/feeds.json';

import {
    Avatar,
    NomeEmpresa,
    ContainerMenu,
    EsquerdaDaMesmaLinha,
    DivisorMenu,
    DataProduto
} from '../../assets/styles';
export default class Menu extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            filtrar: props.filtragem,
            navegador: this.props.navegador,
            empresas: []
        }
    }

    componentDidMount = () => {
        getEmpresa().then((maisEmpresas) => {
            this.setState({
                empresas: maisEmpresas
            });
        }).catch((erro) => {
            console.error("Ocorreu um erro menu empresas: " + erro);
        })
    }

    mostrarEmpresa = (empresa) => {
        const { filtrar } = this.state
        return (
            <TouchableOpacity onPress={() => {
                filtrar(empresa)
            }}>
                <DivisorMenu />
                <EsquerdaDaMesmaLinha>
                    <Avatar source={getImagem(empresa.avatar)} />
                    <NomeEmpresa>{empresa.name}</NomeEmpresa>
                </EsquerdaDaMesmaLinha>
            </TouchableOpacity>
        );
    }

    mostrarValidade = () => {
        return (
            <Button
                icon={
                    <Icon
                        name={"google"}
                        size={22}
                        color={"#fff"}
                    />}
                title={" Login"}
                type={"solid"}/>
        );
    }

    render = () => {
        const { empresas } = this.state;
        const { navegador } = this.state;
        return (
            <SafeAreaInsetsContext.Consumer>
                {insets =>
                    <ScrollView style={{ paddingTop: insets.top }}>
                        <LoginOptionsMenu />
                        <ContainerMenu>
                            {empresas.map((empresa) => this.mostrarEmpresa(empresa))}
                        </ContainerMenu>
                    </ScrollView>
                }
            </SafeAreaInsetsContext.Consumer>
        );
    }
}