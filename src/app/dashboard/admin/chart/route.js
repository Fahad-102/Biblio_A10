import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.AUTH_DB_NAME || "biblio-drop_db";
const client = new MongoClient(uri);

export async function GET(request) {
  try {
    const headersList = await headers();
    const authHeader = headersList.get("authorization");
    
    // সঠিক লজিক: যদি হেডার না থাকে অথবা সেটি Bearer দিয়ে শুরু না হয়
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized. No token provided." },
        { status: 401 }
      );
    }

    await client.connect();
    const db = client.db(dbName);

    const totalUsers = await db.collection("user").countDocuments();
    const totalBooks = await db.collection("books").countDocuments();
    const pendingBooks = await db.collection("books").countDocuments({ status: "pending" });
    
    const payments = await db.collection("payments").toArray();
    const totalRevenue = payments.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

    return NextResponse.json({
      totalUsers,
      totalBooks,
      pendingBooks,
      totalRevenue
    }, { status: 200 });

  } catch (err) {
    console.error("Admin Chart API Error:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}