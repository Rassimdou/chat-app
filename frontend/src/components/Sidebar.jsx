import { useEffect } from "react";
import { useChartStore } from "../store/useChatStore";
import SidebarSkeletons from "./skeletons/SideBarSkeletons"; // Corrected import
import { Users } from "lucide-react"; // Corrected import
/*import { useAuthStore } from "../store/useAuthStore"; // Corrected import*/
const Sidebar = () => {
  const { getUsers, users, isUserLoading, selectedUser, setSelectedUser } =
    useChartStore();

    /*const { onlineUsers } = useAuthStore();*/
  // Fetch users on component mount
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // Show loading skeletons while users are being fetched
  if (isUserLoading) {
    return <SidebarSkeletons />; // Corrected component name
  }

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        {/* TODO: Online filter toggle */}
      </div>

      <div className="overflow-y-auto w-full py-3">
        {users.map((user) => ( // Use `users` instead of `filteredUsers`
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${
                selectedUser?._id === user._id
                  ? "bg-base-300 ring-1 ring-base-300"
                  : ""
              }
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"} // Fallback avatar
                alt={user.fullName || "User"} // Use the correct property
                className="size-12 object-cover rounded-full"
              />
              {/* Online status indicator */}
              {user.isOnline && ( // Assuming `isOnline` is a property of the user
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>
            <div className="hidden lg:block">
              <p className="font-medium">{user.fullName}</p> {/* Use the correct property */}
              <p className="text-sm text-zinc-400">{user.email}</p> {/* Optional: Display email */}
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;