import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  onSnapshot,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { Button } from "@/components/ui/button";

const Admin = () => {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ ONLY FETCH PENDING USERS
  useEffect(() => {
    const q = query(
      collection(db, "submissions"),
      where("status", "==", "pending")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSubscribers(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ✅ FETCH ALL USERS (for stats)
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "submissions"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllUsers(data);
    });

    return () => unsubscribe();
  }, []);

  // ✅ STATS
  const totalUsers = allUsers.length;
  const approved = allUsers.filter(u => u.status === "approved").length;
  const pending = allUsers.filter(u => u.status === "pending").length;

  const basicPlan = allUsers.filter(u => u.plan === "basic").length;
  const premiumPlan = allUsers.filter(u => u.plan === "premium").length;

  // ✅ UPDATED FUNCTION (EMAIL + FIREBASE)
  const updateStatus = async (user: any, status: string) => {
    const confirmAction = window.confirm(
      `Are you sure you want to ${status} this user?`
    );

    if (!confirmAction) return;

    const ref = doc(db, "submissions", user.id);
    await updateDoc(ref, { status });

    // ✅ SEND EMAIL ONLY IF APPROVED
    if (status === "approved") {
      try {
        await fetch("http://localhost:5000/send-receipt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: user.name,
            email: user.email,
            plan: user.plan,
            amount: user.amount,
          }),
        });
      } catch (error) {
        console.error("Email failed:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      
      <div className="max-w-6xl mx-auto">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Admin Dashboard
        </h1>

        {/* ✅ STATS */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">

          <div className="p-4 bg-card border rounded-xl text-center">
            <p className="text-sm text-muted-foreground">Total Users</p>
            <p className="text-xl font-bold">{totalUsers}</p>
          </div>

          <div className="p-4 bg-card border rounded-xl text-center">
            <p className="text-sm text-muted-foreground">Approved</p>
            <p className="text-xl font-bold text-green-600">{approved}</p>
          </div>

          <div className="p-4 bg-card border rounded-xl text-center">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-xl font-bold text-yellow-600">{pending}</p>
          </div>

          <div className="p-4 bg-card border rounded-xl text-center">
            <p className="text-sm text-muted-foreground">Plans</p>
            <p className="text-sm font-medium">
              ₹499: {basicPlan} | ₹999: {premiumPlan}
            </p>
          </div>

        </div>

        {/* ✅ TABLE */}
        <div className="bg-card border rounded-2xl shadow-sm overflow-hidden">

          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Plan</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {subscribers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center p-6 text-muted-foreground">
                    No pending requests 🎉
                  </td>
                </tr>
              ) : (
                subscribers.map((s) => (
                  <tr key={s.id} className="border-t">
                    <td className="p-3">{s.name}</td>
                    <td className="p-3">{s.email}</td>
                    <td className="p-3 capitalize">{s.plan}</td>

                    <td className="p-3 text-center space-x-2">
                      <Button
                        onClick={() => updateStatus(s, "approved")}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        Approve
                      </Button>

                      <Button
                        onClick={() => updateStatus(s, "rejected")}
                        variant="destructive"
                      >
                        Reject
                      </Button>
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

export default Admin;