import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";

export class FeedbackFarm extends LitElement {
  @property({ type: Object }) strings = {
    header: "Give Feedback!",
  };

  @property({ type: Boolean }) isOpen = false;

  static styles = css`
    .wrapper {
      position: absolute;
    }
    .widget {
      position: absolute;
      width: 250px;
      box-sizing: content-box;
      padding: 15px;
      filter: drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.25));
      border-radius: 21px;
      transition: all 0.5s linear;
      min-width: 246px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: red;
    }
    .headerTitle {
      font-size: 16px;
      font-weight: bold;
      font-family: "Helvetica";
    }
    .closeButton {
      outline: none;
      border: none;
      background: none;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  `;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    document.addEventListener("click", (event) => {
      if (!event.composedPath().includes(this)) {
        this.handleCloseFeedbackModal();
      }
    });
  }

  handleOpenFeedbackModal() {
    this.isOpen = true;
  }

  handleCloseFeedbackModal() {
    this.isOpen = false;
  }

  handleClickOutside() {}

  // tester tout de suite le onclik pour trigger le widget et le ferme (outside click)
  // Tester floating ui

  render() {
    if (!this.isOpen) {
      return html`<slot @click="${this.handleOpenFeedbackModal}"></slot>`;
    }

    return html`<div class="wrapper">
      <slot @click="${this.handleOpenFeedbackModal}"></slot>
      <form class="widget">
        <div class="header">
          <h1 class="headerTitle">${this.strings.header}</h1>
          <button class="closeButton" @click="${this.handleCloseFeedbackModal}">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L11 11M1 11L11 1L1 11Z"
                stroke="#D1D1D1"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>`;
  }
}
