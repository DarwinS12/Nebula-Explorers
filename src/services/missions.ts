import { type Doc, type SpaceMissions } from "../types/apiTypes";

export const getMissionById = async ({ id }: { id: string }) => {
  const reponse = await fetch(`https://api.spacexdata.com/v5/launches/${id}`);
  const rockets  = await reponse.json();
  return rockets as Doc ;
};

export const getMissions = async () => {
  const reponse = await fetch("https://api.spacexdata.com/v5/launches/query", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: {},
      options: {
        limit: 10,
      },
    }),
  });
  const { docs: missions } = (await reponse.json()) as SpaceMissions;
  return missions;
};
