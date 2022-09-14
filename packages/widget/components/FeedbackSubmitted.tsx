import { useState } from "react";

import { FeedbackType } from "../types/feedback";
import Header from "./Header";
import Button from "./Button";

type Props = {
  endImageUrl: string;
  localization: { [key: string]: any };
  onClose: () => void;
  onSendAnotherFeedback: () => void;
};

export default function FeedbackSubmitted(props: Props) {
  const { endImageUrl, localization, onClose, onSendAnotherFeedback } = props;

  const [feedbackType, setFeedbackType] = useState<FeedbackType>();
  const [feedbackText, setFeedbackText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Header
        title={localization.submittedFeedbackHeaderTitle}
        onClose={onClose}
      />
      <div className="mt-4 flex flex-col items-center">
        <img src={endImageUrl} alt={localization.submitFeedbackMessage} />
        <span className="mt-2 text-sm font-bold">
          {localization.submitFeedbackMessage}
        </span>
      </div>
      <div className="mt-8">
        <Button
          buttonText={localization.sendAnotherFeedbackButtonText}
          onClick={onSendAnotherFeedback}
        />
      </div>
    </>
  );
}
