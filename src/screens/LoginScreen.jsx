import { useState } from "react";
import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

export default function LoginScreen({navigation}){
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();

    function realizaLogin(){
        console.log("Fazer Login")
    }
    
    return(
        <View>
            <Text>Faça seu Login</Text>
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
            <Button onPress={realizaLogin}>Fazer Login</Button>
            <Button onPress={()=>navigation.navigate("RegisterScreen")}>Faça seu cadastro</Button>
        </View>
    );
}