let widgetForm: HTMLFormElement | null;

function createWidget() {
  widgetForm = document.createElement("form");
  widgetForm.action = "https://api.feedback.farm";
  widgetForm.id = "feedback-farm";

  widgetForm.innerHTML = `
    <h1>Give Feedback</h1>
  `;

  widgetForm.style.display = "none";
  document.body.appendChild(widgetForm);
}

function openWidget() {
  if (!widgetForm) {
    return;
  }

  widgetForm.style.display = "block";
}

function closeWidget() {
  if (!widgetForm) {
    return;
  }

  widgetForm.style.display = "none";
}

createWidget();

// Handle outside click
document.addEventListener("click", (event) => {
  if (
    !widgetForm?.contains(event.target as HTMLElement) &&
    !isTriggerElement(event.target as HTMLElement)
  ) {
    closeWidget();
  }
});

// Add triggers
const triggers = document.querySelectorAll("[data-feedback-farm]");
triggers.forEach((trigger) => {
  trigger.addEventListener("click", openWidget);
});

function isTriggerElement(element: HTMLElement) {
  return element.hasAttribute("data-feedback-farm");
}

// TODO
// Prettier
// eslint
// rollup
