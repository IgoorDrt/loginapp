import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useState } from "react";
import { styles } from "../config/styles";

export default function RegisterScreen({ navigation }){
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nome, setNome] = useState("");
    const [repetirSenha, setRepetirSenha] = useState("");
    const [logradouro, setLogradouro] = useState("");
    const [Cep, setCep] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("")

    return(
        <View style={styles.container}>
            <Text>Faça seu Registro</Text>
            <TextInput
                placeholder="Digite seu Nome Completo"
                onChangeText={setNome}
                value={nome}
            />
            <TextInput
                placeholder="Digite seu e-mail"
                onChangeText={setEmail}
                value={email}
            />
            <TextInput
                secureTextEntry={true}
                placeholder="Digite sua senha"
                onChangeText={setSenha}
                value={senha}
            />
            <TextInput
                secureTextEntry={true}
                placeholder="Digite sua senha novamente"
                onChangeText={setRepetirSenha}
                value={repetirSenha}
            />
            <View
                style={{
                    paddingVertical: 20,
                }}
            />
            <Text>Dados Pessoais</Text>
            <TextInput
                placeholder="Digite seu CEP"
                onChangeText={setCep}
                value={Cep}
            />
            <TextInput
                placeholder="Digite seu logradouro"
                onChangeText={setLogradouro}
                value={logradouro}
            />
            <TextInput
                placeholder="Digite seu cidade"
                onChangeText={setCidade}
                value={cidade}
            />
            <TextInput
            placeholder="Digite seu estado"
            onChangeText={setEstado}
            value={estado}
            />

            <Button onPress={()=> navigation.navigate("LoginScreen")}>
                Voltar ao login
            </Button>
        </View>
    );
}