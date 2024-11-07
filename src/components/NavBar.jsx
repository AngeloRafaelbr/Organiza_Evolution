import styles from './componentsStyles/Navbar.module.css';
import Link from 'next/link';
import { MdAdd, MdBarChart, MdOutlineHome, MdRemove, MdTrendingUp } from 'react-icons/md'
import UserMenu from './UserMenu';


export default function Navbar() {
    return (
        <section className={styles.navbar}>
            <div className={styles.logo}><Link href="/dashboard"><img src="https://res.cloudinary.com/dcbd1dnvk/image/upload/v1730427036/rganiza__2_-removebg-preview_2_rdnqbn.png" alt="logo" /></Link></div>

            <div className={styles.navLinks}>

                <Link href="/dashboard"> <MdOutlineHome /> Home</Link>

                <Link href="/receitas"> <MdAdd /> Receitas</Link>

                <Link href="/despesas"> <MdRemove /> Despesas</Link>

                <Link href="/budget"> <MdBarChart /> Orçamento</Link>

                <Link href="/investimentos"> <MdTrendingUp /> Investimentos</Link>

            </div>

            <div className="userMenuDiv"><UserMenu /></div>
        </section>
    );
};
