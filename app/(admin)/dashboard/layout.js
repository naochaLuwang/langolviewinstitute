export default function AdminLayout({ children }) {
    return (
        <html>
            <body>
                <header>
                    <h1>Admin Section</h1>
                </header>
                <main>{children}</main>
            </body>
        </html>
    );
}
