interface ProfileCardProps {
  handle: string;
  photo: string;
  clickMe: boolean;
}

export function ProfileCard(
  { handle, photo, clickMe }: ProfileCardProps,
) {
  const card = (
    <div className="flex w-[8.5rem] flex-col items-center gap-2 rounded-card border-2 border-black bg-code-background p-4">
      <img
        src={photo}
        alt=""
        width="100"
        height="100"
        className="h-[6.25rem] w-[6.25rem] rounded-badge border-2 border-black object-cover"
      />
      <p className="font-mono text-large-code-body font-extrabold">{handle}</p>
      {clickMe
        ? (
          <span className="-rotate-[15deg] rounded-badge border border-black bg-yellow px-2 py-1 font-mono text-code-title shadow-thin">
            click me!
          </span>
        )
        : null}
    </div>
  );
  return card;
}
