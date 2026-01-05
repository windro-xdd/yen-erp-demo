"use client";
import React from 'react';
import { Users, BookOpen, ShieldCheck, BarChart3, Calendar, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './FeaturesSection.module.css';

const FeatureCard = ({ icon: Icon, title, description, variant = '' }) => {
    return (
        <motion.div
            className={`${styles.card} ${variant ? styles[variant] : ''}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className={styles.cardIcon}>
                <Icon size={24} />
            </div>
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardDesc}>{description}</p>
        </motion.div>
    );
};

const FeaturesSection = () => {
    const features = [
        {
            icon: Users,
            title: "Student Management",
            description: "Complete student lifecycle from admission to graduation with automated workflows.",
            variant: "cardLarge"
        },
        {
            icon: BookOpen,
            title: "Academic Engine",
            description: "Curriculum design, course scheduling, and assignment management."
        },
        {
            icon: Calendar,
            title: "Smart Scheduling",
            description: "Automated timetables with conflict detection and room allocation."
        },
        {
            icon: CreditCard,
            title: "Fee Management",
            description: "Online payments, receipts, and financial reporting in one place."
        },
        {
            icon: BarChart3,
            title: "Analytics Dashboard",
            description: "Real-time insights into academic performance and institutional metrics.",
            variant: "cardLarge"
        },
        {
            icon: ShieldCheck,
            title: "Enterprise Security",
            description: "Role-based access with audit trails and data encryption."
        }
    ];

    return (
        <section id="features" className={styles.section}>
            <div className={styles.container}>
                <motion.div
                    className={styles.heading}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className={styles.title}>Everything You Need</h2>
                    <p className={styles.subtitle}>
                        A complete suite of tools to manage modern academic operations.
                    </p>
                </motion.div>

                <div className={styles.bentoGrid}>
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                            variant={feature.variant}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
