import Repositories from "views/Repositories";
import Commits from "./views/subviews/Commits";
import PullRequestsRepo from "./views/subviews/PullRequestsRepo";

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
  {
    path: "/repositories/pull-requests",
    name: "Pull Requests",
    icon: "ni ni-circle-08 text-pink",
    component: PullRequestsRepo,
    layout: "/admin",
  },
];

export default repoRoutes;
