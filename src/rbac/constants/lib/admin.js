import Activity from "../../../pages/Activity";
import AllNotes from "../../../pages/AllNotes";
import Login from "../../../pages/Login";
import Notes from "../../../pages/Notes";
import Public from "../../../pages/Public";
import Users from "../../../pages/Users";

const ADMIN_ROUTES = [
  {
    private: true,
    link: "/notes",
    name: "My Notes",
    component: <Notes />,
  },
  {
    private: true,
    link: "/public",
    name: "Public Notes",
    component: <Public />,
  },
  {
    private: true,
    link: "/allnotes",
    name: "All Notes",
    component: <AllNotes />,
  },
  {
    private: true,
    link: "/users",
    name: "Users",
    component: <Users />,
  },
  {
    private: true,
    link: "/activity",
    name: "Activity",
    component: <Activity />,
  },
];

export default ADMIN_ROUTES;
