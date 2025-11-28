import Link from "next/link";
import "./App.css";
import "./Home.css";

export default function Home() {
  return (
    <main className="home">
      <div className="two-columns">
        {/* Hero sekce */}
        <section className="hero">
          <img id="home-hero-img" alt="Psaní nákupního seznamu" src="pictures/Ruka.png" />
          <h1 className="home__title">Vítejte ve Vašem chytrém jídelníčku:</h1>
          <h2 className="home__subtitle">Plánujte jídlo chytře. Nakupujte bez stresu.</h2>
          <em className="home__motto">
            „Jídelníček na míru během pár minut a automaticky vygenerovaný nákupní seznam šetří čas, peníze i nervy.“
          </em>

          <div className="cta">
            <Link href="/planner/" className="action-button">
              Začněte plánovat zdarma
            </Link>
            <p className="cta__note">Můžete okamžitě vyzkoušet</p>
          </div>
        </section>

        {/* Seznam benefitů */}
        <section className="benefits">
          <div className="benefit">
            <h3 className="benefit__title">🥗 Vyvážený jídelníček</h3>
            <p>Přizpůsobím si jídla podle svých potřeb od rychlých večeří přes zdravé svačiny až po speciální diety.</p>
          </div>
          <div className="benefit">
            <h3 className="benefit__title">🛒 Automatický seznam</h3>
            <p>
              Už nikdy nezapomenu na důležitou surovinu. Seznam nákupů se mi vygeneruje sám a můžu ho odškrtávat přímo
              při nákupu.
            </p>
          </div>
          <div className="benefit">
            <h3 className="benefit__title">⏳ Úspora času</h3>
            <p>Méně přemýšlení nad tím, co uvařit, více času na to, co mám ráda.</p>
          </div>
          <div className="benefit">
            <h3 className="benefit__title">🌱 Méně plýtvání</h3>
            <p>Využiji všechny suroviny naplno, nakupuji jen to, co skutečně potřebuji.</p>
          </div>
        </section>
      </div>

      {/* Krátké představení */}
      <p className="home__intro">
        Ať už chcete jíst zdravěji, ušetřit čas při vaření nebo mít vždycky přehled o tom, co nakoupit – jsme tu pro
        vás. Díky našemu chytrému plánovači si během chvilky sestavíte jídelníček přesně podle svých preferencí. A
        nákupní seznam? Ten vznikne automaticky – přehledný, bez zbytečností a vždy připravený k použití.
      </p>
    </main>
  );
}

/*
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
*/
