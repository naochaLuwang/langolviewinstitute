// import { SignedIn, SignedOut, SignIn } from '@clerk/nextjs';

export default function AdminHomePage() {
    return (
        <>
            {/* <SignedIn> */}
            <div>
                <h2>Welcome to the Admin Home Page</h2>
                <p>This is the admin section of the site.</p>
            </div>
            {/* </SignedIn> */}
            {/* <SignedOut>
                <SignIn />
            </SignedOut> */}
        </>
    );
}
