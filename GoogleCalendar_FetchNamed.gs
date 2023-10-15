function getEventsFromAlternateCalendar() {
  // Fill in your Google account email address.
  var userEmail = '';
  // Fill in zivyobraz.eu importKey.
  var importKey = '';
  
  // Get the calendar by name (in this case, "Pracovní").
  var calendars = CalendarApp.getCalendarsByName('Pracovní');
  
  if (calendars.length === 0) {
    Logger.log('Calendar not found.');
    return;
  }
  
  var calendar = calendars[0];
  
  // Initialize an array to store the eventDataStrings for each day.
  var eventDataStrings = [];
  
  // Array to map weekday names in English to Czech.
  var czechWeekdayNames = [
    'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota', 'Neděle'
  ];
  
  // Loop to generate eventDataStrings for 7 days starting from today.
  for (var i = 0; i < 7; i++) {
    var currentDay = new Date();
    currentDay.setDate(currentDay.getDate() + i);
    var nextDay = new Date(currentDay);
    nextDay.setDate(nextDay.getDate() + 1);
    
    // Fetch the events for the current day from the "Pracovní" calendar.
    var events = calendar.getEvents(currentDay, nextDay);
    
    // Serialize the event data into a string for the current day.
    var eventDataString = "žádné události";
    if (events.length > 0) {
      eventDataString = events.map(function(event) {
        var eventTime = Utilities.formatDate(event.getStartTime(), 'CET', 'HH:mm');
        return eventTime + ' - ' + event.getTitle();
      }).join('\n');
    }
    
    // Get the description of the day with the weekday name in Czech.
    var dayDescription = czechWeekdayNames[currentDay.getDay()] + ', ' + Utilities.formatDate(currentDay, 'CET', 'd. MMMM');
    
    // Add the eventDataString and dayDescription to the array.
    eventDataStrings.push({ eventData: eventDataString, description: dayDescription });
  }
  
  // Send each eventDataString and dayDescription in separate variables.
  eventDataStrings.forEach(function(data, index) {
    var encodedEventData = encodeURIComponent(data.eventData);
    var variableName = 'GCEvents_work' + (index + 1);
    var descriptionName = 'GCDay_work' + (index + 1);
    var getUrl = 'http://in.zivyobraz.eu/?import_key=' + importKey + '&' + variableName + '=' + encodedEventData + '&' + descriptionName + '=' + data.description;
    
    // Log the URL for reference.
    Logger.log('GET URL for Day ' + (index + 1) + ': ' + getUrl);
    
    // Make the GET request to send the data.
    var response = UrlFetchApp.fetch(getUrl);
    Logger.log('Response for Day ' + (index + 1) + ': ' + response.getContentText());
  });
}
