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
import { logoutUser } from "../Fetchers/LogoutFetch";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { profileEdit } from "../Fetchers/ProfileEditFetch";
import { DetailsPopup } from "../Components/Profile/DetailsPopup";
import { PasswordPopup } from "../Components/Profile/PasswordPopup";

export const ProfilePage = () => {
  const [name, nameSet] = useState("Name");
  const [email, emailSet] = useState("Email");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const navigate = useNavigate();

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
              icon={<History width="100%" height="100%" />}
              name="Clear Liked History"
              onClick={() => {
                async function clearLiked() {
                  try {
                    const res = await profileFetch();
                    if (res) {
                      await profileEdit(
                        res.data.name,
                        [],
                        [],
                        [],
                        res.data.likes,
                        res.data.email,
                        res.data.password
                      );
                    }
                  } catch (error) {
                    console.error("Error fetching profile:", error);
                  }
                }
                clearLiked();
              }}
            ></ActionCard>
            <ActionCard
              icon={<Tab width="100%" height="100%" />}
              name="Clear Bookmarks"
              onClick={() => {
                async function clearBookmarks() {
                  try {
                    const res = await profileFetch();
                    if (res) {
                      await profileEdit(
                        res.data.name,
                        [],
                        res.data.bookmarks,
                        [],
                        [],
                        res.data.email,
                        res.data.password
                      );
                    }
                  } catch (error) {
                    console.error("Error fetching profile:", error);
                  }
                }
                clearBookmarks();
              }}
            ></ActionCard>
          </div>
          <div className="bg-grey w-full h-full flex flex-col items-center m-20">
            <ActionCard
              icon={<Logout width="100%" height="100%" />}
              name="Log Out"
              onClick={() => {
                logoutUser();
                Cookies.remove("sessionId");
                navigate("/");
              }}
            ></ActionCard>
            <ActionCard
              icon={<Profile width="90%" height="90%" className="m-auto" />}
              name="Edit Details"
              onClick={() => {
                setDetailsOpen(true);
              }}
            ></ActionCard>
            <ActionCard
              icon={
                <Lock
                  width="100%"
                  height="90%"
                  preserveAspectRatio="none"
                  className="pt-[10%]"
                />
              }
              name="Change Password"
              onClick={() => {
                setPasswordOpen(true);
              }}
            ></ActionCard>
            {/* <ActionCard
              icon={
                <Bin
                  width="100%"
                  height="95%"
                  preserveAspectRatio="none"
                  className="pt-[5%]"
                />
              }
              name="Delete Account"
            >
              <p className="text-red-400">THIS ACTION IS IRREVERSIBLE</p>
            </ActionCard> */}
          </div>
        </div>
      </div>
      <DetailsPopup
        isOpen={detailsOpen}
        onClose={() => setDetailsOpen(false)}
      ></DetailsPopup>

      <PasswordPopup
        isOpen={passwordOpen}
        onClose={() => setPasswordOpen(false)}
      >

      </PasswordPopup>
    </>
  );
};
