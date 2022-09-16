import { ParsedUrlQuery } from "querystring";
import { useState } from "react";
import Head from "next/head";
import type { NextPage } from "next";

import { TypeSelectorType } from "../types/feedback";
import FeedbackSubmitted from "../components/FeedbackSubmitted";
import SubmitFeedback from "../components/SubmitFeedback";
import ThemeContext, { Theme } from "../contexts/theme";
import { useRouter } from "next/router";

const defaultTypes = [
  {
    imageUrl: "/svg/zap.svg",
    text: "Feature",
    type: "FEATURE",
  },
  {
    imageUrl: "/svg/bug.svg",
    text: "Bug",
    type: "BUG",
  },
  {
    imageUrl: "/svg/monkey.svg",
    text: "Other",
    type: "OTHER",
  },
];

function getParameters(query: ParsedUrlQuery) {
  const endImageUrl = (query.endImageUrl as string) || "/svg/party.svg";
  const identifier = (query.identifier as string) || "";
  const localizationParams = JSON.parse((query.localization as string) || "{}");
  const pageName = (query.pageName as string) || "";
  const projectId = query.projectId as string;

  const themeParams = JSON.parse((query.theme as string) || "{}");
  const typeParams = JSON.parse((query.types as string) || "[]");
  const types: TypeSelectorType[] =
    typeParams && typeParams.length > 0 ? typeParams : defaultTypes;

  const localization: { [key: string]: any } = {
    headerTitle: "Give Feedback!",
    placeholder: {
      BUG: "I have an issue with ...",
      FEATURE: "It would be nice ...",
      OTHER: "I have a suggestion ...",
      DEFAULT: "I have a suggestion ...",
    },
    sendAnotherFeedbackButtonText: "Send another feedback",
    sendFeedbackButtonText: "Send!",
    submitFeedbackMessage: "Your feedback has been submitted!",
    submittedFeedbackHeaderTitle: "Thank you!",
    ...localizationParams,
  };

  const theme: Theme = {
    textColor: "#000000",
    typeBackgroundColor: "#FCFBFA",
    borderColor: "#D1D1D1",
    backgroundColor: "#FFFFFF",
    disabledButtonBackgroundColor: "#D1D1D1",
    disabledButtonTextColor: "#A7A7A7",
    buttonTextColor: "#FFFFFF",
    buttonBackgroundColor: "#22c197",
    showFooter: true,
    ...themeParams,
  };

  return {
    endImageUrl,
    identifier,
    localization,
    pageName,
    projectId,
    theme,
    types,
  };
}

const Widget: NextPage = () => {
  const router = useRouter();
  const {
    endImageUrl,
    identifier,
    localization,
    pageName,
    projectId,
    theme,
    types,
  } = getParameters(router.query);

  const [currentStep, setCurrentStep] = useState<"fill" | "submitted">("fill");

  function handleCloseWidget() {
    window.parent.postMessage("closeWidget", "*");
  }

  function handleFeedbackSubmitted() {
    setCurrentStep("submitted");
  }

  function handleSendAnotherFeedback() {
    setCurrentStep("fill");
  }

  if (!projectId) {
    return null;
  }

  return (
    <ThemeContext.Provider value={theme}>
      <div className="h-screen">
        <Head>
          <title>Feedback Farm Widget</title>
        </Head>

        <main className="h-screen">
          <div
            className="w-full p-4 h-full"
            style={{ backgroundColor: theme.backgroundColor }}
          >
            {currentStep === "fill" ? (
              <SubmitFeedback
                localization={localization}
                types={types}
                projectId={projectId}
                identifier={identifier}
                pageName={pageName}
                onClose={handleCloseWidget}
                onFeedbackSubmitted={handleFeedbackSubmitted}
              />
            ) : (
              <FeedbackSubmitted
                onClose={handleCloseWidget}
                localization={localization}
                onSendAnotherFeedback={handleSendAnotherFeedback}
                endImageUrl={endImageUrl}
              />
            )}
          </div>
        </main>
      </div>
    </ThemeContext.Provider>
  );
};

export default Widget;
