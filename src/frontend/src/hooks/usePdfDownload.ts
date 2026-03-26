import { useCallback, useState } from "react";

export function usePdfDownload() {
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadPdf = useCallback(
    async (element: HTMLElement, filename: string) => {
      setIsGenerating(true);
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mod = await import("html2pdf.js" as any);
        const html2pdf = mod.default ?? mod;

        // Allow loading UI to paint
        await new Promise((r) => setTimeout(r, 300));

        await html2pdf()
          .set({
            margin: 0,
            filename,
            image: { type: "jpeg", quality: 1.0 },
            html2canvas: {
              scale: 2,
              useCORS: true,
              logging: false,
              backgroundColor: "#ffffff",
              windowWidth: 794,
            },
            jsPDF: {
              unit: "px",
              format: [794, 1123],
              orientation: "portrait",
            },
            pagebreak: { mode: ["avoid-all", "css", "legacy"] },
          })
          .from(element)
          .save();

        // Minimum visible duration for the overlay
        await new Promise((r) => setTimeout(r, 1800));
      } finally {
        setIsGenerating(false);
      }
    },
    [],
  );

  return { isGenerating, downloadPdf };
}
