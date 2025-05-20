import { Route, Routes } from 'react-router-dom';
import { Home } from './Pages/Home';
import { RandomSpot } from './Pages/RandomSpot';
export const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/randomspot" element={<RandomSpot />} />
      </Routes>
    </>
  );
};
