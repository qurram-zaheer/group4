import Repositories from "views/Repositories";
import Commits from "./views/subviews/Commits";

const repoRoutes = [
  {
    path: "/repositories",
    name: "Repositories",
    icon: "ni ni-circle-08 text-pink",
    component: Repositories,
    layout: "/admin",
  },
  {
    path: "/repositories/commits",
    name: "Commits",
    icon: "ni ni-circle-08 text-pink",
    component: Commits,
    layout: "/admin",
  },
];

export default repoRoutes;
