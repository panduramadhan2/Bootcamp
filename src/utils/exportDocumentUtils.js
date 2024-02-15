// exportUtils.js

import PDFDocument from "pdfkit";
import ExcelJS from "exceljs";
import fs from "fs";

const exportToPDF = (data, fileName, title) => {
  const pdfDoc = new PDFDocument();
  const pdfStream = fs.createWriteStream(fileName);

  pdfDoc.pipe(pdfStream);

  pdfDoc.fontSize(16).text(`${title} Report`, { align: "center" });

  // Add data details to the PDF
  data.forEach((item) => {
    pdfDoc.text(`Item: ${item.name}, Amount: ${item.amount}`);
  });

  pdfDoc.end();
};

const exportToXLS = (data, fileName, sheetName) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(sheetName);

  // Add headers
  const headers = Object.keys(data[0]);
  worksheet.addRow(headers);

  // Add data rows
  data.forEach((item) => {
    const values = Object.values(item);
    worksheet.addRow(values);
  });

  // Save the workbook to a file
  workbook.xlsx.writeFile(fileName);
};

export const exportData = async (req, res, model, title, fileName, sheetName) => {
  try {
    const { startDate, endDate } = req.body;

    // Validate input
    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ error: `Invalid input. startDate and endDate are required for ${title}.` });
    }

    // Filter data based on the provided model
    const filteredData = await model.findAll({
      where: {
        date: {
          [sequelize.Op.between]: [startDate, endDate],
        },
      },
    });

    // Export to PDF
    const pdfFileName = `path/to/${fileName}-report.pdf`;
    exportToPDF(filteredData, pdfFileName, title);

    // Export to XLS
    const xlsFileName = `path/to/${fileName}-report.xlsx`;
    exportToXLS(filteredData, xlsFileName, sheetName);

    res.json({
      message: `${title} report generated successfully.`,
      pdfFileName,
      xlsFileName,
    });
  } catch (error) {
    console.error(`Error filtering ${title.toLowerCase()}:`, error);
    res.status(500).json({ error: "Internal server error." });
  }
};
