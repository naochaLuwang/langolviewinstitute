import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import { Poppins, Quicksand, Roboto } from 'next/font/google';
import '../globals.css';

const roboto = Quicksand({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    variable: '--font-roboto'
});

export default function UserGroupLayout({ children }) {
    return (<div className={roboto.className}>
        <Navbar />
        {children}
        <Footer />

    </div>



    );
}
