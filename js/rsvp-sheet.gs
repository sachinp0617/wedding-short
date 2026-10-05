/**
 * RSVP → Google Sheet  (paste this into Extensions → Apps Script)
 *
 * 1. Create a Google Sheet. Row 1 headers (optional; this script writes them if empty):
 *    Timestamp | First | Last | Attending | Plus one | Plus-one name | Arrival | Notes
 * 2. Extensions → Apps Script. Replace any default code with this file.
 * 3. Deploy → New deployment → Type: Web app
 *      Execute as: Me
 *      Who has access: Anyone
 * 4. Copy the Web app URL ending in /exec
 * 5. Paste it into js/config.js as WEDDING.forms.sheetUrl
 *
 * Bookmark the Sheet — that is your private RSVP dashboard.
 * Do not link the Sheet on the wedding website.
 *
 * After editing this script, redeploy the web app (New version)
 * so doGet blessings JSON goes live.
 *
 * If your sheet already has a Phone column, either delete that column
 * or keep an empty Phone cell in appendRow for alignment.
 */

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Timestamp",
      "First",
      "Last",
      "Attending",
      "Plus one",
      "Plus-one name",
      "Arrival",
      "Notes",
    ]);
  }

  let data = {};
  try {
    data = JSON.parse(e.postData.contents || "{}");
  } catch (err) {
    data = e.parameter || {};
  }

  sheet.appendRow([
    new Date(),
    data.firstName || "",
    data.lastName || "",
    data.attending || "",
    data.plusOne || "",
    data.plusOneName || "",
    data.arrival || "",
    data.notes || "",
  ]);

  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
    ContentService.MimeType.JSON
  );
}

/** Public: name + wish only (rows with non-empty Notes). No attendance data. */
function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const lastRow = sheet.getLastRow();
  const lastCol = Math.max(sheet.getLastColumn(), 1);
  const wishes = [];

  if (lastRow >= 2) {
    const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(function (h) {
      return String(h || "").trim().toLowerCase();
    });
    const firstIdx = Math.max(0, headers.indexOf("first"));
    const lastIdx = Math.max(0, headers.indexOf("last"));
    let notesIdx = headers.indexOf("notes");
    if (notesIdx < 0) notesIdx = 7;

    const values = sheet.getRange(2, 1, lastRow, lastCol).getValues();
    for (let i = 0; i < values.length; i++) {
      const first = String(values[i][firstIdx] || "").trim();
      const last = String(values[i][lastIdx] || "").trim();
      const rawNotes = values[i][notesIdx];
      // Skip empty cells and date values (Arrival can land here if columns shifted)
      if (rawNotes === "" || rawNotes == null) continue;
      if (Object.prototype.toString.call(rawNotes) === "[object Date]") continue;
      const notes = String(rawNotes).trim();
      if (!notes) continue;
      if (/GMT|India Standard Time|^\d{4}-\d{2}-\d{2}/.test(notes)) continue;
      const name = [first, last].filter(Boolean).join(" ");
      if (!name) continue;
      wishes.push({ name: name, text: notes });
    }
    wishes.reverse();
  }

  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, wishes: wishes })
  ).setMimeType(ContentService.MimeType.JSON);
}
