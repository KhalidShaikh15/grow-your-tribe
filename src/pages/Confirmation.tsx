import { useLocation, Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Download, Home } from "lucide-react";
import { jsPDF } from "jspdf";

const Confirmation = () => {
  const location = useLocation();
  const subscriber = location.state?.subscriber;

  if (!subscriber) return <Navigate to="/" replace />;

  const downloadReceipt = () => {
    const doc = new jsPDF();
    const date = new Date(subscriber.subscribedAt).toLocaleDateString("en-IN", {
      day: "2-digit", month: "long", year: "numeric",
    });

    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("BANBRO'SS INDIA", 20, 25);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120);
    doc.text("Membership Receipt", 20, 33);

    doc.setDrawColor(220);
    doc.line(20, 38, 190, 38);

    doc.setTextColor(40);
    doc.setFontSize(11);
    const fields = [
      ["Receipt ID", subscriber.id],
      ["Date", date],
      ["Name", subscriber.name],
      ["Email", subscriber.email],
      ["Mobile", subscriber.mobile],
      ["Age", subscriber.age],
      ["Gender", subscriber.gender],
      ["Address", subscriber.address],
    ];

    let y = 50;
    fields.forEach(([label, val]) => {
      doc.setFont("helvetica", "bold");
      doc.text(label, 20, y);
      doc.setFont("helvetica", "normal");
      doc.text(String(val), 70, y);
      y += 9;
    });

    doc.line(20, y + 2, 190, y + 2);
    y += 14;
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text("Amount Paid", 20, y);
    doc.text("\u20B9499", 170, y, { align: "right" });

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(150);
    doc.text("This is a computer-generated receipt and does not require a signature.", 20, 270);
    doc.text("BANBRO'SS INDIA \u00A9 " + new Date().getFullYear(), 20, 276);

    doc.save(`BANBROSS_Receipt_${subscriber.id}.pdf`);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="fade-up max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6"
             style={{ animation: "pulse-glow 2s ease-in-out infinite" }}>
          <CheckCircle2 className="w-8 h-8 text-success" />
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2">
          Welcome to BANBRO'SS INDIA!
        </h1>
        <p className="text-muted-foreground mb-8">
          Congratulations, {subscriber.name.split(" ")[0]}! Your membership is confirmed.
        </p>

        <div className="bg-card border rounded-xl p-5 mb-8 text-left space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Receipt ID</span>
            <span className="font-mono text-foreground text-xs">{subscriber.id}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Amount</span>
            <span className="font-semibold text-foreground">₹499</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Email</span>
            <span className="text-foreground">{subscriber.email}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="hero" className="flex-1 h-11 rounded-xl" onClick={downloadReceipt}>
            <Download className="w-4 h-4" />
            Download Receipt
          </Button>
          <Button variant="outline" className="flex-1 h-11 rounded-xl" asChild>
            <Link to="/">
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
