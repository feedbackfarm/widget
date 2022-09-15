import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

import { TypeSelectorType } from "../types/feedback";
import FeedbackSubmitted from "../components/FeedbackSubmitted";
import SubmitFeedback from "../components/SubmitFeedback";
import ThemeContext, { Theme } from "../contexts/theme";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

function getParameters(query: ParsedUrlQuery) {
  const whiteLabel = false || !!query.whiteLabel;
  const projectId = query.projectId as string;
  const identifier = (query.identifier as string) || "";
  const pageName = (query.page as string) || "";
  const endImageUrl = (query.endImageUrl as string) || "/svg/party.svg";

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
  };

  const types: TypeSelectorType[] = [
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

  const theme: Theme = {
    textColor: "#000000",
    typeBackgroundColor: "#FCFBFA",
    borderColor: "#D1D1D1",
    backgroundColor: "#FFFFFF",
    disabledButtonBackgroundColor: "#D1D1D1",
    disabledButtonTextColor: "#A7A7A7",
    buttonTextColor: "#FFFFFF",
    buttonBackgroundColor: "#22c197",
  };

  return {
    endImageUrl,
    identifier,
    localization,
    pageName,
    projectId,
    theme,
    types,
    whiteLabel,
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
    whiteLabel,
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
      <div>
        <Head>
          <title>Feedback Farm Widget</title>
        </Head>

        <main>
          <div
            className="w-full p-4"
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
            {!whiteLabel && (
              <div className="mt-2 flex justify-center">
                <span className="text-xs font-bold text-gray-500">
                  Powered by{" "}
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://feedback.farm?ref=widget"
                    className="text-[#22c197]"
                  >
                    feedback.farm
                  </a>
                </span>
              </div>
            )}
          </div>
        </main>
      </div>
    </ThemeContext.Provider>
  );
};

export default Widget;
