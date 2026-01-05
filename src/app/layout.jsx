import '../index.css';

export const metadata = {
    title: 'University ERP',
    description: 'University Management System',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
