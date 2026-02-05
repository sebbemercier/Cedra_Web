import { revalidateTag, revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Secure endpoint for on-demand ISR revalidation.
 * Called by the Go backend or manual triggers.
 */
export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get('secret');
  const tag = searchParams.get('tag');
  const path = searchParams.get('path');

  // 1. Security Check
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    // 2. Revalidate by Tag (Distributed via ValkeyCacheHandler)
    if (tag) {
      revalidateTag(tag, { expire: 0 });
      return NextResponse.json({ 
        revalidated: true, 
        type: 'tag', 
        tag, 
        timestamp: Date.now() 
      });
    }

    // 3. Revalidate by Path (Support for all locales /fr, /nl, /en)
    if (path) {
      const locales = ['fr', 'nl', 'en'];
      
      // We revalidate the path for each locale explicitly
      for (const locale of locales) {
        // Ensure path starts with / and doesn't double slash
        const normalizedPath = path.startsWith('/') ? path : `/${path}`;
        revalidatePath(`/${locale}${normalizedPath}`);
      }

      return NextResponse.json({ 
        revalidated: true, 
        type: 'path', 
        path, 
        locales,
        timestamp: Date.now() 
      });
    }

    return NextResponse.json({ message: 'Missing tag or path parameter' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ 
      message: 'Error revalidating', 
      error: err.message 
    }, { status: 500 });
  }
}
