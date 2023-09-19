import Footer from '../footer';
import Header from '../header';
import { Outlet } from 'react-router-dom';

function Layout(): JSX.Element {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
