import Notes from "../../../pages/Notes";
import Public from "../../../pages/Public";

const USER_ROUTES = [
  {
    private: true,
    link: "/notes",
    name: "My notes",
    component: <Notes />,
  },
  {
    private: true,
    link: "/public",
    name: "Public",
    component: <Public />,
  },
];

export default USER_ROUTES;
