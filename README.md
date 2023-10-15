# zivyobraz-google-calendar
Google Apps Script pushing data from Google Calendar into zivyobraz.eu

ChatGPT helped me a lot - hence the comments.

# How to schedule
To schedule the Google Apps Script to run every 4 hours, you can use Google's built-in Triggers feature. Here's how to set up a time-driven trigger for your script:


1. Open the Apps Script editor:
   - In Google Sheets or Google Calendar, click on "Extensions" > "Apps Script."
   - If you are in Google Drive, click on "New" > "More" > "Google Apps Script."

2. In the Apps Script editor, make sure your script is open.

3. Click on the clock icon ⏰ in the left sidebar. This opens the Triggers page.

4. Click on the "Add Trigger" button in the lower-right corner.

5. In the "Run" dropdown, select the function you want to trigger, which is the function you want to run every 4 hours (e.g., `getEventsFromAlternateCalendar`).

6. In the "Deployment" dropdown, choose the type of deployment you want. "Head" is typically the right choice for most cases.

7. In the "Select event source" dropdown, choose "Time-driven."

8. In the "Type of time-based trigger" dropdown, choose "Day timer."

9. Set the intervals for "Every day" and "At the following times." In your case, set it to every 4 hours.

10. Click "Save."

Your script will now run every 4 hours as specified. Make sure that you're logged into the Google account associated with the script and that you have the necessary permissions to access the calendar and perform other operations.
