import React, { ReactElement, useEffect } from "react";

export type Theme = {
  backgroundColor?: string;
  borderColor?: string;
  buttonBackgroundColor?: string;
  buttonTextColor?: string;
  disabledButtonBackgroundColor?: string;
  disabledButtonTextColor?: string;
  textColor?: string;
  typeBackgroundColor?: string;
  showFooter?: boolean;
};

export type FeedbackType = "FEATURE" | "BUG" | "OTHER";

export type TypeSelectorType = {
  imageUrl: string;
  text: string;
  type: FeedbackType;
};

export type Localization = {
  headerTitle?: string;
  placeholder?: {
    BUG?: string;
    FEATURE?: string;
    OTHER?: string;
    DEFAULT?: string;
  };
  sendAnotherFeedbackButtonText?: string;
  sendFeedbackButtonText?: string;
  submitFeedbackMessage?: string;
  submittedFeedbackHeaderTitle?: string;
};

export type Props = {
  children: ReactElement;
  endImageUrl?: string;
  identifier?: string;
  localization?: Localization;
  pageName?: string;
  projectId: string;
  theme?: Theme;
  types?: TypeSelectorType[];
};

function getDataParameters(props: Props) {
  const projectId = props.projectId;
  const identifier = props.identifier || "";
  const endImageUrl = encodeURIComponent(props.endImageUrl || "");
  const pageName = props.pageName || window.location.pathname;
  const theme = encodeURIComponent(JSON.stringify(props.theme) || "");
  const localization = encodeURIComponent(
    JSON.stringify(props.localization) || ""
  );
  const types = encodeURIComponent(JSON.stringify(props.types) || "");

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

export default function FeedbackFarm(props: Props) {
  const {
    children,
    endImageUrl,
    identifier,
    localization,
    pageName,
    projectId,
    theme,
    types,
  } = props;

  useEffect(() => {
    const feedbackFarmScript = document.getElementById("feedback-farm-script");
    if (feedbackFarmScript) {
      return;
    }

    const script = document.createElement("script");
    script.id = "feedback-farm-script";
    script.src = "https://unpkg.com/@feedbackfarm/js@1.0.2/dist/widget.js";
    script.defer = true;
    document.head.appendChild(script);
  }, []);

  // When props changes, the query-string of the iFrame needs to be updated
  useEffect(() => {
    const iframe = document.getElementById(
      "feedback-farm-iframe"
    ) as HTMLIFrameElement | null;

    if (iframe) {
      const params: { [key: string]: string } = getDataParameters(props);
      const queryString = Object.keys(params)
        .map((key) => key + "=" + params[key])
        .join("&");

      iframe.src = `https://widget.feedback.farm?${queryString}`;
      iframe.style.zIndex = "9999";
    }
  }, [props]);

  return React.cloneElement(children, {
    "data-feedback-farm-end-image-url": endImageUrl,
    "data-feedback-farm-identifier": identifier,
    "data-feedback-farm-localization": JSON.stringify(localization),
    "data-feedback-farm-page-name": pageName,
    "data-feedback-farm-project-id": projectId,
    "data-feedback-farm-theme": JSON.stringify(theme),
    "data-feedback-farm-types": JSON.stringify(types),
    "data-feedback-farm": "",
  });
}
