import { NextRequest, NextResponse } from 'next/server';
import { del } from '@vercel/blob';
import { db } from '@/lib/db';
import { assets } from '@/lib/db/schema';
import { desc, eq, ilike, inArray } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const format = searchParams.get('format');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'newest';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '24');
    const offset = (page - 1) * limit;

    let query = db.select().from(assets).$dynamic();

    if (format && format !== 'all') {
      const formats = format.split(',');
      query = query.where(inArray(assets.sourceFormat, formats));
    }

    if (search) {
      query = query.where(ilike(assets.originalFilename, `%${search}%`));
    }

    if (sort === 'oldest') {
      query = query.orderBy(assets.createdAt);
    } else if (sort === 'name') {
      query = query.orderBy(assets.originalFilename);
    } else {
      query = query.orderBy(desc(assets.createdAt));
    }

    const results = await query.limit(limit).offset(offset);

    return NextResponse.json({ assets: results, page, limit });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch assets';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: 'Asset ID required' }, { status: 400 });
    }

    const [asset] = await db.select().from(assets).where(eq(assets.id, id)).limit(1);
    if (!asset) {
      return NextResponse.json({ error: 'Asset not found' }, { status: 404 });
    }

    // Delete from Blob storage
    const urlsToDelete = [asset.blobUrl];
    if (asset.thumbnailUrl) urlsToDelete.push(asset.thumbnailUrl);
    await Promise.allSettled(urlsToDelete.map(url => del(url)));

    // Delete from database
    await db.delete(assets).where(eq(assets.id, id));

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to delete asset';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
