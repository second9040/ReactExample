import React from "react";
import "./DrawGame.css";

const btnStyle = {
  background: "#a49ef0",
  border: "solid #a49ef0 1px",
  borderRadius: 10,
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 20,
  paddingRight: 20,
};

const DrawGame = (props) => {
  const [originalDraw, setOriginalDraw] = React.useState(true);
  const [draw, setDraw] = React.useState(0);
  let buttonClick = () => {
    setOriginalDraw(false);
    let randomDraw = Math.floor(Math.random() * 10);
    while (draw === randomDraw) {
      // 避免亂數到同一個數字的狀況
      randomDraw = Math.floor(Math.random() * 10);
    }
    setDraw(randomDraw);
  };
  let clickDraw = () => {
    setOriginalDraw(true);
  };
  let instructionText = [
    "點選 [抽獎] 按鈕進行抽獎，抽到數字為2的倍數即中獎。",
    "點選 [清除結果] 按鈕清除抽獎結果，第一次載入網頁與甫按下 [清除結果] 之後不能點選。",
    "亂數數字有做處理，本次與上一次相同時重新取值，確保連續兩次的結果不會相同。",
  ];
  let DrawResult = () => {
    return originalDraw === true ? (
      <div
        style={{
          color: "#ff88bb",
          textAlign: "center",
        }}
      >
        試試手氣吧，抽到2的倍數就是中獎~
      </div>
    ) : draw % 2 === 0 ? (
      <div style={{ color: "red" }}>抽到 {draw} !!! 恭喜中獎</div>
    ) : (
      <div style={{ color: "#bbb" }}>抽到 {draw} ... 銘謝惠顧</div>
    );
  };
  let childrenArr = (children) => {
    let i = 0;
    let returnTmp = [];
    while (i < children.length) {
      returnTmp.push(<li key={i}>{children[i++]}</li>);
    }
    return returnTmp;
  };

  return (
    <div>
      <div className="titleContainer">
        <h2 className="title">[React] 抽獎小遊戲 陣列渲染實作練習</h2>
      </div>
      <div className="drawBox">
        <button onClick={buttonClick} style={btnStyle} className="btn">
          抽獎
        </button>
        <button
          onClick={clickDraw}
          className="btn clearStyle"
          disabled={originalDraw}
        >
          清除結果
        </button>
        <DrawResult />
      </div>
      <div className="instruction">
        <h3>使用 props.children 傳入 array</h3>
        <ul>{childrenArr(props.children)}</ul>
      </div>
      <div className="instruction">
        <h3>功能說明(一般)</h3>
        <ul>
          <li>
            點選 [<span style={{ color: "#a49ef0" }}>抽獎</span>]
            按鈕進行抽獎，抽到數字為2的倍數即中獎。
          </li>
          <li>
            點選 [<span style={{ color: "#ff88bb" }}>清除結果</span>]
            按鈕清除抽獎結果，第一次載入網頁與甫按下 [
            <span style={{ color: "#ff88bb" }}>清除結果</span>] 之後不能點選。
          </li>
          <li>
            亂數數字有做處理，本次與上一次相同時重新取值，確保連續兩次的結果不會相同。
          </li>
        </ul>
      </div>
      <div className="instruction">
        <h3>功能說明(陣列)</h3>
        <ul>
          {instructionText.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default DrawGame;
