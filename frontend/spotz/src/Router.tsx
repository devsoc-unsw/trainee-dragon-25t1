import { Route, Routes } from 'react-router-dom';
import { Home } from './Pages/Home';
import { RandomSpot } from './Pages/RandomSpot';
import { ProfilePage } from './Pages/ProfilePage';
export const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/randomspot" element={<RandomSpot />} />
        <Route path="/profile" element={<ProfilePage/>}/>
      </Routes>
    </>
  );
};
