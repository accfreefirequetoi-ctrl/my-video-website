const gif = document.getElementById("mainGif");
const frozenFrame = document.getElementById("frozenFrame");
const stage = document.getElementById("stage");
const message = document.getElementById("message");
const messageText = document.getElementById("messageText");
const startButton = document.getElementById("startButton");
const fullscreenButton = document.getElementById("fullscreenButton");

const TOTAL_LOOPS = 10;
// Estimated duration from the Tenor listing; timing may vary slightly by browser.
const LOOP_DURATION_MS = 4700;

let loopsCompleted = 0;
let timer = null;
let started = false;
let finished = false;

function showMessage(text, showStart = false) {
  messageText.textContent = text;
  startButton.hidden = !showStart;
  message.hidden = false;
}

function hideMessage() {
  message.hidden = true;
}

async function tryFullscreen() {
  try {
    if (document.fullscreenElement) return true;
    if (stage.requestFullscreen) {
      await stage.requestFullscreen();
      return true;
    }
  } catch (_) {}
  return false;
}

function freezeLastFrame() {
  const width = gif.naturalWidth || 360;
  const height = gif.naturalHeight || 202;
  frozenFrame.width = width;
  frozenFrame.height = height;
  frozenFrame.getContext("2d").drawImage(gif, 0, 0, width, height);
  gif.hidden = true;
  frozenFrame.hidden = false;
  finished = true;
  showMessage("Đã phát xong 10 lượt.", false);
}

function playOneLoop() {
  if (finished) return;
  gif.hidden = false;
  frozenFrame.hidden = true;
  gif.onload = () => {
    hideMessage();
    clearTimeout(timer);
    timer = setTimeout(() => {
      loopsCompleted += 1;
      if (loopsCompleted >= TOTAL_LOOPS) {
        freezeLastFrame();
      } else {
        gif.src = "videos/reaction.gif?play=" + (loopsCompleted + 1);
      }
    }, LOOP_DURATION_MS);
  };
  gif.onerror = () => showMessage("Không tải được videos/reaction.gif. Hãy kiểm tra tên tệp.", false);
  gif.src = "videos/reaction.gif?play=" + (loopsCompleted + 1);
}

async function start() {
  if (started || finished) return;
  started = true;
  hideMessage();
  await tryFullscreen();
  playOneLoop();
}

startButton.addEventListener("click", start);
fullscreenButton.addEventListener("click", async () => {
  if (!document.fullscreenElement) await tryFullscreen();
  else if (document.exitFullscreen) await document.exitFullscreen();
});

window.addEventListener("load", () => {
  showMessage("Nhấn Bắt đầu để phát GIF 10 lượt và thử bật toàn màn hình.", true);
});

document.addEventListener("contextmenu", event => event.preventDefault());
