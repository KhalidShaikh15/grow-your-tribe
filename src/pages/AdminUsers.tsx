import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import jsPDF from "jspdf";

const generatePDF = (user: any) => {

  console.log(user.plan, user.quantity);
  const doc = new jsPDF();

  const price = user.plan === "premium" ? 999 : 499;
const cleanAmount = price * (user.quantity || 1);

  // 🔵 HEADER
  doc.setFillColor(41, 98, 255);
  doc.rect(0, 0, 210, 40, "F");

  // 🖼️ LOGO
  doc.addImage("/logo.png", "PNG", 15, 7, 26, 26);

  // 🏷️ TITLE (BIGGER + CLEAN ALIGNMENT)
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont(undefined, "bold");
  doc.text("BANBRO'S INDIA", 50, 25);

  // RESET
  doc.setTextColor(0, 0, 0);

  // 🧾 SUBTITLE
  doc.setFontSize(16);
  doc.setFont(undefined, "bold");
  doc.text("Membership Invoice", 20, 65);

  // 📅 DATE (RIGHT SIDE)
  doc.setFontSize(11);
  doc.setFont(undefined, "normal");
  doc.text(
    `Date: ${new Date().toLocaleDateString()}`,
    150,
    65
  );

  // LINE
  doc.setDrawColor(180);
  doc.line(20, 70, 190, 70);

  // 📦 DETAILS SECTION (BETTER SPACING)
  let y = 90;

const row = (label: string, value: string) => {
  doc.setFont(undefined, "bold");
  doc.text(`${label} `, 20, y);

  // get width of label
  const labelWidth = doc.getTextWidth(`${label} `);

  doc.setFont(undefined, "normal");
  doc.text(value, 20 + labelWidth + 2, y); // 👈 dynamic positioning

  y += 12;
};

  row("Name:", user.name);
  row("Email:", user.email);
  row("Plan:", user.plan.toUpperCase());
  row("Quantity:", String(user.quantity || 1));

  // 💰 AMOUNT SECTION (PREMIUM BOX)
  doc.setFillColor(245, 247, 255);
  doc.roundedRect(20, y + 5, 170, 30, 3, 3, "F");

  doc.setDrawColor(41, 98, 255);
  doc.roundedRect(20, y + 5, 170, 30, 3, 3);

  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.text("Total Amount Paid", 25, y + 23);

  doc.setFontSize(16);
 doc.text(`Rs. ${cleanAmount}`, 140, y + 23);

  y += 50;

  // ✅ STATUS
  doc.setFontSize(12);
  doc.setFont(undefined, "normal");
  doc.setTextColor(0, 150, 0); // green
doc.setFont(undefined, "bold");
doc.text("Status: Approved", 20, y);

// reset back
doc.setTextColor(0, 0, 0);
doc.setFont(undefined, "normal");

  // FOOTER
  doc.setDrawColor(220);
  doc.line(20, 265, 190, 265);

  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text(
    "Thank you for joining BANBRO'S INDIA",
    20,
    275
  );

  doc.save(`${user.name}_invoice.pdf`);
};

const AdminUsers = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "submissions"),
      where("status", "==", "approved")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-background px-4 md:px-6 py-8">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <Link
            to="/admin"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          <h1 className="text-2xl md:text-3xl font-bold text-center md:text-left">
            Approved Users
          </h1>

          <div></div>

        </div>

        {/* TABLE */}
        <div className="bg-card border rounded-2xl shadow-lg overflow-hidden">

          {/* 🔥 MOBILE SCROLL FIX */}
          <div className="overflow-x-auto">

            <table className="w-full text-sm min-w-[600px]">

              <thead className="bg-muted">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Plan</th>
                  <th className="p-3 text-left">Qty</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Invoice</th>
                </tr>
              </thead>

              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center p-6">
                      No approved users yet
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.id} className="border-t hover:bg-muted/40 transition">

                      <td className="p-3 font-medium">{u.name}</td>
                      <td className="p-3">{u.email}</td>
                      <td className="p-3 capitalize">{u.plan}</td>
                      <td className="p-3">{u.quantity || 1}</td>
                      <td className="p-3 font-semibold text-primary">
                        ₹{u.amount}
                      </td>

                      <td className="p-3">
                        <button
                          onClick={() => generatePDF(u)}
                          className="px-3 py-1.5 bg-primary text-white rounded-lg text-xs md:text-sm hover:opacity-90"
                        >
                          Download
                        </button>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>

            </table>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminUsers;