import { DietPlanResponse } from "@/pages/results/diet-plan";
import { UserData } from "@/types";
import jsPDF from "jspdf";

// Function to remove emojis from text
function removeEmojis(text: string): string {
  return text.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '');
}

export function pdfHandler(dietPlan: DietPlanResponse, formData: Partial<UserData>) {
  if (dietPlan) {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    const maxLineWidth = pageWidth - 2 * margin;
    let yPosition = 30;

    // Title
    pdf.setFontSize(20);
    pdf.setFont("helvetica", "bold");
    pdf.text("Plano Alimentar Personalizado", margin, yPosition);
    yPosition += 15;

    // User info
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "normal");
    pdf.text(`Nome: ${formData.name}`, margin, yPosition);
    yPosition += 10;

    // Summary
    pdf.setFontSize(12);
    pdf.text(`TMB: ${dietPlan.tmb} kcal/dia`, margin, yPosition);
    yPosition += 8;
    pdf.text(
      `Calorias Alvo: ${dietPlan.dailyCalories} kcal`,
      margin,
      yPosition
    );
    yPosition += 15;

    // Process diet plan content (remove emojis first)
    const cleanDietPlan = removeEmojis(dietPlan.dietPlan);
    const lines = cleanDietPlan.split("\n");

    lines.forEach((line) => {
      // Check if we need a new page
      if (yPosition > 280) {
        pdf.addPage();
        yPosition = 30;
      }

      if (line.startsWith("# ")) {
        // Main heading
        pdf.setFontSize(16);
        pdf.setFont("helvetica", "bold");
        const title = line.replace("# ", "");
        pdf.text(title, margin, yPosition);
        yPosition += 12;
      } else if (line.startsWith("## ")) {
        // Sub heading
        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        const subtitle = line.replace("## ", "");
        pdf.text(subtitle, margin, yPosition);
        yPosition += 10;
      } else if (line.startsWith("### ")) {
        // Sub heading
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        const subtitle = line.replace("### ", "");
        pdf.text(subtitle, margin, yPosition);
        yPosition += 10;
      } else if (line.startsWith("- ")) {
        // Bullet point
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "normal");
        const bulletText = line.replace("- ", "• ");
        const textLines = pdf.splitTextToSize(bulletText, maxLineWidth - 10);
        pdf.text(textLines, margin + 5, yPosition);
        yPosition += textLines.length * 5;
      } else if (line.trim()) {
        // Regular text
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "normal");
        const textLines = pdf.splitTextToSize(line, maxLineWidth);
        pdf.text(textLines, margin, yPosition);
        yPosition += textLines.length * 5;
      } else {
        // Empty line
        yPosition += 3;
      }
    });

    // Save the PDF
    pdf.save(`${formData.name || "user"}-plano-alimentar.pdf`);
  }
}
