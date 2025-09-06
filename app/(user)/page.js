import AboutSection from '../component/About';

import Hero from '../component/Hero';
import Leadership from '../component/Leadership';
import NewsSection from '../component/News';
import Programs from '../component/Programs';

export default function UserHomePage() {
    return (
        <div>
            <Hero overlayText="Welcome to the User Home Page" />
            <AboutSection />
            <Programs />
            <Leadership />
            <div className='grid md:grid-cols-2 gap-0 px-16 md:px-8 lg:px-16   '>
               
               
            </div>
            <NewsSection />

        </div>
    );
}
