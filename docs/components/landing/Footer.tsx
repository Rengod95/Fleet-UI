'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Footer component

const CONTACT_LINKS = [
  {
    label: 'Email',
    value: 'in.lee.business@gmail.com',
    href: 'mailto:in.lee.business@gmail.com',
  },
  {
    label: 'GitHub',
    value: 'Rengod95',
    href: 'https://github.com/Rengod95',
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 sm:gap-12 lg:gap-16 lg:grid-cols-2 lg:gap-8">
          {/* Left: Introduction */}
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Hire me.
            </h2>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-400 leading-relaxed">
              I specialize in building Design Systems, UX Engineering, and architecting complex frontend applications.
              Passionate about crafting performant and accessible user experiences.
            </p>
          </div>

          {/* Right: Contact Cards */}
          <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 items-center">
            {CONTACT_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.label === 'GitHub' ? '_blank' : undefined}
                rel={link.label === 'GitHub' ? 'noopener noreferrer' : undefined}
                className="group flex flex-col justify-center rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 transition-colors hover:border-white/20 hover:bg-white/10 min-h-[100px] sm:min-h-[120px] md:h-32"
              >
                <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">
                  {link.label}
                </span>
                <span className="mt-2 sm:mt-4 text-sm sm:text-base font-medium text-blue-400 group-hover:text-blue-300 break-all sm:break-normal">
                  {link.value}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 sm:mt-16 md:mt-24 border-t border-white/5 pt-6 sm:pt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-white">
              Fleet UI
            </span>
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} Fleet UI. All rights reserved.
            </p>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-gray-500 hover:text-white">Privacy</Link>
            <Link href="#" className="text-xs text-gray-500 hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
