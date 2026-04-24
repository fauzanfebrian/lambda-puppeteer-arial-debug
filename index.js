const chromium = require("@sparticuz/chromium");
const puppeteer = require("puppeteer-core");

const FONT_CSS = `
@font-face {
  font-family: "Arial";
  font-style: normal;
  font-weight: 400;
  font-display: block;
  src: url("https://raw.githubusercontent.com/fauzanfebrian/lambda-puppeteer-arial-debug/main/fonts/Arial-Regular.ttf") format("truetype");
}
@font-face {
  font-family: "Arial";
  font-style: normal;
  font-weight: 700;
  font-display: block;
  src: url("https://raw.githubusercontent.com/fauzanfebrian/lambda-puppeteer-arial-debug/main/fonts/Arial-Bold.ttf") format("truetype");
}
`;

async function getBrowser() {
  return puppeteer.launch({
    args: [
      ...chromium.args,
      "--disable-dev-shm-usage",
      "--single-process",
      "--no-zygote",
      "--ignore-certificate-errors",
    ],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });
}

function wrapHtml(bodyHtml) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<style>
${FONT_CSS}
  html, body {
    margin: 0;
    padding: 24px;
    font-family: Arial, sans-serif;
    font-size: 14px;
    color: #111;
    -webkit-font-smoothing: antialiased;
  }
</style>
</head>
<body>
${bodyHtml}
</body>
</html>`;
}

async function generatePdf(html, pdfOptions = {}) {
  const browser = await getBrowser();
  try {
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.setContent(wrapHtml(html), { waitUntil: "networkidle0" });

    return await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20mm", right: "20mm", bottom: "20mm", left: "20mm" },
    });
  } finally {
    await browser.close();
  }
}

exports.handler = async (event = {}) => {
  const html = event.html || "<h1>Hello, Arial</h1><p>The quick brown fox.</p>";
  const pdf = await generatePdf(html, event.pdfOptions);
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/pdf" },
    isBase64Encoded: true,
    body: Buffer.from(pdf).toString("base64"),
  };
};

exports.generatePdf = generatePdf;
