import * as XLSX from "xlsx-js-style";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { GetAllDataResponse } from "@/types/type";

const PRIMARY_COLOR_RGB = [79, 70, 229] as const;
const PRIMARY_COLOR_HEX = "4F46E5";

const formatDataForExport = (data: GetAllDataResponse["data"]) => {
  return data.map((item) => ({
    ID: item.id_banner_ads_package,
    "Package Name": item.package_name,
    Description: item.package_description,
    Price: item.package_price,
    Duration: `${item.package_duration} ${item.package_duration > 1 ? "Days" : "Day"}`,
    "Created At": item.created_at,
    Status: item.package_is_active ? "Active" : "Inactive",
    "From Admin": item.from_admin ? "Yes" : "No",
  }));
};

export const exportToExcel = (data: GetAllDataResponse["data"]) => {
  const formattedData = formatDataForExport(data);
  const worksheet = XLSX.utils.json_to_sheet(formattedData);

  const wscols = [
    { wch: 10 },
    { wch: 30 },
    { wch: 40 },
    { wch: 15 },
    { wch: 15 },
    { wch: 20 },
    { wch: 15 },
    { wch: 15 },
  ];

  worksheet["!cols"] = wscols;

  const headerStyle = {
    font: { bold: true, color: { rgb: "FFFFFF" } },
    fill: { fgColor: { rgb: PRIMARY_COLOR_HEX } },
    alignment: { vertical: "center" },
    border: {
      top: { style: "thin" },
      bottom: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" },
    },
  };

  const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1");

  for (let C = range.s.c; C <= range.e.c; ++C) {
    const address = XLSX.utils.encode_col(C) + "1";
    if (!worksheet[address]) continue;

    worksheet[address].s = headerStyle;
  }

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Banner Ads Report");

  XLSX.writeFile(workbook, `BannerAds_Report_${Date.now()}.xlsx`);
};

export const exportToPDF = (data: GetAllDataResponse["data"]) => {
  const doc = new jsPDF("l", "mm", "a4");
  const formattedData = formatDataForExport(data);

  doc.setFontSize(16);
  doc.text("Banner ADs Packages Report", 14, 15);

  const headers = [Object.keys(formattedData[0])];
  const body = formattedData.map((item) => Object.values(item));

  autoTable(doc, {
    head: headers,
    body: body,
    startY: 20,
    theme: "grid",
    styles: { fontSize: 8, cellPadding: 3 },
    headStyles: {
      fillColor: PRIMARY_COLOR_RGB as [number, number, number],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    columnStyles: {
      2: { cellWidth: 60 },
    },
  });

  doc.save(`BannerAds_Report_${Date.now()}.pdf`);
};
