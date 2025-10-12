import "./Home.css";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <main className="home">
      <div className="two-columns">
        {/* Hero sekce */}
        <section className="hero">
          <img
            id="home-hero-img"
            alt="Psaní nákupního seznamu"
            src="pictures/Ruka.png"
          />
          <h1 className="home__title">Vítejte ve Vašem chytrém jídelníčku:</h1>
          <h2 className="home__subtitle">
            Plánujte jídlo chytře. Nakupujte bez stresu.
          </h2>
          <em className="home__motto">
            „Jídelníček na míru během pár minut a automaticky vygenerovaný
            nákupní seznam šetří čas, peníze i nervy.“
          </em>

          <div className="cta">
            <Link to="/planner/" className="cta__button">
              Začněte plánovat zdarma
            </Link>
            <p className="cta__note">Můžete okamžitě vyzkoušet</p>
          </div>
        </section>

        {/* Seznam benefitů */}
        <section className="benefits">
          <div className="benefit">
            <h3 className="benefit__title">🥗 Vyvážený jídelníček</h3>
            <p>
              Přizpůsobím si jídla podle svých potřeb od rychlých večeří přes
              zdravé svačiny až po speciální diety.
            </p>
          </div>
          <div className="benefit">
            <h3 className="benefit__title">🛒 Automatický seznam</h3>
            <p>
              Už nikdy nezapomenu na důležitou surovinu. Seznam nákupů se mi
              vygeneruje sám a můžu ho odškrtávat přímo při nákupu.
            </p>
          </div>
          <div className="benefit">
            <h3 className="benefit__title">⏳ Úspora času</h3>
            <p>
              Méně přemýšlení nad tím, co uvařit, více času na to, co mám ráda.
            </p>
          </div>
          <div className="benefit">
            <h3 className="benefit__title">🌱 Méně plýtvání</h3>
            <p>
              Využiji všechny suroviny naplno, nakupuji jen to, co skutečně
              potřebuji.
            </p>
          </div>
        </section>
      </div>

      {/* Krátké představení */}
      <p className="home__intro">
        Ať už chcete jíst zdravěji, ušetřit čas při vaření nebo mít vždycky
        přehled o tom, co nakoupit – jsme tu pro vás. Díky našemu chytrému
        plánovači si během chvilky sestavíte jídelníček přesně podle svých
        preferencí. A nákupní seznam? Ten vznikne automaticky – přehledný, bez
        zbytečností a vždy připravený k použití.
      </p>
    </main>
  );
}
