const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <header>
                {/* You can add a responsive navigation bar here */}
            </header>
            <main className="container mx-auto flex-1 py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8">
                {children}
            </main>
            <footer>
                {/* You can add a responsive footer here */}
            </footer>
        </div>
    );
};

export default Layout;
