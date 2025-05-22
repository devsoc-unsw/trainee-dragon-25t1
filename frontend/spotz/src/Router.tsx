import { Route, Routes } from 'react-router-dom';
import { Home } from './Pages/Home';
import { RandomSpot } from './Pages/RandomSpot';
import { RegisterPage } from './Pages/RegisterPage';
import { ProfilePage } from './Pages/ProfilePage';
export const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/randomspot" element={<RandomSpot />} />
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
      </Routes>
    </>
  );
};
