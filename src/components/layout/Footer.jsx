import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            borderTop: '1px solid var(--border)',
            padding: '4rem 0',
            marginTop: 'auto',
            backgroundColor: 'var(--bg-surface)'
        }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
                    <div>
                        <h3 className="font-bold" style={{ marginBottom: '1rem' }}>UniERP</h3>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: '300px' }}>
                            The next generation University Management System. Streamlining education for everyone.
                        </p>
                    </div>

                    <div className="flex gap-8">
                        <div className="flex flex-col gap-4">
                            <h4 className="font-bold">Product</h4>
                            <a href="#" style={{ color: 'var(--text-secondary)' }}>Features</a>
                            <a href="#" style={{ color: 'var(--text-secondary)' }}>Pricing</a>
                        </div>
                        <div className="flex flex-col gap-4">
                            <h4 className="font-bold">Support</h4>
                            <a href="#" style={{ color: 'var(--text-secondary)' }}>Documentation</a>
                            <a href="#" style={{ color: 'var(--text-secondary)' }}>Help Center</a>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    © 2026 UniERP Inc. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
