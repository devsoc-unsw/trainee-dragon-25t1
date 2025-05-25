import { ActionCard } from "../Components/Profile/ActionCard";
import { BackButton } from "../Components/BackButton";
import { ProfileCard } from "../Components/Profile/ProfileCard";
import History from "../Components/icons/history";
import Tab from "../Components/icons/tab";
import Profile from "../Components/icons/prof";
import Lock from "../Components/icons/Lock";
import Logout from "../Components/icons/logout";
import Bin from "../Components/icons/bin";
import { profileFetch } from "../Fetchers/ProfileFetch";
import { useEffect, useState } from "react";

export const ProfilePage = () => {
  const [name, nameSet] = useState("Name");
  const [email, emailSet] = useState("Email");

  useEffect(() => {
    async function getProfile() {
      try {
        const res = await profileFetch();
        if (res) {
          nameSet(res.data.name);
          emailSet(res.data.email);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }

    getProfile();
  }, []);

  

  return (
    <>
      <BackButton />
      <div className="flex flex-row h-screen">
        <ProfileCard
          img="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          name={name}
          email={email}
        />
        <div className="bg-grey w-full h-full flex flex-row justify-center items-center py-10">
          <div className="bg-grey w-full h-full flex flex-col items-center m-20">
            <ActionCard
              icon={<Lock width="100%" height="90%" preserveAspectRatio="none" className="pt-[10%]"/>}
              name="Change Password" 
            >
              link
            </ActionCard>
            <ActionCard
              icon={<History width="100%" height="100%" />}
              name="Clear Liked History"
            ></ActionCard>
            <ActionCard
              icon={<Tab width="100%" height="100%" />}
              name="Clear Bookmarks"
            ></ActionCard>
          </div>
          <div className="bg-grey w-full h-full flex flex-col items-center m-20">
            <ActionCard
              icon={<Logout width="100%" height="100%" />}
              name="Log Out"
            ></ActionCard>
            <ActionCard
              icon={<Profile width="90%" height="90%" className="m-auto"/>}
              name="Edit Details"
            ></ActionCard>
            <ActionCard
              icon={<Bin width="100%" height="95%" preserveAspectRatio="none" className="pt-[5%]"/>}
              name="Delete Account"
            >
              <p className="text-red-400">THIS ACTION IS IRREVERSIBLE</p>
            </ActionCard>
          </div>
        </div>
      </div>
    </>
  );
};
