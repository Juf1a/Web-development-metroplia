import {Route, BrowserRouter, Routes} from 'react-router';
import Layout from './components/Layout.jsx';
import Home from './views/Home.jsx';
import Profile from './views/Profile.jsx';
import Upload from './views/Upload.jsx';
import Single from './views/Single.jsx';


const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/upload' element={<Upload />} />
          <Route path='/single' element={<Single />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App