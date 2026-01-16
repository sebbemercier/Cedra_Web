// components/layout/Footer.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Zap,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Facebook,
  Instagram,
  Youtube,
  Send,
  CheckCircle2,
  Shield,
  TrendingUp,
  Clock,
  Package,
  CreditCard,
} from "lucide-react";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcPaypal,
  FaApplePay,
  FaGooglePay,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    setIsSubscribed(true);
    setEmail("");

    // Reset after 3 seconds
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <footer className="border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          {/* Company Info - Spans 4 columns */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block group">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-cedra-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <Image
                    src="/logo.svg"
                    alt="Cedra"
                    width={96}
                    height={48}
                    className="relative h-12 w-24"
                  />
                </div>
              </div>
            </Link>

            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
              Transformez votre vision en réalité digitale avec des solutions
              innovantes et performantes.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              <SocialLink href="https://facebook.com" icon={<Facebook />} />
              <SocialLink href="https://instagram.com" icon={<Instagram />} />
              <SocialLink href="https://youtube.com" icon={<Youtube />} />
            </div>
          </div>

          {/* Quick Links - Spans 2 columns */}
          <div className="lg:col-span-2">
            <h4 className="text-white text-sm font-semibold mb-4 flex items-center gap-2">
              <Zap size={14} className="text-cedra-500" />
              Solutions
            </h4>
            <ul className="space-y-3">
              <FooterLink href="/services/web-development">
                Sites Web
              </FooterLink>
              <FooterLink href="/services/mobile-development">
                Applications
              </FooterLink>
              <FooterLink href="/services/ecommerce">E-commerce</FooterLink>
              <FooterLink href="/services/consulting">Consulting</FooterLink>
              <FooterLink href="/services/maintenance">Maintenance</FooterLink>
            </ul>
          </div>

          {/* Company Links - Spans 2 columns */}
          <div className="lg:col-span-2">
            <h4 className="text-white text-sm font-semibold mb-4">
              Entreprise
            </h4>
            <ul className="space-y-3">
              <FooterLink href="/about">À propos</FooterLink>
              <FooterLink href="/projects">Projets</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/careers">Carrières</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </ul>
          </div>

          {/* Newsletter - Spans 4 columns */}
          <div className="lg:col-span-4">
            <h4 className="text-white text-sm font-semibold mb-4">
              Newsletter
            </h4>
            <p className="text-zinc-400 text-sm mb-4">
              Restez informé de nos dernières actualités et offres exclusives.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading || isSubscribed}
                  className="bg-zinc-900 border-white/10 text-white placeholder:text-zinc-500 pr-12"
                />
                {isSubscribed && (
                  <CheckCircle2
                    size={20}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500"
                  />
                )}
              </div>
              <Button
                type="submit"
                disabled={isLoading || isSubscribed}
                className="w-full bg-cedra-500 hover:bg-cedra-600 text-black font-medium"
              >
                {isLoading ? (
                  "Inscription..."
                ) : isSubscribed ? (
                  <>
                    <CheckCircle2 size={16} className="mr-2" />
                    Inscrit !
                  </>
                ) : (
                  <>
                    <Send size={16} className="mr-2" />
                    S&apos;inscrire
                  </>
                )}
              </Button>
            </form>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2 mt-4">
              <TrustBadge text="SSL Sécurisé" />
              <TrustBadge text="RGPD Conforme" />
              <TrustBadge text="100% Belge" />
            </div>
          </div>
        </div>

        <Separator className="bg-white/5 mb-8" />

        {/* Middle Section - Contact & Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <ContactInfo
            icon={<Phone size={16} />}
            text="+32 2 123 45 67"
            href="tel:+3221234567"
          />
          <ContactInfo
            icon={<Mail size={16} />}
            text="contact@cedra.be"
            href="mailto:contact@cedra.be"
          />
          <ContactInfo icon={<MapPin size={16} />} text="Bruxelles, Belgique" />
          <ContactInfo icon={<Clock size={16} />} text="Lun-Ven: 9h-18h" />
        </div>

        <Separator className="bg-white/5 mb-8" />

        {/* Payment Methods */}
        <div className="mb-8">
          <h4 className="text-zinc-400 text-xs font-medium mb-4 flex items-center gap-2">
            <CreditCard size={14} />
            Paiements sécurisés
          </h4>
          <div className="flex flex-wrap items-center gap-3">
            {/* Bancontact - Image SVG */}
            <PaymentBadge
              icon={
                <Image
                  src="/payment-icons/Bancontact.svg"
                  alt="Bancontact"
                  width={60}
                  height={40}
                  className="w-full h-full object-contain"
                />
              }
              name="Bancontact"
            />

            {/* Autres - React Icons */}
            <PaymentBadge
              icon={<FaCcVisa className="w-full h-full text-[#1A1F71]" />}
              name="Visa"
            />
            <PaymentBadge
              icon={<FaCcMastercard className="w-full h-full text-[#EB001B]" />}
              name="Mastercard"
            />
            <PaymentBadge
              icon={<FaCcAmex className="w-full h-full text-[#006FCF]" />}
              name="American Express"
            />
            <PaymentBadge
              icon={<FaCcPaypal className="w-full h-full text-[#00457C]" />}
              name="PayPal"
            />
            <PaymentBadge
              icon={<FaApplePay className="w-full h-full" />}
              name="Apple Pay"
            />
            <PaymentBadge
              icon={<FaGooglePay className="w-full h-full" />}
              name="Google Pay"
            />
          </div>
        </div>

        <Separator className="bg-white/5 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-zinc-500">
            <p>© {currentYear} Cedra. Tous droits réservés.</p>
            <div className="flex items-center gap-4">
              <Link
                href="/legal/privacy"
                className="hover:text-cedra-500 transition-colors"
              >
                Confidentialité
              </Link>
              <Link
                href="/legal/terms"
                className="hover:text-cedra-500 transition-colors"
              >
                CGU
              </Link>
              <Link
                href="/legal/cookies"
                className="hover:text-cedra-500 transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 text-xs text-zinc-500">
            <div className="flex items-center gap-1.5">
              <TrendingUp size={12} className="text-green-500" />
              <span>99.9% Uptime</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Package size={12} className="text-cedra-500" />
              <span>500+ Projets</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-zinc-400 hover:text-cedra-500 text-sm transition-colors inline-flex items-center gap-2 group"
      >
        {children}
        <ArrowRight
          size={12}
          className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
        />
      </Link>
    </li>
  );
}

function ContactInfo({
  icon,
  text,
  href,
}: {
  icon: React.ReactNode;
  text: string;
  href?: string;
}) {
  const content = (
    <>
      <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-500 group-hover:text-cedra-500 group-hover:border-cedra-500/50 transition-colors">
        {icon}
      </div>
      <span className="text-zinc-400 text-sm group-hover:text-white transition-colors">
        {text}
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="flex items-center gap-2 group">
        {content}
      </Link>
    );
  }

  return <div className="flex items-center gap-2 group">{content}</div>;
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="w-9 h-9 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-500 hover:text-cedra-500 hover:border-cedra-500/50 hover:bg-cedra-500/5 transition-all"
    >
      {React.cloneElement(icon as React.ReactElement)}
    </motion.a>
  );
}

function PaymentBadge({ icon, name }: { icon: React.ReactNode; name: string }) {
  return (
    <div
      className="h-12 w-20 bg-zinc-900 border border-white/10 rounded-lg flex items-center justify-center hover:border-cedra-500/30 hover:bg-zinc-800 transition-all cursor-pointer group p-2"
      title={name}
    >
      <div className="w-full h-full group-hover:scale-110 transition-transform">
        {icon}
      </div>
    </div>
  );
}

function TrustBadge({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900/50 border border-white/5 rounded-full">
      <Shield size={10} className="text-green-500" />
      <span className="text-zinc-500 text-[10px] font-medium">{text}</span>
    </div>
  );
}
