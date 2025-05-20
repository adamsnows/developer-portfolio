import Header from '@/components/Other/Header/Header'

import { ChildrenInterface } from '@/interfaces/ChildrenInterface';
import Footer from '@/components/Other/Footer/Footer';
import Transition from '@/components/Other/Transition/Transition';
import WhatsappButton from '@/components/Other/WhatsappButton/WhatsappButton';

const Layout = ({ children }: ChildrenInterface) => {
  
  return (
    <Transition>
      <Header />
      {children}
      <Footer />
      <WhatsappButton />
    </Transition>
  );
};

export default Layout;
