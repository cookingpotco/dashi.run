import { Card } from "./card.tsx";

interface ProfileCardProps {
  handle: string;
  photo: string;
  clickMe: boolean;
}

export function ProfileCard(
  { handle, photo, clickMe }: ProfileCardProps,
) {
  return (
    <Card className="gap-2">
      <img
        src={photo}
        alt=""
        width="100"
        height="100"
        className="h-[6.25rem] w-[6.25rem] rounded-badge border-2 border-black object-cover"
      />
      <p className="font-mono text-large-code-body font-extrabold">{handle}</p>
      {clickMe && (
        <span className="absolute -top-[1.11875rem] left-[4.29375rem] z-10 flex h-[1.625rem] w-[5.1875rem] rotate-[15deg] items-center justify-center rounded-badge border border-black bg-yellow font-mono text-code-title shadow-thin">
          click me!
        </span>
      )}
    </Card>
  );
}
