// components/layout/Footer.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
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
  CreditCard,
  Truck,
  Award,
} from "lucide-react";
import { FaCcAmex, FaCcPaypal, FaApplePay, FaGooglePay } from "react-icons/fa";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "@/lib/i18n";

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    setIsSubscribed(true);
    setEmail("");

    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <footer className="bg-background">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block group">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-cedra-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <Image
                    src="/logo-full.svg"
                    alt="Cedra"
                    width={96}
                    height={48}
                    className="relative h-12 w-24"
                  />
                </div>
              </div>
            </Link>

            <p className="text-zinc-300 text-sm leading-relaxed max-w-xs">
              {t.footer.description}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              <SocialLink
                href="https://facebook.com/cedra"
                icon={<Facebook size={16} />}
              />
              <SocialLink
                href="https://instagram.com/cedra"
                icon={<Instagram size={16} />}
              />
              <SocialLink
                href="https://youtube.com/cedra"
                icon={<Youtube size={16} />}
              />
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2">
              <TrustBadge
                icon={<Shield size={12} />}
                text={t.footer.securePayment}
              />
              <TrustBadge
                icon={<Truck size={12} />}
                text={t.footer.fastDelivery}
              />
              <TrustBadge
                icon={<Award size={12} />}
                text={t.footer.productWarranty}
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-4 text-sm">
              {t.footer.products}
            </h4>
            <ul className="space-y-3">
              <FooterLink href="/categories/cables">
                {t.footer.cablesWires}
              </FooterLink>
              <FooterLink href="/categories/tableaux">
                {t.footer.electricalPanels}
              </FooterLink>
              <FooterLink href="/categories/eclairage">
                {t.footer.ledLighting}
              </FooterLink>
              <FooterLink href="/categories/appareillage">
                {t.footer.equipment}
              </FooterLink>
              <FooterLink href="/categories/domotique">
                {t.footer.homeAutomation}
              </FooterLink>
              <FooterLink href="/promotions">{t.footer.promotions}</FooterLink>
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-4 text-sm">
              {t.footer.services}
            </h4>
            <ul className="space-y-3">
              <FooterLink href="/pro">{t.footer.proSpace}</FooterLink>
              <FooterLink href="/devis">{t.footer.freeQuote}</FooterLink>
              <FooterLink href="/help">
                {t.footer.technicalSupport}
              </FooterLink>
              <FooterLink href="/garanties">{t.footer.warranties}</FooterLink>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4">
            <h4 className="text-white font-semibold mb-4 text-sm">
              {t.footer.newsletter}
            </h4>
            <p className="text-zinc-300 text-sm mb-4 leading-relaxed">
              {t.footer.newsletterDesc}
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <Input
                  type="email"
                  placeholder={t.footer.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading || isSubscribed}
                  className="w-full bg-zinc-900 border-white/10 text-white placeholder:text-zinc-400 pr-12 focus:border-cedra-500 focus:ring-cedra-500/20"
                />
                {isSubscribed && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <CheckCircle2 size={20} className="text-green-500" />
                  </motion.div>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading || isSubscribed}
                className="w-full bg-cedra-500 hover:bg-cedra-600 text-black font-medium"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                    {t.footer.subscribing}
                  </div>
                ) : isSubscribed ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} />
                    {t.footer.subscribed}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send size={16} />
                    {t.footer.subscribe}
                  </div>
                )}
              </Button>
            </form>

            <p className="text-zinc-400 text-xs mt-3">
              {t.footer.privacyNotice}
            </p>
          </div>
        </div>

        <Separator className="bg-white/5 my-8" />

        {/* Middle Section - Contact & Payment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Contact Info */}
          <div>
            <h4 className="text-zinc-300 text-xs font-medium mb-4 flex items-center gap-2">
              <Phone size={14} />
              {t.footer.contact}
            </h4>
            <div className="space-y-3">
              <ContactInfo
                icon={<Mail size={14} />}
                text="contact@cedra.be"
                href="mailto:contact@cedra.be"
              />
              <ContactInfo
                icon={<Phone size={14} />}
                text="+32 2 XXX XX XX"
                href="tel:+3222XXXXXX"
              />
              <ContactInfo
                icon={<MapPin size={14} />}
                text="Bruxelles, Belgique"
              />
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h4 className="text-zinc-300 text-xs font-medium mb-4 flex items-center gap-2">
              <CreditCard size={14} />
              {t.footer.paymentMethods}
            </h4>
            <div className="flex flex-wrap gap-3">
              <PaymentBadge
                icon={
                  <Image
                    src="/payment-icons/Bancontact.svg"
                    alt="Bancontact"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                }
                name="Bancontact"
              />
              <PaymentBadge
                icon={
                  <Image
                    src="/payment-icons/Mastercard.svg"
                    alt="Mastercard"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                }
                name="Mastercard"
              />
              <PaymentBadge
                icon={
                  <Image
                    src="/payment-icons/Visa.svg"
                    alt="Visa"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                }
                name="Visa"
              />
              <PaymentBadge
                icon={<FaCcAmex size={32} className="text-[#006FCF]" />}
                name="American Express"
              />
              <PaymentBadge
                icon={<FaCcPaypal size={32} className="text-[#00457C]" />}
                name="PayPal"
              />
              <PaymentBadge
                icon={<FaApplePay size={32} className="text-white" />}
                name="Apple Pay"
              />
              <PaymentBadge
                icon={<FaGooglePay size={32} className="text-white" />}
                name="Google Pay"
              />
            </div>
          </div>
        </div>

        <Separator className="bg-white/5 my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="text-zinc-400 text-sm text-center md:text-left">
            <p className="mb-1">
              © {currentYear}{" "}
              <span className="text-cedra-500 font-semibold">CEDRA</span> -
              Commerce Électrique Digital Rapide Accessible
            </p>
            <p className="text-xs text-zinc-400">
              {t.footer.allRightsReserved}
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link
              href="/legal/mentions"
              className="text-zinc-400 hover:text-cedra-500 transition-colors"
            >
              {t.footer.legalNotice}
            </Link>
            <Link
              href="/legal/confidentialite"
              className="text-zinc-400 hover:text-cedra-500 transition-colors"
            >
              {t.footer.privacy}
            </Link>
            <Link
              href="/legal/cgv"
              className="text-zinc-400 hover:text-cedra-500 transition-colors"
            >
              {t.footer.terms}
            </Link>
            <Link
              href="/legal/cookies"
              className="text-zinc-400 hover:text-cedra-500 transition-colors"
            >
              {t.footer.cookies}
            </Link>
            <Link
              href="/legal/retractation"
              className="text-zinc-400 hover:text-cedra-500 transition-colors"
            >
              {locale === "fr" ? "Retractation" : locale === "nl" ? "Herroeping" : "Withdrawal"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Helper Components
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
        className="text-zinc-300 hover:text-cedra-500 text-sm transition-colors inline-flex items-center gap-2 group"
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
      <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-cedra-500 group-hover:border-cedra-500/50 transition-colors">
        {icon}
      </div>
      <span className="text-zinc-300 text-sm group-hover:text-white transition-colors">
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
      className="w-9 h-9 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-cedra-500 hover:border-cedra-500/50 hover:bg-cedra-500/5 transition-all"
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
      <div className="w-full h-full group-hover:scale-110 transition-transform flex items-center justify-center">
        {icon}
      </div>
    </div>
  );
}

function TrustBadge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900/50 border border-white/5 rounded-full">
      <div className="text-green-500">{icon}</div>
      <span className="text-zinc-400 text-[10px] font-medium">{text}</span>
    </div>
  );
}
