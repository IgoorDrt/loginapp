import { useState } from "react";
import { TextInput } from "react-native-paper";
import { Icon } from "react-native-paper";

export default function InsertNote() {
  const [text, setText] = useState("");
  return (
    <>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Inserir nota"
        right={<TextInput.Icon name="send" />}
      />
    </>
  );
}
