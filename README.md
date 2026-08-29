# ODPhi Beta Tau Interest Form

The Beta Tau rush interest form, as a small Vite + React app. You edit the source,
push to GitHub, and Vercel rebuilds the live site for you. Responses go to a Google
Sheet through the Apps Script backend (see SETUP.md and Code.gs).

## Run it on your computer

You need Node.js installed (nodejs.org, the LTS version).

    npm install
    npm run dev

That prints a local URL (usually http://localhost:5173). Open it to see the form.
Changes you save show up instantly.

## Point it at your Google Sheet

1. Do the Google Sheet setup in SETUP.md to get your Apps Script Web App URL.
2. Open `src/RushForm.jsx` and find the line near the top starting with
   `const ENDPOINT =`.
3. Replace `PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE` with your `/exec` URL, keeping
   the quote marks.

Until that is set, the form runs and logs submissions to the browser console
instead of sending them, so you can test the look first.

## Put it online with Vercel

1. Push this folder to a new GitHub repository.
2. Go to vercel.com and sign in with GitHub.
3. Click Add New, then Project, and import your repository.
4. Vercel detects Vite automatically, so leave the build settings as they are.
5. Set the project name to `odphi-betatau-rush` (this becomes the URL,
   `odphi-betatau-rush.vercel.app`).
6. Click Deploy. About a minute later your form is live.

From then on, any time you push a change to GitHub, Vercel rebuilds and updates the
live site on its own. No manual steps.

## Custom domain later (optional)

If you buy a domain, add it in the Vercel project under Settings, then Domains.
That is where you could set something like `interest.betatau.org`.

## Editing the form

Everything lives in `src/RushForm.jsx`. Questions, wording, colors, and validation
are all in that one file. Change it, run `npm run dev` to check, then push.

## Backend files

`Code.gs` and `SETUP.md` (delivered alongside this project) cover the Google Sheet
side. The transcript files land in a Drive folder with links in the Sheet. See
SETUP.md for how to share those with your officers.
