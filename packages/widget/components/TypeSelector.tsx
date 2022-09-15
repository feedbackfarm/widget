import useTheme from "../hooks/useTheme";

import { FeedbackType, TypeSelectorType } from "../types/feedback";

type Props = {
  onSelect: (type: FeedbackType) => void;
  selectedType?: FeedbackType;
  types: TypeSelectorType[];
};

export default function TypeSelector(props: Props) {
  const { onSelect, selectedType, types } = props;

  const theme = useTheme();

  return (
    <div className="grid grid-cols-3">
      {types.map((type) => (
        <button
          key={type.type}
          className="flex flex-col items-center"
          onClick={() => onSelect(type.type)}
        >
          <div
            className="rounded-xl border"
            style={{
              backgroundColor: theme.typeBackgroundColor,
              borderColor:
                selectedType === type.type ? theme.borderColor : "transparent",
            }}
          >
            <img src={type.imageUrl} alt={type.type} className="h-8 m-4" />
          </div>
          <span className="text-md mt-2" style={{ color: theme.textColor }}>
            {type.text}
          </span>
        </button>
      ))}
    </div>
  );
}
