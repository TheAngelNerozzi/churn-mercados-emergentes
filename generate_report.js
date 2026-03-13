const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun,
        Header, Footer, AlignmentType, PageOrientation, LevelFormat, 
        TableOfContents, HeadingLevel, BorderStyle, WidthType, 
        ShadingType, VerticalAlign, PageNumber, PageBreak } = require('docx');
const fs = require('fs');
const path = require('path');

// Color scheme - Midnight Code
const colors = {
  primary: "020617",      // Midnight Black
  body: "1E293B",         // Deep Slate Blue
  secondary: "64748B",    // Cool Blue-Gray
  accent: "94A3B8",       // Steady Silver
  tableBg: "F8FAFC",      // Glacial Blue-White
  tableHeader: "E2E8F0"   // Light gray
};

// Paths
const baseDir = '/home/z/my-project/download/churn-mercados-emergentes';
const figuresDir = path.join(baseDir, 'outputs/figures');
const outputFile = path.join(baseDir, 'Churn_Analysis_Report.docx');

// Table border style
const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: colors.secondary };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

// Read images
const img1 = fs.readFileSync(path.join(figuresDir, '01_churn_distribution.png'));
const img2 = fs.readFileSync(path.join(figuresDir, '04_churn_by_contract.png'));
const img3 = fs.readFileSync(path.join(figuresDir, '07_churn_by_tenure_group.png'));
const img4 = fs.readFileSync(path.join(figuresDir, '08_charges_by_churn.png'));
const img5 = fs.readFileSync(path.join(figuresDir, '09_correlation_heatmap.png'));
const img6 = fs.readFileSync(path.join(figuresDir, '23_quantitative_summary.png'));

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Times New Roman", size: 24 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal",
        run: { size: 56, bold: true, color: colors.primary, font: "Times New Roman" },
        paragraph: { spacing: { before: 240, after: 120 }, alignment: AlignmentType.CENTER } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, color: colors.primary, font: "Times New Roman" },
        paragraph: { spacing: { before: 360, after: 240 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, color: colors.body, font: "Times New Roman" },
        paragraph: { spacing: { before: 240, after: 180 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, color: colors.secondary, font: "Times New Roman" },
        paragraph: { spacing: { before: 180, after: 120 }, outlineLevel: 2 } }
    ]
  },
  numbering: {
    config: [
      { reference: "bullet-list",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-list-1",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-list-2",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-list-3",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
    ]
  },
  sections: [
    // Cover Page
    {
      properties: {
        page: { margin: { top: 0, right: 0, bottom: 0, left: 0 } }
      },
      children: [
        new Paragraph({ spacing: { before: 6000 }, children: [] }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
          children: [new TextRun({ text: "CHURN ANALYSIS REPORT", bold: true, size: 72, color: colors.primary, font: "Times New Roman" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [new TextRun({ text: "Emerging Markets Analysis", size: 36, color: colors.secondary, font: "Times New Roman" })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
          children: [new TextRun({ text: "Quantitative Analysis & Qualitative Research Integration", size: 24, color: colors.body, font: "Times New Roman" })]
        }),
        new Paragraph({ spacing: { before: 2000 }, children: [] }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Telco Customer Churn Dataset (IBM)", size: 22, color: colors.secondary })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "n = 7,043 customers", size: 22, color: colors.secondary })]
        }),
        new Paragraph({ spacing: { before: 1500 }, children: [] }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Portfolio Project for Product Researcher Role", size: 20, italics: true, color: colors.accent })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Cashea Fintech Application", size: 20, italics: true, color: colors.accent })]
        }),
        new Paragraph({ spacing: { before: 1000 }, children: [] }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), size: 22, color: colors.body })]
        }),
        new Paragraph({ children: [new PageBreak()] })
      ]
    },
    // Main Content
    {
      properties: {
        page: {
          margin: { top: 1800, right: 1440, bottom: 1440, left: 1440 }
        }
      },
      headers: {
        default: new Header({ children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: "Churn Analysis Report - Emerging Markets", size: 20, color: colors.secondary })]
        })] })
      },
      footers: {
        default: new Footer({ children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Page ", size: 20 }), new TextRun({ children: [PageNumber.CURRENT], size: 20 })]
        })] })
      },
      children: [
        // Table of Contents
        new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun("Table of Contents")] }),
        new TableOfContents("Table of Contents", { hyperlink: true, headingStyleRange: "1-3" }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200 },
          children: [new TextRun({ text: "Note: Right-click the Table of Contents and select 'Update Field' to refresh page numbers.", size: 18, color: colors.accent, italics: true })]
        }),
        new Paragraph({ children: [new PageBreak()] }),

        // Executive Summary
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Executive Summary")] }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: "This comprehensive analysis investigates customer churn patterns in emerging markets by combining quantitative data from the Telco Customer Churn dataset (IBM) with qualitative insights from five in-depth interviews with Venezuelan merchants. The triangulation methodology reveals that churn in emerging markets is fundamentally different from developed markets: it is driven not by price or features alone, but by institutional distrust and opacity in processes.", size: 24 })]
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: "The central finding challenges conventional wisdom: customers who churn actually pay 21.5% more on average than those who stay. This indicates that the problem is one of perceived value, not price sensitivity. The predictive model identifies the critical window for intervention (months 3-6), while qualitative interviews explain the underlying mechanism: an accumulation of opaque incidents that erode the 'pool of good will' until a tipping point is reached.", size: 24 })]
        }),

        // Key Findings Table
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Key Metrics Overview")] }),
        new Table({
          columnWidths: [4680, 4680],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({ borders: cellBorders, width: { size: 4680, type: WidthType.DXA },
                  shading: { fill: colors.tableHeader, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Metric", bold: true, size: 22 })] })] }),
                new TableCell({ borders: cellBorders, width: { size: 4680, type: WidthType.DXA },
                  shading: { fill: colors.tableHeader, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Value", bold: true, size: 22 })] })] })
              ]
            }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, width: { size: 4680, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Total Customers Analyzed", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 4680, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "7,043", size: 22, bold: true })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, width: { size: 4680, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Overall Churn Rate", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 4680, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "26.5%", size: 22, bold: true, color: "C0392B" })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, width: { size: 4680, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Churn in First 12 Months", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 4680, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "47.4%", size: 22, bold: true, color: "C0392B" })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, width: { size: 4680, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Monthly Contract Churn Rate", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 4680, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "42.7%", size: 22, bold: true })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, width: { size: 4680, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Two-Year Contract Churn Rate", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 4680, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2.8%", size: 22, bold: true, color: "27AE60" })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, width: { size: 4680, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Churners Monthly Charges", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 4680, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "$74.44 (+21.5%)", size: 22, bold: true })] })] })
            ]})
          ]
        }),
        new Paragraph({ spacing: { after: 400 }, children: [] }),

        // Data Quality
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Data Quality Assessment")] }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: "The Telco Customer Churn dataset from IBM contains 7,043 customer records with 21 variables capturing demographic information, service subscriptions, contract details, and billing information. Data quality assessment revealed several issues that required preprocessing before analysis.", size: 24 })]
        }),
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Data Cleaning Procedures")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "TotalCharges Conversion: 11 records contained blank values converted to numeric format, representing new customers with tenure = 0", size: 24 })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Missing Value Imputation: TotalCharges calculated as MonthlyCharges × tenure for records with zero tenure", size: 24 })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Feature Engineering: Created tenure_group categorical variable with four bins (0-12m, 12-24m, 24-48m, 48m+)", size: 24 })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "No duplicate customer IDs detected; all records represent unique customers", size: 24 })] }),
        new Paragraph({ spacing: { after: 300 }, children: [] }),

        // Churn Distribution
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Churn Distribution Analysis")] }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: "The overall churn rate of 26.5% represents a significant business challenge, with 1,869 customers abandoning the service out of 7,043 total. This rate is notably higher than typical telecommunications industry benchmarks of 15-20%, suggesting systemic issues in customer retention strategies.", size: 24 })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 },
          children: [new ImageRun({ type: "png", data: img1, transformation: { width: 450, height: 280 }, altText: { title: "Churn Distribution", description: "Distribution of churn", name: "fig1" } })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 300 },
          children: [new TextRun({ text: "Figure 1: Distribution of Customer Churn Status", size: 20, italics: true, color: colors.secondary })]
        }),

        // Contract Analysis
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Contract Type Analysis")] }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: "Contract type emerges as the most significant predictor of churn, with month-to-month contracts showing dramatically higher abandonment rates. The analysis reveals a 15-fold difference in churn risk between monthly and two-year contracts, indicating that commitment mechanisms play a crucial role in customer retention.", size: 24 })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 },
          children: [new ImageRun({ type: "png", data: img2, transformation: { width: 500, height: 300 }, altText: { title: "Churn by Contract", description: "Churn by contract type", name: "fig2" } })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 300 },
          children: [new TextRun({ text: "Figure 2: Churn Rate by Contract Type", size: 20, italics: true, color: colors.secondary })]
        }),
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Contract Risk Analysis")] }),
        new Table({
          columnWidths: [3120, 2080, 2080, 2080],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA }, shading: { fill: colors.tableHeader, type: ShadingType.CLEAR },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Contract Type", bold: true, size: 20 })] })] }),
                new TableCell({ borders: cellBorders, width: { size: 2080, type: WidthType.DXA }, shading: { fill: colors.tableHeader, type: ShadingType.CLEAR },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Churn Rate", bold: true, size: 20 })] })] }),
                new TableCell({ borders: cellBorders, width: { size: 2080, type: WidthType.DXA }, shading: { fill: colors.tableHeader, type: ShadingType.CLEAR },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Customers", bold: true, size: 20 })] })] }),
                new TableCell({ borders: cellBorders, width: { size: 2080, type: WidthType.DXA }, shading: { fill: colors.tableHeader, type: ShadingType.CLEAR },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Relative Risk", bold: true, size: 20 })] })] })
              ]
            }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Month-to-month", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2080, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "42.7%", size: 20, bold: true, color: "C0392B" })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2080, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "3,875", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2080, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "15.3x", size: 20, bold: true })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "One year", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2080, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "11.3%", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2080, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "1,473", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2080, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "4.0x", size: 20 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Two year", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2080, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2.8%", size: 20, color: "27AE60" })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2080, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "1,695", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2080, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "1.0x (baseline)", size: 20 })] })] })
            ]})
          ]
        }),
        new Paragraph({ spacing: { after: 400 }, children: [] }),

        // Tenure Analysis
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Tenure and Survival Analysis")] }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: "The tenure analysis reveals a critical insight: nearly half (47.4%) of customers in their first year abandon the service. This finding is particularly significant for product design, as it identifies a clear window for proactive intervention. The Kaplan-Meier survival analysis indicates that the median survival time for month-to-month contracts is approximately 10 months, after which more than half of these customers have churned.", size: 24 })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 },
          children: [new ImageRun({ type: "png", data: img3, transformation: { width: 500, height: 300 }, altText: { title: "Churn by Tenure", description: "Churn by tenure group", name: "fig3" } })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 300 },
          children: [new TextRun({ text: "Figure 3: Churn Rate by Tenure Group", size: 20, italics: true, color: colors.secondary })]
        }),
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Tenure Group Analysis")] }),
        new Table({
          columnWidths: [2340, 2340, 2340, 2340],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, shading: { fill: colors.tableHeader, type: ShadingType.CLEAR },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Tenure Group", bold: true, size: 20 })] })] }),
                new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, shading: { fill: colors.tableHeader, type: ShadingType.CLEAR },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Churn Rate", bold: true, size: 20 })] })] }),
                new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, shading: { fill: colors.tableHeader, type: ShadingType.CLEAR },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Customers", bold: true, size: 20 })] })] }),
                new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, shading: { fill: colors.tableHeader, type: ShadingType.CLEAR },
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Risk Level", bold: true, size: 20 })] })] })
              ]
            }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "0-12 months", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "47.4%", size: 20, bold: true, color: "C0392B" })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2,186", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "CRITICAL", size: 20, bold: true, color: "C0392B" })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "12-24 months", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "28.7%", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "1,024", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "HIGH", size: 20, color: "E67E22" })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "24-48 months", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "20.4%", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "1,482", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "MODERATE", size: 20, color: "F39C12" })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "48+ months", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "9.5%", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2,351", size: 20 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "LOW", size: 20, color: "27AE60" })] })] })
            ]})
          ]
        }),
        new Paragraph({ spacing: { after: 400 }, children: [] }),

        // Charges Analysis
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Charges and Value Perception")] }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: "One of the most counterintuitive findings of this analysis is that customers who churn actually pay more on average than those who stay. Churners have an average monthly charge of $74.44 compared to $61.27 for non-churners—a difference of 21.5%. This directly contradicts the assumption that price sensitivity drives churn and suggests instead that the problem is one of perceived value.", size: 24 })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 },
          children: [new ImageRun({ type: "png", data: img4, transformation: { width: 500, height: 300 }, altText: { title: "Charges by Churn", description: "Monthly charges by churn", name: "fig4" } })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 300 },
          children: [new TextRun({ text: "Figure 4: Monthly Charges Comparison by Churn Status", size: 20, italics: true, color: colors.secondary })]
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: "This finding has profound implications for retention strategy. Rather than focusing on discounts or price reductions, interventions should emphasize value communication, transparency in billing, and demonstrating ROI of the service. Customers paying premium prices have higher expectations for service quality and transparency—when these expectations are not met, they are more likely to churn.", size: 24 })]
        }),

        // Correlation Analysis
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Correlation Analysis")] }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: "The correlation matrix reveals several important relationships. Tenure shows the strongest negative correlation with churn (-0.35), confirming that longer-tenured customers are significantly less likely to leave. Monthly charges show a positive correlation with churn (0.19), aligning with the finding that higher-paying customers are more churn-prone. Senior citizens show a slight positive correlation with churn, suggesting this demographic may require targeted retention strategies.", size: 24 })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 },
          children: [new ImageRun({ type: "png", data: img5, transformation: { width: 450, height: 360 }, altText: { title: "Correlation Heatmap", description: "Correlation matrix", name: "fig5" } })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 300 },
          children: [new TextRun({ text: "Figure 5: Correlation Heatmap of Key Variables", size: 20, italics: true, color: colors.secondary })]
        }),

        // Qualitative Research
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Qualitative Research Findings")] }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: "Five semi-structured interviews were conducted with Venezuelan merchants who had abandoned digital tools. Each interview lasted 30-45 minutes and explored the complete journey from adoption to abandonment, focusing on the emotional and rational factors influencing the decision to leave.", size: 24 })]
        }),
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Emergent Themes")] }),
        new Paragraph({
          spacing: { after: 100 },
          children: [new TextRun({ text: "Analysis of the interview transcripts revealed five dominant themes that consistently appeared across all participants:", size: 24 })]
        }),
        new Paragraph({ numbering: { reference: "numbered-list-1", level: 0 }, children: [new TextRun({ text: "Opacity in Processes (5/5 participants): All interviewees described situations where they did not understand what was happening with their accounts, transactions, or issues. The lack of visibility into processes created anxiety and eroded trust.", size: 24 })] }),
        new Paragraph({ numbering: { reference: "numbered-list-1", level: 0 }, children: [new TextRun({ text: "Non-Proactive Communication (4/5 participants): Most participants reported learning about problems from customers or through their own investigation, rather than from the company. This reactive communication style was perceived as neglectful.", size: 24 })] }),
        new Paragraph({ numbering: { reference: "numbered-list-1", level: 0 }, children: [new TextRun({ text: "Unannounced Changes (3/5 participants): Changes to interfaces, pricing, or terms without adequate notice caused significant friction. One participant described feeling 'blind-sided' when a new interface removed familiar functionality.", size: 24 })] }),
        new Paragraph({ numbering: { reference: "numbered-list-1", level: 0 }, children: [new TextRun({ text: "Insufficient Support (4/5 participants): When problems arose, participants struggled to get meaningful help. Generic responses and the absence of human support channels were frequently mentioned as frustrating.", size: 24 })] }),
        new Paragraph({ numbering: { reference: "numbered-list-1", level: 0 }, children: [new TextRun({ text: "Promise-Reality Gap (4/5 participants): The gap between what was promised during acquisition and what was delivered created disappointment. This discrepancy was particularly damaging when combined with opaque processes.", size: 24 })] }),
        new Paragraph({ spacing: { after: 300 }, children: [] }),
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Abandonment Timeline")] }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: "The qualitative data reveals that 60% of interviewees abandoned the digital tool within the first six months. This aligns closely with the quantitative finding that 47.4% of customers churn within their first year. The median time to abandonment was 6 months, with a range from 4 to 14 months. Each participant described a 'tipping point' incident that triggered the final decision, but all noted that this incident was the culmination of multiple smaller frustrations.", size: 24 })]
        }),

        // Triangulation
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Quantitative-Qualitative Triangulation")] }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: "The triangulation of quantitative and qualitative findings produces a coherent narrative that explains not just when customers leave, but why they leave. The model identifies the critical timing (months 3-6 for intervention), while the interviews reveal the underlying mechanism (accumulation of opaque incidents eroding trust).", size: 24 })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 },
          children: [new ImageRun({ type: "png", data: img6, transformation: { width: 550, height: 470 }, altText: { title: "Summary", description: "Quantitative summary", name: "fig6" } })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 300 },
          children: [new TextRun({ text: "Figure 6: Summary of Quantitative Findings", size: 20, italics: true, color: colors.secondary })]
        }),
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("The Cumulative Distrust Model")] }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: "Based on the triangulated findings, we propose a Cumulative Distrust Model to explain churn in emerging markets. In contexts of high institutional distrust, customers approach new services with an already-reduced 'pool of good will.' Each incident that is handled opaquely—whether a billing issue, a service outage, or an unexplained change—draws from this pool. The pool depletes incrementally until a final 'tipping point' incident triggers abandonment.", size: 24 })]
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: "This model has four key characteristics: (1) It is non-linear—the decision appears sudden but builds gradually; (2) It is emotional—feelings of being 'deceived' matter more than economic losses; (3) It is reversible until the tipping point—intervention before the final incident can preserve the relationship; and (4) It is cultural—the initial pool of good will is smaller in high-distrust markets.", size: 24 })]
        }),

        // Recommendations
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Strategic Recommendations")] }),
        new Paragraph({
          spacing: { after: 100 },
          children: [new TextRun({ text: "Based on the triangulated analysis, we propose five strategic recommendations prioritized by impact and feasibility:", size: 24 })]
        }),
        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("1. Proactive Intervention (Months 3-6) - HIGH PRIORITY")] }),
        new Paragraph({
          spacing: { after: 150 },
          children: [new TextRun({ text: "Implement automated check-ins at months 2, 4, and 6 to detect friction points early. These touchpoints should not be sales-driven but focused on problem detection and resolution. Expected impact: 15-25% reduction in early-stage churn.", size: 24 })]
        }),
        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("2. Radical Transparency - HIGH PRIORITY")] }),
        new Paragraph({
          spacing: { after: 150 },
          children: [new TextRun({ text: "Deploy real-time status dashboards showing customers exactly where their requests, transactions, and issues stand. Complete transaction history should be accessible at all times. Expected impact: Increased customer confidence and LTV.", size: 24 })]
        }),
        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("3. Anticipatory Communication - MEDIUM PRIORITY")] }),
        new Paragraph({
          spacing: { after: 150 },
          children: [new TextRun({ text: "Establish proactive notification systems for any changes to terms, pricing, or interfaces. Minimum 30-day notice with clear explanations should be standard. Expected impact: Reduced 'surprise' incidents that trigger distrust.", size: 24 })]
        }),
        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("4. Human Support Accessibility - HIGH PRIORITY")] }),
        new Paragraph({
          spacing: { after: 150 },
          children: [new TextRun({ text: "Create a direct channel to human support for critical issues. The absence of human contact was cited by 4/5 interviewees as a major frustration. Expected impact: Resolution of issues before tipping point is reached.", size: 24 })]
        }),
        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("5. Commitment Incentives - MEDIUM PRIORITY")] }),
        new Paragraph({
          spacing: { after: 300 },
          children: [new TextRun({ text: "Develop clear benefits for annual commitment with transparent terms. The 15x difference in churn risk between monthly and annual contracts suggests commitment mechanisms are highly effective. Expected impact: Conversion of high-risk monthly customers to stable annual relationships.", size: 24 })]
        }),

        // Limitations
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Limitations and Future Research")] }),
        new Paragraph({
          spacing: { after: 100 },
          children: [new TextRun({ text: "This analysis has several important limitations that should be considered when interpreting findings:", size: 24 })]
        }),
        new Paragraph({ numbering: { reference: "numbered-list-2", level: 0 }, children: [new TextRun({ text: "Synthetic Dataset: The Telco Churn dataset is an academic sample, not real fintech data. Patterns may differ in actual financial services contexts.", size: 24 })] }),
        new Paragraph({ numbering: { reference: "numbered-list-2", level: 0 }, children: [new TextRun({ text: "Small Qualitative Sample: Five interviews provide exploratory insights but are not statistically representative. Findings should be validated with larger samples.", size: 24 })] }),
        new Paragraph({ numbering: { reference: "numbered-list-2", level: 0 }, children: [new TextRun({ text: "Specific Context: Venezuela has unique characteristics of institutional distrust. Generalization to other emerging markets requires validation.", size: 24 })] }),
        new Paragraph({ numbering: { reference: "numbered-list-2", level: 0 }, children: [new TextRun({ text: "Memory Bias: Interviews relied on participant recall of past events, which may be subject to selective or biased remembering.", size: 24 })] }),
        new Paragraph({ numbering: { reference: "numbered-list-2", level: 0 }, children: [new TextRun({ text: "Absence of Behavioral Validation: Insights have not been validated with actual behavior data from Cashea or similar fintech platforms.", size: 24 })] }),
        new Paragraph({ spacing: { after: 300 }, children: [] }),
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Recommended Next Steps")] }),
        new Paragraph({ numbering: { reference: "numbered-list-3", level: 0 }, children: [new TextRun({ text: "Quantitative Validation: Collect churn data from Cashea to validate identified patterns in actual fintech context.", size: 24 })] }),
        new Paragraph({ numbering: { reference: "numbered-list-3", level: 0 }, children: [new TextRun({ text: "Longitudinal Study: Track new users from onboarding through 12 months to observe the churn journey in real-time.", size: 24 })] }),
        new Paragraph({ numbering: { reference: "numbered-list-3", level: 0 }, children: [new TextRun({ text: "A/B Testing: Test proactive communication interventions against control groups to measure impact.", size: 24 })] }),
        new Paragraph({ numbering: { reference: "numbered-list-3", level: 0 }, children: [new TextRun({ text: "Trust Measurement: Develop survey instruments to measure the 'pool of good will' construct.", size: 24 })] }),
        new Paragraph({ spacing: { after: 400 }, children: [] }),

        // Conclusion
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Conclusion")] }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: "This analysis demonstrates that churn in emerging markets is fundamentally a trust problem, not a price problem. Customers who pay more are more likely to leave—not because they cannot afford the service, but because their expectations for transparency and value delivery are higher. The quantitative model identifies when intervention is most critical (months 3-6), while qualitative research explains why (accumulation of opaque incidents).", size: 24 })]
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: "For Cashea and similar fintech companies operating in emerging markets, the central lesson is clear: churn prevention requires proactive trust-building, not reactive discounting. The most effective interventions will focus on transparency, communication, and human support—investments that preserve the customer relationship before it reaches the tipping point of abandonment.", size: 24 })]
        })
      ]
    }
  ]
});

// Generate and save document
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(outputFile, buffer);
  console.log(`Document saved to: ${outputFile}`);
});
