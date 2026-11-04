/**
 * Resilient file download utility that fetches files as in-memory Blobs.
 * This bypasses browser iframe sandbox restrictions that block standard <a href="..." download> attributes.
 */
export async function downloadBlobFile(url: string, filename: string): Promise<boolean> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const anchor = document.createElement('a');
    anchor.href = blobUrl;
    anchor.download = filename;
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();

    // Clean up after slight delay
    setTimeout(() => {
      document.body.removeChild(anchor);
      URL.revokeObjectURL(blobUrl);
    }, 1500);

    return true;
  } catch (error) {
    console.warn('Blob download failed or was blocked, falling back to window.open', error);
    // Fallback: open raw file in new tab so user can download/save via browser controls
    window.open(url, '_blank', 'noopener,noreferrer');
    return false;
  }
}

/**
 * Clean document printing utility tailored for sandboxed iframe environments.
 */
export function printDocument(elementId: string): void {
  const element = document.getElementById(elementId);
  if (!element) {
    window.print();
    return;
  }

  // Create isolated hidden iframe to run print on modern browsers
  const printFrame = document.createElement('iframe');
  printFrame.style.position = 'fixed';
  printFrame.style.right = '0';
  printFrame.style.bottom = '0';
  printFrame.style.width = '0';
  printFrame.style.height = '0';
  printFrame.style.border = '0';
  document.body.appendChild(printFrame);

  const doc = printFrame.contentWindow?.document;
  if (!doc) {
    window.print();
    return;
  }

  doc.open();
  doc.write(`
    <!doctype html>
    <html>
      <head>
        <title>Sarthak Mandhare - Resume</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #111; padding: 24px; line-height: 1.5; font-size: 13px; }
          h1, h2, h3, h4 { color: #000; margin-top: 16px; margin-bottom: 6px; }
          a { color: #1a5f8a; text-decoration: underline; }
          hr { border: 0; border-top: 1px solid #ccc; margin: 14px 0; }
          ul { margin: 6px 0; padding-left: 20px; }
          li { margin-bottom: 4px; }
          .page-break { page-break-after: always; }
        </style>
      </head>
      <body>
        ${element.innerHTML}
      </body>
    </html>
  `);
  doc.close();

  setTimeout(() => {
    printFrame.contentWindow?.focus();
    printFrame.contentWindow?.print();
    setTimeout(() => {
      document.body.removeChild(printFrame);
    }, 1000);
  }, 350);
}
