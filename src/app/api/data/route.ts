import { NextResponse } from 'next/server';

export async function GET() {
  const currentTime = new Date().toISOString();
  const randomNumber = Math.floor(Math.random() * 10) + 1;

  return NextResponse.json({ time: currentTime, number: randomNumber });
}

