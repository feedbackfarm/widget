export default function PoweredBy() {
  return (
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
  );
}
