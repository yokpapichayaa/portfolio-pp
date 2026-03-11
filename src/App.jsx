import { useState, useEffect, useRef } from "react";

/* ─── PHOTO ──────────────────────────────────────────────── */
import photo from "../src/assests/photo.jpg";

const PHOTO_SRC = photo;
/* ─── DATA ──────────────────────────────────────────────── */
const ME = {
  name: "Papichaya Saretae (YOK)",
  role: "Full-Stack Developer & Game Developer",
  email: "yokpapichaya@gmail.com",
  phone: "092-2971830",
  github: "https://github.com/yokpapichayaa",
  demo: "https://healthcare-system-lyart.vercel.app",
  demoRepo: "https://github.com/yokpapichayaa/healthcare-system.git",
  address: "189/87 Baan klang muang Phaholyothin-ramintra, Bangkok 10220",
};

const STATS = [
  { value: "7+", label: "Years Experience" },
  { value: "20+", label: "Projects Done" },
  { value: "12+", label: "Technologies" },
  { value: "3", label: "Companies" },
];

const SKILLS = [
  { name: "VS Code", years: 8, pct: 95, cat: "Tools" },
  { name: "WordPress / CMS", years: 5, pct: 90, cat: "Web" },
  { name: "HTML / CSS / JS", years: 5, pct: 88, cat: "Web" },
  { name: "Bootstrap", years: 5, pct: 85, cat: "Web" },
  { name: "Unity Engine", years: 3, pct: 78, cat: "Game" },
  { name: "C#", years: 3, pct: 75, cat: "Dev" },
  { name: "SQL", years: 5, pct: 70, cat: "Database" },
  { name: "Postman", years: 1, pct: 70, cat: "Tools" },
  { name: "React.js", years: 0.5, pct: 65, cat: "Web" },
  { name: "TailwindCSS", years: 0.5, pct: 65, cat: "Web" },
  { name: "Claude AI", years: 1, pct: 80, cat: "AI" },
  { name: "NotebookLM", years: 1, pct: 75, cat: "AI" },
];

const EXPERIENCES = [
  {
    id: "01",
    company: "Outsourcify",
    period: "Mar 2018 – Apr 2020",
    role: "Frontend WordPress Developer",
    tags: ["WordPress", "HTML", "CSS", "JavaScript"],
    desc: "Worked extensively with WordPress building custom themes and plugins. Collaborated with UX/UI designers on international client projects, customized themes and modified WordPress plugins to match unique client requirements.",
    highlights: ["International Clients", "Theme Customization", "Plugin Dev", "Client Meetings"],
    featured: false,
  },
  {
    id: "02",
    company: "Tigonsoft",
    period: "May 2020 – Jun 2023",
    role: "Web Developer & SEO Specialist",
    tags: ["WordPress", "SEO", "WPML", "React.js"],
    desc: "Focused on SEO using Yoast SEO, website translation via WPML, and multilingual support. Learned React.js and built landing pages. Then transitioned into game development with Unity Engine.",
    highlights: ["Yoast SEO", "WPML Translation", "React Pages", "Multilingual"],
    featured: true,
  },
  {
    id: "03",
    company: "Tigonsoft — Game",
    period: "Jun 2023 – Dec 2025",
    role: "Unity Game Developer",
    tags: ["Unity", "C#", "Animation", "QA"],
    desc: "Collaborated with UX/UI and graphic design teams to create game assets compatible with Unity. Structured entire projects, configured animations, wrote C# code for animation events, and worked with QA for final delivery.",
    highlights: ["Unity Engine", "C# Scripting", "Animation Events", "QA Review"],
    featured: false,
  },
];

/* ─── HOOKS ──────────────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useCounter(target, active, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const num = parseInt(target);
    if (isNaN(num)) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(p * num));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return count;
}

function useParallax(speed = 0.3) {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const h = () => setOffset(window.scrollY * speed);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, [speed]);
  return offset;
}

/* ─── SCROLL FADE WRAPPER ────────────────────────────────── */
function FadeUp({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView(0.1);
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0px)" : "translateY(40px)",
      transition: `opacity 0.75s ease ${delay}ms, transform 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ─── MOUSE TRAIL ──────────────────────────────────────────── */
function MouseGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  useEffect(() => {
    const h = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);
  return (
    <div style={{
      position: "fixed", top: 0, left: 0,
      pointerEvents: "none", zIndex: 9999,
      width: "min(400px,90vw)",height: "min(400px,90vw)", borderRadius: "50%",
      background: "radial-gradient(circle, rgba(173,255,47,0.06) 0%, transparent 70%)",
      transform: `translate(${pos.x - 200}px, ${pos.y - 200}px)`,
      transition: "transform 0.1s ease",
    }} />
  );
}

/* ─── NAVBAR ─────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = ["Home", "Skills", "Experience", "Projects", "Contact"];
  const scroll = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: "0 clamp(16px,4vw,40px)",
      background: scrolled ? "rgba(10,12,10,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(173,255,47,0.1)" : "none",
      transition: "all 0.4s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 72,
      flexWrap: "wrap"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "#ADFF2F",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 900,
          fontSize: 14,
          color: "#0a0c0a",
          flexShrink: 0
        }}>PY</div>

        <span style={{
          color: "#ADFF2F",
          fontWeight: 800,
          fontSize: "clamp(14px,2vw,18px)",
          letterSpacing: 2,
          whiteSpace: "nowrap"
        }}>
          PORTFOLIO<span style={{ color: "#fff" }}>.</span>
        </span>
      </div>

      <div
        style={{
          display: "flex",
          gap: "clamp(12px,3vw,32px)",
          flexWrap: "wrap",
          justifyContent: "center"
        }}
        className="nav-links"
      >
        {links.map(l => (
          <button
            key={l}
            onClick={() => scroll(l)}
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.65)",
              cursor: "pointer",
              fontSize: "clamp(12px,1.5vw,14px)",
              fontWeight: 500,
              letterSpacing: 1,
              transition: "color 0.2s",
              fontFamily: "inherit"
            }}
            onMouseEnter={e => e.target.style.color = "#ADFF2F"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.65)"}
          >
            {l}
          </button>
        ))}
      </div>

      <a
        href={ME.github}
        target="_blank"
        rel="noreferrer"
        style={{
          background: "#ADFF2F",
          color: "#0a0c0a",
          padding: "clamp(8px,1vw,10px) clamp(16px,2vw,24px)",
          borderRadius: 8,
          fontWeight: 700,
          fontSize: "clamp(12px,1.5vw,14px)",
          textDecoration: "none",
          letterSpacing: 0.5,
          transition: "all 0.2s",
          whiteSpace: "nowrap"
        }}
        onMouseEnter={e => {
          e.target.style.background = "#c8ff5a"
          e.target.style.transform = "translateY(-2px)"
        }}
        onMouseLeave={e => {
          e.target.style.background = "#ADFF2F"
          e.target.style.transform = "translateY(0)"
        }}
      >
        GitHub ↗
      </a>
    </nav>
  );
}

/* ─── HERO ───────────────────────────────────────────────── */
function Hero() {
  const [mounted, setMounted] = useState(false);
  const parallaxY = useParallax(0.25);
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  return (
    <section id="home" style={{
      minHeight: "100vh",
      display: "flex", alignItems: "center",
      padding: "120px 40px 80px",
      position: "relative", overflow: "hidden",
    }}>
      {/* BG Grid with parallax */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(173,255,47,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(173,255,47,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        transform: `translateY(${parallaxY * 0.3}px)`,
      }} />
      {/* Glow blobs */}
      <div style={{
        position: "absolute", top: "10%", right: "5%",
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(173,255,47,0.08) 0%, transparent 70%)",
        zIndex: 0,
        transform: `translateY(${-parallaxY * 0.15}px)`,
      }} />
      <div style={{
        position: "absolute", bottom: "10%", left: "-5%",
        width: "min(400px,90vw)",height: "min(400px,90vw)", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(173,255,47,0.05) 0%, transparent 70%)",
        zIndex: 0,
        transform: `translateY(${-parallaxY * 0.1}px)`,
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", zIndex: 1, display: "flex", gap: 60, alignItems: "center", flexWrap: "wrap" }}>
        {/* Left text */}
        <div style={{ flex: "1 1 460px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(173,255,47,0.08)", border: "1px solid rgba(173,255,47,0.2)",
            borderRadius: 20, padding: "6px 16px", marginBottom: 28,
            opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(20px)",
            transition: "all 0.6s ease 0.1s",
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#ADFF2F", animation: "pulse 2s infinite" }} />
            <span style={{ color: "#ADFF2F", fontSize: 12, fontWeight: 600, letterSpacing: 2 }}>KEEP YOUR CODE CLEAN !</span>
          </div>

          <h1 style={{
            fontSize: "clamp(38px, 5.5vw, 68px)", fontWeight: 900,
            lineHeight: 1.05, marginBottom: 8,
            opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(30px)",
            transition: "all 0.7s ease 0.2s",
          }}>
            <span style={{ color: "#fff" }}>Best </span>
            <span style={{ color: "#ADFF2F" }}>developer</span>
            <br />
            <span style={{ color: "rgba(255,255,255,0.35)" }}>portfolio for</span>
            <br />
            <span style={{ color: "#fff" }}>your future.</span>
          </h1>

          <p style={{
            color: "rgba(255,255,255,0.5)", fontSize: 16, lineHeight: 1.7,
            maxWidth: 440, marginTop: 24, marginBottom: 40,
            opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(20px)",
            transition: "all 0.7s ease 0.35s",
          }}>
            7+ years crafting web experiences, WordPress systems, and Unity games.
            From SEO-driven sites to interactive game worlds — I build things that work.
          </p>

          <div style={{
            display: "flex", gap: 16, flexWrap: "wrap",
            opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(20px)",
            transition: "all 0.7s ease 0.45s",
          }}>
            <a href={ME.demo} target="_blank" rel="noreferrer"
              style={{
                background: "#ADFF2F", color: "#0a0c0a",
                padding: "14px 32px", borderRadius: 10,
                fontWeight: 800, fontSize: 15, textDecoration: "none",
                letterSpacing: 0.5, display: "flex", alignItems: "center", gap: 8,
                transition: "all 0.25s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#c8ff5a"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(173,255,47,0.35)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#ADFF2F"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >View Demo ↗</a>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                background: "transparent",
                border: "1px solid rgba(173,255,47,0.4)",
                color: "#ADFF2F", padding: "14px 32px", borderRadius: 10,
                fontWeight: 700, fontSize: 15, cursor: "pointer",
                letterSpacing: 0.5, fontFamily: "inherit", transition: "all 0.25s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(173,255,47,0.08)"; e.currentTarget.style.borderColor = "#ADFF2F"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(173,255,47,0.4)"; }}
            >Contact Me →</button>
          </div>
        </div>

        {/* Center — Photo */}
        <div style={{
          flex: "0 1 clamp(200px,35vw,260px)",
          margin: "0 auto",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.9s cubic-bezier(0.22,1,0.36,1) 0.3s",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "clamp(12px,2vw,16px)",
        }}>
        <div style={{ position: "relative", width: "100%", maxWidth: 260 }}>
            
            {/* Decorative ring */}
            <div style={{
              position: "absolute",
              inset: "-3%",
              borderRadius: "40% 60% 55% 45% / 50% 45% 55% 50%",
              border: "2px solid rgba(173,255,47,0.25)",
              animation: "morphRing 8s ease-in-out infinite",
            }} />

            <div style={{
              position: "absolute",
              inset: "-6%",
              borderRadius: "55% 45% 40% 60% / 45% 55% 50% 50%",
              border: "1px solid rgba(173,255,47,0.1)",
              animation: "morphRing 12s ease-in-out infinite reverse",
            }} />

            {/* Glow behind photo */}
            <div style={{
              position: "absolute",
              inset: 0,
              borderRadius: "38% 62% 55% 45% / 48% 44% 56% 52%",
              background: "radial-gradient(circle at 50% 60%, rgba(173,255,47,0.15) 0%, transparent 70%)",
              filter: "blur(20px)",
              animation: "morphRing 8s ease-in-out infinite",
            }} />

            {/* Photo */}
            <div style={{
              width: "100%",
              aspectRatio: "3 / 4",
              borderRadius: "38% 62% 55% 45% / 48% 44% 56% 52%",
              overflow: "hidden",
              position: "relative",
              border: "2px solid rgba(173,255,47,0.2)",
              animation: "morphRing 8s ease-in-out infinite",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(173,255,47,0.08)",
            }}>
              <img
                src={PHOTO_SRC}
                alt="Papichaya Yok"
                style={{
                  width: "100%",
                  height: "130%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  filter: "brightness(0.95) contrast(1.05) saturate(0.9)",
                  mixBlendMode: "normal",
                }}
              />

              {/* Dark overlay */}
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "30%",
                background: "linear-gradient(transparent, rgba(10,12,10,0.6))",
              }} />
            </div>
          </div>

          {/* Name badge */}
          <div style={{
            background: "rgba(173,255,47,0.06)",
            border: "1px solid rgba(173,255,47,0.15)",
            borderRadius: 12,
            padding: "clamp(8px,1.5vw,10px) clamp(16px,3vw,20px)",
            textAlign: "center",
          }}>
            <div style={{
              color: "#fff",
              fontWeight: 700,
              fontSize: "clamp(12px,1.6vw,14px)"
            }}>
              Papichaya Saretae (YOK)
            </div>

            <div style={{
              color: "#ADFF2F",
              fontSize: "clamp(10px,1.3vw,11px)",
              letterSpacing: 1,
              marginTop: 2
            }}>
              DEVELOPER · CREATOR
            </div>
          </div>
        </div>

        {/* Right — Stats card */}
        <div style={{
          flex: "1 1 300px",
          opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateX(40px)",
          transition: "all 0.8s ease 0.5s",
        }}>
          <div style={{
            background: "rgba(173,255,47,0.04)",
            border: "1px solid rgba(173,255,47,0.12)",
            borderRadius: 24, padding: "40px 32px",
            backdropFilter: "blur(20px)",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: -60, right: -60,
              width: 200, height: 200, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(173,255,47,0.12) 0%, transparent 70%)",
            }} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, position: "relative" }}>
              {STATS.map((s, i) => (
                <StatItem key={i} stat={s} delay={i * 100} />
              ))}
            </div>
            <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid rgba(173,255,47,0.1)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: "rgba(173,255,47,0.12)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20,
                }}>🎓</div>
                <div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}>Suranaree University of Technology</div>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 2 }}>B.Sc. Information Technology · 2014–2018</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatItem({ stat, delay }) {
  const [ref, inView] = useInView();
  const count = useCounter(stat.value, inView);
  const suffix = stat.value.includes("+") ? "+" : "";
  return (
    <div ref={ref} style={{
      padding: 16, borderRadius: 12,
      background: "rgba(173,255,47,0.04)",
      border: "1px solid rgba(173,255,47,0.08)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : "translateY(10px)",
    }}>
      <div style={{ color: "#ADFF2F", fontWeight: 900, fontSize: 36, lineHeight: 1 }}>
        {count}{suffix}
      </div>
      <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 6, fontWeight: 500, letterSpacing: 0.5 }}>
        {stat.label}
      </div>
    </div>
  );
}

/* ─── SKILLS ─────────────────────────────────────────────── */
function Skills() {
  const [ref, inView] = useInView();
  const [filter, setFilter] = useState("All");
  const parallaxY = useParallax(0.08);
  const cats = ["All", "Web", "Game", "Dev", "Tools", "AI", "Database"];
  const filtered = filter === "All" ? SKILLS : SKILLS.filter(s => s.cat === filter);

  return (
    <section id="skills" style={{ padding: "clamp(60px,8vw,100px) clamp(20px,5vw,40px)", position: "relative" }}>
      <div style={{
        position: "absolute", left: 0, top: "50%",
        width: 300, height: 300, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(173,255,47,0.05) 0%, transparent 70%)",
        transform: `translateY(calc(-50% + ${parallaxY}px))`,
        pointerEvents: "none",
      }} />
      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeUp>
          <SectionHeader
            tag="TECHNICAL SKILLS"
            title={<>Your <span style={{ color: "#ADFF2F" }}>trusted</span> tech stack.</>}
            inView={true}
          />
        </FadeUp>

        <FadeUp delay={100}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 48, marginTop: 32 }}>
            {cats.map(c => (
              <button key={c} onClick={() => setFilter(c)}
                style={{
                  padding: "8px 20px", borderRadius: 20,
                  border: `1px solid ${filter === c ? "#ADFF2F" : "rgba(173,255,47,0.2)"}`,
                  background: filter === c ? "#ADFF2F" : "transparent",
                  color: filter === c ? "#0a0c0a" : "rgba(255,255,255,0.5)",
                  cursor: "pointer", fontWeight: 600, fontSize: 13,
                  letterSpacing: 0.5, fontFamily: "inherit", transition: "all 0.2s",
                }}
              >{c}</button>
            ))}
          </div>
        </FadeUp>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 20,
        }}>
          {filtered.map((s, i) => (
            <SkillCard key={s.name} skill={s} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ skill, index, inView }) {
  const [hovered, setHovered] = useState(false);
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    if (inView) setTimeout(() => setAnimated(true), index * 80);
  }, [inView, index]);
  const catColors = {
    Web: "#ADFF2F", Game: "#00E5FF", Dev: "#FF6B35",
    Tools: "#A855F7", AI: "#F59E0B", Database: "#10B981",
  };
  const color = catColors[skill.cat] || "#ADFF2F";
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "24px",
        borderRadius: 16,
        border: `1px solid ${hovered ? color + "40" : "rgba(255,255,255,0.07)"}`,
        background: hovered ? `${color}08` : "rgba(255,255,255,0.02)",
        transition: "all 0.3s ease",
        opacity: animated ? 1 : 0,
        transform: animated ? "none" : "translateY(20px)",
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{skill.name}</div>
          <div style={{
            display: "inline-block", padding: "2px 10px", borderRadius: 20,
            background: color + "18", color: color,
            fontSize: 11, fontWeight: 600, letterSpacing: 1,
          }}>{skill.cat}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ color: color, fontWeight: 800, fontSize: 22, lineHeight: 1 }}>{skill.pct}%</div>
          <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, marginTop: 2 }}>
            {skill.years < 1 ? `${Math.round(skill.years * 12)}mo` : `${skill.years}yr`}
          </div>
        </div>
      </div>
      <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 2,
          background: `linear-gradient(90deg, ${color}, ${color}80)`,
          width: animated ? `${skill.pct}%` : "0%",
          transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: `0 0 10px ${color}60`,
        }} />
      </div>
    </div>
  );
}

/* ─── EXPERIENCE ─────────────────────────────────────────── */
function Experience() {
  const [ref, inView] = useInView();
  const parallaxY = useParallax(0.06);
  return (
    <section id="experience" style={{ padding: "clamp(60px,8vw,100px) clamp(20px,5vw,40px)", position: "relative" }}>
      <div style={{
        position: "absolute", right: 0, top: "30%",
        width: "min(400px,90vw)",height: "min(400px,90vw)", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(173,255,47,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
        transform: `translateY(${parallaxY}px)`,
      }} />
      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeUp>
          <SectionHeader
            tag="PROFESSIONAL EXPERIENCE"
            title={<>Built with <span style={{ color: "#ADFF2F" }}>real</span> world teams.</>}
            inView={true}
          />
        </FadeUp>
        <div style={{ marginTop: 56, display: "flex", flexDirection: "column", gap: 24 }}>
          {EXPERIENCES.map((exp, i) => (
            <FadeUp key={exp.id} delay={i * 120}>
              <ExpCard exp={exp} index={i} inView={inView} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExpCard({ exp, index, inView }) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setExpanded(!expanded)}
      style={{
        padding: exp.featured ? "36px 36px" : "28px 32px",
        borderRadius: 20,
        border: exp.featured
          ? "1px solid rgba(173,255,47,0.3)"
          : `1px solid ${hovered ? "rgba(173,255,47,0.15)" : "rgba(255,255,255,0.06)"}`,
        background: exp.featured
          ? "rgba(173,255,47,0.06)"
          : hovered ? "rgba(173,255,47,0.03)" : "rgba(255,255,255,0.02)",
        cursor: "pointer", transition: "all 0.3s ease",
        position: "relative", overflow: "hidden",
      }}
    >
      {exp.featured && (
        <div style={{
          position: "absolute", top: 20, right: 20,
          background: "#ADFF2F", color: "#0a0c0a",
          fontSize: 11, fontWeight: 700, padding: "4px 12px",
          borderRadius: 20, letterSpacing: 1,
        }}>FEATURED</div>
      )}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 24, flexWrap: "wrap" }}>
        <div style={{
          width: 56, height: 56, borderRadius: 14,
          background: exp.featured ? "rgba(173,255,47,0.15)" : "rgba(173,255,47,0.08)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#ADFF2F", fontWeight: 900, fontSize: 18, flexShrink: 0,
          border: "1px solid rgba(173,255,47,0.2)",
        }}>{exp.id}</div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 6 }}>
            <h3 style={{ color: "#fff", fontWeight: 800, fontSize: 20, margin: 0 }}>{exp.company}</h3>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>·</span>
            <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 13 }}>{exp.period}</span>
          </div>
          <div style={{ color: "#ADFF2F", fontWeight: 600, fontSize: 14, marginBottom: 12, letterSpacing: 0.3 }}>{exp.role}</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {exp.tags.map(t => (
              <span key={t} style={{
                padding: "3px 12px", borderRadius: 20,
                background: "rgba(173,255,47,0.08)", border: "1px solid rgba(173,255,47,0.15)",
                color: "rgba(173,255,47,0.8)", fontSize: 12, fontWeight: 600,
              }}>{t}</span>
            ))}
          </div>
        </div>
        <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 20, transition: "transform 0.3s", transform: expanded ? "rotate(180deg)" : "none" }}>↓</div>
      </div>
      <div style={{
        maxHeight: expanded ? 400 : 0, overflow: "hidden",
        transition: "max-height 0.4s ease",
        marginTop: expanded ? 24 : 0,
        paddingTop: expanded ? 24 : 0,
        borderTop: expanded ? "1px solid rgba(173,255,47,0.1)" : "none",
      }}>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 15, lineHeight: 1.75, marginBottom: 20 }}>{exp.desc}</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {exp.highlights.map(h => (
            <div key={h} style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.6)", fontSize: 13 }}>
              <span style={{ color: "#ADFF2F", fontSize: 10 }}>◆</span> {h}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── PROJECTS ───────────────────────────────────────────── */
function Projects() {
  const [ref, inView] = useInView();
  return (
    <section id="projects" style={{ padding: "clamp(60px,8vw,100px) clamp(20px,5vw,40px)" }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeUp>
          <SectionHeader
            tag="PROJECTS & DEMOS"
            title={<>Trusted platform <span style={{ color: "#ADFF2F" }}>anytime & anywhere.</span></>}
            inView={true}
          />
        </FadeUp>

        <FadeUp delay={150} style={{ marginTop: 56 }}>
          <div style={{
            padding: "48px",
            borderRadius: 24,
            background: "linear-gradient(135deg, rgba(173,255,47,0.08) 0%, rgba(173,255,47,0.02) 100%)",
            border: "1px solid rgba(173,255,47,0.25)",
            display: "flex", gap: 48, alignItems: "center", flexWrap: "wrap",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: -100, right: -100,
              width: "min(400px,90vw)",height: "min(400px,90vw)", borderRadius: "50%",
              background: "radial-gradient(circle, rgba(173,255,47,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />
            <div style={{ flex: "1 1 300px" }}>
              <div style={{
                display: "inline-block", padding: "4px 14px", borderRadius: 20,
                background: "#ADFF2F", color: "#0a0c0a",
                fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 20,
              }}>FEATURED PROJECT</div>
              <h3 style={{ color: "#fff", fontWeight: 800, fontSize: 28, marginBottom: 12, lineHeight: 1.2 }}>Healthcare System with AI</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
                A full-stack healthcare management system built with modern React patterns and AI integration. Showcasing real-world application development with clean code architecture.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 28 }}>
                {["React.js", "AI Integration", "Healthcare", "Vercel"].map(t => (
                  <span key={t} style={{
                    padding: "4px 14px", borderRadius: 20,
                    background: "rgba(173,255,47,0.1)", border: "1px solid rgba(173,255,47,0.2)",
                    color: "#ADFF2F", fontSize: 12, fontWeight: 600,
                  }}>{t}</span>
                ))}
              </div>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <a href="https://healthcare-system-lyart.vercel.app" target="_blank" rel="noreferrer"
                  style={{
                    background: "#ADFF2F", color: "#0a0c0a",
                    padding: "12px 28px", borderRadius: 10,
                    fontWeight: 700, fontSize: 14, textDecoration: "none",
                    display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(173,255,47,0.35)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
                >Live Demo ↗</a>
                <a href="https://github.com/yokpapichayaa/healthcare-system.git" target="_blank" rel="noreferrer"
                  style={{
                    border: "1px solid rgba(173,255,47,0.3)", color: "#ADFF2F",
                    padding: "12px 28px", borderRadius: 10,
                    fontWeight: 700, fontSize: 14, textDecoration: "none", transition: "all 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(173,255,47,0.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                >View Code →</a>
              </div>
            </div>
            <div style={{ flex: "0 1 280px" }}>
              <div style={{
                background: "rgba(10,12,10,0.8)", border: "1px solid rgba(173,255,47,0.15)",
                borderRadius: 16, padding: "24px", fontFamily: "monospace", fontSize: 13,
              }}>
                <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
                  {["#ff5f56","#ffbd2e","#27c93f"].map(c => (
                    <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
                  ))}
                </div>
                {[
                  { txt: "import React from \'react\'", col: "rgba(255,255,255,0.6)" },
                  { txt: "import { useState } from \'react\'", col: "rgba(255,255,255,0.6)" },
                  { txt: "", col: "" },
                  { txt: "const App = () => {", col: "#ADFF2F" },
                  { txt: "  const [data, setData]", col: "#fff" },
                  { txt: "    = useState([])", col: "#ADFF2F" },
                  { txt: "  // AI Integration", col: "rgba(255,255,255,0.3)" },
                  { txt: "  return <Dashboard />", col: "#fff" },
                  { txt: "}", col: "#ADFF2F" },
                ].map((line, i) => (
                  <div key={i} style={{ color: line.col, lineHeight: 1.8, fontSize: 12 }}>{line.txt}</div>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={250} style={{ marginTop: 32 }}>
          <div style={{
            padding: "32px 40px", borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: 20,
          }}>
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Explore all repositories on GitHub</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>github.com/yokpapichayaa</div>
            </div>
            <a href={ME.github} target="_blank" rel="noreferrer"
              style={{
                border: "1px solid rgba(173,255,47,0.4)", color: "#ADFF2F",
                padding: "12px 28px", borderRadius: 10,
                fontWeight: 700, fontSize: 14, textDecoration: "none", transition: "all 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(173,255,47,0.08)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "none"; }}
            >Visit GitHub ↗</a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── CONTACT ────────────────────────────────────────────── */
function Contact() {
  const [ref, inView] = useInView();
  const [copied, setCopied] = useState("");
  const copy = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(label);
      setTimeout(() => setCopied(""), 2000);
    });
  };
  const contacts = [
    { icon: "📧", label: "Email", value: ME.email, action: () => copy(ME.email, "email") },
    { icon: "📞", label: "Phone", value: ME.phone, action: () => copy(ME.phone, "phone") },
    { icon: "💻", label: "GitHub", value: "yokpapichayaa", action: () => window.open(ME.github, "_blank") },
    { icon: "🌐", label: "Demo Site", value: "healthcare-system-lyart.vercel.app", action: () => window.open(ME.demo, "_blank") },
  ];
  return (
    <section id="contact" style={{ padding: "100px 40px 120px" }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeUp>
          <SectionHeader
            tag="GET IN TOUCH"
            title={<>Let's build something <span style={{ color: "#ADFF2F" }}>great</span> together.</>}
            inView={true}
          />
        </FadeUp>
        <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32, flexWrap: "wrap" }}>
          <FadeUp delay={100}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {contacts.map((c) => (
                <div key={c.label}
                  onClick={c.action}
                  style={{
                    padding: "20px 24px", borderRadius: 14,
                    border: `1px solid ${copied === c.label.toLowerCase().replace(" ", "") ? "#ADFF2F" : "rgba(255,255,255,0.07)"}`,
                    background: copied === c.label.toLowerCase() ? "rgba(173,255,47,0.06)" : "rgba(255,255,255,0.02)",
                    cursor: "pointer", display: "flex", alignItems: "center", gap: 16,
                    transition: "all 0.25s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(173,255,47,0.25)"; e.currentTarget.style.background = "rgba(173,255,47,0.04)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: 10,
                    background: "rgba(173,255,47,0.1)", border: "1px solid rgba(173,255,47,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
                  }}>{c.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, letterSpacing: 1, marginBottom: 2 }}>{c.label}</div>
                    <div style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>{c.value}</div>
                  </div>
                  <div style={{ color: "rgba(173,255,47,0.5)", fontSize: 18 }}>→</div>
                </div>
              ))}
            </div>
          </FadeUp>
          <FadeUp delay={200}>
            <div style={{
              padding: "36px", borderRadius: 20,
              border: "1px solid rgba(173,255,47,0.12)", background: "rgba(173,255,47,0.04)",
            }}>
              <div style={{ fontSize: 32, marginBottom: 20 }}>📍</div>
              <h3 style={{ color: "#ADFF2F", fontWeight: 700, fontSize: 16, letterSpacing: 1, marginBottom: 12 }}>LOCATION</h3>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.8 }}>
                189/87 Baan klang muang<br />
                Phaholyothin-ramintra,<br />
                Tha Raeng Subdistrict,<br />
                Bang Khen District,<br />
                <strong style={{ color: "rgba(255,255,255,0.8)" }}>Bangkok 10220</strong>
              </p>
              <div style={{ marginTop: 28, paddingTop: 24, borderTop: "1px solid rgba(173,255,47,0.1)" }}>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, letterSpacing: 1, marginBottom: 10 }}>AVAILABILITY</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ADFF2F", animation: "pulse 2s infinite" }} />
                  <span style={{ color: "#ADFF2F", fontWeight: 600, fontSize: 14 }}>Open to opportunities</span>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(173,255,47,0.08)",
      padding: "32px 40px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      flexWrap: "wrap", gap: 16,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 6, background: "#ADFF2F",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 900, fontSize: 11, color: "#0a0c0a",
        }}>PY</div>
        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>© 2025 Papichaya Yok · Built with React.js</span>
      </div>
      <div style={{ display: "flex", gap: 24 }}>
        {["Skills", "Experience", "Projects", "Contact"].map(l => (
          <button key={l}
            onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: "none", border: "none",
              color: "rgba(255,255,255,0.35)", cursor: "pointer",
              fontSize: 13, fontFamily: "inherit", transition: "color 0.2s",
            }}
            onMouseEnter={e => e.target.style.color = "#ADFF2F"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.35)"}
          >{l}</button>
        ))}
      </div>
    </footer>
  );
}

/* ─── SECTION HEADER ─────────────────────────────────────── */
function SectionHeader({ tag, title, inView }) {
  return (
    <div>
      <div style={{ color: "#ADFF2F", fontSize: 12, fontWeight: 700, letterSpacing: 3, marginBottom: 16 }}>{tag}</div>
      <h2 style={{ fontSize: "clamp(32px, 4.5vw, 52px)", fontWeight: 900, color: "rgba(255,255,255,0.8)", lineHeight: 1.1, margin: 0 }}>{title}</h2>
    </div>
  );
}

/* ─── ROOT APP ───────────────────────────────────────────── */
export default function App() {
  return (
    <div style={{
      background: "#0a0c0a",
      minHeight: "100vh",
      fontFamily: "\'Syne\', \'Space Grotesk\', system-ui, sans-serif",
      color: "#fff",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url(\'https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800;900&display=swap\');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0c0a; }
        ::-webkit-scrollbar-thumb { background: rgba(173,255,47,0.3); border-radius: 2px; }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes morphRing {
          0%, 100% { border-radius: 38% 62% 55% 45% / 48% 44% 56% 52%; }
          33% { border-radius: 55% 45% 38% 62% / 52% 60% 40% 48%; }
          66% { border-radius: 45% 55% 62% 38% / 55% 45% 55% 45%; }
        }
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
        }
      `}</style>

      <MouseGlow />
      <Navbar />
      <Hero />

      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(173,255,47,0.15), transparent)", margin: "0 40px" }} />
      <Skills />
      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(173,255,47,0.15), transparent)", margin: "0 40px" }} />
      <Experience />
      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(173,255,47,0.15), transparent)", margin: "0 40px" }} />
      <Projects />
      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(173,255,47,0.15), transparent)", margin: "0 40px" }} />
      <Contact />
      <Footer />
    </div>
  );
}
