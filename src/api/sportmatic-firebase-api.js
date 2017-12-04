import firebase from "firebase";

export class SportomaticFirebaseAPI {
  static getCoaches(institutionID, type) {
    return new Promise((resolve, reject) => {
      const coachesRef = firebase
        .firestore()
        .collection("users")
        .where(`institutions.${institutionID}.coachStatus`, "==", type);

      coachesRef.onSnapshot(querySnapshot => {
        let coaches = {};
        querySnapshot.forEach(doc => {
          coaches[doc.id] = doc.data();
        });
        resolve(coaches);
      });
    });
  }

  static getManagers(institutionID, type) {
    return new Promise((resolve, reject) => {
      const managersRef = firebase
        .firestore()
        .collection("users")
        .where(`institutions.${institutionID}.managerStatus`, "==", type);

      managersRef.onSnapshot(querySnapshot => {
        let managers = {};
        querySnapshot.forEach(doc => {
          managers[doc.id] = doc.data();
        });
        resolve(managers);
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
  static getNewTeamID(institutionID) {
    return new Promise((resolve, reject) => {
      const newTeamID = firebase
        .database()
        .ref(`institution/${institutionID}/private/teams`)
        .push().key;

      if (!newTeamID) {
        reject({});
      } else {
        resolve(newTeamID);
      }
    });
  }
  static addTeam(team) {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref()
        .update(team)
        .then(() => resolve())
        .catch(err => reject(err));
    });
  }
}
