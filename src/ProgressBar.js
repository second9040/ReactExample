import React, { useEffect } from "react";
import "./ProgressBar.css";

const ProgressBar = () => {
  const [progressValue, setProgressValue] = React.useState(70);
  const [progressWidth, setProgressWidth] = React.useState("");

  let getProgressBarWidth = () => {
    if (window.innerWidth < 351) {
      setProgressWidth("20px");
    } else {
      setProgressWidth("200px");
    }
  };
  let holdDown = (operate) => {
    setProgressValue((progressValue) => Number(progressValue) + operate);
    let time = new Date();
    setInterval(() => {
      let nowTime = new Date();
      if (nowTime.getTime() - time.getTime() > 500) {
        setProgressValue((progressValue) => Number(progressValue) + operate);
      }
    }, 100);
  };
  let holdUp = () => {
    for (let i = 1; i < 99999; i++) {
      window.clearInterval(i);
    }
  };

  let OperateButton = (props) => {
    return (
      <button
        className={props.className}
        onMouseDown={() => {
          holdDown(props.type);
        }}
        onMouseUp={() => holdUp()}
      >
        {props.operatetion}
      </button>
    );
  };

  useEffect(() => {
    window.innerWidth > 350
      ? setProgressWidth("200px")
      : setProgressWidth("20px");
    window.addEventListener("resize", getProgressBarWidth);
  }, []);

  let barContainerStyle = () => {
    let sameStyle = {
      width: progressWidth,
      border: "solid #ccc 1px",
      borderRadius: "10px",
      position: "relative",
    };
    if (progressWidth === "200px") {
      return {
        ...sameStyle,
        height: "15px",
        padding: "1px",
        margin: "20px auto",
      };
    }
    return {
      ...sameStyle,
      height: "195px",
      padding: "0",
      margin: "0 20px",
    };
  };

  let barStyle = () => {
    let sameStyle = {
      borderRadius: "10px",
      position: "absolute",
      bottom: "0",
    };
    if (progressWidth === "200px") {
      return {
        ...sameStyle,
        background:
          "linear-gradient(to left, rgb(255, 181, 219) 0%, rgb(255, 239, 234) 50%, rgb(255, 181, 219) 100%)",
        width: progressValue === "" ? "0.1%" : `${progressValue}%`,
        height: "100%",
      };
    }
    return {
      ...sameStyle,
      background:
        "linear-gradient(to bottom, rgb(255, 181, 219) 0%, rgb(255, 239, 234) 50%, rgb(255, 181, 219) 100%)",
      width: "100%",
      height: progressValue === "" ? "0.1%" : `${progressValue}%`,
    };
  };
  return (
    <div>
      <div className="titleContainer">
        <h2 className="title titleProgressBar">
          [React] state練習 可長按設定的進度條
        </h2>
      </div>
      <div className="progressSettingField">
        <h3>設定進度</h3>
        <div className="forMobileLayout">
          <div className="progressContainer">
            <OperateButton type={-1} operatetion="-" className="btnStyle sub" />
            <input
              type="text"
              value={progressValue}
              placeholder="輸入1~100以內的整數數字"
              onChange={(event) => {
                let value = event.target.value;
                if (
                  /^[1-9]{1}\d?$/.test(value) ||
                  value === "" ||
                  value === "100"
                ) {
                  setProgressValue(value);
                }
              }}
            ></input>
            <OperateButton type={1} operatetion="+" className="btnStyle add" />
          </div>
          <div style={barContainerStyle()}>
            <div style={barStyle()}></div>
          </div>
        </div>
        <p className="barText">{progressValue === "" ? 0 : progressValue}%</p>
      </div>
      <div className="instruction">
        <h3>功能說明</h3>
        <ul>
          <li>點選 input 左右的按鈕可以對進度條進行減或加的操作。</li>
          <li>也可以直接輸入，只能輸入1~100的整數數字。</li>
          <li>input 改變，狀態條填滿程度會改變，狀態條下方數字也會改變。</li>
          <li>按鈕長按則連續加/減。</li>
          <li>螢幕寬度不足時進度條直向顯示。</li>
        </ul>
      </div>
    </div>
  );
};
export default ProgressBar;
