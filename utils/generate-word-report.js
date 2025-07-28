const { Document, Packer, Paragraph, TextRun, ImageRun } = require("docx");
const fs =require("fs");
const path =require("path");

async function generateDoc() {
 
  const steps=JSON.parse(fs.readFileSync('test-steps.json', 'utf-8'))

  const children = [];

  for (const step of steps) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: step.description, bold: true })],
        spacing: { after: 300 },
      })
    );

    if (fs.existsSync(step.image)) {
      const imageBuffer = fs.readFileSync(step.image);
      children.push(
        new Paragraph({
          children: [
            new ImageRun({
              data: imageBuffer,
              transformation: { width: 600, height: 300 },
            }),
          ],
          spacing: { after: 400 },
        })
      );
    }
  }
  const doc = new Document({
    creator: "Osvaldo",
    title: "Reporte de Playwright",
    description: "Reporte generado automáticamente",
    sections: [
      {
        children: children,
      }
    ]
  });


  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync('ReportePlaywright.docx', buffer);
  console.log('Documento Word creado exitosamente.');
}

generateDoc().catch(console.error);
