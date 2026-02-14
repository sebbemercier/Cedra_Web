"use client";

import React from "react";
import Image from "next/image";
import {
  ChevronRight,
  Package,
  BarChart3,
  Zap,
  Tag,
  TrendingUp,
  Clock,
  Sparkles,
  ArrowUpRight,
  Euro,
  Calendar,
  Cable,
  Target,
} from "lucide-react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/lib/i18n";

export default function PromoGrid() {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-0"
    >
      {/* Professional Card - B2B Focus */}
      <motion.div variants={itemVariants} className="lg:col-span-1">
        <PromoCard
          title={t.promo.tradeAccount}
          subtitle={t.promo.forProfessionals}
          cta={t.promo.joinNetwork}
          href="/register-pro"
          badge={t.promo.exclusive}
          badgeVariant="premium"
        >
          <div className="flex flex-col gap-6 h-full justify-between">
            <ul className="text-zinc-400 text-sm space-y-4">
              <BulletPoint icon={<Euro size={16} className="text-cedra-500" />}>
                {t.promo.vatExclusive}
              </BulletPoint>
              <BulletPoint
                icon={<Calendar size={16} className="text-cedra-500" />}
              >
                {t.promo.net30}
              </BulletPoint>
              <BulletPoint
                icon={<Cable size={16} className="text-cedra-500" />}
              >
                {t.promo.apiAccess}
              </BulletPoint>
              <BulletPoint
                icon={<Target size={16} className="text-cedra-500" />}
              >
                {t.promo.dedicatedManager}
              </BulletPoint>
            </ul>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <IconBox icon={<Package size={20} />} label={t.promo.inventory} />
              <IconBox
                icon={<BarChart3 size={20} />}
                label={t.promo.analytics}
              />
            </div>
          </div>
        </PromoCard>
      </motion.div>

      {/* Flash Deals - Urgency & Impact */}
      <motion.div variants={itemVariants} className="lg:col-span-1">
        <PromoCard
          title={t.promo.flashDeals}
          subtitle={t.promo.limitedTime}
          cta={t.promo.viewOffers}
          href="/products?filter=sale"
          badge={t.promo.hot}
          badgeVariant="hot"
        >
          <div className="h-full bg-zinc-950/50 rounded-2xl flex flex-col items-center justify-center border border-red-500/10 relative overflow-hidden group/flash p-8 shadow-inner">
            {/* Pulsing background effect */}
            <motion.div
              className="absolute inset-0 bg-red-600/5 blur-3xl rounded-full"
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="text-center relative z-10">
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-7xl font-black text-white italic tracking-tighter">
                  -40
                </span>
                <span className="text-4xl font-black text-red-500">%</span>
              </div>
              <div className="text-xs uppercase tracking-[0.2em] text-red-500 font-black flex items-center justify-center gap-2 mb-6">
                <Zap size={14} className="fill-red-500 animate-pulse" />
                {t.promo.onSelectItems}
              </div>

              <div className="inline-flex items-center gap-3 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-[11px] text-red-400 font-bold">
                <Clock size={12} />
                <span>EXPIRATION: 02:14:45</span>
              </div>
            </div>
          </div>
        </PromoCard>
      </motion.div>

      {/* New Arrivals - Visual Showcase */}
      <motion.div variants={itemVariants} className="lg:col-span-2">
        <PromoCard
          title={t.promo.newArrivals}
          subtitle={t.promo.latestStock}
          cta={t.promo.browseCatalog}
          href="/products?sort=newest"
          badge={t.promo.new}
          badgeVariant="new"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 h-full">
            <ProductThumb
              name="Baie serveur"
              img="https://images.unsplash.com/photo-1558494949-ef010dbae831?w=400&q=80"
              newLabel
              newText={t.promo.new}
              viewText={t.promo.view}
            />
            <ProductThumb
              name="Switch réseau"
              img="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&q=80"
              newLabel
              newText={t.promo.new}
              viewText={t.promo.view}
            />
            <ProductThumb
              name="Alimentation"
              img="https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&q=80"
              viewText={t.promo.view}
            />
            <ProductThumb
              name="Câble fibre"
              img="https://images.unsplash.com/photo-1542382257-80dedb725088?w=400&q=80"
              viewText={t.promo.view}
            />
          </div>
        </PromoCard>
      </motion.div>

      {/* Clearance - Elegant Savings */}
      <motion.div variants={itemVariants} className="lg:col-span-4">
        <PromoCard
          title={t.promo.clearance}
          subtitle={t.promo.outletSale}
          cta={t.promo.shopNow}
          href="/products?category=outlet"
          badge={t.promo.savings}
          badgeVariant="outlet"
        >
          <div className="h-full grid grid-cols-1 md:grid-cols-3 items-center gap-8 bg-zinc-950/40 border border-amber-500/10 rounded-2xl p-8 relative overflow-hidden group/outlet">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="md:col-span-2 flex flex-col items-start gap-4">
              <div className="p-3 bg-amber-500/10 rounded-xl">
                <Tag size={32} className="text-amber-500" />
              </div>
              <p className="text-zinc-300 text-lg leading-relaxed max-w-xl">
                {t.promo.endOfLine}
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end justify-center">
              <div className="flex flex-col items-center md:items-end gap-1">
                <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
                  {t.promo.upTo}
                </span>
                <span className="text-6xl font-black text-amber-500 tracking-tighter">
                  -70%
                </span>
                <Badge className="bg-amber-500/20 text-amber-500 border border-amber-500/30 font-black uppercase tracking-tighter py-1 px-4 mt-2">
                  LIQUIDATION TOTALE
                </Badge>
              </div>
            </div>
          </div>
        </PromoCard>
      </motion.div>
    </motion.div>
  );
}

// Enhanced Sub-components

function PromoCard({
  title,
  subtitle,
  cta,
  href,
  children,
  badge,
  badgeVariant = "default",
}: {
  title: string;
  subtitle?: string;
  cta: string;
  href: string;
  children: React.ReactNode;
  badge?: string;
  badgeVariant?: "default" | "premium" | "hot" | "new" | "outlet";
}) {
  const badgeStyles = {
    default: "bg-zinc-800 text-zinc-300",
    premium: "bg-cedra-500 text-white shadow-[0_0_15px_rgba(230,0,35,0.4)]",
    hot: "bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]",
    new: "bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]",
    outlet: "bg-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.4)]",
  };

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className="group relative flex flex-col h-full bg-zinc-900/20 backdrop-blur-md border border-white/5 rounded-3xl p-6 md:p-8 transition-all duration-500 hover:border-white/20 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden"
    >
      {/* Light sweep effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500"
        style={{
          background: useTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.05),
              transparent 80%
            )
          `,
        }}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-8 relative z-10">
        <div>
          {subtitle && (
            <div className="text-cedra-500 text-[11px] font-black uppercase tracking-[0.2em] mb-2">
              {subtitle}
            </div>
          )}
          <h3 className="text-2xl md:text-3xl font-black text-white italic tracking-tighter uppercase font-display leading-none">
            {title}
          </h3>
        </div>
        {badge && (
          <Badge
            className={`${badgeStyles[badgeVariant]} border-none rounded-lg px-3 py-1 text-[10px] font-black uppercase tracking-wider`}
          >
            {badge}
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 mb-8 relative z-10">{children}</div>

      {/* Footer CTA */}
      <Link
        href={href}
        className="inline-flex items-center gap-2 text-white/50 text-xs font-black uppercase tracking-[0.2em] group-hover:text-cedra-500 transition-colors relative z-10"
      >
        <span className="pb-0.5 border-b-2 border-transparent group-hover:border-cedra-500 transition-all">
          {cta}
        </span>
        <ArrowUpRight
          size={16}
          className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
        />
      </Link>
    </motion.div>
  );
}

function IconBox({ icon, label }: { icon: React.ReactNode; label?: string }) {
  return (
    <div className="aspect-square bg-zinc-800/40 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-zinc-400 hover:text-white hover:bg-cedra-500/20 hover:border-cedra-500/50 transition-all cursor-pointer group/icon p-4">
      <div className="mb-2 group-hover/icon:scale-110 transition-transform duration-300">
        {icon}
      </div>
      {label && (
        <span className="text-[10px] font-black uppercase tracking-tighter opacity-60 text-center leading-tight">
          {label}
        </span>
      )}
    </div>
  );
}

function ProductThumb({
  name,
  img,
  newLabel,
  newText = "Nouveau",
  viewText = "Voir",
}: {
  name: string;
  img: string;
  newLabel?: boolean;
  newText?: string;
  viewText?: string;
}) {
  return (
    <div className="bg-zinc-950 rounded-2xl overflow-hidden border border-white/5 group/thumb cursor-pointer relative aspect-square transition-all duration-500 hover:shadow-2xl hover:shadow-cedra-500/20">
      <Image
        src={img}
        alt={name}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className="object-cover opacity-50 group-hover/thumb:opacity-100 group-hover/thumb:scale-110 transition-all duration-700"
        unoptimized
      />
      {newLabel && (
        <div className="absolute top-3 right-3 bg-white text-black text-[9px] font-black uppercase px-2 py-1 rounded-md shadow-xl z-10">
          {newText}
        </div>
      )}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent opacity-0 group-hover/thumb:opacity-100 transition-all duration-300 flex items-end p-4 z-10">
        <div className="transform translate-y-2 group-hover/thumb:translate-y-0 transition-transform duration-300">
          <span className="text-white text-xs font-black uppercase italic tracking-tighter block mb-1">
            {name}
          </span>
          <span className="text-cedra-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
            {viewText} <ChevronRight size={12} />
          </span>
        </div>
      </div>
    </div>
  );
}

function BulletPoint({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3 group/bullet">
      <div className="mt-0.5 p-1 bg-zinc-800/50 rounded-md group-hover:bg-cedra-500/10 transition-colors">
        {icon}
      </div>
      <span className="text-sm font-medium group-hover:text-white transition-colors">
        {children}
      </span>
    </li>
  );
}

// Helper for motion template
function useTemplate(strings: TemplateStringsArray, ...values: any[]) {
  return useTransform(values, (latestValues) => {
    return strings.reduce(
      (acc, str, i) => acc + str + (latestValues[i] ?? ""),
      "",
    );
  });
}
