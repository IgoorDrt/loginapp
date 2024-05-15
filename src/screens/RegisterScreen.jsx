import { View } from "react-native";
import { Button, Surface, Text, TextInput } from "react-native-paper";
import { useState } from "react";
import { styles } from "../config/styles";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db} from "../config/firebase";
import { collection } from "firebase/firestore";


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
    const [erro, setErro] = useState({
        email: false,
        senha: false,
        repetirSenha: false,
        nome: false,
        Cep: false,
        cidade: false,
        estado: false,
      });

    function realizaRegistro() {
       
        if (nome === "") {
            setErro({ ...erro, nome: true });
            return;
          }
          setErro({ ...erro, nome: false });
          if (email === "") {
            setErro({ ...erro, email: true });
            return;
          }
          setErro({ ...erro, email: false });
          if (senha === "") {
            setErro({ ...erro, senha: true });
            return;
          }
          setErro({ ...erro, senha: false });
          if (repetirSenha === "") {
            setErro({ ...erro, repetirSenha: true });
            return;
          }
          setErro({ ...erro, repetirSenha: false });
          if (Cep === "") {
            setErro({ ...erro, Cep: true });
            return;
          }
          setErro({ ...erro, Cep: false });
          if (cidade === "") {
            setErro({ ...erro, cidade: true });
            return;
          }
          setErro({ ...erro, cidade: false });
          if (estado === "") {
            setErro({ ...erro, estado: true });
            return;
          }
          setErro({ ...erro, estado: false });

          if (senha !== repetirSenha) {
            setErro({ ...erro, senha: true, repetirSenha: true });
            return;
          }
          setErro({ ...erro, senha: false, repetirSenha: false });

        cadastrarNoFirebase();
    }
    async function cadastrarNoFirebase(){
        try{
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                senha
            );
            const user = userCredential.user;
            console.log("Usuário cadastrado", user);

            const collectionRef = collection(db, "Usuarios");

            const docRef = await setDoc(doc(collectionRef,user.uid),{
                nome: nome,
                logradouro: logradouro,
                Cep: Cep,
                cidade: cidade,
                estado: estado,
                bairro: bairro,
            });

        }catch(error){
            console.error(error);
        }
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
        <Surface style={styles.container}>
            <View style={styles.innerContainer}>
                <Text variant="headlineSmall">Faça seu Registro</Text>
                <TextInput
                    placeholder="Digite seu Nome Completo"
                    onChangeText={setNome}
                    value={nome}
                    style={styles.input}
                    autoFocus={true}
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
        </Surface>
    );
}