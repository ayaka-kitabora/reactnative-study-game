import React, { FC, useState }  from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

interface SquareProps {
  onPress: () => void
  value: string
}
const Square: FC<SquareProps> = (props) => {
  return (
    <TouchableOpacity
      onPress={() => props.onPress()}
      >
      <View style={styles.square}>
        <Text style={styles.squareText}>{props.value}</Text>
      </View>
    </TouchableOpacity>
  );
};

interface Props {}
interface State {
  squares: string[]
  xIsNext: boolean
}
const Board: FC = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setxIsNext] = useState(true);

  const handleClick = (i: number) => {
    const tmpSquares: string[] = squares.slice();
    if (calculateWinner(tmpSquares) || tmpSquares[i]) {
      return;
    }
    tmpSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(tmpSquares);
    setxIsNext(!xIsNext);
  }

  const renderSquare = (i: number) => {
    return (
      <Square
        value={squares[i]}
        onPress={() => handleClick(i)}
      />
    );
  }

  const winner = calculateWinner(squares);
  let status: string;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{status}</Text>
      <View style={styles.row}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </View>
      <View style={styles.row}>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </View>
      <View style={styles.row}>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
       </View>
   </View>
  );
};

// ヘルパー関数(あとでロジック差し替えたい)
function calculateWinner(squares: string[]) {
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

const App: FC = () => {
  return (
    <View style={{ alignItems: 'center', top: 100 }}>
      <View>
        <Board />
      </View>
    </View>
  );
};


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

export default App;