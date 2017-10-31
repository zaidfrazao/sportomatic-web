export type ActionAlias = {
  type: string,
  payload?: Object
};

export type DispatchAlias = (action: ActionAlias) => void;

export type ErrorAlias = { code: string, message: string };

export type FileAlias = {
  lastModified: number,
  lastModificationDate: Date,
  name: string,
  size: number,
  type: string,
  webkitRelativePath: string
};

export type CoachAlias = {
  metadata: {
    email: string,
    name: string,
    phoneNumber: string,
    profilePictureURL: string,
    surname: string,
    type: "COACH"
  },
  paymentDefaults: {
    maxOvertimeHours: number,
    overtimeHourlyRate: number,
    standardHourlyRate: number,
    type: "HOURLY" | "FIXED" | "SALARY"
  },
  preferredSports: {
    [sportID]: string
  }
};

export type ManagerAlias = {
  metadata: {
    email: string,
    name: string,
    phoneNumber: string,
    profilePictureURL: string,
    surname: string,
    type: "MAANGER"
  },
  preferredSports: {
    [sportID]: string
  }
};

export type TeamAlias = {
  coaches: { [coachID]: CoachAlias },
  managers: { [managerID]: ManagerAlias },
  metadata: {
    ageGroup: number,
    division: string,
    gender: "MALE" | "FEMALE" | "MIXED",
    name: string,
    sport: string
  },
  status: "ACTIVE" | "DELETED"
};

export type EventAlias = {
  coaches: {
    [coachID]: {
      hours: {
        overtimeHourlyRate: number,
        signInTime?: string,
        signInTimeDelta?: number,
        signOutTime?: string,
        signOutTimeDelta?: number,
        standardHourlyRate: number,
        status:
          | "APPROVED"
          | "AWAITING_APPROVAL"
          | "AWAITING_SIGN_IN"
          | "AWAITING_SIGN_OUT",
        type: "HOURLY" | "FIXED" | "SALARY"
      },
      name: string,
      phoneNumber: string,
      profilePictureURL: string,
      surname: string
    }
  },
  managers: {
    [managerID]: {
      name: string,
      phoneNumber: string,
      profilePictureURL: string,
      surname: string
    }
  },
  metadata: {
    additionalInfo: {
      homeAway: "HOME" | "AWAY",
      notes: string,
      opponents: string,
      venue: string
    },
    date: string,
    endTime: string,
    isCompetitive: boolean,
    startTime: string,
    title: string,
    type: string
  },
  recurrencePattern: {
    frequency: "ONCE" | "WEEKLY" | "MONTHLY",
    instances: [{ date: string, id: string }],
    numberOfEvents: string
  },
  teams: {
    [teamID]: TeamAlias
  },
  status: "ACTIVE" | "CANCELED" | "DELETED"
};

export type LocationAlias = {
  hash: string,
  key: string,
  pathname: string,
  search: string,
  state: undefined // needs more research
};

export type HistoryAlias = {
  // needs more research
  action: string,
  block: () => void,
  createHref: () => void,
  go: (n: string) => void,
  goBack: () => void,
  goForward: () => void,
  length: number,
  listen: (listener: string) => void,
  location: LocationAlias,
  push: (path: string, state: {}) => void,
  replace: (path: string, state: {}) => void
};

export type MatchAlias = {
  isExact: boolean,
  params: {
    [paramName]: string
  },
  path: string,
  url: string
};
