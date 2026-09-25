"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { NAV, type NavId } from "@/content/navigation";
import { SITE } from "@/content/site";

/**
 * Sticky mini header with reading progress and an animated section index.
 * Deliberately quiet: it orients, it does not compete with the content.
 */
export function ProposalHeader() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.4,
  });
  const [active, setActive] = useState<NavId | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top of the viewport that is visible.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const first = visible[0];
        if (first) setActive(first.target.id as NavId);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`print-hidden fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled
          ? "border-b border-line bg-paper/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <motion.div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px origin-left bg-accent"
        style={{ scaleX: reduce ? scrollYProgress : progress }}
      />
      <div className="container-proposal flex h-16 items-center justify-between gap-6">
        <a
          href="#inhalt"
          className="flex items-baseline gap-2 text-[0.9rem] font-medium tracking-[-0.01em] text-ink"
        >
          <span>{SITE.clientShort}</span>
          <span className="text-ink-4">×</span>
          <span>{SITE.senderCompany}</span>
        </a>

        <nav aria-label="Abschnitte" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={`relative inline-block rounded-full px-3.5 py-1.5 text-[0.85rem] transition-colors duration-300 ${
                      isActive ? "text-ink" : "text-ink-3 hover:text-ink"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        aria-hidden
                        className="absolute inset-0 -z-10 rounded-full bg-surface shadow-[0_1px_0_rgb(23_24_26/0.06),0_2px_6px_-2px_rgb(23_24_26/0.12)]"
                        transition={{ type: "spring", stiffness: 380, damping: 34 }}
                      />
                    )}
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <span className="eyebrow hidden sm:block lg:hidden">Persönlicher Vorschlag</span>
        <a
          href="#zahlungsplan"
          className="hidden text-[0.85rem] text-ink-3 transition-colors duration-300 hover:text-ink lg:inline-block"
        >
          Persönlicher Vorschlag · {SITE.proposalDate}
        </a>
        <span className="eyebrow sm:hidden">Vorschlag</span>
      </div>
    </header>
  );
}
