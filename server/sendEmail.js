import express from "express";
import cors from "cors";
import { Resend } from "resend";
import PDFDocument from "pdfkit";

const app = express();
app.use(cors());
app.use(express.json());

const resend = new Resend("YOUR_API_KEY");

// 🔥 CREATE PDF FUNCTION
const generatePDF = ({ name, plan, amount }) => {
  return new Promise((resolve) => {
    const doc = new PDFDocument();
    const buffers = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });

    // 🧾 PDF DESIGN
    doc.fontSize(20).text("BANBRO'S INDIA", { align: "center" });
    doc.moveDown();

    doc.fontSize(16).text("Payment Receipt", { align: "center" });
    doc.moveDown(2);

    doc.fontSize(12).text(`Name: ${name}`);
    doc.text(`Plan: ${plan}`);
    doc.text(`Amount: ₹${amount}`);
    doc.text(`Status: Approved`);
    doc.text(`Date: ${new Date().toLocaleDateString()}`);

    doc.moveDown(2);
    doc.text("Thank you for being part of our community.", {
      align: "center",
    });

    doc.end();
  });
};

// 🔥 EMAIL ROUTE
app.post("/send-receipt", async (req, res) => {
  console.log("API HIT ✅", req.body);

  const { name, email, plan, amount } = req.body;

  try {
    const pdfBuffer = await generatePDF({ name, plan, amount });

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Your Membership Receipt",
      html: `
        <h2>Payment Approved ✅</h2>
        <p>Hello ${name},</p>
        <p>Your membership has been approved.</p>
        <p>Please find your receipt attached.</p>
      `,
      /*attachments: [
        {
          filename: "receipt.pdf",
          content: pdfBuffer.toString("base64"),
          type: "application/pdf", 

        },
      ],*/
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});