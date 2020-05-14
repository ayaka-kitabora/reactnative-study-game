import React, { FC, useState }  from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ShadowPropTypesIOS } from 'react-native';

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

interface BoardProps {
  onPress: (number) => void
  squares: string[]
};
const Board: FC<BoardProps> = (props) => {

  const renderSquare = (i: number) => {
    return (
      <Square
        value={props.squares[i]}
        onPress={() => props.onPress(i)}
      />
    );
  }

  return (
    <View style={styles.container}>
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

type squares = {
  squares: string[]
};
const App: FC = () => {
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
    setxIsNext(!xIsNext);
    setStepNumber(tmpHistory.length);
  }
  const jumpTo = (step: number) => {
    setStepNumber(step);
    setxIsNext((step % 2) === 0);
  }

  const moves = history.map((step, move) => {
    const desc = move ? 'Go to move #' + move : 'Go to game start';
    return (
      <View style={styles.move}>
        <Text style={styles.moveNumber}>{move}</Text>
        <TouchableOpacity
          style={styles.moveButton}
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
    <View style={{ alignItems: 'center', top: 100 }}>
      <View>
        <Board 
            squares={current}
            onPress={(i) => handleClick(i)}
            />
        <View>
          <Text style={styles.text}>{status}</Text>
          <View>{moves}</View>
        </View>
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
  },
  move: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  moveNumber: {
    marginRight: 10,
    width: 15,
    padding: 3,
  },
  moveButton: {
    borderColor: '#333',
    borderWidth: 1,
    width: 130,
    padding: 3,
    borderRadius: 3,
  }
});

export default App;