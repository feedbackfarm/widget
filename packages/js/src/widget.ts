function initializeTriggers() {
  // Load floatingUI
  const popperScript = document.createElement("script");
  popperScript.src = "https://unpkg.com/@popperjs/core@2";
  popperScript.defer = true;
  document.head.appendChild(popperScript);

  document.body.addEventListener("click", detectTriggerClick);
  setupOutsideClickListener();
}

function setupIFrame() {
  const [trigger] = document.querySelectorAll("[data-feedback-farm]");
  if (!trigger) return;

  const params = getDataParameters(trigger);
  const queryString = Object.keys(params)
    .map((key) => key + "=" + params[key])
    .join("&");

  const iframe = document.createElement("iframe");
  iframe.id = "feedback-farm-iframe";
  iframe.src = `https://widget.feedback.farm?${queryString}`;
  iframe.style.width = "300px";
  iframe.style.border = "none";
  iframe.style.height = "356px";
  iframe.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
  iframe.style.borderRadius = "18px";
  iframe.style.display = "none";
  iframe.style.zIndex = "9999";
  document.body.append(iframe);
}

function closeWidget() {
  const feedbackFarmIFrame = document.getElementById("feedback-farm-iframe");
  if (!feedbackFarmIFrame) {
    return;
  }
  feedbackFarmIFrame.style.display = "none";

  document.removeEventListener("click", detectOutsideClick);
}

function setupOutsideClickListener() {
  document.addEventListener("click", detectOutsideClick);
}

function detectTriggerClick(e) {
  const triggers = document.querySelectorAll("[data-feedback-farm]");
  for (let i = 0; i < triggers.length; i++) {
    if (triggers[i] === e.target) {
      e.preventDefault();
      const feedbackFarmIFrame = document.getElementById(
        "feedback-farm-iframe"
      );

      if (!feedbackFarmIFrame) {
        return;
      }
      feedbackFarmIFrame.style.display = "block";

      setupOutsideClickListener();
      // Position widget
      // @ts-expect-error
      window.Popper.createPopper(triggers[i], feedbackFarmIFrame, {
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
      return true;
    }
  }
}

function detectOutsideClick(e) {
  const triggers = document.querySelectorAll("[data-feedback-farm]");
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

function setupMessageListener() {
  window.addEventListener("message", function ({ origin, data }) {
    if (origin === "https://widget.feedback.farm") {
      // Detect widget close request
      if (data === "closeWidget") {
        closeWidget();
      }
    }
  });
}

function getDataParameters(trigger) {
  const projectId = trigger.getAttribute("data-feedback-farm-project-id");
  const identifier = trigger.getAttribute("data-feedback-farm-identifier");
  const endImageUrl = encodeURIComponent(
    trigger.getAttribute("data-feedback-farm-end-image-url") || ""
  );
  const pageName =
    trigger.getAttribute("data-feedback-farm-page-name") ||
    window.location.pathname;
  const theme = encodeURIComponent(
    trigger.getAttribute("data-feedback-farm-theme")
  );
  const localization = encodeURIComponent(
    trigger.getAttribute("data-feedback-farm-localization")
  );
  const types = encodeURIComponent(
    trigger.getAttribute("data-feedback-farm-types")
  );

  return {
    projectId,
    identifier,
    endImageUrl,
    pageName,
    theme,
    localization,
    types,
  };
}

setupIFrame();
initializeTriggers();
setupMessageListener();
