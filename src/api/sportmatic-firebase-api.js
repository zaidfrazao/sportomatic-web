import firebase from "firebase";

export class SportomaticFirebaseAPI {
  static getPeople(institutionID) {
    return new Promise((resolve, reject) => {
      const staffRef = firebase
        .database()
        .ref(`institution/${institutionID}/private/staff`);

      staffRef.on("value", snapshot => {
        const staff = snapshot.val();
        if (staff === null) {
          resolve({});
        } else {
          resolve(staff);
        }
      });
    });
  }

  static getCoachWages(institutionID, coachID) {
    return new Promise((resolve, reject) => {
      const wagesRef = firebase
        .database()
        .ref(`institution/${institutionID}/private/wages/${coachID}`);

      wagesRef.on("value", snapshot => {
        const wages = snapshot.val();
        if (wages === null) {
          resolve({});
        } else {
          resolve(wages);
        }
      });
    });
  }

  static getTeams(institutionID) {
    return new Promise((resolve, reject) => {
      const teamsRef = firebase
        .database()
        .ref(`institution/${institutionID}/private/teams`);

      teamsRef.on("value", snapshot => {
        const teams = snapshot.val();
        if (teams === null) {
          resolve({});
        } else {
          resolve(teams);
        }
      });
    });
  }

  static getTeamOptions(institutionID) {
    return new Promise((resolve, reject) => {
      const institutionRef = firebase
        .database()
        .ref(`institution/${institutionID}/public`);

      institutionRef.on("value", snapshot => {
        const institutions = snapshot.val();
        if (institutions === null) {
          reject({});
        } else {
          resolve(institutions);
        }
      });
    });
  }
}
