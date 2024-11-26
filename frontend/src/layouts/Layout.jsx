const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <header>
                {/* You can add a navigation bar here */}
            </header>
            <main className="container mx-auto flex-1 py-10">
                {children}
            </main>
            <footer>
                {/* You can add a footer here */}
            </footer>
        </div>
    );
};

export default Layout;
