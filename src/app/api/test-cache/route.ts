import { NextRequest, NextResponse } from "next/server";

// Configure this route as dynamic
export const dynamic = "force-dynamic";

// In-memory cache for testing
interface CacheEntry {
  data: any;
  timestamp: number;
  expiresAt: number;
}

const testCache = new Map<string, CacheEntry>();
const CACHE_TTL = 30 * 1000; // 30 seconds for testing

// Helper function to get cached data
function getCachedData(key: string): any | null {
  const entry = testCache.get(key);
  if (entry && Date.now() < entry.expiresAt) {
    console.log(`Cache hit for key: ${key}`);
    return entry.data;
  }
  if (entry) {
    testCache.delete(key); // Remove expired entry
  }
  return null;
}

// Helper function to set cached data
function setCachedData(key: string, data: any): void {
  const now = Date.now();
  testCache.set(key, {
    data,
    timestamp: now,
    expiresAt: now + CACHE_TTL,
  });
  console.log(`Data cached for key: ${key}`);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key") || "default";

  // Check cache first
  const cachedData = getCachedData(key);
  if (cachedData) {
    return NextResponse.json({
      data: cachedData,
      cached: true,
      timestamp: new Date().toISOString(),
    });
  }

  // Simulate some "expensive" operation
  const newData = {
    message: "Fresh data generated",
    random: Math.random(),
    timestamp: new Date().toISOString(),
  };

  // Cache the data
  setCachedData(key, newData);

  console.log(`Generated fresh data for key: ${key}`);

  return NextResponse.json({
    data: newData,
    cached: false,
    timestamp: new Date().toISOString(),
  });
}
