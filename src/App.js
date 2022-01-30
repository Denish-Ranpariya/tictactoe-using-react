import logo from './logo.svg';

import Icon from './components/Icon';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card, CardBody, Container, Button, Col, Row } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import './App.css';

const itemArray = new Array(9).fill("empty");

function App() {
  const [isCross, setIsCross] = useState(false);
  const [winMessage, setWinMessage] = useState("");

  const reloadGame = () => {
    setIsCross(false);
    setWinMessage("");
    itemArray.fill("empty", 0, 9);
  }

  const checkIsWinner = () => {
    if (compareElements(0, 1, 2)) {
      setWinMessage(`${itemArray[0]} wins`);
    } else if (compareElements(3, 4, 5)) {
      setWinMessage(`${itemArray[3]} wins`);
    } else if (compareElements(6, 7, 8)) {
      setWinMessage(`${itemArray[6]} wins`);
    } else if (compareElements(0, 3, 6)) {
      setWinMessage(`${itemArray[0]} wins`);
    } else if (compareElements(1, 4, 7)) {
      setWinMessage(`${itemArray[1]} wins`);
    } else if (compareElements(2, 5, 8)) {
      setWinMessage(`${itemArray[2]} wins`);
    } else if (compareElements(0, 4, 8)) {
      setWinMessage(`${itemArray[0]} wins`);
    } else if (compareElements(2, 4, 6)) {
      setWinMessage(`${itemArray[2]} wins`);
    }
  }

  const compareElements = (pos1, pos2, pos3) => {
    if (itemArray[pos1] !== "empty" && itemArray[pos1] === itemArray[pos2] && itemArray[pos2] === itemArray[pos3]) {
      return true;
    } else {
      return false;
    }
  }

  const changeItem = (itemNumber) => {
    if (winMessage) {
      return toast(winMessage, { type: "success" });
    }

    if (itemArray[itemNumber] === "empty") {
      itemArray[itemNumber] = isCross ? "cross" : "circle";
      setIsCross(!isCross);
    } else {
      return toast("Already filled", { type: "error" });
    }

    checkIsWinner();
  }

  return (
    <Container className='p-5'>
      <ToastContainer position='bottom-center' />
      <Row>
        <Col md={6} className='offset-md-3'>
          {winMessage ? (
            <div className="mb-2 mt-2">
              <h1 className="text-success text-uppercase text-center">
                {winMessage}
              </h1>
              <Button color='success' block onClick={reloadGame}> Reload the game </Button>
            </div>

          ) : (
            <h1 className='text-center text-warning'>
              {isCross ? "Cross" : "Circle"} turns
            </h1>
          )}
          <div className='grid'>
            {itemArray.map((item, index) => {
              return <Card color='warning' onClick={() => changeItem(index)}>
                <CardBody className='box'>
                  <Icon name={item} />
                </CardBody>
              </Card>
            })}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
