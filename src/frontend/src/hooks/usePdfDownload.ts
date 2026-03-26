import { useCallback, useState } from "react";

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
}

export function usePdfDownload() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadFailed, setDownloadFailed] = useState(false);

  const downloadPdf = useCallback(async (filename: string) => {
    setIsGenerating(true);
    setDownloadFailed(false);

    // Let loading overlay paint before heavy canvas work
    await new Promise((r) => setTimeout(r, 300));

    try {
      const element = document.getElementById("resume-preview");
      if (!element) throw new Error("#resume-preview element not found");

      // Load libraries from CDN if not already available
      if (!(window as any).html2canvas) {
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",
        );
      }
      if (!(window as any).jspdf) {
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",
        );
      }

      const html2canvas = (window as any).html2canvas;
      const jsPDF = (window as any).jspdf?.jsPDF;

      if (!html2canvas || !jsPDF) {
        throw new Error("PDF libraries failed to load");
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        windowWidth: 794,
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Handle multi-page
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(filename);
    } catch (err) {
      console.error("PDF generation failed:", err);
      setDownloadFailed(true);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  return { isGenerating, downloadFailed, downloadPdf };
}
