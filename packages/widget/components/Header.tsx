import { XMarkIcon } from "@heroicons/react/24/solid";

import useTheme from "../hooks/useTheme";

type Props = {
  onClose: () => void;
  title: string;
};

export default function Header(props: Props) {
  const { onClose, title } = props;

  const theme = useTheme();

  return (
    <div className="flex justify-between">
      <h1 className="font-bold text-md" style={{ color: theme.textColor }}>
        {title}
      </h1>
      <button
        onClick={onClose}
        className="transition duration-300 hover:scale-[120%]"
      >
        <XMarkIcon className="w-5 h-5 text-gray-400" />
      </button>
    </div>
  );
}
