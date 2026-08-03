import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.AUTH_DB_NAME || "biblio-drop_db";
const client = new MongoClient(uri);

export async function GET(request) {
  try {
    await client.connect();
    const db = client.db(dbName);

    const totalUsers = await db.collection("user").countDocuments();
    const totalBooks = await db.collection("books").countDocuments();
    const pendingBooks = await db.collection("books").countDocuments({ 
      $or: [{ status: "Pending Approval" }, { status: "Pending" }, { status: "pending" }] 
    });
    
    const payments = await db.collection("payment").toArray();
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