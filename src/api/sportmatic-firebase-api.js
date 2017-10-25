import firebase from "firebase";

export class SportomaticFirebaseAPI {
  static getPeople(institutionID) {
    return new Promise((resolve, reject) => {
      const staffRef = firebase
        .database()
        .ref(`institution/${institutionID}/private/staff`);

      staffRef.on("value", snapshot => {
        const staff = snapshot.val();
        console.log(staff);
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
}
