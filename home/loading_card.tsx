export function LoadingCard() {
  return (
    <div className="flex h-40 w-[8.5rem] flex-col items-center justify-center gap-2 rounded-card border-2 border-black bg-code-background p-4">
      <p className="font-mono text-large-code-body font-extrabold">
        Loading...
      </p>
      <svg
        width="60"
        height="60"
        viewBox="0 0 24 24"
        className="h-[3.75rem] w-[3.75rem]"
      >
        <polygon
          fill="#ffade6"
          stroke="#18181b"
          strokeWidth="1.25"
          points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9"
        />
      </svg>
    </div>
  );
}
