/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react"; 

export default function LandingPage() {
  const router = useRouter();

  const [particles, setParticles] = useState<FoodParticleProps[]>([]);
  
  const spawnIndexRef = useRef(0); // Pro staggered spawn
  const POSITIONS: string[] = Array.from({length: 30}, (_, i) => `position-${i+1}`);

  const IMAGES: string[] = [
    '/pictures/landing-page/egg-bread.jpg',
    '/pictures/landing-page/vegetables.jpg',
    '/pictures/landing-page/burger.jpg',
    '/pictures/landing-page/bread.jpg',
    '/pictures/landing-page/cake.jpg',
    '/pictures/landing-page/green-peas.jpg',
    '/pictures/landing-page/pasta.jpg',
    '/pictures/landing-page/pancake.jpg',
    '/pictures/landing-page/taco.jpg',
    '/pictures/landing-page/goulash.jpg',
    '/pictures/landing-page/grape.jpg',
    '/pictures/landing-page/strawberry.jpg',
     '/pictures/landing-page/lasagna.jpg',
    '/pictures/landing-page/watermelon.jpg',
     '/pictures/landing-page/cheese.jpg',
     '/pictures/landing-page/smoothies.jpg',
  ];

const SHUFFLED_IMAGES = (() => {
  const shuffled = [...IMAGES].sort(() => Math.random() - 0.5);
  return shuffled;
})(); 

  useEffect(() => {
    let isCancelled = false;

    const spawnParticle = () => {
      if (isCancelled) return;
      
      const particle: FoodParticleProps = {
        id: Date.now() + spawnIndexRef.current,
        src: SHUFFLED_IMAGES[spawnIndexRef.current % SHUFFLED_IMAGES.length],
        position: POSITIONS[spawnIndexRef.current % POSITIONS.length],      
        delay: 0,
        zIndex: 20 + spawnIndexRef.current % 50,
        lifecycle: 'new'
      };
      
      setParticles(prev => [...prev, particle]);
      spawnIndexRef.current++;
    };

    let initialIndex = 0;
    const initialInterval = setInterval(() => {
      spawnParticle();
      initialIndex++;
      if (initialIndex >= 9 || isCancelled) {
        clearInterval(initialInterval);
      }
    }, 900);

    
    const mainInterval = setInterval(() => {
      let spawnCount = 0;
      const spawnBatchInterval = setInterval(() => {
        spawnParticle();
        spawnCount++;
        if (spawnCount >= 7 || isCancelled) {
          clearInterval(spawnBatchInterval);
        }
      }, 900);
    }, 11000);

    return () => {
      isCancelled = true;
      clearInterval(initialInterval);
      clearInterval(mainInterval);
    };
  }, []);



  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    
    particles.forEach(particle => {
     
      const fadeTimeout = setTimeout(() => {
        setParticles(prev => prev.map(p => 
          p.id === particle.id ? { ...p, lifecycle: 'fading' } : p
        ));
      }, 8000);

    
      const removeTimeout = setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== particle.id));
      }, 12000);

      timeouts.push(fadeTimeout, removeTimeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [particles]);

  const startCreating = () => router.push("/planner");

  return (
    <>
     <style jsx global>{`
      
   :root {
          
           --shadow-light: 0 20px 40px rgba(0,0,0,0.1);
           --shadow-hover: 0 30px 60px rgba(0,0,0,0.15);
         }

         * { box-sizing: border-box; }
         body { margin: 0; padding: 0; }

        .landing-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          overflow: hidden;
          position: relative;
          color: #1f2937;
        }

        .main-button {
          width: 16rem;
          height: 16rem;
          background: white;
          border: none;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.3rem;
          text-align: center;
          padding: 2rem 1.5rem;
          box-shadow: var(--shadow-light);
          cursor: pointer;
          position: relative;
          z-index: 10000;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0.96;     
          backdrop-filter: blur(50px); /* ✅ Jedna hodnota */
          -webkit-backdrop-filter: blur(50px); /* ✅ Stejná hodnota */
}
        }

        .main-button:hover {
          transform: scale(1.05);
          box-shadow: var(--shadow-hover);
        }

         .main-button:active { transform: scale(0.98); }

        .btn-text-first { font-size: 1.4rem; margin-bottom: 0.3rem; }
        .btn-text-second { font-size: 1.1rem; opacity: 0.95; }

        /* 30 PŘEDDEFINOVANÝCH POZIC */
        .position-1 { left: 15%; top: 20%; }
        .position-2 { right: 12%; top: 25%; }
        .position-3 { left: 10%; bottom: 25%; }
        .position-4 { right: 15%; top: 60%; }
        .position-5 { left: 8%; bottom: 35%; }
        .position-6 { right: 20%; top: 40%; }
        .position-7 { left: 20%; top: 10%; }
        .position-8 { right: 10%; bottom: 20%; }
        .position-9 { left: 25%; top: 70%; }
        .position-10 { right: 25%; bottom: 10%; }
        .position-11 { left: 30%; top: 30%; }
        .position-12 { right: 30%; bottom: 30%; }
        .position-13 { left: 18%; bottom: 15%; }
        .position-14 { right: 18%; top: 75%; }
        .position-15 { left: 35%; top: 50%; }
        .position-16 { right: 35%; bottom: 50%; }
        .position-17 { left: 5%; top: 45%; }
        .position-18 { right: 5%; bottom: 45%; }
        .position-19 { left: 22%; top: 85%; }
        .position-20 { right: 22%; bottom: 85%; }
        .position-21 { left: 40%; top: 15%; }
        .position-22 { right: 40%; bottom: 15%; }
        .position-23 { left: 12%; top: 55%; }
        .position-24 { right: 12%; bottom: 55%; }
        .position-25 { left: 28%; bottom: 65%; }
        .position-26 { right: 28%; top: 65%; }
        .position-27 { left: 32%; top: 35%; }
        .position-28 { right: 32%; bottom: 35%; }
        .position-29 { left: 16%; top: 80%; }
        .position-30 { right: 16%; bottom: 80%; }

        /* NÁHODNÉ OBJEVOVÁNÍ Z POZIC */
      @keyframes appearFromPosition {
  0% { 
    opacity: 0; 
    transform: scale(0.3); 
  }
  15% { 
    opacity: 1;  /* ✅ 1 místo 0.85 */
    transform: scale(1.1); 
  }
  80% { 
    opacity: 1;  /* ✅ 1 místo 0.7 */
    transform: scale(1); 
  }
  100% { 
    opacity: 0; 
    transform: scale(0.8); 
  }
}

.float-mode .food-particle {
  animation: appearFromPosition 20s cubic-bezier(0.25, 0.36, 0.45, 0.94) infinite;
  transition: opacity 0.5s ease, transform 0.5s ease;
}    

        .food-particle {
          position: absolute;
          width: 200px;
          height: 200px;
          border-radius: 50px;
          object-fit: cover;
          box-shadow: 0 10px 30px rgba(0,0,0,0.25);
          pointer-events: none;
          
        }
      
        @media (max-width: 768px) {
          .main-button { width: 14rem; height: 14rem; font-size: 1.1rem; padding: 1.5rem 1rem; }
          .btn-text-first { font-size: 1.2rem; }
          .food-particle { width: 60px; height: 60px; }
        }

        .animation-toggle {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(255,255,255,0.9);
          border: none;
          padding: 0.8rem 1.2rem;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          z-index: 20;
        }

        .animation-toggle:hover {
          background: white;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        }

           
        /* Lifecycle styly */
        .food-particle.lifecycle-new {
          animation: appearFromPosition 20s cubic-bezier(0.25, 0.36, 0.45, 0.94) forwards !important;
        }
        
        .food-particle.lifecycle-fading {
          animation: fadeOut 2s ease-out forwards !important;
        }
        
        @keyframes fadeOut {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.5); }
        }
        
      `}</style>

      <div className={`landing-container`}>       

        {particles.map(particle => (
          <FoodParticle 
            key={particle.id}
            {...particle}
            lifecycle={particle.lifecycle}
          />
        ))}

        <button onClick={startCreating} className="main-button">
          <span className="btn-text-first">Chci začít</span>
          <span className="btn-text-second">tvořit jídelníček</span>
        </button>
      </div>
    </>
  );
}

type FoodParticleProps = {
  id: number;
  src: string;
  position: string;
  delay: number;
  zIndex: number;
  lifecycle: 'new' | 'fading';
};

function FoodParticle({ 
  src, 
  position, 
  zIndex, 
  lifecycle 
}: Omit<FoodParticleProps, 'id' | 'delay'>) {
  return (
  
    <img 
      alt="food"
      src={src}
      className={`food-particle ${position} lifecycle-${lifecycle}`}
      style={{ zIndex }}
    />
  );
}
