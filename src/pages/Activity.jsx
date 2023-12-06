import React, { useState, useEffect } from "react";
import Skeleton from "../components/Skeleton";
import useAdmin from "../api/useAdmin";
const activities = [
  {
    action: "create",
    note_id: "",
    user_id: "",
  },
  {
    action: "update",
    note_id: "",
    user_id: "",
  },
  {
    action: "delete",
    note_id: "",
    user_id: "",
  },
  {
    action: "made_public",
    note_id: "",
    user_id: "",
  },
  {
    action: "made_private",
    note_id: "",
    user_id: "",
  },
  {
    action: "joined",
    note_id: "",
    user_id: "",
  },
  {
    action: "made_private",
    note_id: "",
    user_id: "",
  },
  {
    action: "joined",
    note_id: "",
    user_id: "",
  },
  {
    action: "made_private",
    note_id: "",
    user_id: "",
  },
  {
    action: "joined",
    note_id: "",
    user_id: "",
  },
  {
    action: "made_private",
    note_id: "",
    user_id: "",
  },
  {
    action: "joined",
    note_id: "",
    user_id: "",
  },
];

const renderAction = (action, data) => {
  switch (action) {
    case "create":
      return `User ${data?.user?.username} created a note ${data?.note_id}`;
    case "update":
      return `User ${data?.user?.username} updated a note ${data?.note_id}`;
    case "delete":
      return `User ${data?.user?.username} deleted a note ${data?.note_id}`;
    case "made_public":
      return ` User made ${data?.user?.username} note ${data?.note_id} public`;
    case "made_private":
      return `User made ${data?.user?.username} note ${data?.note_id} private`;
    case "joined":
      return `User ${data?.user?.username} joined the app`;
    default:
      return `Action`;
  }
};

const Activity = () => {
  const { getActivities, getActivititesLoading } = useAdmin();
  const [activities, setActivities] = useState([]);
  const fetchActivities = async () => {
    await getActivities((data) => {
      setActivities(data?.data);
    });
  };
  useEffect(() => {
    fetchActivities();
  }, []);
  return (
    <div className="flex gap-4 flex-col">
      {getActivititesLoading ? (
        [...Array(6)].map((_, index) => (
          <Skeleton className="w-84 h-20" key={index} />
        ))
      ) : (
        <div className="flex flex-col gap-4">
          {activities?.map((activity, index) => (
            <div
              key={index}
              className="flex items-center w-80 justify-center p-4 bg-gray-200 rounded-lg"
            >
              <div className="ml-2">
                {renderAction(activity?.action, {
                  user: activity?.User,
                  note_id: activity?.note_id,
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Activity;
