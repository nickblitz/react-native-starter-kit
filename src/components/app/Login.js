import React from 'react';
import {
  Container, Content, Text, Button,
} from 'native-base';
import { StyleSheet, View } from 'react-native';
import { AuthConsumer } from '../base/Auth/AuthContext';

const styles = StyleSheet.create({
  buttonTitle: {
    textAlign: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

const Login = () => (
  <Container>
    <Content contentContainerStyle={styles.container} padder>
      <View>
        <AuthConsumer>
          {({ initiateLogin }) => (
            <Button block onPress={initiateLogin} success style={styles.buttonTitle}>
              <Text style={styles.buttonTitle}>Get Started</Text>
            </Button>
          )}
        </AuthConsumer>
      </View>
    </Content>
  </Container>
);

export default Login;
