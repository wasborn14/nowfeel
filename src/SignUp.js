import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import {auth} from './firebase-config';

const SignUp = () => {
  const [email, setEmail] = useState('example1@example.com');
  const [password, setPassword] = useState('password');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, currentUser => {
    setUser(currentUser);
  });

  const register = async () => {
    try {
      console.log('email', email);
      console.log('password', password);
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async () => {
    try {
      console.log('email', loginEmail);
      console.log('password', loginPassword);
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword,
      );
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <View style={styles.container}>
      <Text>ユーザ登録</Text>
      <View>
        <View style={styles.inputWrap}>
          <View>
            <Text>メールアドレス</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => setEmail(text)}
              name="email"
              type="email"
              placeholder="email"
            />
          </View>
          <View>
            <Text>パスワード</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => setPassword(text)}
              name="password"
              type="password"
            />
          </View>
          <View>
            <TouchableOpacity onPress={register}>
              <Text>登録</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text>{user?.email}</Text>
        </View>
        <View style={styles.inputWrap}>
          <View>
            <Text>メールアドレス</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => setLoginEmail(text)}
              name="email"
              type="email"
              placeholder="email"
              autoCapitalize="none"
            />
          </View>
          <View>
            <Text>パスワード</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => setLoginPassword(text)}
              name="password"
              type="password"
              autoCapitalize="none"
            />
          </View>
          <View>
            <TouchableOpacity onPress={login}>
              <Text>ログイン</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={logout}>
            <Text>サインアウト</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrap: {
    flexDirection: 'row',
  },
  input: {
    marginTop: 20,
    height: 30,
    width: 100,
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default SignUp;
