import React, { Component }  from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

class Square extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <View style={styles.square}>
        <Button
        onPress={() => {Alert.alert('click')}}
        title={`${this.props.value}`}
        color="#000"
        style={styles.button}
        />
      </View>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
  }
  render() {
    status = 'Next player: X';

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{status}</Text>
        <View style={styles.row}>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </View>
        <View style={styles.row}>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </View>
        <View style={styles.row}>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
         </View>
     </View>
    );
  }
}

export default class Game extends Component {
  render() {
    return (
      <View style={{ alignItems: 'center', top: 100 }}>
        <View>
          <Board />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300,
  },
  text: {
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    borderColor: '#333',
    width: 100,
    height: 100,
    borderWidth: 1,
  },
  button: {
    width: 100,
    height: 100,
  }
});
