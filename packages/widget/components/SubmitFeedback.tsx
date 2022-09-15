import { sendFeedback } from "@feedbackfarm/core";
import { useState } from "react";
import useTheme from "../hooks/useTheme";

import { FeedbackType, TypeSelectorType } from "../types/feedback";
import Button from "./Button";
import FeedbackTextArea from "./FeedbackTextArea";
import Header from "./Header";
import PoweredBy from "./PoweredBy";
import TypeSelector from "./TypeSelector";

type Props = {
  identifier: string;
  localization: { [key: string]: any };
  onClose: () => void;
  onFeedbackSubmitted: () => void;
  pageName: string;
  projectId: string;
  types: TypeSelectorType[];
};

export default function SubmitFeedback(props: Props) {
  const {
    identifier,
    localization,
    onClose,
    onFeedbackSubmitted,
    pageName,
    projectId,
    types,
  } = props;

  const theme = useTheme();

  const [feedbackType, setFeedbackType] = useState<FeedbackType>();
  const [feedbackText, setFeedbackText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSelectFeedbackType(type: FeedbackType) {
    setFeedbackType(type);
  }

  function handleFeedbackTextChange(text: string) {
    setFeedbackText(text);
  }

  function reset() {
    setFeedbackText("");
    setFeedbackType(undefined);
  }

  async function handleSubmitFeedback() {
    if (!feedbackType || !feedbackText || isLoading) {
      return;
    }

    try {
      setIsLoading(true);

      await sendFeedback(
        projectId,
        feedbackText,
        feedbackType,
        identifier,
        pageName
      );
      onFeedbackSubmitted();

      reset();
    } catch (error) {
      alert("Unknown error");
      console.log(error);
    }

    setIsLoading(false);
  }

  const buttonIsEnabled = feedbackType && feedbackText;
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <Header title={localization.headerTitle} onClose={onClose} />
        <div className="mt-4">
          <TypeSelector
            selectedType={feedbackType}
            onSelect={handleSelectFeedbackType}
            types={types}
          />
        </div>
        <div className="mt-4">
          <FeedbackTextArea
            placeholder={localization.placeholder[feedbackType || "DEFAULT"]}
            text={feedbackText}
            onTextChange={handleFeedbackTextChange}
          />
        </div>
      </div>
      <div className="mt-2">
        <Button
          buttonText={localization.sendFeedbackButtonText}
          disabled={!buttonIsEnabled}
          onClick={handleSubmitFeedback}
          isLoading={isLoading}
        />
        {theme.showFooter && <PoweredBy />}
      </div>
    </div>
  );
}
