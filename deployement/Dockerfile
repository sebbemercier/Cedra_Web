# ============================================ 
# CEDRA FRONTEND - BUN PRODUCTION 2026 
# ============================================ 
FROM oven/bun:2.3-alpine AS deps 

WORKDIR /app 

# Cache dependencies 
# Adjusted to use bun.lock instead of bun.lockb as per project structure 
COPY package.json bun.lock ./ 
RUN bun install --frozen-lockfile --production 

# ============================================ 
# Builder 
# ============================================ 
FROM oven/bun:2.3-alpine AS builder 

WORKDIR /app 

# Copy deps 
COPY --from=deps /app/node_modules ./node_modules 
COPY . . 

# Build Next.js avec Bun
ENV NEXT_TELEMETRY_DISABLED=1
COPY deployement/healthcheck.js ./
RUN bun run build

# ============================================
# Runner - PRODUCTION
# ============================================
FROM oven/bun:2.3-alpine AS runner

WORKDIR /app

# Security: non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy assets
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/healthcheck.js ./

USER nextjs

EXPOSE 3000

# ✅ 2026: Bun runtime est maintenant recommandé
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD bun run healthcheck.js
CMD ["bun", "run", "server.js"] 
