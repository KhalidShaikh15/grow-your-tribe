import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Users, TrendingUp, Calendar, CheckCircle2, XCircle, Clock } from "lucide-react";
import { subscribeToSubmissions, updateSubmissionStatus, type Submission, type SubmissionStatus } from "@/lib/submissions";
import { useToast } from "@/hooks/use-toast";

const statusConfig: Record<SubmissionStatus, { label: string; icon: typeof Clock; className: string }> = {
  pending: { label: "Pending", icon: Clock, className: "text-yellow-600 bg-yellow-50" },
  approved: { label: "Approved", icon: CheckCircle2, className: "text-green-600 bg-green-50" },
  rejected: { label: "Rejected", icon: XCircle, className: "text-red-600 bg-red-50" },
};

const Admin = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsub = subscribeToSubmissions(
      (data) => {
        setSubmissions(data);
        setLoading(false);
      },
      (error) => {
        console.error(error);
        setLoading(false);
      }
    );
    return unsub;
  }, []);

  const handleStatusChange = async (id: string, status: SubmissionStatus) => {
    try {
      await updateSubmissionStatus(id, status);
      toast({ title: `Status updated to ${status}` });
    } catch {
      toast({ title: "Failed to update status", variant: "destructive" });
    }
  };

  const totalCount = submissions.length;
  const approvedCount = submissions.filter((s) => s.status === "approved").length;
  const pendingCount = submissions.filter((s) => s.status === "pending").length;

  const stats = [
    { label: "Total Submissions", value: totalCount, icon: Users, change: `${pendingCount} pending` },
    { label: "Approved", value: approvedCount, icon: CheckCircle2, change: `${((approvedCount / (totalCount || 1)) * 100).toFixed(0)}% approval rate` },
    { label: "This Week", value: submissions.filter((s) => s.createdAt > new Date(Date.now() - 7 * 86400000)).length, icon: Calendar, change: "Last 7 days" },
  ];

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

        {/* Table */}
        <div className="fade-up bg-card border rounded-xl overflow-hidden">
          <div className="p-5 border-b">
            <h2 className="text-lg font-semibold text-foreground">All Submissions</h2>
          </div>
          {loading ? (
            <div className="p-12 text-center text-muted-foreground">Loading...</div>
          ) : submissions.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">No submissions yet</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-3 font-medium text-muted-foreground">Name</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Email</th>
                    <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">Mobile</th>
                    <th className="text-left p-3 font-medium text-muted-foreground hidden lg:table-cell">Plan</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-3 font-medium text-muted-foreground hidden lg:table-cell">Date</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((s) => {
                    const sc = statusConfig[s.status];
                    return (
                      <tr key={s.id} className="border-b last:border-b-0 hover:bg-muted/30 transition-colors">
                        <td className="p-3 font-medium text-foreground">{s.name}</td>
                        <td className="p-3 text-muted-foreground">{s.email}</td>
                        <td className="p-3 text-muted-foreground hidden md:table-cell">{s.mobile}</td>
                        <td className="p-3 text-muted-foreground hidden lg:table-cell capitalize">{s.plan}</td>
                        <td className="p-3">
                          <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${sc.className}`}>
                            <sc.icon className="w-3 h-3" />
                            {sc.label}
                          </span>
                        </td>
                        <td className="p-3 text-muted-foreground hidden lg:table-cell">
                          {s.createdAt.toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                        </td>
                        <td className="p-3">
                          <select
                            value={s.status}
                            onChange={(e) => handleStatusChange(s.id, e.target.value as SubmissionStatus)}
                            className="text-xs border rounded-md px-2 py-1 bg-background text-foreground"
                          >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
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
