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
type squares = {
  squares: string[]
};
const Board: FC = () => {
  const squares = Array(9).fill(null);
  const [history, setHistory] = useState([{squares: squares}]);
  const [xIsNext, setxIsNext] = useState(true);
  const [current, setCurrent] = useState(squares);
  const winner = calculateWinner(squares);
  const [stepNumber, setStepNumber] = useState(0);

  const handleClick = (i: number) => {
    const tmpHistory = history.slice(0, stepNumber + 1);
    const tmpCurrent: squares = tmpHistory[tmpHistory.length - 1];
    const tmpSquares: string[] = tmpCurrent.squares;
    if (calculateWinner(tmpSquares) || tmpSquares[i]) {
      return;
    }
    tmpSquares[i] = xIsNext ? 'X' : 'O';
    setHistory(
      history.concat([{
        squares: tmpSquares
      }])
    );
    setCurrent(tmpSquares);
    setxIsNext(!xIsNext);
    setStepNumber(tmpHistory.length);
  }

  const renderSquare = (i: number) => {
    return (
      <Square
        value={current[i]}
        onPress={() => handleClick(i)}
      />
    );
  }
  const jumpTo = (step: number) => {
    setStepNumber(step);
    setxIsNext((step % 2) === 0);
  }

  const moves = history.map((step, move) => {
    const desc = move ? 'Go to move #' + move : 'Go to game start';
    return (
      <View>
        <text>{move}</text>
        <TouchableOpacity
          onPress={() => jumpTo(move)}
          >
            <Text>{desc}</Text>
        </TouchableOpacity>
      </View>
    );
  });

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