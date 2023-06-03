let numberNow = 0;
let numberMax = 0;
let numberList = [];

class TweenNumberScroll {
  constructor(element, startPos, endPos, speed) {
    TWEEN.autoPlay(true); // 自動撥放
    let obj = {
      top: startPos.top,
    };
    this._tweenWork = new TWEEN.Tween(obj)
      .to(
        {
          top: endPos.top,
        },
        speed
      )
      .easing(TWEEN.Easing.Linear.None)
      .on("update", () => {
        element.style.top = obj.top + "%";
        // console.log(obj);
        //
      })
      .start();
  }
}

window.onload = async function () {
  console.log("--- Lottery Mechine v1.0 ---");

  if (document.querySelector("#resetBtn") != null) {
    document.querySelector("#resetBtn").addEventListener("click", resetBalls);
  }

  if (document.querySelector("#drawBallBtn") != null) {
    document.querySelector("#drawBallBtn").addEventListener("click", drawBall);
  }

  resetBalls();
};

function resetBalls() {
  document.querySelector("#waitingWrap").innerHTML = "";
  document.querySelector("#drawnWrap").innerHTML = "";

  let num1 = document.querySelector("#numInput1").value;
  let num2 = document.querySelector("#numInput2").value;
  if (num1 == "") num1 = 0;
  if (num2 == "") num2 = 0;
  const startNum = num1 >= num2 ? parseInt(num2) : parseInt(num1);
  const endtNum = num1 >= num2 ? parseInt(num1) : parseInt(num2);
  const digits = endtNum.toString().length;

  document.querySelector("#numBack").innerHTML = "";
  for (let i = 0; i < digits; i++) {
    const newDIv = document.createElement("div");
    newDIv.innerHTML = "-";
    newDIv.dataset.digit = digits - i - 1;
    document.querySelector("#numBack").appendChild(newDIv);
  }

  numberList = [];
  for (let i = startNum; i <= endtNum; i++) {
    const newBall = document.createElement("div");
    newBall.innerHTML = i;
    newBall.dataset.num = i;
    document.querySelector("#waitingWrap").appendChild(newBall);
    numberList.push(i);
  }
  // new TweenNumberScroll(startNum, endtNum, 2000);
}

async function drawBall() {
  if (numberList.length == 0) {
    alert("已經沒有球囉！");
    return;
  }
  const drawBall = document.querySelector("#drawBallBtn");
  if (drawBall != null) {
    new TweenNumberScroll(drawBall, { top: 0 }, { top: 75 }, 100);
    setTimeout(() => {
      new TweenNumberScroll(drawBall, { top: 75 }, { top: 0 }, 100);
    }, 100);
    drawBall.style.pointerEvents = "none";
    setTimeout(() => {
      drawBall.style.pointerEvents = "all";
    }, 1000 + numberNow.toString().length * 100);
  }

  // 生成隨機索引
  var randomIndex = Math.floor(Math.random() * numberList.length);

  // 從原清單中提取一顆
  numberNow = numberList.splice(randomIndex, 1)[0];

  const numDivs = document.querySelectorAll("#numBack > div");
  for (let i = 0; i < numDivs.length; i++) {
    const numDiv = numDivs[i];
    numDiv.dataset.num = "0";
    numberScroll(numDiv, 1000);
    await sleep(100);
  }
  setTimeout(() => {
    const ballDiv = document.querySelector(
      `#waitingWrap > div[data-num='${numberNow}']`
    );
    if (ballDiv != null) {
      document.querySelector(`#drawnWrap`).appendChild(ballDiv);
    }
  }, 1000);
}

function sleep(time) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve();
    }, time);
  });
}

function numberScroll(numDiv, time) {
  const newInterval = window.setInterval(() => {
    const num = parseInt(numDiv.dataset.num || "0");
    const newNum = num >= 9 ? 0 : num + 1;
    numDiv.innerHTML = newNum;
    numDiv.dataset.num = newNum;
    // console.log(newNum);
  }, 50);
  setTimeout(() => {
    const digit = parseInt(numDiv.dataset.digit);
    numDiv.innerHTML = Math.floor(
      (numberNow % Math.pow(10, digit + 1)) / Math.pow(10, digit)
    );
    window.clearInterval(newInterval);
  }, time);
}
