import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useState } from "react";
import { styles } from "../config/styles";

export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nome, setNome] = useState("");
    const [repetirSenha, setRepetirSenha] = useState("");
    const [logradouro, setLogradouro] = useState("");
    const [Cep, setCep] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
    const [bairro, setBairro] = useState("");
    const [erro, setErro] = useState("");

    function realizaRegistro() {
        console.log("Fazer Registro");
        if(!email || !senha || !nome || !repetirSenha || !logradouro || !Cep || !cidade || !estado || !bairro){
            setErro("Por favor preencha todos os campos");
            return;
        }

        if (senha !== repetirSenha) {
            setErro("As senhas não coincidem. Refaça!");
            return;
          }
          // 3) Enviar os dados para a API do Firestore junto ao Firebase Auth
          // 4) Tratar os erros
          // 5) Redirecionar para a tela de Login
          fetch("URL_DA_API", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              senha: senha,
              nome: nome,
              logradouro: logradouro,
              cep: Cep,
              cidade: cidade,
              estado: estado
            }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Erro ao registrar. Por favor, tente novamente.');
              }
              return response.json();
            })
            .then((data) => {
              console.log("Sucesso:", data);
              // Limpar os campos após o registro bem-sucedido (opcional)
              setEmail("");
              setSenha("");
              setRepetirSenha("");
              setNome("");
              setLogradouro("");
              setCep("");
              setCidade("");
              setEstado("");
              setErro("");
              // Redirecionar para a tela de Login após o registro bem-sucedido
              navigation.navigate("LoginScreen");
            })
            .catch((error) => {
              console.error("Erro:", error.message);
              setErro(error.message);
            });
    }


    function buscaCEP() {
        console.log("Busca CEP");
        let cepLimpo = Cep.replace("-", "").trim();
        fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
            .then((res) => res.json())
            .then((dados) => {
                console.log(dados);
                setLogradouro(dados.logradouro);
                setCidade(dados.localidade);
                setEstado(dados.uf);
                setBairro(dados.bairro);
            })
            .catch((erro) => {
                console.log(erro);
                setErro("CEP não encontrado");
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <Text variant="headlineSmall">Faça seu Registro</Text>
                <TextInput
                    placeholder="Digite seu Nome Completo"
                    onChangeText={setNome}
                    value={nome}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Digite seu e-mail"
                    onChangeText={setEmail}
                    value={email}
                    style={styles.input}
                />
                <TextInput
                    secureTextEntry={true}
                    placeholder="Digite sua senha"
                    onChangeText={setSenha}
                    value={senha}
                    style={styles.input}
                />
                <TextInput
                    secureTextEntry={true}
                    placeholder="Digite sua senha novamente"
                    onChangeText={setRepetirSenha}
                    value={repetirSenha}
                    style={styles.input}
                />
                <View
                    style={{
                        paddingVertical: 20,
                    }}
                >
                <Text variant="headlineSmall">Dados Pessoais</Text>
                <TextInput
                    placeholder="Digite seu CEP(somente números)"
                    onChangeText={setCep}
                    value={Cep}
                    onBlur={buscaCEP}
                    style={styles.input}
                    keyboardType="numeric"
                    maxLength={8}
                />
                <TextInput
                    placeholder="Digite seu logradouro"
                    onChangeText={setLogradouro}
                    value={logradouro}
                    style={styles.input}
                />
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                <TextInput
                    placeholder="Digite seu cidade"
                    onChangeText={setCidade}
                    value={cidade}
                    style={{
                        ...styles.input,
                        width: "70%",
                    }}
                />
                <TextInput
                    placeholder="Digite seu estado"
                    onChangeText={setEstado}
                    value={estado}
                    style={{
                        ...styles.input,
                        width: "30%",
                    }}
                    maxLength={2}
                />
                <TextInput
                    placeholder="Digite seu bairro"
                    onChangeText={setBairro}
                    value={bairro}
                    style={styles.input}
                />
                </View>
                </View>
                <Button onPress={realizaRegistro} mode="outlined">Registrar</Button>
                <Button onPress={() => navigation.navigate("LoginScreen")}>
                    Voltar ao login
                </Button>
            </View>
        </View>
    );
}