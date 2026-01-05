"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GraduationCap, Users, Shield, ArrowRight } from 'lucide-react';
import styles from './PortalsSection.module.css';

const PortalCard = ({ icon: Icon, title, description, href, color, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
        >
            <Link href={href} className={styles.card}>
                <div className={styles.cardIcon} style={{ background: color }}>
                    <Icon size={28} color="white" />
                </div>
                <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{title}</h3>
                    <p className={styles.cardDesc}>{description}</p>
                </div>
                <div className={styles.cardArrow}>
                    <ArrowRight size={20} />
                </div>
            </Link>
        </motion.div>
    );
};

const PortalsSection = () => {
    const portals = [
        {
            icon: GraduationCap,
            title: 'Student Portal',
            description: 'Access courses, schedules, fees, and academic records.',
            href: '/login',
            color: 'var(--yen-green)'
        },
        {
            icon: Users,
            title: 'Faculty Portal',
            description: 'Manage attendance, grades, and course materials.',
            href: '/login',
            color: 'var(--yen-blue)'
        },
        {
            icon: Shield,
            title: 'Admin Portal',
            description: 'University-wide management and system configuration.',
            href: '/login',
            color: 'var(--yen-gold)'
        }
    ];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <motion.div
                    className={styles.heading}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className={styles.title}>Access Your Portal</h2>
                    <p className={styles.subtitle}>
                        Choose your role to access the unified platform.
                    </p>
                </motion.div>

                <div className={styles.grid}>
                    {portals.map((portal, index) => (
                        <PortalCard
                            key={index}
                            icon={portal.icon}
                            title={portal.title}
                            description={portal.description}
                            href={portal.href}
                            color={portal.color}
                            delay={index * 0.1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PortalsSection;
