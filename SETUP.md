# Connecting the Rush form to a Google Sheet

This makes the form actually collect responses. Answers land in a Google Sheet
and each transcript gets saved to a Drive folder, with a link to it in the sheet.
Takes about ten minutes and costs nothing.

## 1. Make the Sheet

1. Go to sheets.new to create a blank Google Sheet. Name it something like "Beta Tau Rush Responses".
2. Look at the URL. The long code between `/d/` and `/edit` is the Sheet ID. Copy it.
   Example: `docs.google.com/spreadsheets/d/`**`1AbC...long...XyZ`**`/edit`

## 2. Make the transcript folder

1. In Google Drive, make a new folder, for example "Rush Transcripts".
2. Open the folder. The code at the end of the URL is the Folder ID. Copy it.
   Example: `drive.google.com/drive/folders/`**`1Def...long...Uvw`**

## 3. Add the script

1. Go to script.google.com and click New project.
2. Delete whatever is in the editor, then paste in everything from `Code.gs`.
3. Near the top, replace `PASTE_YOUR_SHEET_ID_HERE` with your Sheet ID and
   `PASTE_YOUR_FOLDER_ID_HERE` with your Folder ID. Keep the quote marks.
4. Save.

## 4. Deploy it as a Web App

1. Click Deploy, then New deployment.
2. For type, choose Web app.
3. Set "Execute as" to Me, and "Who has access" to Anyone.
4. Click Deploy. Google will ask you to authorize it. Approve the permissions.
   It is your own script writing to your own Sheet and Drive, so this is expected.
5. Copy the Web app URL it gives you. It ends in `/exec`.

You can paste that URL into a browser to check it. You should see
`{"ok":true,"message":"Beta Tau rush endpoint is live."}`.

## 5. Point the form at it

1. Open `BetaTauIntakeForm.jsx`.
2. Near the top, find the line that starts with `const ENDPOINT =`.
3. Replace `PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE` with the Web app URL you copied.
   Keep the quote marks.
4. Save. Submit a test entry and check that a row shows up in your Sheet.

## Seeing the transcripts

Transcripts are saved into your Drive folder, and the Sheet holds a link to each
one in the Transcript column. Those files are private to you by default, so for an
officer to open a link, share the transcript folder with them: open the folder,
click Share, and add them as Viewers. Keep this to specific people rather than
"anyone with the link", since transcripts are academic records with grades on them.

If a file ever fails to save (for example one that is too large), the applicant's
written answers still get saved, and the Transcript cell will say UPLOAD FAILED so
you know to ask that person for it by email. The form caps uploads at 15 MB.

## Notes

- If you ever change `Code.gs`, redeploy with Deploy, then Manage deployments,
  then edit the existing deployment and pick a new version. A brand new deployment
  gives a new URL, which you would then have to paste into the form again.
- Transcripts can be a bit large, so very big PDFs may take a moment to upload.
  Most transcripts are small and go through fine.
- Access is set to Anyone so the public form can send to it. The script only
  ever appends rows and saves files to your own Sheet and folder. It does not
  expose them to anyone.
