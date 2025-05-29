import Header from '@components/Header';
import Footer from '@components/Footer';

const MainLayout = ({ children }) => (
  <div className="w-full flex flex-col items-center">
    <Header />
    {children} 
    <Footer />
  </div>
);

export default MainLayout;
