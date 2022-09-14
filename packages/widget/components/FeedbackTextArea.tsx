import useTheme from "../hooks/useTheme";

type Props = {
  onTextChange: (text: string) => void;
  placeholder: string;
  text: string;
};

export default function FeedbackTextArea(props: Props) {
  const { onTextChange, placeholder, text } = props;

  const theme = useTheme();

  return (
    <textarea
      className="border rounded-xl p-2 w-full resize-none h-24 text-md"
      placeholder={placeholder}
      value={text}
      onChange={(e) => onTextChange(e.target.value)}
      style={{
        color: theme.textColor,
        backgroundColor: theme.backgroundColor,
        borderColor: theme.borderColor,
      }}
    />
  );
}
