import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AdminUsers = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "submissions"),
      where("status", "==", "approved") // ✅ IMPORTANT
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Approved Users:", data); // 🔥 DEBUG
      setUsers(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

  {/* Back Button */}
  <Link
    to="/admin"
    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
  >
    <ArrowLeft className="w-4 h-4" />
    Back to Dashboard
  </Link>

  {/* Title */}
  <h1 className="text-2xl md:text-3xl font-bold text-center md:text-left">
    Approved Users
  </h1>

  {/* Spacer */}
  <div></div>

</div>

        <div className="bg-card border rounded-2xl shadow-lg overflow-hidden">

          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Plan</th>
                <th className="p-3 text-left">Qty</th>
                <th className="p-3 text-left">Amount</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-6">
                    No approved users yet
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="border-t">
                    <td className="p-3">{u.name}</td>
                    <td className="p-3">{u.email}</td>
                    <td className="p-3 capitalize">{u.plan}</td>
                    <td className="p-3">{u.quantity || 1}</td>
                    <td className="p-3 font-semibold text-primary">
                      ₹{u.amount}
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
};

export default AdminUsers;