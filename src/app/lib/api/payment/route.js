import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { MongoClient } from 'mongodb';
import { auth } from '@/app/lib/auth';

const uri = process.env.MONGODB_URI;
const dbName = process.env.AUTH_DB_NAME || "biblio-drop_db";
const client = new MongoClient(uri);

export async function GET(request) {
  try {
    const headersList = await headers();
    
    const session = await auth.api.getSession({
      headers: headersList
    });

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized. Please log in as admin." },
        { status: 401 }
      );
    }

    await client.connect();
    const db = client.db(dbName);
    
    const categoryStats = await db.collection("books").aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      }
    ]).toArray();

    return NextResponse.json({ categoryStats }, { status: 200 });

  } catch (err) {
    console.error("Admin Chart API Error:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}