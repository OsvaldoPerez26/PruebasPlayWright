const { Header, Paragraph, TextRun, AlignmentType, Table, TableRow, TableCell, WidthType, VerticalAlign,ImageRun,Document ,Packer, BorderStyle,TableLayoutType} = require("docx");
const fs =require("fs");
const path =require("path");
const os = require("os");

// Obtener mes y año actuales
const date = new Date();
const months = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];
const hoy = new Date();


const dia = String(hoy.getDate()).padStart(2, '0');
const mes = String(hoy.getMonth() + 1).padStart(2, '0'); // ¡Mes inicia en 0!
const anio = hoy.getFullYear();

const fechaFormateada = `${dia}/${mes}/${anio}`;

 
const currentMonthYear = `${months[date.getMonth()]} ${date.getFullYear()}`;

// Obtener datos del sistema operativo
const osName = os.type(); // e.g., 'Windows_NT'
const osVersion = os.release(); // e.g., '10.0.22621'

async function generateDoc() {
 
  const steps=JSON.parse(fs.readFileSync('test-steps.json', 'utf-8'))
    // Leer metadata
  const meta = JSON.parse(fs.readFileSync("test-meta.json", "utf-8"));

  const dataTestDescription = JSON.parse(fs.readFileSync("test-info.json", "utf-8"));



  const portada = [];

  const logoPath="resources/DXperiencieLogo.png";

  let logoBuffer=null;
  if(fs.existsSync(logoPath)){
     logoBuffer= fs.readFileSync(logoPath);
  }
    
 //Titulo de documento 
 const headerTable = new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  columnWidths:[4000],
  borders: {
    top: { size: 0, color: "FFFFFF" },
    bottom: { size: 0, color: "FFFFFF" },
    left: { size: 0, color: "FFFFFF" },
    right: { size: 0, color: "FFFFFF" },
    insideHorizontal: { size: 0, color: "FFFFFF" },
    insideVertical: { size: 0, color: "FFFFFF" },
  },
  rows: [
    new TableRow({
      children: [
        new TableCell({
          width: { size: 2000, type: WidthType.DXA }, // aprox 2.08 pulgadas
          verticalAlign: VerticalAlign.TOP,
          children: logoBuffer
            ? [
                new Paragraph({
                  children: [
                    new ImageRun({
                      data: logoBuffer,
                      transformation: {
                        width: 200,
                        height: 100,
                      },
                    }),
                  ],
                  spacing: { after: 0, before: 0 },
                }),
              ]
            : [],
          margins: { top: 0, bottom: 0, left: 0, right: 0 },
        }),
        new TableCell({
          width: { size: 4000, type: WidthType.DXA },
          verticalAlign: VerticalAlign.TOP,
          margins:{
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          },
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              spacing: { before: 0, after: 0 },
              children: [
                new TextRun({ text: "Evidencia de Pruebas", bold: true, size: 28 }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              spacing: { before: 0, after: 0 },
              children: [
                new TextRun({ text: currentMonthYear, italics: true, size: 24 }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
  // Datos del ambiente
  portada.push(
    new Paragraph({
      children: [new TextRun({ text: "Datos del ambiente:", bold: true, size: 28,color:"#567fc1" })],
      spacing: { after: 300 },
    })
  );

  const environmentData = [
    ["Sistema Operativo:", osName],
    ["Versión S.O:", osVersion],
    ["Nombre del Aplicativo:", meta.appName],
    ["Versión del Aplicativo:", meta.appVersion],
    ["Plataforma:", meta.platform],
    ["Ambiente:", meta.environment],
    ["Versión de Chromium:", meta.chromiumVersion],
  ];

  const pruebaData=[
    ["Nombre del Script:", dataTestDescription.name],
    ["Descripción:",dataTestDescription.description],
    ["Tester:", dataTestDescription.tester],
    ["Fecha:" ,fechaFormateada],
  ]

  const statusEjecu=[
    ["Resultado:",dataTestDescription.status],
  ]

 // Crea una tabla con filas, cada fila tiene una celda con borde inferior
 const tableRows = environmentData.map(([label, value]) =>
 
 new TableRow({
   children: [
     new TableCell({
       width: { size: 3000, type: WidthType.DXA }, // 2.08 pulgadas
       preferredWidth: { size: 6000, type: WidthType.DXA },

       borders: {
         bottom: { color: "000000", value: BorderStyle.SINGLE, size: 6 },
       },
       children: [
         new Paragraph({
           children: [new TextRun({ text: label, bold: true, size: 24 })],
           spacing: { after: 200 },
         }),
       ],
     }),
     new TableCell({
       width: { size: 6000, type: WidthType.DXA }, // 4.16 pulgadas
       preferredWidth: { size: 6000, type: WidthType.DXA },

       borders: {
         bottom: { color: "000000", value: BorderStyle.SINGLE, size: 6 },
       },
       children: [
         new Paragraph({
           alignment: AlignmentType.CENTER,
           children: [new TextRun({ text: value, size: 24 })],
           spacing: { after: 200 },
         }),
       ],
     }),
   ],
 })
);




const environmentTable = new Table({
  width: {
    size: 9000, // ancho explícito en DXA
    type: WidthType.DXA,
    
  },
  borders: {
    top: { color: "FFFFFF", value: BorderStyle.SINGLE, size: 6 },
    bottom: { color: "000000", value: BorderStyle.SINGLE, size: 6 },
    left: { color: "FFFFFF", value: BorderStyle.SINGLE, size: 6 },
    right: { color: "FFFFFF", value: BorderStyle.SINGLE, size: 6 },
  },
columnWidths: [3000, 6000],
layout: TableLayoutType.FIXED,
rows: tableRows,
});

// Crea una tabla con filas, cada fila tiene una celda con borde inferior
const tableRows1 = pruebaData.map(([label, value]) =>
new TableRow({
  children: [
    new TableCell({
      width: { size: 3000, type: WidthType.DXA }, // 2.08 pulgadas
      preferredWidth: { size: 6000, type: WidthType.DXA },

      borders: {
        bottom: { color: "000000", value: BorderStyle.SINGLE, size: 6 },
      },
      children: [
        new Paragraph({
          
          children: [new TextRun({ text: label, bold: true, size: 24 })],
          spacing: { after: 200 },
        }),
      ],
    }),
    new TableCell({
      width: { size: 6000, type: WidthType.DXA }, // 4.16 pulgadas
      preferredWidth: { size: 6000, type: WidthType.DXA },

      borders: {
        bottom: { color: "000000", value: BorderStyle.SINGLE, size: 6 },
      },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: value, size: 24 })],
          spacing: { after: 200 },
        }),
      ],
    }),
  ],
})
);
const dataTest = new Table({
  width: {
    size: 9000, // ancho explícito en DXA
    type: WidthType.DXA,
    
  },
  borders: {
    top: { color: "FFFFFF", value: BorderStyle.SINGLE, size: 6 },
    bottom: { color: "000000", value: BorderStyle.SINGLE, size: 6 },
    left: { color: "FFFFFF", value: BorderStyle.SINGLE, size: 6 },
    right: { color: "FFFFFF", value: BorderStyle.SINGLE, size: 6 },
  },
columnWidths: [3000, 6000],
layout: TableLayoutType.FIXED,
rows: tableRows1,
});


// Crea una tabla con filas, cada fila tiene una celda con borde inferior
const tableRows2 = statusEjecu.map(([label, value]) =>{

  let color1 = "000000"; // negro por defecto
  console.log("EEEEEE "+ value.toLowerCase())
 if (value.toLowerCase() === "failed") {
   color1 = "FF0000"; // rojo
 } else if (value.toLowerCase() === "passed" || value.toLowerCase() === "exitoso") {
   color1 = "008000"; // verde
   console.log("Bien aplicadoooo")
 }
return new TableRow({
  children: [
    new TableCell({
      width: { size: 3000, type: WidthType.DXA }, // 2.08 pulgadas
      preferredWidth: { size: 6000, type: WidthType.DXA },

      borders: {
        bottom: { color: "000000", value: BorderStyle.SINGLE, size: 6 },
      },
      children: [
        new Paragraph({
          children: [new TextRun({ text: label, bold: true, size: 24 })],
          spacing: { after: 200 },
        }),
      ],
    }),
    new TableCell({
      width: { size: 6000, type: WidthType.DXA }, // 4.16 pulgadas
      preferredWidth: { size: 6000, type: WidthType.DXA },

      borders: {
        bottom: { color: "000000", value: BorderStyle.SINGLE, size: 6 },
      },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: value, size: 24 ,color:color1,})],
          spacing: { after: 200 },
        }),
      ],
    }),
  ],
})
});
const statusExecution = new Table({
  width: {
    size: 9000, // ancho explícito en DXA
    type: WidthType.DXA,
    
  },
  borders: {
    top: { color: "FFFFFF", value: BorderStyle.SINGLE, size: 6 },
    bottom: { color: "000000", value: BorderStyle.SINGLE, size: 6 },
    left: { color: "FFFFFF", value: BorderStyle.SINGLE, size: 6 },
    right: { color: "FFFFFF", value: BorderStyle.SINGLE, size: 6 },
  },
columnWidths: [3000, 6000],
layout: TableLayoutType.FIXED,
rows: tableRows2,
});

portada.push(environmentTable);

// Agrega un párrafo vacío con espacio después para separar visualmente
portada.push(
  new Paragraph({
    text: "", // párrafo vacío
    spacing: { after: 300 }, // espacio después del párrafo (ajusta el valor a tu gusto)
  })
);
    // Datos del ambiente
    portada.push(
      new Paragraph({
        children: [new TextRun({ text: "Datos de la Prueba", bold: true, size: 28 ,color:"#567fc1"})],
        spacing: { after: 300 },
      })
    );
    portada.push(dataTest);
// Agrega un párrafo vacío con espacio después para separar visualmente
portada.push(
  new Paragraph({
    text: "", // párrafo vacío
    spacing: { after: 300 }, // espacio después del párrafo (ajusta el valor a tu gusto)
  })
);
    // Datos del ambiente
    portada.push(
      new Paragraph({
        children: [new TextRun({ text: "Estatus de la Ejecución", bold: true, size: 28 ,color:"#567fc1"})],
        spacing: { after: 300 },
      })
    );
    portada.push(statusExecution);

  const evidencia=[];

  evidencia.push(
    new Paragraph({
      children: [new TextRun({ text: "Evidencia Gráfica", bold: true, size: 30 , color:"#567fc1"})],
      spacing: { after: 300 },
    })
  );
  for (const step of steps) {
    evidencia.push(
      new Paragraph({
       
        children: [new TextRun({ text: step.description, bold: true })],
        spacing: { after: 400 },
      })
    );

    if (fs.existsSync(step.image)) {
      const imageBuffer = fs.readFileSync(step.image);
      evidencia.push(
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
    title: "Reporte de Playwright 2",
    description: "Reporte generado automáticamente",
    sections: [
      {
        headers: {
          default: new Header({
            children: [headerTable],
          }),
        },
        children: portada,
      },
      {
        children: evidencia,
      }
    ]
  });


  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync('ReportePlaywright.docx', buffer);
  console.log('Documento Word creado exitosamente.');
}

generateDoc().catch(console.error);
