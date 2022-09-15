import { useState } from "react";

import { FeedbackType } from "../types/feedback";
import Header from "./Header";
import Button from "./Button";
import PoweredBy from "./PoweredBy";
import useTheme from "../hooks/useTheme";

type Props = {
  endImageUrl: string;
  localization: { [key: string]: any };
  onClose: () => void;
  onSendAnotherFeedback: () => void;
};

export default function FeedbackSubmitted(props: Props) {
  const { endImageUrl, localization, onClose, onSendAnotherFeedback } = props;

  const theme = useTheme();
  const [feedbackType, setFeedbackType] = useState<FeedbackType>();
  const [feedbackText, setFeedbackText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <Header
          title={localization.submittedFeedbackHeaderTitle}
          onClose={onClose}
        />
        <div className="mt-16 flex flex-col items-center">
          <img
            src={endImageUrl}
            alt={localization.submitFeedbackMessage}
            className="w-20"
          />
          <span className="mt-2 text-sm font-bold">
            {localization.submitFeedbackMessage}
          </span>
        </div>
      </div>
      <div className="mt-8">
        <Button
          buttonText={localization.sendAnotherFeedbackButtonText}
          onClick={onSendAnotherFeedback}
        />
        {theme.showFooter && <PoweredBy />}
      </div>
    </div>
  );
}
