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
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@feedbackfarm/js@1.0.2/dist/widget.js";
    script.defer = true;

    document.head.appendChild(script);
  }, []);

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
