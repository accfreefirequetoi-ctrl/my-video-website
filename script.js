const video = document.getElementById("mainVideo");
const stage = document.getElementById("stage");
const message = document.getElementById("message");
const messageText = document.getElementById("messageText");
const startButton = document.getElementById("startButton");
const fullscreenButton = document.getElementById("fullscreenButton");

function showMessage(text, showStart = false) {
  messageText.textContent = text;
  startButton.hidden = !showStart;
  message.hidden = false;
}

function hideMessage() {
  message.hidden = true;
}

async function tryFullscreen() {
  // Fullscreen API normally requires a direct user gesture.
  try {
    if (document.fullscreenElement) return true;
    if (stage.requestFullscreen) {
      await stage.requestFullscreen();
      return true;
    }
  } catch (_) {
    // Browser denied automatic fullscreen; the user can tap the button.
  }
  return false;
}

async function playWithSound() {
  video.muted = false;
  video.volume = 1;
  try {
    await video.play();
    hideMessage();
    return true;
  } catch (_) {
    showMessage("Trình duyệt đang chặn tự phát có âm thanh. Nhấn để bắt đầu.", true);
    return false;
  }
}

startButton.addEventListener("click", async () => {
  const played = await playWithSound();
  if (played) await tryFullscreen();
});

fullscreenButton.addEventListener("click", async () => {
  if (!document.fullscreenElement) {
    await tryFullscreen();
  } else if (document.exitFullscreen) {
    await document.exitFullscreen();
  }
});

video.addEventListener("playing", hideMessage);
video.addEventListener("waiting", () => showMessage("Đang tải video…"));
video.addEventListener("error", () => {
  showMessage("Không tải được video. Hãy kiểm tra tệp videos/video.mp4.", false);
});

// Best-effort autoplay with sound. Browsers commonly block this until a tap.
window.addEventListener("load", async () => {
  const played = await playWithSound();
  if (played) await tryFullscreen();
});

// Hide the native context menu and keep native playback controls hidden.
// This is only a UI deterrent, not copy protection.
document.addEventListener("contextmenu", event => event.preventDefault());
video.controls = false;
