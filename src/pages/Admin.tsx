import { Link } from "react-router-dom";
import { ArrowLeft, Users, TrendingUp, Calendar } from "lucide-react";
import {
  CURRENT_SUBSCRIBERS, SUBSCRIBER_GOAL, mockSubscribers, dailyGrowth, formatIndianNumber,
} from "@/lib/mockData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const stats = [
  { label: "Total Subscribers", value: formatIndianNumber(CURRENT_SUBSCRIBERS), icon: Users, change: "+4,231 this week" },
  { label: "Goal Progress", value: ((CURRENT_SUBSCRIBERS / SUBSCRIBER_GOAL) * 100).toFixed(1) + "%", icon: TrendingUp, change: `${formatIndianNumber(SUBSCRIBER_GOAL - CURRENT_SUBSCRIBERS)} remaining` },
  { label: "Avg. Daily Signups", value: formatIndianNumber(Math.round(dailyGrowth.reduce((a, b) => a + b.subscribers, 0) / dailyGrowth.length)), icon: Calendar, change: "Last 30 days" },
];

const Admin = () => {
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
            <h2 className="text-lg font-semibold text-foreground">Recent Subscribers</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3 font-medium text-muted-foreground">Name</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Email</th>
                  <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">Mobile</th>
                  <th className="text-left p-3 font-medium text-muted-foreground hidden lg:table-cell">Gender</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {mockSubscribers
                  .sort((a, b) => new Date(b.subscribedAt).getTime() - new Date(a.subscribedAt).getTime())
                  .map((s) => (
                    <tr key={s.id} className="border-b last:border-b-0 hover:bg-muted/30 transition-colors">
                      <td className="p-3 font-medium text-foreground">{s.name}</td>
                      <td className="p-3 text-muted-foreground">{s.email}</td>
                      <td className="p-3 text-muted-foreground hidden md:table-cell">{s.mobile}</td>
                      <td className="p-3 text-muted-foreground hidden lg:table-cell">{s.gender}</td>
                      <td className="p-3 text-muted-foreground">
                        {new Date(s.subscribedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
