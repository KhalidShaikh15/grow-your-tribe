import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Users, TrendingUp, Calendar, Loader2 } from "lucide-react";
import { collection, getDocs, query, orderBy, getCountFromServer } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { SUBSCRIBER_GOAL, formatIndianNumber, type Subscriber } from "@/lib/mockData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const Admin = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [countSnap, docsSnap] = await Promise.all([
          getCountFromServer(collection(db, "subscribers")),
          getDocs(query(collection(db, "subscribers"), orderBy("subscribedAt", "desc"))),
        ]);

        setTotalCount(countSnap.data().count);

        const subs: Subscriber[] = docsSnap.docs.map((doc) => {
          const d = doc.data();
          return {
            id: doc.id,
            name: d.name || "",
            email: d.email || "",
            mobile: d.mobile || "",
            age: d.age || 0,
            gender: d.gender || "",
            address: d.address || "",
            plan: d.plan || "basic",
            amount: d.amount || 499,
            subscribedAt: d.subscribedAt?.toDate?.()?.toISOString?.() || new Date().toISOString(),
            status: d.status || "pending",
          };
        });
        setSubscribers(subs);
      } catch (err) {
        console.error("Error fetching subscribers:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Build daily growth from actual data
  const dailyGrowth = (() => {
    const map: Record<string, number> = {};
    for (let i = 29; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000);
      const key = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
      map[key] = 0;
    }
    subscribers.forEach((s) => {
      const key = new Date(s.subscribedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
      if (key in map) map[key]++;
    });
    return Object.entries(map).map(([date, subscribers]) => ({ date, subscribers }));
  })();

  const avgDaily = dailyGrowth.length
    ? Math.round(dailyGrowth.reduce((a, b) => a + b.subscribers, 0) / dailyGrowth.length)
    : 0;

  const stats = [
    { label: "Total Subscribers", value: formatIndianNumber(totalCount), icon: Users, change: `${subscribers.length} loaded` },
    { label: "Goal Progress", value: ((totalCount / SUBSCRIBER_GOAL) * 100).toFixed(1) + "%", icon: TrendingUp, change: `${formatIndianNumber(SUBSCRIBER_GOAL - totalCount)} remaining` },
    { label: "Avg. Daily Signups", value: formatIndianNumber(avgDaily), icon: Calendar, change: "Last 30 days" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="flex items-center gap-4 px-6 md:px-12 py-4 border-b bg-card/80 backdrop-blur-sm sticky top-0 z-40">
        <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <span className="font-bold text-lg text-foreground">Admin Dashboard</span>
      </nav>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {stats.map((s, i) => (
            <div key={s.label} className={`fade-up fade-up-delay-${i + 1} bg-card border rounded-xl p-5`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <s.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">{s.label}</span>
              </div>
              <p className="text-2xl font-bold text-foreground counter-text">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.change}</p>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="fade-up bg-card border rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Daily Signups — Last 30 Days</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} interval={4} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                    fontSize: 13,
                  }}
                />
                <Bar dataKey="subscribers" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Table */}
        <div className="fade-up bg-card border rounded-xl overflow-hidden">
          <div className="p-5 border-b">
            <h2 className="text-lg font-semibold text-foreground">
              Recent Subscribers {subscribers.length > 0 && `(${subscribers.length})`}
            </h2>
          </div>
          {subscribers.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              No subscribers yet. Share the link to start getting members!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-3 font-medium text-muted-foreground">Name</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Email</th>
                    <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">Mobile</th>
                    <th className="text-left p-3 font-medium text-muted-foreground hidden lg:table-cell">Plan</th>
                    <th className="text-left p-3 font-medium text-muted-foreground hidden lg:table-cell">Status</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((s) => (
                    <tr key={s.id} className="border-b last:border-b-0 hover:bg-muted/30 transition-colors">
                      <td className="p-3 font-medium text-foreground">{s.name}</td>
                      <td className="p-3 text-muted-foreground">{s.email}</td>
                      <td className="p-3 text-muted-foreground hidden md:table-cell">{s.mobile}</td>
                      <td className="p-3 text-muted-foreground hidden lg:table-cell capitalize">{s.plan}</td>
                      <td className="p-3 hidden lg:table-cell">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          s.status === "approved" ? "bg-success/10 text-success" :
                          s.status === "rejected" ? "bg-destructive/10 text-destructive" :
                          "bg-accent/10 text-accent"
                        }`}>
                          {s.status}
                        </span>
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {new Date(s.subscribedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
