const triggers = document.querySelectorAll("[data-feedback-farm]");
let outsideClickEventListener;

function initializeTriggers() {
  // Load floatingUI
  const popperScript = document.createElement("script");
  popperScript.src = "https://unpkg.com/@popperjs/core@2";
  popperScript.defer = true;
  document.head.appendChild(popperScript);

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();

      const feedbackFarmIFrame = document.getElementById(
        "feedback-farm-iframe"
      );
      feedbackFarmIFrame.style.display = "block";

      setupOutsideClickListener();

      // Position widget
      window.Popper.createPopper(trigger, feedbackFarmIFrame, {
        placement: "bottom",
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 10],
            },
          },
        ],
      });
    });
  });
}

function setupIFrame() {
  const iframe = document.createElement("iframe");
  iframe.id = "feedback-farm-iframe";
  // iframe.src = `https://widget.feedback.farm?projectId=123`;
  iframe.src = "http://localhost:3000?projectId=1223";
  iframe.style.width = 300;
  iframe.style.border = "none";
  iframe.style.height = 356;
  iframe.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
  iframe.style.borderRadius = "18px";
  iframe.style.display = "none";
  document.body.append(iframe);
}

function closeWidget() {
  const feedbackFarmIFrame = document.getElementById("feedback-farm-iframe");
  feedbackFarmIFrame.style.display = "none";

  document.removeEventListener("click", detectOutsideClick);
}

function setupOutsideClickListener() {
  outsideClickEventListener = document.addEventListener(
    "click",
    detectOutsideClick
  );
}

function detectOutsideClick(e) {
  let clickOutside = true;

  for (let i = 0; i < triggers.length; i++) {
    if (triggers[i] === e.target) {
      clickOutside = false;
      break;
    }
  }
  if (clickOutside) {
    closeWidget();
  }
}

function setupOnWidgetCloseListener() {
  // Detect widget close request
  window.addEventListener("message", function ({ origin, data }) {
    if (origin === "https://widget.feedback.farm") {
      if (data === "closeWidget") {
        closeWidget();
      }
    }
  });
}

initializeTriggers();
setupIFrame();
setupOnWidgetCloseListener();
