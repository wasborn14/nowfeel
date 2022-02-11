import React, {useState} from 'react';
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
  const [loginEmail, setLoginEmail] = useState('example1@example.com');
  const [loginPassword, setLoginPassword] = useState('password');
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegisterScreen, setIsRegisterScreen] = useState(false);

  onAuthStateChanged(auth, currentUser => {
    setUser(currentUser);
  });

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setIsLoggedIn(false);
  };

  const changeRegisterScreen = () => {
    setIsRegisterScreen(prev => !prev);
  };

  return (
    <>
      {isLoggedIn ? (
        <View style={styles.container}>
          <View style={styles.form}>
            <View style={styles.titleWrap}>
              <Text style={styles.title}>LoggedIn</Text>
            </View>
            <View style={styles.titleWrap}>
              <Text style={styles.title}>{user?.email}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={logout}>
              <Text style={styles.buttonText}>サインアウト</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          {isRegisterScreen ? (
            <>
              <View>
                <View style={styles.container}>
                  <View style={styles.form}>
                    <View style={styles.titleWrap}>
                      <Text style={styles.title}>Login</Text>
                    </View>
                    <View style={styles.inputWrap}>
                      <TextInput
                        style={styles.input}
                        defaultValue={email}
                        onChangeText={text => setEmail(text)}
                        placeholder="email"
                        autoCapitalize="none"
                      />
                    </View>
                    <View style={styles.inputWrap}>
                      <TextInput
                        defaultValue={password}
                        onChangeText={text => setPassword(text)}
                        style={styles.input}
                        placeholder="password"
                        autoCapitalize="none"
                      />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={register}>
                      <Text style={styles.buttonText}>登録する</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={changeRegisterScreen}>
                      <Text style={styles.buttonText}>戻る</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </>
          ) : (
            <View style={styles.container}>
              <View style={styles.form}>
                <View style={styles.titleWrap}>
                  <Text style={styles.title}>Login</Text>
                </View>
                <View style={styles.inputWrap}>
                  <TextInput
                    style={styles.input}
                    defaultValue={email}
                    onChangeText={text => setLoginEmail(text)}
                    placeholder="email"
                    autoCapitalize="none"
                  />
                </View>
                <View style={styles.inputWrap}>
                  <TextInput
                    defaultValue={password}
                    onChangeText={text => setLoginPassword(text)}
                    style={styles.input}
                    placeholder="password"
                    autoCapitalize="none"
                  />
                </View>
                <TouchableOpacity style={styles.button} onPress={login}>
                  <Text style={styles.buttonText}>ログイン</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={changeRegisterScreen}>
                  <Text style={styles.buttonText}>新規登録</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </>
      )}
    </>
  );

  //  return (
  //     <View style={styles.container}>
  //       <Text>ユーザ登録</Text>
  //       <View>
  //         <View style={styles.inputWrap}>
  //           <View>
  //             <Text>メールアドレス</Text>
  //             <TextInput
  //               style={styles.input}
  //               onChangeText={text => setEmail(text)}
  //               name="email"
  //               type="email"
  //               placeholder="email"
  //             />
  //           </View>
  //           <View>
  //             <Text>パスワード</Text>
  //             <TextInput
  //               style={styles.input}
  //               onChangeText={text => setPassword(text)}
  //               name="password"
  //               type="password"
  //             />
  //           </View>
  //           <View>
  //             <TouchableOpacity onPress={register}>
  //               <Text>登録</Text>
  //             </TouchableOpacity>
  //           </View>
  //         </View>
  //         <View>
  //           <Text>{user?.email}</Text>
  //         </View>
  //         <View style={styles.inputWrap}>
  //           <View>
  //             <Text>メールアドレス</Text>
  //             <TextInput
  //               style={styles.input}
  //               onChangeText={text => setLoginEmail(text)}
  //               name="email"
  //               type="email"
  //               placeholder="email"
  //               autoCapitalize="none"
  //             />
  //           </View>
  //           <View>
  //             <Text>パスワード</Text>
  //             <TextInput
  //               style={styles.input}
  //               onChangeText={text => setLoginPassword(text)}
  //               name="password"
  //               type="password"
  //               autoCapitalize="none"
  //             />
  //           </View>
  //           <View>
  //             <TouchableOpacity onPress={login}>
  //               <Text>ログイン</Text>
  //             </TouchableOpacity>
  //           </View>
  //         </View>
  //         <View>
  //           <TouchableOpacity onPress={logout}>
  //             <Text>サインアウト</Text>
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //     </View>
  //   );
};

const styles = StyleSheet.create({
  // container: {
  //   marginTop: 200,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // inputWrap: {
  //   flexDirection: 'row',
  // },
  // input: {
  //   marginTop: 20,
  //   height: 30,
  //   width: 100,
  //   borderColor: 'black',
  //   borderWidth: 1,
  // },
  container: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: 300,
    height: 400,
    alignItems: 'center',
  },
  titleWrap: {
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  inputWrap: {
    marginTop: 32,
  },
  input: {
    fontSize: 20,
    backgroundColor: '#f2f2f2',
    height: 40,
    width: 200,
  },
  button: {
    marginTop: 20,
    width: 100,
    height: 30,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
  },
});

export default SignUp;
