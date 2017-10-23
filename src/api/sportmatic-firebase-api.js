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
          reject();
        } else {
          resolve(staff);
        }
      });
    });
  }
}
