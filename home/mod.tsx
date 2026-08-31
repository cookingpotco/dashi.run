import { group } from "dashi";

export const home = group(({ route }) => ({
  routes: [route("/", { GET: Home })],
}));

function Home() {
  return <h1>dashi.run</h1>;
}
