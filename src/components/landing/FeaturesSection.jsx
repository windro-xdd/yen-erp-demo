import React from 'react';
import { Users, BookOpen, ShieldCheck } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="card">
        <div style={{
            width: '48px',
            height: '48px',
            background: 'var(--bg-subtle)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem',
            color: 'var(--primary)'
        }}>
            <Icon size={24} />
        </div>
        <h3 className="font-bold" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{title}</h3>
        <p style={{ color: 'var(--text-secondary)' }}>{description}</p>
    </div>
);

const FeaturesSection = () => {
    return (
        <section style={{ padding: '6rem 0', background: 'var(--bg-surface)' }}>
            <div className="container">
                <div className="text-center" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
                        Everything You Need
                    </h2>
                    <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                        Tailored tools for every role in your institution. From admissions to alumni, we have got you covered.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    <FeatureCard
                        icon={Users}
                        title="Student Management"
                        description="Track attendance, grades, and academic progress with our comprehensive student portal."
                    />
                    <FeatureCard
                        icon={BookOpen}
                        title="Faculty Tools"
                        description="Empower teachers with easy grading, lesson planning, and direct communication channels."
                    />
                    <FeatureCard
                        icon={ShieldCheck}
                        title="Admin Control"
                        description="Full oversight of university operations, user roles, and system configurations."
                    />
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
