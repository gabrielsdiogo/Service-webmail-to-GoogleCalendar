const express = require("express");
const { google } = require("googleapis");
var cors = require('cors')
google.options({
  http2: true,
});

const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
const GOOGLE_PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC/WEz/fCpbsnbp\n9jTGynkoFt2/0z1UCzRCxJ7mj3p5L6DDubgmR9y2QtbIZtBqnM4KmpSmIdabwP6i\nppo1UNPhSFw4aklnuFh2bhMJHRh+57JFYvDhjrZw9gORwxZOHf8XGx/Q/NrqrXyq\nvwT8p5Y9eFDluhf+jjuHIrsFpy2pTX2koa35l/L8G2i9Xue8grALMlIBB3sXcTNE\n35UDoINLEJl0Nl56G0cUmR4Cm1MNLhL0RiQz2wLRcRZimrZHZZ+o/u44rVmMhNoR\nXzlr2gnOimy0u8ltBCeA9H3/dvQfdFI4/ha9qqAVKorJNfbpcHXFmbGEMJyoWX8v\nDpoLMULPAgMBAAECgf9mgTB1ZFgoNSnILGZiqqdhrgLULlXQ+VQqcJhmWQj6K/dh\ndUExieAg6D/eiX7UMJowgcOyqdu73fEdw5BGtnPv8tO9rldbgkGYnfGUpyYvHxTz\nzcQYyFs9TSAKGsHYO/Br3hwItJEklPB9Y45s7+yxAXpVBMofAhMq5AJxTflxSpKG\nNTY8ShIZ2WHRoapiVJQAmsuFLYxQMnPify6Lpcfu2hWAw6Qabqe5SS9kAn2J6W5a\n8R3o5zty9LS65ShTfLdOoUPs5oVderFsGBAWXg7LpaVZ2Bxk8ydf2gMJvkgSVuYD\nzapr3NHwcWg1wq7RTO07aeEOFtAENtsbjUpW0AECgYEA4vMmXIvqZWPuD640Wk+V\nXmlro74JfHRHdfNuz4mDGo0BKpt9g/jM+SG2mfhQValAgt8cQXRy/SoVKTez+ByO\nU5HHszz/rhJvw3z6EAtoIFmGK8pP4AV4JMGvIUyhRcTMQ1Q9WMvCudTgD8OBxeoQ\nsIpN0824JI0q2O3BJJdiHGECgYEA19Zs4JnPHWYxg0doUJiq/UcI7PY+IkD419UA\nYWXmZlNHZresDScJJ8p2JwtDNju14si78BdebHZ5gPQt4tIrwHmA1BRvgNkD6bJk\nhdaTPa+zbfxwpkrmdEZ1+XAXfAhuP0yCZ6inLp7/96uGQg1FlMVT7NaHpk8h0jAC\nDJbRLS8CgYB9q2q4oHmA/17Zq/stbxglGXcTSq3yDmlrtQrNPTYtw5q7vzI3m9PU\nuIhmpgvGA1zHm0gILrVl3qGtGz06zIU7XWQZqlNiTq84rsHBlK9qCmizYunsANtQ\nbzfM1qQPADSjq8f0nZAMWwZfdEEuGLh5KXyDJk0rYEgzqyPiYTlgwQKBgQDMgv6z\nasoXH0f3DmhHRgFu8CoC7eg96LZhPBCaOUWw22QibhL2e3BvZaXCpSdQcg+MDYwW\nmO39c9z5VWVNMLwIKpjpW1u0CO1uOHyLXKAzqRIpOzM6PmpS7pjGe3GlMw/TpplB\nw0p2IG6FrN8QIyc1Kiy1kykBaqWvVZH7f8RAPQKBgQCHf/ib5wYuVvSxHf8dufH2\n4yk9vwN6gdrrqrqxsQAXTmF5kaLEjEGiKZuK9XM9zKg3qV3ybWoD78K9Pu8pO+8q\nmX7psV69K9mcj/OCE3W8M15947UOwnIjbT2BnCzqaVyfbR0Nnf5entSTfTvaCScK\nrjqOfMvcCBY5SvFYOZ5AlQ==\n-----END PRIVATE KEY-----\n";
const GOOGLE_CLIENT_EMAIL = "calendar-integration@aerobic-bonus-257818.iam.gserviceaccount.com";
const GOOGLE_PROJECT_NUMBER = "119632006359";
const GOOGLE_CALENDAR_ID = "killgamerkiller@gmail.com";

const key = {
  "type": "service_account",
  "project_id": "aerobic-bonus-257818",
  "private_key_id": "c5be27f999d376d543dcd88df7b1da0434dc2b15",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC/WEz/fCpbsnbp\n9jTGynkoFt2/0z1UCzRCxJ7mj3p5L6DDubgmR9y2QtbIZtBqnM4KmpSmIdabwP6i\nppo1UNPhSFw4aklnuFh2bhMJHRh+57JFYvDhjrZw9gORwxZOHf8XGx/Q/NrqrXyq\nvwT8p5Y9eFDluhf+jjuHIrsFpy2pTX2koa35l/L8G2i9Xue8grALMlIBB3sXcTNE\n35UDoINLEJl0Nl56G0cUmR4Cm1MNLhL0RiQz2wLRcRZimrZHZZ+o/u44rVmMhNoR\nXzlr2gnOimy0u8ltBCeA9H3/dvQfdFI4/ha9qqAVKorJNfbpcHXFmbGEMJyoWX8v\nDpoLMULPAgMBAAECgf9mgTB1ZFgoNSnILGZiqqdhrgLULlXQ+VQqcJhmWQj6K/dh\ndUExieAg6D/eiX7UMJowgcOyqdu73fEdw5BGtnPv8tO9rldbgkGYnfGUpyYvHxTz\nzcQYyFs9TSAKGsHYO/Br3hwItJEklPB9Y45s7+yxAXpVBMofAhMq5AJxTflxSpKG\nNTY8ShIZ2WHRoapiVJQAmsuFLYxQMnPify6Lpcfu2hWAw6Qabqe5SS9kAn2J6W5a\n8R3o5zty9LS65ShTfLdOoUPs5oVderFsGBAWXg7LpaVZ2Bxk8ydf2gMJvkgSVuYD\nzapr3NHwcWg1wq7RTO07aeEOFtAENtsbjUpW0AECgYEA4vMmXIvqZWPuD640Wk+V\nXmlro74JfHRHdfNuz4mDGo0BKpt9g/jM+SG2mfhQValAgt8cQXRy/SoVKTez+ByO\nU5HHszz/rhJvw3z6EAtoIFmGK8pP4AV4JMGvIUyhRcTMQ1Q9WMvCudTgD8OBxeoQ\nsIpN0824JI0q2O3BJJdiHGECgYEA19Zs4JnPHWYxg0doUJiq/UcI7PY+IkD419UA\nYWXmZlNHZresDScJJ8p2JwtDNju14si78BdebHZ5gPQt4tIrwHmA1BRvgNkD6bJk\nhdaTPa+zbfxwpkrmdEZ1+XAXfAhuP0yCZ6inLp7/96uGQg1FlMVT7NaHpk8h0jAC\nDJbRLS8CgYB9q2q4oHmA/17Zq/stbxglGXcTSq3yDmlrtQrNPTYtw5q7vzI3m9PU\nuIhmpgvGA1zHm0gILrVl3qGtGz06zIU7XWQZqlNiTq84rsHBlK9qCmizYunsANtQ\nbzfM1qQPADSjq8f0nZAMWwZfdEEuGLh5KXyDJk0rYEgzqyPiYTlgwQKBgQDMgv6z\nasoXH0f3DmhHRgFu8CoC7eg96LZhPBCaOUWw22QibhL2e3BvZaXCpSdQcg+MDYwW\nmO39c9z5VWVNMLwIKpjpW1u0CO1uOHyLXKAzqRIpOzM6PmpS7pjGe3GlMw/TpplB\nw0p2IG6FrN8QIyc1Kiy1kykBaqWvVZH7f8RAPQKBgQCHf/ib5wYuVvSxHf8dufH2\n4yk9vwN6gdrrqrqxsQAXTmF5kaLEjEGiKZuK9XM9zKg3qV3ybWoD78K9Pu8pO+8q\nmX7psV69K9mcj/OCE3W8M15947UOwnIjbT2BnCzqaVyfbR0Nnf5entSTfTvaCScK\nrjqOfMvcCBY5SvFYOZ5AlQ==\n-----END PRIVATE KEY-----\n",
  "client_email": "calendar-integration@aerobic-bonus-257818.iam.gserviceaccount.com",
  "client_id": "104092677690540646044",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/calendar-integration%40aerobic-bonus-257818.iam.gserviceaccount.com"
}
let auth;
let calendar;

try {
  const jwtClient = new google.auth.JWT(
    GOOGLE_CLIENT_EMAIL,
    null,
    GOOGLE_PRIVATE_KEY,
    SCOPES
  );
  calendar = google.calendar({
    version: "v3",
    project: GOOGLE_PROJECT_NUMBER,
    auth: jwtClient,
  });
  auth = new google.auth.GoogleAuth({
    keyFile: __dirname + "/aerobic-bonus-257818-c5be27f999d3.json",
    scopes: "https://www.googleapis.com/auth/calendar", //full access to edit calendar
  });
} catch (error) {
  throw error
}




let app = express();
let port = 4444;
const okReturn = {
  code: 200,
  message: "the event has been created!",
};






app.use(express.json());
app.use(cors())

app.post("/createEvent", function (req, res) {

  
  try {
    CreateEventOnCalendar(req);
  } catch (error) {
    throw error
  }
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(okReturn);
});

app.listen(port);
console.log("Server started at http://localhost:" + port);

function CreateEventOnCalendar(req) {
  let event = {
    summary: req.body.EventTitle,
    location: req.body.EventVenue,
    description: req.body.EventDescription,
    start: {
      dateTime: req.body.EventDate,
      timeZone: "America/Sao_Paulo",
    },
    end: {
      dateTime: req.body.EventEndDate,
      timeZone: "America/Sao_Paulo",
    },
    attendees: [],
    reminders: {
      useDefault: false,
      overrides: [{ method: "popup", minutes: 10 }],
    },
  };

  auth.getClient().then((a) => {
    calendar.events.insert(
      {
        auth: a,
        calendarId: GOOGLE_CALENDAR_ID,
        resource: event,
      },
      function (err, event) {
        if (err) {
          throw err
          return;
        }

        console.log("Event successfully created!");
      }
    );
  });
}
