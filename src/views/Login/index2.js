import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Animated,
  CheckBox,
} from "react-native";
import { TextInput, Text } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import { useSetRecoilState } from "recoil";

export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  const setUser = useSetRecoilState(userState);

  const login = async () => {
    try {
      const data = await loginApi.login(username, password);
      setUser({
        loggedIn: true,
        access: data.access,
        refresh: data.refresh,
      });
      setUsername("");
      setPassword("");
      setErrorMsg(null);
      await SecureStore.setItemAsync("access", data.access);
      navigation.goBack();
    } catch (error) {
      setUser({ loggedIn: false, access: null, refresh: null });
      setErrorMsg("Usuário ou senha inválidos!");
      await SecureStore.deleteItemAsync("access");
    }
  };

  const [textUsernamePositionY, setTextUsernamePositionY] = useState(
    new Animated.Value(7)
  );

  const animatedTextUsernameFocus = () => {
    Animated.timing(textUsernamePositionY, {
      toValue: -20,
      duration: 300,
    }).start();
  };

  const animatedTextUsernameBlur = () => {
    Animated.timing(textUsernamePositionY, {
      toValue: 7,
      duration: 300,
    }).start();
  };

  const toggleUsernameIsFocused = (e) => {
    if (username !== "") return;
    if (e.type == "blur") {
      animatedTextUsernameBlur();
    } else if (e.type == "focus") {
      animatedTextUsernameFocus();
    }
  };
  const changeUsername = (text) => {
    setUsername(text);
  };

  const [textPasswordPositionY, setTextPasswordPositionY] = useState(
    new Animated.Value(7)
  );

  const animatedTextPasswordFocus = () => {
    Animated.timing(textPasswordPositionY, {
      toValue: -20,
      duration: 300,
    }).start();
  };

  const animatedTextPasswordBlur = () => {
    Animated.timing(textPasswordPositionY, {
      toValue: 7,
      duration: 300,
    }).start();
  };

  const togglePasswordIsFocused = (e) => {
    if (password !== "") return;
    if (e.type == "blur") {
      animatedTextPasswordBlur();
    } else if (e.type == "focus") {
      animatedTextPasswordFocus();
    }
  };
  const changePassword = (text) => {
    setPassword(text);
  };

  const [rememberMeIsChecked, setRememberMeIsChecked] = useState(false);

  const toggleRememberMeIsChecked = () => {
    setRememberMeIsChecked(!rememberMeIsChecked);
  };

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  return (
    <View style={styles.body}>
      <View style={styles.form}>
        <Image
          source={require("../../../public/logo.png")}
          style={styles.logo}
        />

        <View style={styles.inputsView}>
          <View style={styles.inputNameView}>
            <Image
              source={require("../../../public/userIcon.png")}
              style={styles.inputIcon}
            />
            <Animated.Text
              style={[
                styles.inputText,
                {
                  top: textUsernamePositionY,
                },
              ]}
            >
              Username
            </Animated.Text>
            <TextInput
              style={styles.inputName}
              onFocus={toggleUsernameIsFocused}
              onBlur={toggleUsernameIsFocused}
              value={username}
              onChangeText={setUsername}
            ></TextInput>
          </View>

          <View style={styles.inputPasswordView}>
            <Image
              source={require("../../../public/passwordIcon.png")}
              style={styles.inputIcon}
            />
            <Animated.Text
              style={[
                styles.inputText,
                {
                  top: textPasswordPositionY,
                },
              ]}
            >
              Password
            </Animated.Text>
            <TextInput
              style={styles.inputPassword}
              onFocus={togglePasswordIsFocused}
              onBlur={togglePasswordIsFocused}
              onChangeText={changePassword}
              value={password}
            ></TextInput>
          </View>
        </View>

        <View style={styles.actionView}>
          <View style={styles.rememberMe}>
            <Text style={styles.rememberMeText}>Remember me?</Text>
            <CheckBox
              display={false}
              value={rememberMeIsChecked}
              onValueChange={toggleRememberMeIsChecked}
            />
          </View>
          <Text>Forget Password</Text>
        </View>
      </View>

      <View style={styles.buttonView}>
        <TouchableOpacity onPress={() => login()} style={styles.button} />
        <Text>{errorMsg}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: "40%",
    width: "80%",
    backgroundColor: "#8BA651",
    borderRadius: 30,
    shadowColor: "#667338",
    shadowOffset: {
      width: 2,
      height: 2,
      blur: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 1.41,
  },
  logo: {
    width: 120,
    height: 120,
    position: "relative",
    top: -50,
  },
  inputsView: {
    display: "flex",
    flexDirection: "column",
    gap: 30,
    width: "100%",
    alignItems: "center",
    top: -30,
  },
  inputNameView: {
    position: "relative",
    display: "flex",
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
  },
  inputPasswordView: {
    position: "relative",
    display: "flex",
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
  },
  inputIcon: {
    width: 30,
    height: 30,
    backgroundColor: "#667338",
    padding: 10,
  },
  inputText: {
    position: "absolute",
    left: 35,
  },
  inputName: {
    width: "100%",
    height: 30,
    outlineStyle: "none",
    backgroundColor: "#FFFFFF84",
    paddingLeft: 5,
  },
  inputPassword: {
    width: "100%",
    height: 30,
    outlineStyle: "none",
    backgroundColor: "#FFFFFF84",
    paddingLeft: 5,
  },
  actionView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },
  rememberMe: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  buttonView: {
    width: "60%",
    backgroundColor: "#667338",
    display: "flex",
    alignItems: "center",
    borderEndEndRadius: 15,
    borderEndStartRadius: 15,
    justifyContent: "center",
    padding: 5,
  },
  button: {
    backgroundColor: "#40311E",
    width: "50%",
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
