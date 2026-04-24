// Local smoke test — writes out.pdf.
const fs = require("node:fs");
const path = require("node:path");
const { generatePdf } = require(".");

const html = `
<h1>Arial Font Smoke Test</h1>
<p>The quick brown fox jumps over the lazy dog. 0123456789</p>
<p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
<p>abcdefghijklmnopqrstuvwxyz</p>
<p>Symbols: !@#$%^&amp;*()_+-=[]{};':&quot;,./&lt;&gt;?</p>

<h2>Paragraph</h2>
<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
  consequat.
</p>

<h2>Table</h2>
<table border="1" cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
  <thead>
    <tr><th>Item</th><th>Qty</th><th>Price</th></tr>
  </thead>
  <tbody>
    <tr><td>Widget</td><td>2</td><td>$19.99</td></tr>
    <tr><td>Gadget</td><td>5</td><td>$7.49</td></tr>
    <tr><td>Thingamajig</td><td>1</td><td>$42.00</td></tr>
  </tbody>
</table>

<h2 style="font-family: Arial;">Arial weight stress test</h2>
<p style="font-family: Arial; font-weight: 100;">Arial 100 — The quick brown fox jumps over the lazy dog. 0123456789</p>
<p style="font-family: Arial; font-weight: 200;">Arial 200 — The quick brown fox jumps over the lazy dog. 0123456789</p>
<p style="font-family: Arial; font-weight: 300;">Arial 300 — The quick brown fox jumps over the lazy dog. 0123456789</p>
<p style="font-family: Arial; font-weight: 400;">Arial 400 — The quick brown fox jumps over the lazy dog. 0123456789</p>
<p style="font-family: Arial; font-weight: 500;">Arial 500 — The quick brown fox jumps over the lazy dog. 0123456789</p>
<p style="font-family: Arial; font-weight: 600;">Arial 600 — The quick brown fox jumps over the lazy dog. 0123456789</p>
<p style="font-family: Arial; font-weight: 700;">Arial 700 — The quick brown fox jumps over the lazy dog. 0123456789</p>
<p style="font-family: Arial; font-weight: 800;">Arial 800 — The quick brown fox jumps over the lazy dog. 0123456789</p>
<p style="font-family: Arial; font-weight: 900;">Arial 900 — The quick brown fox jumps over the lazy dog. 0123456789</p>
`;

(async () => {
  const pdf = await generatePdf(html);
  const outPath = path.join(__dirname, "out.pdf");
  fs.writeFileSync(outPath, pdf);
  console.log(`Wrote ${outPath} (${pdf.length} bytes)`);
})();
