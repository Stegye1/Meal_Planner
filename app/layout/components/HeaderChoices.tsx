import Link from "next/link";

export function HeaderChoices() {
  return (
    <ul className="nav-links">
      <li>
        <Link href="/">Úvod</Link>
      </li>

      <li>
        <Link href="/planner">Plánování jídelníčku</Link>
      </li>

      <li>
        <Link href="/videos">Videa</Link>
      </li>

      <li>
        <Link href="/meals">Recepty</Link>
      </li>

      <li>
        <Link href="/contacts">Kontakty</Link>
      </li>
    </ul>
  );
}
