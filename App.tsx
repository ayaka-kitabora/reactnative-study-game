import React, { Component }  from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity } from 'react-native';

function Square(props) {
  return (
    <TouchableOpacity
      onPress={() => props.onPress()}
    >
    <View style={styles.square}>
      <Text style={styles.squareText}>{props.value}</Text>
    </View>
    </TouchableOpacity>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onPress={() => this.handleClick(i)}
      />
    );
  }
  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

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
// ヘルパー関数(あとでロジック差し替えたい)
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
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
  squareText: {
    fontSize: 60,
    textAlign: 'center',
    lineHeight: 100,
  },
  button: {
    width: 100,
    height: 100,
  }
});
