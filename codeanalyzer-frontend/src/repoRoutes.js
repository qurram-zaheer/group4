import Commits from "./views/subviews/Commits";

const repoRoutes = [
  {
    path: "/repositories/commits",
    name: "Commits",
    icon: "ni ni-circle-08 text-pink",
    component: Commits,
    layout: "/admin",
  },
];

export default repoRoutes;
