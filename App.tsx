import React, { Component }  from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class Square extends Component {
  render() {
    return (
      <Button
      title={`${this.props.value}`} // titleはstringじゃないとエラー
      style={styles.square}
      />
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
      <View>
        <Text>{status}</Text>
        <View>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </View>
        <View>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </View>
        <View>
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
      <View style={{ alignItems: 'center', top: 50 }}>
        <View>
          <Board />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    borderColor: '#333',
    borderWidth: 1,
    width: '30%',
    backgroundColor: '#222'
  }
});
