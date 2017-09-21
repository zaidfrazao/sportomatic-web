import brettPicture from "../images/brett.jpg";
import rowanPicture from "../images/rowan.jpg";
import sportomaticPicture from "../images/sportomatic.jpg";

export function getAccountInfo(accountType) {
  switch (accountType) {
    case "institution":
      return {
        name: "Sportomatic Academy",
        abbreviation: "SPCA",
        email: "info@sportomaticapp.com",
        phoneNumber: "(011) 283 - 8492",
        physicalAddress: "63 Alexandra Street, Florida",
        institutionType: "Sports Academy",
        genders: "Mixed",
        imageURL: sportomaticPicture,
        sports: [
          { name: "Athletics", numberOfTeams: 3 },
          { name: "Cricket", numberOfTeams: 1 },
          { name: "Rugby", numberOfTeams: 0 },
          { name: "Soccer", numberOfTeams: 4 }
        ],
        ageGroups: [
          { name: "U/16", numberOfTeams: 0 },
          { name: "U/18", numberOfTeams: 7 }
        ],
        divisions: [
          { name: "A", numberOfTeams: 2 },
          { name: "B", numberOfTeams: 0 },
          { name: "1st Team", numberOfTeams: 3 },
          { name: "2nd Team", numberOfTeams: 2 }
        ],
        coachPaymentOptions: {
          standardHourlyRate: 100,
          overtimeHourlyRate: 150,
          maxOvertimeHours: 3,
          payDay: "End of the month"
        }
      };
    case "coach":
      return {
        name: "Rowan",
        surname: "Walker-Campbell",
        email: "rowan@sportomaticapp.com",
        phoneNumber: "(079) 507 - 0104",
        profilePictureURL: rowanPicture,
        sports: [
          { name: "Athletics", numberOfTeams: 3 },
          { name: "Cricket", numberOfTeams: 1 },
          { name: "Rugby", numberOfTeams: 0 },
          { name: "Soccer", numberOfTeams: 4 }
        ]
      };
    case "manager":
      return {
        name: "Brett",
        surname: "Cook",
        email: "brett@sportomaticapp.com",
        phoneNumber: "(082) 746 - 8382",
        profilePictureURL: brettPicture,
        sports: [
          { name: "Cricket", numberOfTeams: 0 },
          { name: "Rugby", numberOfTeams: 2 },
          { name: "Swimming", numberOfTeams: 0 }
        ]
      };
    default:
      return {};
  }
}
