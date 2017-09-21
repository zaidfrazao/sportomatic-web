import garyPicture from "../images/gary.jpg";
import rowanPicture from "../images/rowan.jpg";
import brettPicture from "../images/brett.jpg";

const teams = [
  {
    name: "Open 1st Team Swimming Girls",
    sport: "Swimming",
    ageGroup: "Open",
    division: "1st Team",
    gender: "Girls",
    coaches: [],
    managers: [
      {
        name: "Brett",
        surname: "Cook",
        type: "Manager",
        profilePictureURL: brettPicture
      }
    ]
  },
  {
    name: "U/16 A Rugby Boys",
    sport: "Rugby",
    ageGroup: "U/16",
    division: "A",
    gender: "Boys",
    coaches: [
      {
        name: "Rowan",
        surname: "Walker-Campbell",
        type: "Coach",
        profilePictureURL: rowanPicture
      }
    ],
    managers: [
      {
        name: "Brett",
        surname: "Cook",
        type: "Manager",
        profilePictureURL: brettPicture
      }
    ]
  },
  {
    name: "U/12 A Cricket Boys",
    sport: "Cricket",
    ageGroup: "U/12",
    division: "A",
    gender: "Boys",
    coaches: [],
    managers: [
      {
        name: "Gary",
        surname: "Kirstin",
        type: "Manager",
        profilePictureURL: garyPicture
      }
    ]
  },
  {
    name: "U/12 B Cricket Boys",
    sport: "Cricket",
    ageGroup: "U/12",
    division: "B",
    gender: "Boys",
    coaches: [],
    managers: [
      {
        name: "Gary",
        surname: "Kirstin",
        type: "Manager",
        profilePictureURL: garyPicture
      }
    ]
  },
  {
    name: "U/13 A Cricket Boys",
    sport: "Cricket",
    ageGroup: "U/13",
    division: "A",
    gender: "Boys",
    coaches: [],
    managers: [
      {
        name: "Gary",
        surname: "Kirstin",
        type: "Manager",
        profilePictureURL: garyPicture
      }
    ]
  },
  {
    name: "U/13 B Cricket Boys",
    sport: "Cricket",
    ageGroup: "U/13",
    division: "B",
    gender: "Boys",
    coaches: [],
    managers: [
      {
        name: "Gary",
        surname: "Kirstin",
        type: "Manager",
        profilePictureURL: garyPicture
      }
    ]
  }
];

export function getTeamsList() {
  return teams;
}
