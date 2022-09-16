import useTheme from "../hooks/useTheme";

type Props = {
  buttonText: string;
  disabled?: boolean;
  isLoading?: boolean;
  onClick: () => void;
};

function LoadingSpinner() {
  return (
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}

export default function Button(props: Props) {
  const { buttonText, disabled, isLoading, onClick } = props;

  const theme = useTheme();

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full py-1 rounded-xl flex justify-center"
      style={{
        backgroundColor: disabled
          ? theme.disabledButtonBackgroundColor
          : theme.buttonBackgroundColor,
        color: disabled ? theme.disabledButtonTextColor : theme.buttonTextColor,
      }}
    >
      <div className="flex py-1">
        {isLoading && <LoadingSpinner />}
        {!isLoading && <span className="text-sm font-bold">{buttonText}</span>}
      </div>
    </button>
  );
}
