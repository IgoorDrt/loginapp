import { useState } from "react";
import { TextInput } from "react-native-paper";
import { Icon } from "react-native-paper";
import { styles } from "../config/styles";

export default function InsertNote() {
  const [text, setText] = useState("");
  return (
    <>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Inserir nota"
        right={<TextInput.Icon icon="send" />}
        style={styles.input}
      />
    </>
  );
}
