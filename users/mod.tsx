import { group, type ReadArgs } from "dashi";
import { pageCache } from "../cache.ts";
import { ProfileCard } from "../components/mod.ts";
import { NotFound } from "../errors.tsx";
import type { AppState } from "../state.ts";
import { UsersLayout } from "./users_layout.tsx";

const enum ProfileName {
  Jorji = "jorji",
  Duck = "duck",
}

const profiles: Record<
  ProfileName,
  { handle: string; photo: string }
> = {
  [ProfileName.Jorji]: {
    handle: "@Jorji",
    photo: "/static/jorji.svg",
  },
  [ProfileName.Duck]: {
    handle: "@LazyDuck",
    photo: "/static/duck.svg",
  },
};

export function LinkedProfileCard(
  { name }: { name: "jorji" | "duck" },
) {
  const profile = profiles[name];
  return (
    <a href={`/users/${name}`} className="no-underline">
      <ProfileCard
        handle={profile.handle}
        photo={profile.photo}
        clickMe
      />
    </a>
  );
}

export async function getProfile(
  { ctx, html }: ReadArgs<{ state: AppState; params: { name: string } }>,
) {
  const name = ctx.params.name;
  if (name !== ProfileName.Jorji && name !== ProfileName.Duck) {
    ctx.state.seo = {
      title: "404 - dashi",
      description: "That page isn't here.",
      index: false,
    };
    return html(<NotFound />, { status: 404 });
  }
  const isSlot = ctx.req.headers.get("x-slot") !== null;
  if (name === ProfileName.Duck && isSlot) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }
  if (isSlot) {
    return html(<LinkedProfileCard name={name} />);
  }
  const profile = profiles[name];
  return html(
    <ProfileCard
      handle={profile.handle}
      photo={profile.photo}
      clickMe={false}
    />,
    { cache: pageCache },
  );
}

export const users = group<AppState>("/users", ({ route }) => ({
  layouts: [UsersLayout],
  routes: [
    route("/:name", { GET: getProfile }),
  ],
}));
