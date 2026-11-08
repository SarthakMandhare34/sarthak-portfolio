/**
 * @file download.js
 * @description Resilient Client-Side File Download Utility
 * 
 * PURPOSE & ARCHITECTURE:
 * Standard HTML download anchors (<a href="..." download>) can be blocked
 * by modern browser iframe sandbox restrictions or cross-origin security policies.
 * 
 * To guarantee 100% reliable resume downloading across all browsers, web views,
 * and embedded sandboxes, this utility:
 * 1. Fetches the binary file data into browser memory using the Fetch API.
 * 2. Converts the response into an in-memory Blob object.
 * 3. Generates a temporary object URL (blob:...).
 * 4. Creates and clicks a hidden DOM anchor element with the requested filename.
 * 5. Cleans up memory by revoking the blob URL after download initiation.
 * 6. Gracefully falls back to window.open() in a new tab if fetch is obstructed.
 */

/**
 * Downloads a file as an in-memory Blob to bypass iframe sandbox download blockers.
 * 
 * @param {string} url - The URL path of the file to fetch (e.g. '/Sarthak_Mandhare_Resume.pdf').
 * @param {string} filename - The default filename to present to the user's system upon download.
 * @returns {Promise<boolean>} Resolves to true if blob download succeeded, or false on fallback.
 */
export async function downloadBlobFile(url, filename) {
  try {
    // Step 1: Fetch the file binary stream from the server or public directory
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    // Step 2: Convert the binary stream into an in-memory Blob
    const blob = await response.blob();

    // Step 3: Create a transient local object URL pointing to the Blob in memory
    const blobUrl = URL.createObjectURL(blob);

    // Step 4: Inject a hidden anchor tag to trigger the browser's native save dialog
    const anchor = document.createElement('a');
    anchor.href = blobUrl;
    anchor.download = filename;
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();

    // Step 5: Clean up memory - remove the DOM element and revoke the temporary object URL
    setTimeout(() => {
      document.body.removeChild(anchor);
      URL.revokeObjectURL(blobUrl);
    }, 1500);

    return true;
  } catch (error) {
    // Step 6: Fallback - if Blob generation is blocked, open the direct link in a new browser tab
    console.warn('Blob download failed or was blocked, falling back to window.open', error);
    window.open(url, '_blank', 'noopener,noreferrer');
    return false;
  }
}
