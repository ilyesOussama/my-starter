const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="mx-auto max-w-7xl p-4 sm:p-8 xl:p-0 xl:pt-8">
            {children}
        </main>
    );
};

export default AuthLayout;
