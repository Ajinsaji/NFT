const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

module.exports = (data) => {
  const uploadDir = path.join(__dirname, "../uploads/certificates");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const fileName = `certificate_${Date.now()}.pdf`;
  const filePath = path.join(uploadDir, fileName);

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(22).text("Academic Certificate", { align: "center" });
  doc.moveDown();

  doc.fontSize(14).text(`Student Name: ${data.studentName}`);
  doc.text(`Course: ${data.course}`);
  doc.text(`Institution: ${data.institution}`);
  doc.text(`Year: ${data.year}`);
  doc.moveDown();

  doc.fontSize(12).text(
    "This certificate is issued as a blockchain-based NFT."
  );

  doc.end();

  return `/uploads/certificates/${fileName}`;
};
