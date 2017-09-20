import rowanPicture from "../images/rowan.jpg";
import brettPicture from "../images/brett.jpg";
export function getEvents() {
  return {
    "2017-8-18": [
      {
        id: "xyz",
        title: "U/16 A Rugby Boys Match",
        eventType: "COMPETITIVE",
        eventTypeName: "Match",
        startTime: 1508328000000,
        endTime: 1508335200000,
        isCanceled: false,
        venue: "Sportomatic Grounds",
        notes:
          "Please remember to fill in and bring your pedo forms to practice.",
        matchInfo: {
          opponents: "Parktown Boys High School",
          homeAway: "Home"
        },
        teams: [
          {
            id: "0",
            name: "U/16 A Rugby Boys Practice",
            sport: "Rugby"
          }
        ],
        managers: [
          {
            id: "0",
            name: "Brett",
            surname: "Cook",
            profilePictureURL: brettPicture,
            phoneNumber: "(073) 812-1122"
          }
        ],
        coaches: [
          {
            name: "Rowan",
            surname: "Walker-Campbell",
            profilePictureURL: rowanPicture,
            phoneNumber: "(084) 291-0482",
            hasFillIn: false,
            wasAbsent: false,
            hours: {
              stage: "APPROVED",
              signInTime: 1508328000000,
              signOutTime: 1508335200000,
              standardMinutes: 120,
              overtimeMinutes: 0,
              startTimeDelta: 0, // Helps to work out how early / late they arrived
              endTimeDelta: 0 // Helps to work out how early / late they left
            },
            wages: {
              type: "HOURLY",
              standardHourlyRate: 100, // Allows hourly wage rates to be change on a per event basis
              overtimeHourlyRate: 150,
              standardWage: 200,
              overtimeWage: 0,
              totalWage: 200
            }
          }
        ]
      }
    ]
  };
}
