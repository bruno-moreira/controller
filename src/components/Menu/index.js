import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { LoginOptionsMenu } from '../../components/Login';
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
import avatar from '../../assets/img/avatar.png';
export default class Menu extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            filtrar: props.filtragem,
            navegador: this.props.navegador
        }
    }

    mostrarEmpresa = (empresa) => {
        const { filtrar } = this.state
        return (
            <TouchableOpacity onPress={() => {
                filtrar(empresa)
            }}>
                <DivisorMenu />
                <EsquerdaDaMesmaLinha>
                    <Avatar source={avatar} />
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
        const empresas = empresasEstaticas.empresas;
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