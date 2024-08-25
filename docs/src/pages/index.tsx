import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import Breadcrumbs from "@site/src/components/Breadcrumbs";

import styles from './index.module.css';

function HomepageHeader() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className="container">
                <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
                <p className={styles.heroSubtitle}>
                    A powerful React library for focus management, keyboard navigation, and accessibility enhancements. <br />
                    Elevate user experiences with seamless navigation and focus control.
                </p>
                <div className={styles.buttons}>
                    <Link
                        className="button button--secondary button--lg"
                        to="/docs/introduction">
                        Get Started
                    </Link>
                </div>
            </div>
        </header>
    );
}

function BenefitsSection() {
    return (
        <section className={styles.benefits}>
            <div className="container">
                <div className="row">
                    <div className="col col--6">
                        <div className={styles.benefit}>
                            <h3>🔄 Focus Management</h3>
                            <p>Control and manage focus with hooks and components designed for accessibility and usability.</p>
                        </div>
                    </div>
                    <div className="col col--6">
                        <div className={styles.benefit}>
                            <h3>🚀 Keyboard Navigation</h3>
                            <p>Enable seamless keyboard navigation with customizable navigation hooks for a smoother user experience.</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col col--6">
                        <div className={styles.benefit}>
                            <h3>🎯 Accessibility Enhancements</h3>
                            <p>Ensure your applications are accessible with focus rings, skip links, and focus traps.</p>
                        </div>
                    </div>
                    <div className="col col--6">
                        <div className={styles.benefit}>
                            <h3>📦 Lightweight</h3>
                            <p>
                                React Refocus is optimized for performance, ensuring minimal impact on your application’s load time.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col col--6">
                        <div className={styles.benefit}>
                            <h3>⚙️ Easy Integration</h3>
                            <p>
                                Integrates seamlessly with any React application, making it versatile and easy to use.
                            </p>
                        </div>
                    </div>
                    <div className="col col--6">
                        <div className={styles.benefit}>
                            <h3>🔧 Constantly Improving</h3>
                            <p>Benefit from regular updates and improvements based on community feedback.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function CommunitySection() {
    return (
        <section className={styles.community}>
            <div className="container">
                <h2>Join the Community</h2>
                <p>
                    Stay connected with other React Refocus users and developers. Get support, share ideas, and help us improve!
                </p>
                <div className={styles.communityLinks}>
                    <Link className="button button--secondary button--lg" to="https://github.com/mallikcheripally">
                        GitHub Repository
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default function Home(): JSX.Element {
    return (
        <Layout
            title={`React Refocus | Enhance Focus Management and Accessibility in React`}
            description="A powerful React library for focus management, keyboard navigation, and accessibility enhancements. Elevate user experiences with seamless navigation and focus control."
        >
            <Breadcrumbs />
            <HomepageHeader />
            <main>
                <BenefitsSection />
                <CommunitySection />
            </main>
        </Layout>
    );
}
