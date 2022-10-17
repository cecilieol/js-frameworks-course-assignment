import Link from "next/link";
import { useRouter } from 'next/router';

export default function Navigation() {
    const router = useRouter();

    return (
        <div className="nav">
            <Link href="/">
                <a className={router.pathname == "/" ? "active" : ""}>Home</a>
            </Link>
            <Link href="/contact">
                <a className={router.pathname == "/contact" ? "active" : ""}>Contact</a>
            </Link>
            <Link href="/login">
                <a className={router.pathname == "/login" ? "active" : ""}>Login</a>
            </Link>
        </div>
    );
}