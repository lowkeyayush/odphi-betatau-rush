/**
 * Beta Tau Rush Form backend.
 * Receives a submission from the form and writes one row to a Google Sheet.
 * The transcript file is saved to a Drive folder and its link goes in the row.
 *
 * Fill in the two IDs below, then deploy as a Web App (see SETUP.md).
 */

var SHEET_ID = "1iaYxDv9tgLNYfOQwc4O2mKZcYAYMOsofx7ZTav6fVBU";              // the Google Sheet that stores responses
var TAB_NAME = "Responses";                              // the tab inside that Sheet
var TRANSCRIPT_FOLDER_ID = "1Zadh2bgRdjYuiEgrzWxIW8ZfWBgBAnYo";  // a Drive folder for transcripts

var HEADERS = [
  "Timestamp", "Email", "Confirm email", "Name", "Age", "Instagram", "Phone",
  "Year", "Year (other)", "Involved on campus", "Involved (other)",
  "Groups and positions", "Goal at PSU", "Hope to gain", "Heard about us", "Transcript"
];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(TAB_NAME) || ss.insertSheet(TAB_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
    }

    var transcriptLink = "";
    if (data.transcriptData && data.transcriptName) {
      try {
        var folder = DriveApp.getFolderById(TRANSCRIPT_FOLDER_ID);
        var bytes = Utilities.base64Decode(data.transcriptData);
        var blob = Utilities.newBlob(
          bytes,
          data.transcriptType || "application/octet-stream",
          data.transcriptName
        );
        var prefix = data.fullName ? data.fullName + " - " : "";
        var file = folder.createFile(blob).setName(prefix + data.transcriptName);
        transcriptLink = file.getUrl();
      } catch (ferr) {
        // Never lose the applicant's answers just because the file failed.
        transcriptLink = "UPLOAD FAILED (follow up by email): " + String(ferr);
      }
    }

    sheet.appendRow([
      new Date(),
      data.email || "",
      data.confirmEmail || "",
      data.fullName || "",
      data.age || "",
      data.instagram || "",
      data.phone || "",
      data.year || "",
      data.yearOther || "",
      data.involved || "",
      data.involvedOther || "",
      data.groupsList || "",
      data.accomplish || "",
      data.hopeToGain || "",
      data.heardAbout || "",
      transcriptLink
    ]);

    return jsonOut({ ok: true });
  } catch (err) {
    return jsonOut({ ok: false, error: String(err) });
  }
}

// Lets you open the Web App URL in a browser to confirm it is live.
function doGet() {
  return jsonOut({ ok: true, message: "Beta Tau rush endpoint is live." });
}

function jsonOut(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
