import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import '../globals.css';

export default function UserGroupLayout({ children }) {
    return (<>
        <Navbar />
        {children}
        <Footer />

    </>



    );
}
