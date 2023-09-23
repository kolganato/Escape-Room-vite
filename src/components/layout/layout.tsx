import Footer from '../footer';
import Header from '../header';
import { Outlet } from 'react-router-dom';

function Layout(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
