export const sampleStore = {
  signIn: {
    userInfo: {
      email: "info@sportomaticapp.com",
      password: "",
      passwordResetEmail: "",
      isLoggedIn: true,
      type: "INSTITUTION",
      status: "ACTIVE"
    },
    loadingStatus: {
      isSignInLoading: false,
      isPasswordResetLoading: false
    },
    errors: {
      emailErrors: {
        hasError: false,
        message: ""
      },
      passwordErrors: {
        hasError: false,
        message: ""
      },
      passwordResetEmailErrors: {
        hasError: false,
        message: ""
      },
      networkErrors: {
        hasError: false,
        message: ""
      }
    },
    dialogs: {
      isPasswordResetDialogOpen: false,
      isPasswordResetSuccessModalOpen: false,
      isNetworkFailureModalOpen: false
    }
  },
  coach: {
    coreInterface: {
      uiConfig: {
        appBarTitle: "Dashboard",
        bottomNavValue: "dashboard",
        isSideMenuOpen: false,
        isLoggedIn: false,
        activeInstitution: {
          emblemURL:
            "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/institution%2FVidVN3BJ6VTHmtC1kGGVDrRpPVf2%2Femblem.png?alt=media&token=4cc7fce3-6c25-4ec8-93dd-17417b224fef",
          id: "VidVN3BJ6VTHmtC1kGGVDrRpPVf2",
          name: "Sportomatic Academy"
        },
        type: "COACH",
        userID: "Bhmq7MvEEbawZJE6xnxqsXn4dWG2"
      },
      dialogs: {
        isSwitchInstitutionsDialogOpen: false,
        isSettingsAlertOpen: false,
        isLogOutModalOpen: false
      }
    },
    dashboard: {
      uiConfig: {
        appBarTitle: "Dashboard",
        bottomNavValue: "dashboard",
        isSideMenuOpen: false
      }
    },
    hours: {
      uiConfig: {
        isLoading: false,
        currentTab: "IN_PROGRESS"
      },
      loadingStatus: {
        isEventsLoading: false
      },
      events: {
        "2017": {
          "10": {
            "-KxNuraI0AULS_49kAP4": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    signInTime: "14:42",
                    signInTimeDelta: 42,
                    signOutTime: "16:43",
                    signOutTimeDelta: -17,
                    standardHourlyRate: 150,
                    status: "APPROVED",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "HOME",
                  notes: "",
                  opponents: "To be specified",
                  venue: "To be specified"
                },
                date: "2017-10-26",
                endTime: "17:00",
                isCompetitive: true,
                startTime: "14:00",
                title: "U/12 A Athletics Mixed Match",
                type: "Match"
              },
              recurrencePattern: {
                frequency: "ONCE",
                instances: [
                  {
                    date: "2017-10-26",
                    id: "-KxNuraI0AULS_49kAP4"
                  }
                ],
                numberOfEvents: "1"
              },
              status: "ACTIVE",
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "12",
                    division: "A",
                    gender: "MIXED",
                    name: "U/12 A Athletics Mixed",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxNxtqKeIksEJvFz2ek": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    signInTime: "12:00",
                    signInTimeDelta: 0,
                    signOutTime: "15:00",
                    signOutTimeDelta: 0,
                    standardHourlyRate: 150,
                    status: "APPROVED",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "To be specified"
                },
                date: "2017-10-26",
                endTime: "15:00",
                isCompetitive: false,
                startTime: "12:00",
                title: "U/15 C Athletics Girls Practice",
                type: "Practice"
              },
              recurrencePattern: {
                frequency: "ONCE",
                instances: [
                  {
                    date: "2017-10-26",
                    id: "-KxNxtqKeIksEJvFz2ek"
                  }
                ],
                numberOfEvents: "1"
              },
              status: "ACTIVE",
              teams: {
                "-KxNxphNKRQtuecBiq3R": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "15",
                    division: "C",
                    gender: "FEMALE",
                    name: "U/15 C Athletics Girls",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxRbx8gK3rd_yg-jsM1": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    signInTime: "12:03",
                    signInTimeDelta: 3,
                    signOutTime: "14:38",
                    signOutTimeDelta: -22,
                    standardHourlyRate: 150,
                    status: "APPROVED",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "AWAY",
                  notes: "",
                  opponents: "Parktown",
                  venue: "Sportomatic Grounds"
                },
                date: "2017-10-27",
                endTime: "15:00",
                isCompetitive: true,
                startTime: "12:00",
                title: "U/12 A Athletics Mixed Match",
                type: "Match"
              },
              recurrencePattern: {
                frequency: "ONCE",
                instances: [
                  {
                    date: "2017-10-27",
                    id: "-KxRbx8gK3rd_yg-jsM1"
                  }
                ],
                numberOfEvents: "1"
              },
              status: "ACTIVE",
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "12",
                    division: "A",
                    gender: "MIXED",
                    name: "U/12 A Athletics Mixed",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxRnX_g6ZrSLj64AMu5": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    signInTime: "09:53",
                    signInTimeDelta: -7,
                    signOutTime: "11:00",
                    signOutTimeDelta: 0,
                    standardHourlyRate: 150,
                    status: "APPROVED",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "Grace Trinity"
                },
                date: "2017-10-27",
                endTime: "11:00",
                isCompetitive: false,
                startTime: "10:00",
                title: "U/15 C Athletics Girls Practice",
                type: "Practice"
              },
              recurrencePattern: {
                frequency: "ONCE",
                instances: [
                  {
                    date: "2017-10-27",
                    id: "-KxRnX_g6ZrSLj64AMu5"
                  }
                ],
                numberOfEvents: "1"
              },
              status: "ACTIVE",
              teams: {
                "-KxNxphNKRQtuecBiq3R": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "15",
                    division: "C",
                    gender: "FEMALE",
                    name: "U/15 C Athletics Girls",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxS5PK5G3DKhJCzVmV7": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    signInTime: "13:44",
                    signInTimeDelta: 44,
                    signOutTime: "14:21",
                    signOutTimeDelta: -39,
                    standardHourlyRate: 150,
                    status: "APPROVED",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "Grace Trinity"
                },
                date: "2017-10-28",
                endTime: "15:00",
                isCompetitive: false,
                startTime: "13:00",
                title: "U/12 A Athletics Mixed Practice",
                type: "Practice"
              },
              recurrencePattern: {
                frequency: "WEEKLY",
                instances: [
                  {
                    date: "2017-10-28",
                    id: "-KxS5PK5G3DKhJCzVmV7"
                  },
                  {
                    date: "2017-11-04",
                    id: "-KxS5PK9nfPH_JHrBUhx"
                  },
                  {
                    date: "2017-11-11",
                    id: "-KxS5PK9nfPH_JHrBUhy"
                  }
                ],
                numberOfEvents: "3"
              },
              status: "ACTIVE",
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "12",
                    division: "A",
                    gender: "MIXED",
                    name: "U/12 A Athletics Mixed",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxgPnHKq2l9irLE7HNg": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    signInTime: "12:10",
                    signInTimeDelta: 10,
                    signOutTime: "14:22",
                    signOutTimeDelta: -38,
                    standardHourlyRate: 150,
                    status: "APPROVED",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "To be specified"
                },
                date: "2017-10-30",
                endTime: "15:00",
                isCompetitive: true,
                startTime: "12:00",
                title: "U/15 C Athletics Girls Match",
                type: "Match"
              },
              recurrencePattern: {
                frequency: "WEEKLY",
                instances: [
                  {
                    date: "2017-10-30",
                    id: "-KxgPnHKq2l9irLE7HNg"
                  },
                  {
                    date: "2017-11-06",
                    id: "-KxgPnHKq2l9irLE7HNh"
                  },
                  {
                    date: "2017-11-13",
                    id: "-KxgPnHOQrMRIjZilRty"
                  }
                ],
                numberOfEvents: "3"
              },
              status: "ACTIVE",
              teams: {
                "-KxNxphNKRQtuecBiq3R": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "15",
                    division: "C",
                    gender: "FEMALE",
                    name: "U/15 C Athletics Girls",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            }
          },
          "11": {
            "-KxS5PK9nfPH_JHrBUhx": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    standardHourlyRate: 150,
                    status: "AWAITING_SIGN_IN",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "Grace Trinity"
                },
                date: "2017-11-04",
                endTime: "15:00",
                isCompetitive: false,
                startTime: "13:00",
                title: "U/12 A Athletics Mixed Practice",
                type: "Practice"
              },
              recurrencePattern: {
                frequency: "WEEKLY",
                instances: [
                  {
                    date: "2017-10-28",
                    id: "-KxS5PK5G3DKhJCzVmV7"
                  },
                  {
                    date: "2017-11-04",
                    id: "-KxS5PK9nfPH_JHrBUhx"
                  },
                  {
                    date: "2017-11-11",
                    id: "-KxS5PK9nfPH_JHrBUhy"
                  }
                ],
                numberOfEvents: "3"
              },
              status: "ACTIVE",
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "12",
                    division: "A",
                    gender: "MIXED",
                    name: "U/12 A Athletics Mixed",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxS5PK9nfPH_JHrBUhy": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    standardHourlyRate: 150,
                    status: "AWAITING_SIGN_IN",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "Grace Trinity"
                },
                date: "2017-11-11",
                endTime: "15:00",
                isCompetitive: false,
                startTime: "13:00",
                title: "U/12 A Athletics Mixed Practice",
                type: "Practice"
              },
              recurrencePattern: {
                frequency: "WEEKLY",
                instances: [
                  {
                    date: "2017-10-28",
                    id: "-KxS5PK5G3DKhJCzVmV7"
                  },
                  {
                    date: "2017-11-04",
                    id: "-KxS5PK9nfPH_JHrBUhx"
                  },
                  {
                    date: "2017-11-11",
                    id: "-KxS5PK9nfPH_JHrBUhy"
                  }
                ],
                numberOfEvents: "3"
              },
              status: "ACTIVE",
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "12",
                    division: "A",
                    gender: "MIXED",
                    name: "U/12 A Athletics Mixed",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxgPnHKq2l9irLE7HNh": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    standardHourlyRate: 150,
                    status: "AWAITING_SIGN_IN",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "To be specified"
                },
                date: "2017-11-06",
                endTime: "15:00",
                isCompetitive: true,
                startTime: "12:00",
                title: "U/15 C Athletics Girls Match",
                type: "Match"
              },
              recurrencePattern: {
                frequency: "WEEKLY",
                instances: [
                  {
                    date: "2017-10-30",
                    id: "-KxgPnHKq2l9irLE7HNg"
                  },
                  {
                    date: "2017-11-06",
                    id: "-KxgPnHKq2l9irLE7HNh"
                  },
                  {
                    date: "2017-11-13",
                    id: "-KxgPnHOQrMRIjZilRty"
                  }
                ],
                numberOfEvents: "3"
              },
              status: "ACTIVE",
              teams: {
                "-KxNxphNKRQtuecBiq3R": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "15",
                    division: "C",
                    gender: "FEMALE",
                    name: "U/15 C Athletics Girls",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxgPnHOQrMRIjZilRty": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    standardHourlyRate: 150,
                    status: "AWAITING_SIGN_IN",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "To be specified"
                },
                date: "2017-11-13",
                endTime: "15:00",
                isCompetitive: true,
                startTime: "12:00",
                title: "U/15 C Athletics Girls Match",
                type: "Match"
              },
              recurrencePattern: {
                frequency: "WEEKLY",
                instances: [
                  {
                    date: "2017-10-30",
                    id: "-KxgPnHKq2l9irLE7HNg"
                  },
                  {
                    date: "2017-11-06",
                    id: "-KxgPnHKq2l9irLE7HNh"
                  },
                  {
                    date: "2017-11-13",
                    id: "-KxgPnHOQrMRIjZilRty"
                  }
                ],
                numberOfEvents: "3"
              },
              status: "ACTIVE",
              teams: {
                "-KxNxphNKRQtuecBiq3R": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "15",
                    division: "C",
                    gender: "FEMALE",
                    name: "U/15 C Athletics Girls",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            }
          }
        }
      }
    },
    results: {
      uiConfig: {
        currentTab: "AWAITING_APPROVAL"
      },
      teams: {
        "-KxNumy5eXI3K_MEou4w": {
          coaches: {
            Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
              metadata: {
                email: "rowan@sportomaticapp.com",
                name: "Rowan",
                phoneNumber: "(084) 291-0482",
                profilePictureURL:
                  "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                surname: "Walker-Campbell",
                type: "COACH"
              },
              paymentDefaults: {
                maxOvertimeHours: 3,
                overtimeHourlyRate: 100,
                standardHourlyRate: 150,
                type: "HOURLY"
              },
              preferredSports: {
                "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
              }
            }
          },
          managers: {
            H4wegzYcs9RFot9wbJR4qOL4TZr2: {
              metadata: {
                email: "brett@sportomaticapp.com",
                name: "Brett",
                phoneNumber: "(073) 812-1122",
                profilePictureURL:
                  "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                surname: "Cook",
                type: "MANAGER"
              },
              preferredSports: {
                "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
              }
            }
          },
          metadata: {
            ageGroup: "12",
            division: "A",
            gender: "MIXED",
            name: "U/12 A Athletics Mixed",
            sport: "Athletics"
          },
          status: "ACTIVE"
        },
        "-KxNxphNKRQtuecBiq3R": {
          coaches: {
            Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
              metadata: {
                email: "rowan@sportomaticapp.com",
                name: "Rowan",
                phoneNumber: "(084) 291-0482",
                profilePictureURL:
                  "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                surname: "Walker-Campbell",
                type: "COACH"
              },
              paymentDefaults: {
                maxOvertimeHours: 3,
                overtimeHourlyRate: 100,
                standardHourlyRate: 150,
                type: "HOURLY"
              },
              preferredSports: {
                "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
              },
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  name: "U/12 A Athletics Mixed",
                  sport: "Athletics",
                  status: "ACTIVE"
                }
              }
            }
          },
          managers: {
            H4wegzYcs9RFot9wbJR4qOL4TZr2: {
              metadata: {
                email: "brett@sportomaticapp.com",
                name: "Brett",
                phoneNumber: "(073) 812-1122",
                profilePictureURL:
                  "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                surname: "Cook",
                type: "MANAGER"
              },
              preferredSports: {
                "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
              },
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  name: "U/12 A Athletics Mixed",
                  sport: "Athletics",
                  status: "ACTIVE"
                }
              }
            }
          },
          metadata: {
            ageGroup: "15",
            division: "C",
            gender: "FEMALE",
            name: "U/15 C Athletics Girls",
            sport: "Athletics"
          },
          status: "ACTIVE"
        }
      },
      loadingStatus: {
        isTeamsLoading: false,
        isEventsLoading: false
      },
      events: {
        "2017": {
          "10": {
            "-KxNuraI0AULS_49kAP4": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    signInTime: "14:42",
                    signInTimeDelta: 42,
                    signOutTime: "16:43",
                    signOutTimeDelta: -17,
                    standardHourlyRate: 150,
                    status: "APPROVED",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "HOME",
                  notes: "",
                  opponents: "To be specified",
                  venue: "To be specified"
                },
                date: "2017-10-26",
                endTime: "17:00",
                isCompetitive: true,
                startTime: "14:00",
                title: "U/12 A Athletics Mixed Match",
                type: "Match"
              },
              recurrencePattern: {
                frequency: "ONCE",
                instances: [
                  {
                    date: "2017-10-26",
                    id: "-KxNuraI0AULS_49kAP4"
                  }
                ],
                numberOfEvents: "1"
              },
              status: "ACTIVE",
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "12",
                    division: "A",
                    gender: "MIXED",
                    name: "U/12 A Athletics Mixed",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxNxtqKeIksEJvFz2ek": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    signInTime: "12:00",
                    signInTimeDelta: 0,
                    signOutTime: "15:00",
                    signOutTimeDelta: 0,
                    standardHourlyRate: 150,
                    status: "APPROVED",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "To be specified"
                },
                date: "2017-10-26",
                endTime: "15:00",
                isCompetitive: false,
                startTime: "12:00",
                title: "U/15 C Athletics Girls Practice",
                type: "Practice"
              },
              recurrencePattern: {
                frequency: "ONCE",
                instances: [
                  {
                    date: "2017-10-26",
                    id: "-KxNxtqKeIksEJvFz2ek"
                  }
                ],
                numberOfEvents: "1"
              },
              status: "ACTIVE",
              teams: {
                "-KxNxphNKRQtuecBiq3R": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "15",
                    division: "C",
                    gender: "FEMALE",
                    name: "U/15 C Athletics Girls",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxRbx8gK3rd_yg-jsM1": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    signInTime: "12:03",
                    signInTimeDelta: 3,
                    signOutTime: "14:38",
                    signOutTimeDelta: -22,
                    standardHourlyRate: 150,
                    status: "APPROVED",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "AWAY",
                  notes: "",
                  opponents: "Parktown",
                  venue: "Sportomatic Grounds"
                },
                date: "2017-10-27",
                endTime: "15:00",
                isCompetitive: true,
                startTime: "12:00",
                title: "U/12 A Athletics Mixed Match",
                type: "Match"
              },
              recurrencePattern: {
                frequency: "ONCE",
                instances: [
                  {
                    date: "2017-10-27",
                    id: "-KxRbx8gK3rd_yg-jsM1"
                  }
                ],
                numberOfEvents: "1"
              },
              status: "ACTIVE",
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "12",
                    division: "A",
                    gender: "MIXED",
                    name: "U/12 A Athletics Mixed",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxRnX_g6ZrSLj64AMu5": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    signInTime: "09:53",
                    signInTimeDelta: -7,
                    signOutTime: "11:00",
                    signOutTimeDelta: 0,
                    standardHourlyRate: 150,
                    status: "APPROVED",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "Grace Trinity"
                },
                date: "2017-10-27",
                endTime: "11:00",
                isCompetitive: false,
                startTime: "10:00",
                title: "U/15 C Athletics Girls Practice",
                type: "Practice"
              },
              recurrencePattern: {
                frequency: "ONCE",
                instances: [
                  {
                    date: "2017-10-27",
                    id: "-KxRnX_g6ZrSLj64AMu5"
                  }
                ],
                numberOfEvents: "1"
              },
              status: "ACTIVE",
              teams: {
                "-KxNxphNKRQtuecBiq3R": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "15",
                    division: "C",
                    gender: "FEMALE",
                    name: "U/15 C Athletics Girls",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxS5PK5G3DKhJCzVmV7": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    signInTime: "13:44",
                    signInTimeDelta: 44,
                    signOutTime: "14:21",
                    signOutTimeDelta: -39,
                    standardHourlyRate: 150,
                    status: "APPROVED",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "Grace Trinity"
                },
                date: "2017-10-28",
                endTime: "15:00",
                isCompetitive: false,
                startTime: "13:00",
                title: "U/12 A Athletics Mixed Practice",
                type: "Practice"
              },
              recurrencePattern: {
                frequency: "WEEKLY",
                instances: [
                  {
                    date: "2017-10-28",
                    id: "-KxS5PK5G3DKhJCzVmV7"
                  },
                  {
                    date: "2017-11-04",
                    id: "-KxS5PK9nfPH_JHrBUhx"
                  },
                  {
                    date: "2017-11-11",
                    id: "-KxS5PK9nfPH_JHrBUhy"
                  }
                ],
                numberOfEvents: "3"
              },
              status: "ACTIVE",
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "12",
                    division: "A",
                    gender: "MIXED",
                    name: "U/12 A Athletics Mixed",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxgPnHKq2l9irLE7HNg": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    signInTime: "12:10",
                    signInTimeDelta: 10,
                    signOutTime: "14:22",
                    signOutTimeDelta: -38,
                    standardHourlyRate: 150,
                    status: "APPROVED",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "To be specified"
                },
                date: "2017-10-30",
                endTime: "15:00",
                isCompetitive: true,
                startTime: "12:00",
                title: "U/15 C Athletics Girls Match",
                type: "Match"
              },
              recurrencePattern: {
                frequency: "WEEKLY",
                instances: [
                  {
                    date: "2017-10-30",
                    id: "-KxgPnHKq2l9irLE7HNg"
                  },
                  {
                    date: "2017-11-06",
                    id: "-KxgPnHKq2l9irLE7HNh"
                  },
                  {
                    date: "2017-11-13",
                    id: "-KxgPnHOQrMRIjZilRty"
                  }
                ],
                numberOfEvents: "3"
              },
              status: "ACTIVE",
              teams: {
                "-KxNxphNKRQtuecBiq3R": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "15",
                    division: "C",
                    gender: "FEMALE",
                    name: "U/15 C Athletics Girls",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            }
          },
          "11": {
            "-KxS5PK9nfPH_JHrBUhx": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    standardHourlyRate: 150,
                    status: "AWAITING_SIGN_IN",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "Grace Trinity"
                },
                date: "2017-11-04",
                endTime: "15:00",
                isCompetitive: false,
                startTime: "13:00",
                title: "U/12 A Athletics Mixed Practice",
                type: "Practice"
              },
              recurrencePattern: {
                frequency: "WEEKLY",
                instances: [
                  {
                    date: "2017-10-28",
                    id: "-KxS5PK5G3DKhJCzVmV7"
                  },
                  {
                    date: "2017-11-04",
                    id: "-KxS5PK9nfPH_JHrBUhx"
                  },
                  {
                    date: "2017-11-11",
                    id: "-KxS5PK9nfPH_JHrBUhy"
                  }
                ],
                numberOfEvents: "3"
              },
              status: "ACTIVE",
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "12",
                    division: "A",
                    gender: "MIXED",
                    name: "U/12 A Athletics Mixed",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxS5PK9nfPH_JHrBUhy": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    standardHourlyRate: 150,
                    status: "AWAITING_SIGN_IN",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "Grace Trinity"
                },
                date: "2017-11-11",
                endTime: "15:00",
                isCompetitive: false,
                startTime: "13:00",
                title: "U/12 A Athletics Mixed Practice",
                type: "Practice"
              },
              recurrencePattern: {
                frequency: "WEEKLY",
                instances: [
                  {
                    date: "2017-10-28",
                    id: "-KxS5PK5G3DKhJCzVmV7"
                  },
                  {
                    date: "2017-11-04",
                    id: "-KxS5PK9nfPH_JHrBUhx"
                  },
                  {
                    date: "2017-11-11",
                    id: "-KxS5PK9nfPH_JHrBUhy"
                  }
                ],
                numberOfEvents: "3"
              },
              status: "ACTIVE",
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "12",
                    division: "A",
                    gender: "MIXED",
                    name: "U/12 A Athletics Mixed",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxgPnHKq2l9irLE7HNh": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    standardHourlyRate: 150,
                    status: "AWAITING_SIGN_IN",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "To be specified"
                },
                date: "2017-11-06",
                endTime: "15:00",
                isCompetitive: true,
                startTime: "12:00",
                title: "U/15 C Athletics Girls Match",
                type: "Match"
              },
              recurrencePattern: {
                frequency: "WEEKLY",
                instances: [
                  {
                    date: "2017-10-30",
                    id: "-KxgPnHKq2l9irLE7HNg"
                  },
                  {
                    date: "2017-11-06",
                    id: "-KxgPnHKq2l9irLE7HNh"
                  },
                  {
                    date: "2017-11-13",
                    id: "-KxgPnHOQrMRIjZilRty"
                  }
                ],
                numberOfEvents: "3"
              },
              status: "ACTIVE",
              teams: {
                "-KxNxphNKRQtuecBiq3R": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "15",
                    division: "C",
                    gender: "FEMALE",
                    name: "U/15 C Athletics Girls",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxgPnHOQrMRIjZilRty": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    standardHourlyRate: 150,
                    status: "AWAITING_SIGN_IN",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "To be specified"
                },
                date: "2017-11-13",
                endTime: "15:00",
                isCompetitive: true,
                startTime: "12:00",
                title: "U/15 C Athletics Girls Match",
                type: "Match"
              },
              recurrencePattern: {
                frequency: "WEEKLY",
                instances: [
                  {
                    date: "2017-10-30",
                    id: "-KxgPnHKq2l9irLE7HNg"
                  },
                  {
                    date: "2017-11-06",
                    id: "-KxgPnHKq2l9irLE7HNh"
                  },
                  {
                    date: "2017-11-13",
                    id: "-KxgPnHOQrMRIjZilRty"
                  }
                ],
                numberOfEvents: "3"
              },
              status: "ACTIVE",
              teams: {
                "-KxNxphNKRQtuecBiq3R": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "15",
                    division: "C",
                    gender: "FEMALE",
                    name: "U/15 C Athletics Girls",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            }
          }
        }
      }
    },
    people: {
      staff: {
        Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
          metadata: {
            email: "rowan@sportomaticapp.com",
            name: "Rowan",
            phoneNumber: "(084) 291-0482",
            profilePictureURL:
              "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
            surname: "Walker-Campbell",
            type: "COACH"
          },
          paymentDefaults: {
            maxOvertimeHours: 3,
            overtimeHourlyRate: 100,
            standardHourlyRate: 150,
            type: "HOURLY"
          },
          preferredSports: {
            "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
          },
          teams: {
            "-KxNumy5eXI3K_MEou4w": {
              name: "U/12 A Athletics Mixed",
              sport: "Athletics",
              status: "ACTIVE"
            },
            "-KxNxphNKRQtuecBiq3R": {
              name: "U/15 C Athletics Girls",
              sport: "Athletics",
              status: "ACTIVE"
            }
          }
        },
        H4wegzYcs9RFot9wbJR4qOL4TZr2: {
          metadata: {
            email: "brett@sportomaticapp.com",
            name: "Brett",
            phoneNumber: "(073) 812-1122",
            profilePictureURL:
              "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
            surname: "Cook",
            type: "MANAGER"
          },
          preferredSports: {
            "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
          },
          teams: {
            "-KxNumy5eXI3K_MEou4w": {
              name: "U/12 A Athletics Mixed",
              sport: "Athletics",
              status: "ACTIVE"
            },
            "-KxNxphNKRQtuecBiq3R": {
              name: "U/15 C Athletics Girls",
              sport: "Athletics",
              status: "ACTIVE"
            }
          }
        }
      },
      loadingStatus: {
        isStaffLoading: false
      }
    },
    schedule: {
      uiConfig: {
        currentView: "EVENTS_LIST"
      },
      events: {
        "2017": {
          "10": {
            "-KxNuraI0AULS_49kAP4": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    standardHourlyRate: 150,
                    status: "AWAITING_SIGN_IN",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "HOME",
                  notes: "",
                  opponents: "To be specified",
                  venue: "To be specified"
                },
                date: "2017-10-26",
                endTime: "17:00",
                isCompetitive: true,
                startTime: "14:00",
                title: "U/12 A Athletics Mixed Match",
                type: "Match"
              },
              recurrencePattern: {
                frequency: "ONCE",
                instances: [
                  {
                    date: "2017-10-26",
                    id: "-KxNuraI0AULS_49kAP4"
                  }
                ],
                numberOfEvents: "1"
              },
              status: "ACTIVE",
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "12",
                    division: "A",
                    gender: "MIXED",
                    name: "U/12 A Athletics Mixed",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxNxtqKeIksEJvFz2ek": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    standardHourlyRate: 150,
                    status: "AWAITING_SIGN_IN",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "To be specified"
                },
                date: "2017-10-26",
                endTime: "15:00",
                isCompetitive: false,
                startTime: "12:00",
                title: "U/15 C Athletics Girls Practice",
                type: "Practice"
              },
              recurrencePattern: {
                frequency: "ONCE",
                instances: [
                  {
                    date: "2017-10-26",
                    id: "-KxNxtqKeIksEJvFz2ek"
                  }
                ],
                numberOfEvents: "1"
              },
              status: "ACTIVE",
              teams: {
                "-KxNxphNKRQtuecBiq3R": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "15",
                    division: "C",
                    gender: "FEMALE",
                    name: "U/15 C Athletics Girls",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxRbx8gK3rd_yg-jsM1": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    standardHourlyRate: 150,
                    status: "AWAITING_SIGN_IN",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "AWAY",
                  notes: "",
                  opponents: "Parktown",
                  venue: "Sportomatic Grounds"
                },
                date: "2017-10-27",
                endTime: "15:00",
                isCompetitive: true,
                startTime: "12:00",
                title: "U/12 A Athletics Mixed Match",
                type: "Match"
              },
              recurrencePattern: {
                frequency: "ONCE",
                instances: [
                  {
                    date: "2017-10-27",
                    id: "-KxRbx8gK3rd_yg-jsM1"
                  }
                ],
                numberOfEvents: "1"
              },
              status: "ACTIVE",
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "12",
                    division: "A",
                    gender: "MIXED",
                    name: "U/12 A Athletics Mixed",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxRnX_g6ZrSLj64AMu5": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    standardHourlyRate: 150,
                    status: "AWAITING_SIGN_IN",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "Grace Trinity"
                },
                date: "2017-10-27",
                endTime: "11:00",
                isCompetitive: false,
                startTime: "10:00",
                title: "U/15 C Athletics Girls Practice",
                type: "Practice"
              },
              recurrencePattern: {
                frequency: "ONCE",
                instances: [
                  {
                    date: "2017-10-27",
                    id: "-KxRnX_g6ZrSLj64AMu5"
                  }
                ],
                numberOfEvents: "1"
              },
              status: "ACTIVE",
              teams: {
                "-KxNxphNKRQtuecBiq3R": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "15",
                    division: "C",
                    gender: "FEMALE",
                    name: "U/15 C Athletics Girls",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxS5PK5G3DKhJCzVmV7": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    standardHourlyRate: 150,
                    status: "AWAITING_SIGN_IN",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "Grace Trinity"
                },
                date: "2017-10-28",
                endTime: "15:00",
                isCompetitive: false,
                startTime: "13:00",
                title: "U/12 A Athletics Mixed Practice",
                type: "Practice"
              },
              recurrencePattern: {
                frequency: "WEEKLY",
                instances: [
                  {
                    date: "2017-10-28",
                    id: "-KxS5PK5G3DKhJCzVmV7"
                  },
                  {
                    date: "2017-11-04",
                    id: "-KxS5PK9nfPH_JHrBUhx"
                  },
                  {
                    date: "2017-11-11",
                    id: "-KxS5PK9nfPH_JHrBUhy"
                  }
                ],
                numberOfEvents: "3"
              },
              status: "ACTIVE",
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "12",
                    division: "A",
                    gender: "MIXED",
                    name: "U/12 A Athletics Mixed",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxgPnHKq2l9irLE7HNg": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    standardHourlyRate: 150,
                    status: "AWAITING_SIGN_IN",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "To be specified"
                },
                date: "2017-10-30",
                endTime: "15:00",
                isCompetitive: true,
                startTime: "12:00",
                title: "U/15 C Athletics Girls Match",
                type: "Match"
              },
              recurrencePattern: {
                frequency: "WEEKLY",
                instances: [
                  {
                    date: "2017-10-30",
                    id: "-KxgPnHKq2l9irLE7HNg"
                  },
                  {
                    date: "2017-11-06",
                    id: "-KxgPnHKq2l9irLE7HNh"
                  },
                  {
                    date: "2017-11-13",
                    id: "-KxgPnHOQrMRIjZilRty"
                  }
                ],
                numberOfEvents: "3"
              },
              status: "ACTIVE",
              teams: {
                "-KxNxphNKRQtuecBiq3R": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "15",
                    division: "C",
                    gender: "FEMALE",
                    name: "U/15 C Athletics Girls",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            }
          },
          "11": {
            "-KxS5PK9nfPH_JHrBUhx": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    standardHourlyRate: 150,
                    status: "AWAITING_SIGN_IN",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "Grace Trinity"
                },
                date: "2017-11-04",
                endTime: "15:00",
                isCompetitive: false,
                startTime: "13:00",
                title: "U/12 A Athletics Mixed Practice",
                type: "Practice"
              },
              recurrencePattern: {
                frequency: "WEEKLY",
                instances: [
                  {
                    date: "2017-10-28",
                    id: "-KxS5PK5G3DKhJCzVmV7"
                  },
                  {
                    date: "2017-11-04",
                    id: "-KxS5PK9nfPH_JHrBUhx"
                  },
                  {
                    date: "2017-11-11",
                    id: "-KxS5PK9nfPH_JHrBUhy"
                  }
                ],
                numberOfEvents: "3"
              },
              status: "ACTIVE",
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "12",
                    division: "A",
                    gender: "MIXED",
                    name: "U/12 A Athletics Mixed",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxS5PK9nfPH_JHrBUhy": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    standardHourlyRate: 150,
                    status: "AWAITING_SIGN_IN",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "Grace Trinity"
                },
                date: "2017-11-11",
                endTime: "15:00",
                isCompetitive: false,
                startTime: "13:00",
                title: "U/12 A Athletics Mixed Practice",
                type: "Practice"
              },
              recurrencePattern: {
                frequency: "WEEKLY",
                instances: [
                  {
                    date: "2017-10-28",
                    id: "-KxS5PK5G3DKhJCzVmV7"
                  },
                  {
                    date: "2017-11-04",
                    id: "-KxS5PK9nfPH_JHrBUhx"
                  },
                  {
                    date: "2017-11-11",
                    id: "-KxS5PK9nfPH_JHrBUhy"
                  }
                ],
                numberOfEvents: "3"
              },
              status: "ACTIVE",
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "12",
                    division: "A",
                    gender: "MIXED",
                    name: "U/12 A Athletics Mixed",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxgPnHKq2l9irLE7HNh": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    standardHourlyRate: 150,
                    status: "AWAITING_SIGN_IN",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "To be specified"
                },
                date: "2017-11-06",
                endTime: "15:00",
                isCompetitive: true,
                startTime: "12:00",
                title: "U/15 C Athletics Girls Match",
                type: "Match"
              },
              recurrencePattern: {
                frequency: "WEEKLY",
                instances: [
                  {
                    date: "2017-10-30",
                    id: "-KxgPnHKq2l9irLE7HNg"
                  },
                  {
                    date: "2017-11-06",
                    id: "-KxgPnHKq2l9irLE7HNh"
                  },
                  {
                    date: "2017-11-13",
                    id: "-KxgPnHOQrMRIjZilRty"
                  }
                ],
                numberOfEvents: "3"
              },
              status: "ACTIVE",
              teams: {
                "-KxNxphNKRQtuecBiq3R": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "15",
                    division: "C",
                    gender: "FEMALE",
                    name: "U/15 C Athletics Girls",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxgPnHOQrMRIjZilRty": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    standardHourlyRate: 150,
                    status: "AWAITING_SIGN_IN",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "To be specified"
                },
                date: "2017-11-13",
                endTime: "15:00",
                isCompetitive: true,
                startTime: "12:00",
                title: "U/15 C Athletics Girls Match",
                type: "Match"
              },
              recurrencePattern: {
                frequency: "WEEKLY",
                instances: [
                  {
                    date: "2017-10-30",
                    id: "-KxgPnHKq2l9irLE7HNg"
                  },
                  {
                    date: "2017-11-06",
                    id: "-KxgPnHKq2l9irLE7HNh"
                  },
                  {
                    date: "2017-11-13",
                    id: "-KxgPnHOQrMRIjZilRty"
                  }
                ],
                numberOfEvents: "3"
              },
              status: "ACTIVE",
              teams: {
                "-KxNxphNKRQtuecBiq3R": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "15",
                    division: "C",
                    gender: "FEMALE",
                    name: "U/15 C Athletics Girls",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            }
          }
        }
      },
      loadingStatus: {
        isEventsLoading: false
      }
    },
    settings: {
      uiConfig: {
        appBarTitle: "Dashboard",
        bottomNavValue: "dashboard",
        isSideMenuOpen: false
      },
      accountInfo: {
        name: "Rowan",
        surname: "Walker-Campbell",
        email: "rowan@sportomaticapp.com",
        phoneNumber: "(079) 507 - 0104",
        profilePictureURL: "/static/media/rowan.f3e7b802.jpg",
        sports: [
          {
            name: "Athletics",
            numberOfTeams: 3
          },
          {
            name: "Cricket",
            numberOfTeams: 1
          },
          {
            name: "Rugby",
            numberOfTeams: 0
          },
          {
            name: "Soccer",
            numberOfTeams: 4
          }
        ]
      }
    },
    teams: {
      teamsList: {
        "-KxNumy5eXI3K_MEou4w": {
          coaches: {
            Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
              metadata: {
                email: "rowan@sportomaticapp.com",
                name: "Rowan",
                phoneNumber: "(084) 291-0482",
                profilePictureURL:
                  "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                surname: "Walker-Campbell",
                type: "COACH"
              },
              paymentDefaults: {
                maxOvertimeHours: 3,
                overtimeHourlyRate: 100,
                standardHourlyRate: 150,
                type: "HOURLY"
              },
              preferredSports: {
                "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
              }
            }
          },
          managers: {
            H4wegzYcs9RFot9wbJR4qOL4TZr2: {
              metadata: {
                email: "brett@sportomaticapp.com",
                name: "Brett",
                phoneNumber: "(073) 812-1122",
                profilePictureURL:
                  "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                surname: "Cook",
                type: "MANAGER"
              },
              preferredSports: {
                "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
              }
            }
          },
          metadata: {
            ageGroup: "12",
            division: "A",
            gender: "MIXED",
            name: "U/12 A Athletics Mixed",
            sport: "Athletics"
          },
          status: "ACTIVE"
        },
        "-KxNxphNKRQtuecBiq3R": {
          coaches: {
            Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
              metadata: {
                email: "rowan@sportomaticapp.com",
                name: "Rowan",
                phoneNumber: "(084) 291-0482",
                profilePictureURL:
                  "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                surname: "Walker-Campbell",
                type: "COACH"
              },
              paymentDefaults: {
                maxOvertimeHours: 3,
                overtimeHourlyRate: 100,
                standardHourlyRate: 150,
                type: "HOURLY"
              },
              preferredSports: {
                "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
              },
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  name: "U/12 A Athletics Mixed",
                  sport: "Athletics",
                  status: "ACTIVE"
                }
              }
            }
          },
          managers: {
            H4wegzYcs9RFot9wbJR4qOL4TZr2: {
              metadata: {
                email: "brett@sportomaticapp.com",
                name: "Brett",
                phoneNumber: "(073) 812-1122",
                profilePictureURL:
                  "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                surname: "Cook",
                type: "MANAGER"
              },
              preferredSports: {
                "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
              },
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  name: "U/12 A Athletics Mixed",
                  sport: "Athletics",
                  status: "ACTIVE"
                }
              }
            }
          },
          metadata: {
            ageGroup: "15",
            division: "C",
            gender: "FEMALE",
            name: "U/15 C Athletics Girls",
            sport: "Athletics"
          },
          status: "ACTIVE"
        }
      },
      coaches: {},
      managers: {},
      loadingStatus: {
        isTeamsLoading: false
      }
    },
    wages: {
      uiConfig: {
        isLoading: false
      },
      loadingStatus: {
        isStaffLoading: false,
        isWagesLoading: false
      },
      coachWages: {
        "2017": {
          "10": {
            "-KxNuraI0AULS_49kAP4": {
              date: "2017-10-26",
              hours: {
                overtime: 0,
                standard: 2
              },
              rates: {
                overtime: 100,
                stardard: 150
              },
              title: "U/12 A Athletics Mixed Match",
              type: "HOURLY",
              wage: 300
            },
            "-KxNxtqKeIksEJvFz2ek": {
              date: "2017-10-26",
              hours: {
                overtime: 0,
                standard: 3
              },
              rates: {
                overtime: 100,
                stardard: 150
              },
              title: "U/15 C Athletics Girls Practice",
              type: "HOURLY",
              wage: 450
            },
            "-KxRbx8gK3rd_yg-jsM1": {
              date: "2017-10-27",
              hours: {
                overtime: 0,
                standard: 3
              },
              rates: {
                overtime: 100,
                stardard: 150
              },
              title: "U/12 A Athletics Mixed Match",
              type: "HOURLY",
              wage: 450
            },
            "-KxRnX_g6ZrSLj64AMu5": {
              date: "2017-10-27",
              hours: {
                overtime: 0,
                standard: 1
              },
              rates: {
                overtime: 100,
                stardard: 150
              },
              title: "U/15 C Athletics Girls Practice",
              type: "HOURLY",
              wage: 150
            },
            "-KxS5PK5G3DKhJCzVmV7": {
              date: "2017-10-28",
              hours: {
                overtime: 0,
                standard: 1
              },
              rates: {
                overtime: 100,
                stardard: 150
              },
              title: "U/12 A Athletics Mixed Practice",
              type: "HOURLY",
              wage: 150
            },
            "-KxgPnHKq2l9irLE7HNg": {
              date: "2017-10-30",
              hours: {
                overtime: 0,
                standard: 2
              },
              rates: {
                overtime: 100,
                stardard: 150
              },
              title: "U/15 C Athletics Girls Match",
              type: "HOURLY",
              wage: 300
            }
          }
        }
      }
    }
  },
  institution: {
    coreInterface: {
      uiConfig: {
        appBarTitle: "Dashboard",
        bottomNavValue: "dashboard",
        isSideMenuOpen: false,
        isLoggedIn: true,
        type: "INSTITUTION",
        userID: "VidVN3BJ6VTHmtC1kGGVDrRpPVf2"
      },
      dialogs: {
        isSettingsAlertOpen: false,
        isLogOutModalOpen: false
      }
    },
    dashboard: {
      uiConfig: {
        appBarTitle: "Dashboard",
        bottomNavValue: "dashboard",
        isSideMenuOpen: false
      }
    },
    hours: {
      uiConfig: {
        isLoading: false,
        currentTab: "IN_PROGRESS"
      },
      coaches: {
        Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
          metadata: {
            email: "rowan@sportomaticapp.com",
            name: "Rowan",
            phoneNumber: "(084) 291-0482",
            profilePictureURL:
              "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
            surname: "Walker-Campbell",
            type: "COACH"
          },
          paymentDefaults: {
            maxOvertimeHours: 3,
            overtimeHourlyRate: 100,
            standardHourlyRate: 150,
            type: "HOURLY"
          },
          preferredSports: {
            "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
          },
          teams: {
            "-KxNumy5eXI3K_MEou4w": {
              name: "U/12 A Athletics Mixed",
              sport: "Athletics",
              status: "ACTIVE"
            },
            "-KxNxphNKRQtuecBiq3R": {
              name: "U/15 C Athletics Girls",
              sport: "Athletics",
              status: "ACTIVE"
            }
          }
        }
      },
      loadingStatus: {
        isStaffLoading: false,
        isEventsLoading: false
      },
      events: {
        "2017": {
          "10": {
            "-KxNuraI0AULS_49kAP4": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    signInTime: "14:42",
                    signInTimeDelta: 42,
                    signOutTime: "16:43",
                    signOutTimeDelta: -17,
                    standardHourlyRate: 150,
                    status: "APPROVED",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "HOME",
                  notes: "",
                  opponents: "To be specified",
                  venue: "To be specified"
                },
                date: "2017-10-26",
                endTime: "17:00",
                isCompetitive: true,
                startTime: "14:00",
                title: "U/12 A Athletics Mixed Match",
                type: "Match"
              },
              recurrencePattern: {
                frequency: "ONCE",
                instances: [
                  {
                    date: "2017-10-26",
                    id: "-KxNuraI0AULS_49kAP4"
                  }
                ],
                numberOfEvents: "1"
              },
              status: "ACTIVE",
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "12",
                    division: "A",
                    gender: "MIXED",
                    name: "U/12 A Athletics Mixed",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxNxtqKeIksEJvFz2ek": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    signInTime: "12:00",
                    signInTimeDelta: 0,
                    signOutTime: "15:00",
                    signOutTimeDelta: 0,
                    standardHourlyRate: 150,
                    status: "APPROVED",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "To be specified"
                },
                date: "2017-10-26",
                endTime: "15:00",
                isCompetitive: false,
                startTime: "12:00",
                title: "U/15 C Athletics Girls Practice",
                type: "Practice"
              },
              recurrencePattern: {
                frequency: "ONCE",
                instances: [
                  {
                    date: "2017-10-26",
                    id: "-KxNxtqKeIksEJvFz2ek"
                  }
                ],
                numberOfEvents: "1"
              },
              status: "ACTIVE",
              teams: {
                "-KxNxphNKRQtuecBiq3R": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "15",
                    division: "C",
                    gender: "FEMALE",
                    name: "U/15 C Athletics Girls",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxRbx8gK3rd_yg-jsM1": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    signInTime: "12:03",
                    signInTimeDelta: 3,
                    signOutTime: "14:38",
                    signOutTimeDelta: -22,
                    standardHourlyRate: 150,
                    status: "APPROVED",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "AWAY",
                  notes: "",
                  opponents: "Parktown",
                  venue: "Sportomatic Grounds"
                },
                date: "2017-10-27",
                endTime: "15:00",
                isCompetitive: true,
                startTime: "12:00",
                title: "U/12 A Athletics Mixed Match",
                type: "Match"
              },
              recurrencePattern: {
                frequency: "ONCE",
                instances: [
                  {
                    date: "2017-10-27",
                    id: "-KxRbx8gK3rd_yg-jsM1"
                  }
                ],
                numberOfEvents: "1"
              },
              status: "ACTIVE",
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "12",
                    division: "A",
                    gender: "MIXED",
                    name: "U/12 A Athletics Mixed",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxRnX_g6ZrSLj64AMu5": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    signInTime: "09:53",
                    signInTimeDelta: -7,
                    signOutTime: "11:00",
                    signOutTimeDelta: 0,
                    standardHourlyRate: 150,
                    status: "APPROVED",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "Grace Trinity"
                },
                date: "2017-10-27",
                endTime: "11:00",
                isCompetitive: false,
                startTime: "10:00",
                title: "U/15 C Athletics Girls Practice",
                type: "Practice"
              },
              recurrencePattern: {
                frequency: "ONCE",
                instances: [
                  {
                    date: "2017-10-27",
                    id: "-KxRnX_g6ZrSLj64AMu5"
                  }
                ],
                numberOfEvents: "1"
              },
              status: "ACTIVE",
              teams: {
                "-KxNxphNKRQtuecBiq3R": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "15",
                    division: "C",
                    gender: "FEMALE",
                    name: "U/15 C Athletics Girls",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxS5PK5G3DKhJCzVmV7": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    signInTime: "13:44",
                    signInTimeDelta: 44,
                    signOutTime: "14:21",
                    signOutTimeDelta: -39,
                    standardHourlyRate: 150,
                    status: "APPROVED",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "Grace Trinity"
                },
                date: "2017-10-28",
                endTime: "15:00",
                isCompetitive: false,
                startTime: "13:00",
                title: "U/12 A Athletics Mixed Practice",
                type: "Practice"
              },
              recurrencePattern: {
                frequency: "WEEKLY",
                instances: [
                  {
                    date: "2017-10-28",
                    id: "-KxS5PK5G3DKhJCzVmV7"
                  },
                  {
                    date: "2017-11-04",
                    id: "-KxS5PK9nfPH_JHrBUhx"
                  },
                  {
                    date: "2017-11-11",
                    id: "-KxS5PK9nfPH_JHrBUhy"
                  }
                ],
                numberOfEvents: "3"
              },
              status: "ACTIVE",
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "12",
                    division: "A",
                    gender: "MIXED",
                    name: "U/12 A Athletics Mixed",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxgPnHKq2l9irLE7HNg": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    signInTime: "12:10",
                    signInTimeDelta: 10,
                    signOutTime: "14:22",
                    signOutTimeDelta: -38,
                    standardHourlyRate: 150,
                    status: "APPROVED",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "To be specified"
                },
                date: "2017-10-30",
                endTime: "15:00",
                isCompetitive: true,
                startTime: "12:00",
                title: "U/15 C Athletics Girls Match",
                type: "Match"
              },
              recurrencePattern: {
                frequency: "WEEKLY",
                instances: [
                  {
                    date: "2017-10-30",
                    id: "-KxgPnHKq2l9irLE7HNg"
                  },
                  {
                    date: "2017-11-06",
                    id: "-KxgPnHKq2l9irLE7HNh"
                  },
                  {
                    date: "2017-11-13",
                    id: "-KxgPnHOQrMRIjZilRty"
                  }
                ],
                numberOfEvents: "3"
              },
              status: "ACTIVE",
              teams: {
                "-KxNxphNKRQtuecBiq3R": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "15",
                    division: "C",
                    gender: "FEMALE",
                    name: "U/15 C Athletics Girls",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            }
          },
          "11": {
            "-KxS5PK9nfPH_JHrBUhx": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    standardHourlyRate: 150,
                    status: "AWAITING_SIGN_IN",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "Grace Trinity"
                },
                date: "2017-11-04",
                endTime: "15:00",
                isCompetitive: false,
                startTime: "13:00",
                title: "U/12 A Athletics Mixed Practice",
                type: "Practice"
              },
              recurrencePattern: {
                frequency: "WEEKLY",
                instances: [
                  {
                    date: "2017-10-28",
                    id: "-KxS5PK5G3DKhJCzVmV7"
                  },
                  {
                    date: "2017-11-04",
                    id: "-KxS5PK9nfPH_JHrBUhx"
                  },
                  {
                    date: "2017-11-11",
                    id: "-KxS5PK9nfPH_JHrBUhy"
                  }
                ],
                numberOfEvents: "3"
              },
              status: "ACTIVE",
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "12",
                    division: "A",
                    gender: "MIXED",
                    name: "U/12 A Athletics Mixed",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxS5PK9nfPH_JHrBUhy": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    standardHourlyRate: 150,
                    status: "AWAITING_SIGN_IN",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "Grace Trinity"
                },
                date: "2017-11-11",
                endTime: "15:00",
                isCompetitive: false,
                startTime: "13:00",
                title: "U/12 A Athletics Mixed Practice",
                type: "Practice"
              },
              recurrencePattern: {
                frequency: "WEEKLY",
                instances: [
                  {
                    date: "2017-10-28",
                    id: "-KxS5PK5G3DKhJCzVmV7"
                  },
                  {
                    date: "2017-11-04",
                    id: "-KxS5PK9nfPH_JHrBUhx"
                  },
                  {
                    date: "2017-11-11",
                    id: "-KxS5PK9nfPH_JHrBUhy"
                  }
                ],
                numberOfEvents: "3"
              },
              status: "ACTIVE",
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "12",
                    division: "A",
                    gender: "MIXED",
                    name: "U/12 A Athletics Mixed",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxgPnHKq2l9irLE7HNh": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    standardHourlyRate: 150,
                    status: "AWAITING_SIGN_IN",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "To be specified"
                },
                date: "2017-11-06",
                endTime: "15:00",
                isCompetitive: true,
                startTime: "12:00",
                title: "U/15 C Athletics Girls Match",
                type: "Match"
              },
              recurrencePattern: {
                frequency: "WEEKLY",
                instances: [
                  {
                    date: "2017-10-30",
                    id: "-KxgPnHKq2l9irLE7HNg"
                  },
                  {
                    date: "2017-11-06",
                    id: "-KxgPnHKq2l9irLE7HNh"
                  },
                  {
                    date: "2017-11-13",
                    id: "-KxgPnHOQrMRIjZilRty"
                  }
                ],
                numberOfEvents: "3"
              },
              status: "ACTIVE",
              teams: {
                "-KxNxphNKRQtuecBiq3R": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "15",
                    division: "C",
                    gender: "FEMALE",
                    name: "U/15 C Athletics Girls",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxgPnHOQrMRIjZilRty": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    standardHourlyRate: 150,
                    status: "AWAITING_SIGN_IN",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "To be specified"
                },
                date: "2017-11-13",
                endTime: "15:00",
                isCompetitive: true,
                startTime: "12:00",
                title: "U/15 C Athletics Girls Match",
                type: "Match"
              },
              recurrencePattern: {
                frequency: "WEEKLY",
                instances: [
                  {
                    date: "2017-10-30",
                    id: "-KxgPnHKq2l9irLE7HNg"
                  },
                  {
                    date: "2017-11-06",
                    id: "-KxgPnHKq2l9irLE7HNh"
                  },
                  {
                    date: "2017-11-13",
                    id: "-KxgPnHOQrMRIjZilRty"
                  }
                ],
                numberOfEvents: "3"
              },
              status: "ACTIVE",
              teams: {
                "-KxNxphNKRQtuecBiq3R": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "15",
                    division: "C",
                    gender: "FEMALE",
                    name: "U/15 C Athletics Girls",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            }
          }
        }
      }
    },
    results: {
      uiConfig: {
        currentTab: "IN_PROGRESS"
      },
      teams: {
        "-KxNumy5eXI3K_MEou4w": {
          coaches: {
            Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
              metadata: {
                email: "rowan@sportomaticapp.com",
                name: "Rowan",
                phoneNumber: "(084) 291-0482",
                profilePictureURL:
                  "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                surname: "Walker-Campbell",
                type: "COACH"
              },
              paymentDefaults: {
                maxOvertimeHours: 3,
                overtimeHourlyRate: 100,
                standardHourlyRate: 150,
                type: "HOURLY"
              },
              preferredSports: {
                "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
              }
            }
          },
          managers: {
            H4wegzYcs9RFot9wbJR4qOL4TZr2: {
              metadata: {
                email: "brett@sportomaticapp.com",
                name: "Brett",
                phoneNumber: "(073) 812-1122",
                profilePictureURL:
                  "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                surname: "Cook",
                type: "MANAGER"
              },
              preferredSports: {
                "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
              }
            }
          },
          metadata: {
            ageGroup: "12",
            division: "A",
            gender: "MIXED",
            name: "U/12 A Athletics Mixed",
            sport: "Athletics"
          },
          status: "ACTIVE"
        },
        "-KxNxphNKRQtuecBiq3R": {
          coaches: {
            Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
              metadata: {
                email: "rowan@sportomaticapp.com",
                name: "Rowan",
                phoneNumber: "(084) 291-0482",
                profilePictureURL:
                  "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                surname: "Walker-Campbell",
                type: "COACH"
              },
              paymentDefaults: {
                maxOvertimeHours: 3,
                overtimeHourlyRate: 100,
                standardHourlyRate: 150,
                type: "HOURLY"
              },
              preferredSports: {
                "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
              },
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  name: "U/12 A Athletics Mixed",
                  sport: "Athletics",
                  status: "ACTIVE"
                }
              }
            }
          },
          managers: {
            H4wegzYcs9RFot9wbJR4qOL4TZr2: {
              metadata: {
                email: "brett@sportomaticapp.com",
                name: "Brett",
                phoneNumber: "(073) 812-1122",
                profilePictureURL:
                  "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                surname: "Cook",
                type: "MANAGER"
              },
              preferredSports: {
                "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
              },
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  name: "U/12 A Athletics Mixed",
                  sport: "Athletics",
                  status: "ACTIVE"
                }
              }
            }
          },
          metadata: {
            ageGroup: "15",
            division: "C",
            gender: "FEMALE",
            name: "U/15 C Athletics Girls",
            sport: "Athletics"
          },
          status: "ACTIVE"
        }
      },
      loadingStatus: {
        isTeamsLoading: false,
        isEventsLoading: false
      },
      events: {
        "2017": {
          "10": {
            "-KxNuraI0AULS_49kAP4": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    signInTime: "14:42",
                    signInTimeDelta: 42,
                    signOutTime: "16:43",
                    signOutTimeDelta: -17,
                    standardHourlyRate: 150,
                    status: "APPROVED",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "HOME",
                  notes: "",
                  opponents: "To be specified",
                  venue: "To be specified"
                },
                date: "2017-10-26",
                endTime: "17:00",
                isCompetitive: true,
                startTime: "14:00",
                title: "U/12 A Athletics Mixed Match",
                type: "Match"
              },
              recurrencePattern: {
                frequency: "ONCE",
                instances: [
                  {
                    date: "2017-10-26",
                    id: "-KxNuraI0AULS_49kAP4"
                  }
                ],
                numberOfEvents: "1"
              },
              status: "ACTIVE",
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "12",
                    division: "A",
                    gender: "MIXED",
                    name: "U/12 A Athletics Mixed",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxNxtqKeIksEJvFz2ek": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    signInTime: "12:00",
                    signInTimeDelta: 0,
                    signOutTime: "15:00",
                    signOutTimeDelta: 0,
                    standardHourlyRate: 150,
                    status: "APPROVED",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "To be specified"
                },
                date: "2017-10-26",
                endTime: "15:00",
                isCompetitive: false,
                startTime: "12:00",
                title: "U/15 C Athletics Girls Practice",
                type: "Practice"
              },
              recurrencePattern: {
                frequency: "ONCE",
                instances: [
                  {
                    date: "2017-10-26",
                    id: "-KxNxtqKeIksEJvFz2ek"
                  }
                ],
                numberOfEvents: "1"
              },
              status: "ACTIVE",
              teams: {
                "-KxNxphNKRQtuecBiq3R": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "15",
                    division: "C",
                    gender: "FEMALE",
                    name: "U/15 C Athletics Girls",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxRbx8gK3rd_yg-jsM1": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    signInTime: "12:03",
                    signInTimeDelta: 3,
                    signOutTime: "14:38",
                    signOutTimeDelta: -22,
                    standardHourlyRate: 150,
                    status: "APPROVED",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "AWAY",
                  notes: "",
                  opponents: "Parktown",
                  venue: "Sportomatic Grounds"
                },
                date: "2017-10-27",
                endTime: "15:00",
                isCompetitive: true,
                startTime: "12:00",
                title: "U/12 A Athletics Mixed Match",
                type: "Match"
              },
              recurrencePattern: {
                frequency: "ONCE",
                instances: [
                  {
                    date: "2017-10-27",
                    id: "-KxRbx8gK3rd_yg-jsM1"
                  }
                ],
                numberOfEvents: "1"
              },
              status: "ACTIVE",
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "12",
                    division: "A",
                    gender: "MIXED",
                    name: "U/12 A Athletics Mixed",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxRnX_g6ZrSLj64AMu5": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    signInTime: "09:53",
                    signInTimeDelta: -7,
                    signOutTime: "11:00",
                    signOutTimeDelta: 0,
                    standardHourlyRate: 150,
                    status: "APPROVED",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "Grace Trinity"
                },
                date: "2017-10-27",
                endTime: "11:00",
                isCompetitive: false,
                startTime: "10:00",
                title: "U/15 C Athletics Girls Practice",
                type: "Practice"
              },
              recurrencePattern: {
                frequency: "ONCE",
                instances: [
                  {
                    date: "2017-10-27",
                    id: "-KxRnX_g6ZrSLj64AMu5"
                  }
                ],
                numberOfEvents: "1"
              },
              status: "ACTIVE",
              teams: {
                "-KxNxphNKRQtuecBiq3R": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "15",
                    division: "C",
                    gender: "FEMALE",
                    name: "U/15 C Athletics Girls",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxS5PK5G3DKhJCzVmV7": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    signInTime: "13:44",
                    signInTimeDelta: 44,
                    signOutTime: "14:21",
                    signOutTimeDelta: -39,
                    standardHourlyRate: 150,
                    status: "APPROVED",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "Grace Trinity"
                },
                date: "2017-10-28",
                endTime: "15:00",
                isCompetitive: false,
                startTime: "13:00",
                title: "U/12 A Athletics Mixed Practice",
                type: "Practice"
              },
              recurrencePattern: {
                frequency: "WEEKLY",
                instances: [
                  {
                    date: "2017-10-28",
                    id: "-KxS5PK5G3DKhJCzVmV7"
                  },
                  {
                    date: "2017-11-04",
                    id: "-KxS5PK9nfPH_JHrBUhx"
                  },
                  {
                    date: "2017-11-11",
                    id: "-KxS5PK9nfPH_JHrBUhy"
                  }
                ],
                numberOfEvents: "3"
              },
              status: "ACTIVE",
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "12",
                    division: "A",
                    gender: "MIXED",
                    name: "U/12 A Athletics Mixed",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxgPnHKq2l9irLE7HNg": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    signInTime: "12:10",
                    signInTimeDelta: 10,
                    signOutTime: "14:22",
                    signOutTimeDelta: -38,
                    standardHourlyRate: 150,
                    status: "APPROVED",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "To be specified"
                },
                date: "2017-10-30",
                endTime: "15:00",
                isCompetitive: true,
                startTime: "12:00",
                title: "U/15 C Athletics Girls Match",
                type: "Match"
              },
              recurrencePattern: {
                frequency: "WEEKLY",
                instances: [
                  {
                    date: "2017-10-30",
                    id: "-KxgPnHKq2l9irLE7HNg"
                  },
                  {
                    date: "2017-11-06",
                    id: "-KxgPnHKq2l9irLE7HNh"
                  },
                  {
                    date: "2017-11-13",
                    id: "-KxgPnHOQrMRIjZilRty"
                  }
                ],
                numberOfEvents: "3"
              },
              status: "ACTIVE",
              teams: {
                "-KxNxphNKRQtuecBiq3R": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "15",
                    division: "C",
                    gender: "FEMALE",
                    name: "U/15 C Athletics Girls",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            }
          },
          "11": {
            "-KxS5PK9nfPH_JHrBUhx": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    standardHourlyRate: 150,
                    status: "AWAITING_SIGN_IN",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "Grace Trinity"
                },
                date: "2017-11-04",
                endTime: "15:00",
                isCompetitive: false,
                startTime: "13:00",
                title: "U/12 A Athletics Mixed Practice",
                type: "Practice"
              },
              recurrencePattern: {
                frequency: "WEEKLY",
                instances: [
                  {
                    date: "2017-10-28",
                    id: "-KxS5PK5G3DKhJCzVmV7"
                  },
                  {
                    date: "2017-11-04",
                    id: "-KxS5PK9nfPH_JHrBUhx"
                  },
                  {
                    date: "2017-11-11",
                    id: "-KxS5PK9nfPH_JHrBUhy"
                  }
                ],
                numberOfEvents: "3"
              },
              status: "ACTIVE",
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "12",
                    division: "A",
                    gender: "MIXED",
                    name: "U/12 A Athletics Mixed",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxS5PK9nfPH_JHrBUhy": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    standardHourlyRate: 150,
                    status: "AWAITING_SIGN_IN",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "Grace Trinity"
                },
                date: "2017-11-11",
                endTime: "15:00",
                isCompetitive: false,
                startTime: "13:00",
                title: "U/12 A Athletics Mixed Practice",
                type: "Practice"
              },
              recurrencePattern: {
                frequency: "WEEKLY",
                instances: [
                  {
                    date: "2017-10-28",
                    id: "-KxS5PK5G3DKhJCzVmV7"
                  },
                  {
                    date: "2017-11-04",
                    id: "-KxS5PK9nfPH_JHrBUhx"
                  },
                  {
                    date: "2017-11-11",
                    id: "-KxS5PK9nfPH_JHrBUhy"
                  }
                ],
                numberOfEvents: "3"
              },
              status: "ACTIVE",
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "12",
                    division: "A",
                    gender: "MIXED",
                    name: "U/12 A Athletics Mixed",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxgPnHKq2l9irLE7HNh": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    standardHourlyRate: 150,
                    status: "AWAITING_SIGN_IN",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "To be specified"
                },
                date: "2017-11-06",
                endTime: "15:00",
                isCompetitive: true,
                startTime: "12:00",
                title: "U/15 C Athletics Girls Match",
                type: "Match"
              },
              recurrencePattern: {
                frequency: "WEEKLY",
                instances: [
                  {
                    date: "2017-10-30",
                    id: "-KxgPnHKq2l9irLE7HNg"
                  },
                  {
                    date: "2017-11-06",
                    id: "-KxgPnHKq2l9irLE7HNh"
                  },
                  {
                    date: "2017-11-13",
                    id: "-KxgPnHOQrMRIjZilRty"
                  }
                ],
                numberOfEvents: "3"
              },
              status: "ACTIVE",
              teams: {
                "-KxNxphNKRQtuecBiq3R": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "15",
                    division: "C",
                    gender: "FEMALE",
                    name: "U/15 C Athletics Girls",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxgPnHOQrMRIjZilRty": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    standardHourlyRate: 150,
                    status: "AWAITING_SIGN_IN",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "To be specified"
                },
                date: "2017-11-13",
                endTime: "15:00",
                isCompetitive: true,
                startTime: "12:00",
                title: "U/15 C Athletics Girls Match",
                type: "Match"
              },
              recurrencePattern: {
                frequency: "WEEKLY",
                instances: [
                  {
                    date: "2017-10-30",
                    id: "-KxgPnHKq2l9irLE7HNg"
                  },
                  {
                    date: "2017-11-06",
                    id: "-KxgPnHKq2l9irLE7HNh"
                  },
                  {
                    date: "2017-11-13",
                    id: "-KxgPnHOQrMRIjZilRty"
                  }
                ],
                numberOfEvents: "3"
              },
              status: "ACTIVE",
              teams: {
                "-KxNxphNKRQtuecBiq3R": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "15",
                    division: "C",
                    gender: "FEMALE",
                    name: "U/15 C Athletics Girls",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            }
          }
        }
      }
    },
    people: {
      uiConfig: {
        currentTab: "STAFF"
      },
      staff: {
        Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
          metadata: {
            email: "rowan@sportomaticapp.com",
            name: "Rowan",
            phoneNumber: "(084) 291-0482",
            profilePictureURL:
              "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
            surname: "Walker-Campbell",
            type: "COACH"
          },
          paymentDefaults: {
            maxOvertimeHours: 3,
            overtimeHourlyRate: 100,
            standardHourlyRate: 150,
            type: "HOURLY"
          },
          preferredSports: {
            "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
          },
          teams: {
            "-KxNumy5eXI3K_MEou4w": {
              name: "U/12 A Athletics Mixed",
              sport: "Athletics",
              status: "ACTIVE"
            },
            "-KxNxphNKRQtuecBiq3R": {
              name: "U/15 C Athletics Girls",
              sport: "Athletics",
              status: "ACTIVE"
            }
          }
        },
        H4wegzYcs9RFot9wbJR4qOL4TZr2: {
          metadata: {
            email: "brett@sportomaticapp.com",
            name: "Brett",
            phoneNumber: "(073) 812-1122",
            profilePictureURL:
              "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
            surname: "Cook",
            type: "MANAGER"
          },
          preferredSports: {
            "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
          },
          teams: {
            "-KxNumy5eXI3K_MEou4w": {
              name: "U/12 A Athletics Mixed",
              sport: "Athletics",
              status: "ACTIVE"
            },
            "-KxNxphNKRQtuecBiq3R": {
              name: "U/15 C Athletics Girls",
              sport: "Athletics",
              status: "ACTIVE"
            }
          }
        }
      },
      dialogs: {
        isDeletPersonAlertOpen: false,
        isEditPersonDialogOpen: false
      },
      loadingStatus: {
        isStaffLoading: false
      }
    },
    schedule: {
      uiConfig: {
        currentView: "SCHEDULE",
        errorType: "NONE",
        selectedEventInfo: {
          institutionID: "",
          eventID: "",
          managerIDs: [],
          coachIDs: [],
          year: "",
          month: ""
        }
      },
      dialogs: {
        isAddEventDialogOpen: false,
        isEditEventDialogOpen: false,
        isCancelEventAlertOpen: false,
        isUncancelEventAlertOpen: false,
        isEventErrorAlertOpen: false
      },
      events: {
        "2017": {
          "10": {
            "-KxNuraI0AULS_49kAP4": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    signInTime: "14:42",
                    signInTimeDelta: 42,
                    signOutTime: "16:43",
                    signOutTimeDelta: -17,
                    standardHourlyRate: 150,
                    status: "APPROVED",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "HOME",
                  notes: "",
                  opponents: "To be specified",
                  venue: "To be specified"
                },
                date: "2017-10-26",
                endTime: "17:00",
                isCompetitive: true,
                startTime: "14:00",
                title: "U/12 A Athletics Mixed Match",
                type: "Match"
              },
              recurrencePattern: {
                frequency: "ONCE",
                instances: [
                  {
                    date: "2017-10-26",
                    id: "-KxNuraI0AULS_49kAP4"
                  }
                ],
                numberOfEvents: "1"
              },
              status: "ACTIVE",
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "12",
                    division: "A",
                    gender: "MIXED",
                    name: "U/12 A Athletics Mixed",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxNxtqKeIksEJvFz2ek": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    signInTime: "12:00",
                    signInTimeDelta: 0,
                    signOutTime: "15:00",
                    signOutTimeDelta: 0,
                    standardHourlyRate: 150,
                    status: "APPROVED",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "To be specified"
                },
                date: "2017-10-26",
                endTime: "15:00",
                isCompetitive: false,
                startTime: "12:00",
                title: "U/15 C Athletics Girls Practice",
                type: "Practice"
              },
              recurrencePattern: {
                frequency: "ONCE",
                instances: [
                  {
                    date: "2017-10-26",
                    id: "-KxNxtqKeIksEJvFz2ek"
                  }
                ],
                numberOfEvents: "1"
              },
              status: "ACTIVE",
              teams: {
                "-KxNxphNKRQtuecBiq3R": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "15",
                    division: "C",
                    gender: "FEMALE",
                    name: "U/15 C Athletics Girls",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxRbx8gK3rd_yg-jsM1": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    signInTime: "12:03",
                    signInTimeDelta: 3,
                    signOutTime: "14:38",
                    signOutTimeDelta: -22,
                    standardHourlyRate: 150,
                    status: "APPROVED",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "AWAY",
                  notes: "",
                  opponents: "Parktown",
                  venue: "Sportomatic Grounds"
                },
                date: "2017-10-27",
                endTime: "15:00",
                isCompetitive: true,
                startTime: "12:00",
                title: "U/12 A Athletics Mixed Match",
                type: "Match"
              },
              recurrencePattern: {
                frequency: "ONCE",
                instances: [
                  {
                    date: "2017-10-27",
                    id: "-KxRbx8gK3rd_yg-jsM1"
                  }
                ],
                numberOfEvents: "1"
              },
              status: "ACTIVE",
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "12",
                    division: "A",
                    gender: "MIXED",
                    name: "U/12 A Athletics Mixed",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxRnX_g6ZrSLj64AMu5": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    signInTime: "09:53",
                    signInTimeDelta: -7,
                    signOutTime: "11:00",
                    signOutTimeDelta: 0,
                    standardHourlyRate: 150,
                    status: "APPROVED",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "Grace Trinity"
                },
                date: "2017-10-27",
                endTime: "11:00",
                isCompetitive: false,
                startTime: "10:00",
                title: "U/15 C Athletics Girls Practice",
                type: "Practice"
              },
              recurrencePattern: {
                frequency: "ONCE",
                instances: [
                  {
                    date: "2017-10-27",
                    id: "-KxRnX_g6ZrSLj64AMu5"
                  }
                ],
                numberOfEvents: "1"
              },
              status: "ACTIVE",
              teams: {
                "-KxNxphNKRQtuecBiq3R": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "15",
                    division: "C",
                    gender: "FEMALE",
                    name: "U/15 C Athletics Girls",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxS5PK5G3DKhJCzVmV7": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    signInTime: "13:44",
                    signInTimeDelta: 44,
                    signOutTime: "14:21",
                    signOutTimeDelta: -39,
                    standardHourlyRate: 150,
                    status: "APPROVED",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "Grace Trinity"
                },
                date: "2017-10-28",
                endTime: "15:00",
                isCompetitive: false,
                startTime: "13:00",
                title: "U/12 A Athletics Mixed Practice",
                type: "Practice"
              },
              recurrencePattern: {
                frequency: "WEEKLY",
                instances: [
                  {
                    date: "2017-10-28",
                    id: "-KxS5PK5G3DKhJCzVmV7"
                  },
                  {
                    date: "2017-11-04",
                    id: "-KxS5PK9nfPH_JHrBUhx"
                  },
                  {
                    date: "2017-11-11",
                    id: "-KxS5PK9nfPH_JHrBUhy"
                  }
                ],
                numberOfEvents: "3"
              },
              status: "ACTIVE",
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "12",
                    division: "A",
                    gender: "MIXED",
                    name: "U/12 A Athletics Mixed",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxgPnHKq2l9irLE7HNg": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    signInTime: "12:10",
                    signInTimeDelta: 10,
                    signOutTime: "14:22",
                    signOutTimeDelta: -38,
                    standardHourlyRate: 150,
                    status: "APPROVED",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "To be specified"
                },
                date: "2017-10-30",
                endTime: "15:00",
                isCompetitive: true,
                startTime: "12:00",
                title: "U/15 C Athletics Girls Match",
                type: "Match"
              },
              recurrencePattern: {
                frequency: "WEEKLY",
                instances: [
                  {
                    date: "2017-10-30",
                    id: "-KxgPnHKq2l9irLE7HNg"
                  },
                  {
                    date: "2017-11-06",
                    id: "-KxgPnHKq2l9irLE7HNh"
                  },
                  {
                    date: "2017-11-13",
                    id: "-KxgPnHOQrMRIjZilRty"
                  }
                ],
                numberOfEvents: "3"
              },
              status: "ACTIVE",
              teams: {
                "-KxNxphNKRQtuecBiq3R": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "15",
                    division: "C",
                    gender: "FEMALE",
                    name: "U/15 C Athletics Girls",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            }
          },
          "11": {
            "-KxS5PK9nfPH_JHrBUhx": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    standardHourlyRate: 150,
                    status: "AWAITING_SIGN_IN",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "Grace Trinity"
                },
                date: "2017-11-04",
                endTime: "15:00",
                isCompetitive: false,
                startTime: "13:00",
                title: "U/12 A Athletics Mixed Practice",
                type: "Practice"
              },
              recurrencePattern: {
                frequency: "WEEKLY",
                instances: [
                  {
                    date: "2017-10-28",
                    id: "-KxS5PK5G3DKhJCzVmV7"
                  },
                  {
                    date: "2017-11-04",
                    id: "-KxS5PK9nfPH_JHrBUhx"
                  },
                  {
                    date: "2017-11-11",
                    id: "-KxS5PK9nfPH_JHrBUhy"
                  }
                ],
                numberOfEvents: "3"
              },
              status: "ACTIVE",
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "12",
                    division: "A",
                    gender: "MIXED",
                    name: "U/12 A Athletics Mixed",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxS5PK9nfPH_JHrBUhy": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    standardHourlyRate: 150,
                    status: "AWAITING_SIGN_IN",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "Grace Trinity"
                },
                date: "2017-11-11",
                endTime: "15:00",
                isCompetitive: false,
                startTime: "13:00",
                title: "U/12 A Athletics Mixed Practice",
                type: "Practice"
              },
              recurrencePattern: {
                frequency: "WEEKLY",
                instances: [
                  {
                    date: "2017-10-28",
                    id: "-KxS5PK5G3DKhJCzVmV7"
                  },
                  {
                    date: "2017-11-04",
                    id: "-KxS5PK9nfPH_JHrBUhx"
                  },
                  {
                    date: "2017-11-11",
                    id: "-KxS5PK9nfPH_JHrBUhy"
                  }
                ],
                numberOfEvents: "3"
              },
              status: "ACTIVE",
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "12",
                    division: "A",
                    gender: "MIXED",
                    name: "U/12 A Athletics Mixed",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxgPnHKq2l9irLE7HNh": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    standardHourlyRate: 150,
                    status: "AWAITING_SIGN_IN",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "To be specified"
                },
                date: "2017-11-06",
                endTime: "15:00",
                isCompetitive: true,
                startTime: "12:00",
                title: "U/15 C Athletics Girls Match",
                type: "Match"
              },
              recurrencePattern: {
                frequency: "WEEKLY",
                instances: [
                  {
                    date: "2017-10-30",
                    id: "-KxgPnHKq2l9irLE7HNg"
                  },
                  {
                    date: "2017-11-06",
                    id: "-KxgPnHKq2l9irLE7HNh"
                  },
                  {
                    date: "2017-11-13",
                    id: "-KxgPnHOQrMRIjZilRty"
                  }
                ],
                numberOfEvents: "3"
              },
              status: "ACTIVE",
              teams: {
                "-KxNxphNKRQtuecBiq3R": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "15",
                    division: "C",
                    gender: "FEMALE",
                    name: "U/15 C Athletics Girls",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxgPnHOQrMRIjZilRty": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    standardHourlyRate: 150,
                    status: "AWAITING_SIGN_IN",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "To be specified"
                },
                date: "2017-11-13",
                endTime: "15:00",
                isCompetitive: true,
                startTime: "12:00",
                title: "U/15 C Athletics Girls Match",
                type: "Match"
              },
              recurrencePattern: {
                frequency: "WEEKLY",
                instances: [
                  {
                    date: "2017-10-30",
                    id: "-KxgPnHKq2l9irLE7HNg"
                  },
                  {
                    date: "2017-11-06",
                    id: "-KxgPnHKq2l9irLE7HNh"
                  },
                  {
                    date: "2017-11-13",
                    id: "-KxgPnHOQrMRIjZilRty"
                  }
                ],
                numberOfEvents: "3"
              },
              status: "ACTIVE",
              teams: {
                "-KxNxphNKRQtuecBiq3R": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "15",
                    division: "C",
                    gender: "FEMALE",
                    name: "U/15 C Athletics Girls",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            }
          }
        }
      },
      loadingStatus: {
        isAddEventDialogLoading: false,
        isEditEventDialogLoading: false,
        isEventsLoading: false
      },
      teams: {},
      coaches: {},
      managers: {}
    },
    settings: {
      uiConfig: {
        appBarTitle: "Dashboard",
        bottomNavValue: "dashboard",
        isSideMenuOpen: false
      },
      accountInfo: {
        name: "Sportomatic Academy",
        abbreviation: "SPCA",
        email: "info@sportomaticapp.com",
        phoneNumber: "(011) 283 - 8492",
        physicalAddress: "63 Alexandra Street, Florida",
        institutionType: "Sports Academy",
        genders: "Mixed",
        emblemURL: "/static/media/sportomatic.5132ffff.jpg",
        sports: [
          {
            name: "Athletics",
            numberOfTeams: 3
          },
          {
            name: "Cricket",
            numberOfTeams: 1
          },
          {
            name: "Rugby",
            numberOfTeams: 0
          },
          {
            name: "Soccer",
            numberOfTeams: 4
          }
        ],
        ageGroups: [
          {
            name: "U/16",
            numberOfTeams: 0
          },
          {
            name: "U/18",
            numberOfTeams: 7
          }
        ],
        divisions: [
          {
            name: "A",
            numberOfTeams: 2
          },
          {
            name: "B",
            numberOfTeams: 0
          },
          {
            name: "1st Team",
            numberOfTeams: 3
          },
          {
            name: "2nd Team",
            numberOfTeams: 2
          }
        ],
        coachPaymentOptions: {
          standardHourlyRate: 100,
          overtimeHourlyRate: 150,
          maxOvertimeHours: 3,
          payDay: "End of the month"
        }
      }
    },
    teams: {
      dialogs: {
        isAddTeamDialogOpen: false,
        isErrorAddingTeamAlertOpen: false,
        isEditTeamAlertOpen: false,
        isDeleteTeamAlertOpen: false
      },
      teamsList: {
        "-KxNumy5eXI3K_MEou4w": {
          coaches: {
            Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
              metadata: {
                email: "rowan@sportomaticapp.com",
                name: "Rowan",
                phoneNumber: "(084) 291-0482",
                profilePictureURL:
                  "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                surname: "Walker-Campbell",
                type: "COACH"
              },
              paymentDefaults: {
                maxOvertimeHours: 3,
                overtimeHourlyRate: 100,
                standardHourlyRate: 150,
                type: "HOURLY"
              },
              preferredSports: {
                "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
              }
            }
          },
          managers: {
            H4wegzYcs9RFot9wbJR4qOL4TZr2: {
              metadata: {
                email: "brett@sportomaticapp.com",
                name: "Brett",
                phoneNumber: "(073) 812-1122",
                profilePictureURL:
                  "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                surname: "Cook",
                type: "MANAGER"
              },
              preferredSports: {
                "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
              }
            }
          },
          metadata: {
            ageGroup: "12",
            division: "A",
            gender: "MIXED",
            name: "U/12 A Athletics Mixed",
            sport: "Athletics"
          },
          status: "ACTIVE"
        },
        "-KxNxphNKRQtuecBiq3R": {
          coaches: {
            Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
              metadata: {
                email: "rowan@sportomaticapp.com",
                name: "Rowan",
                phoneNumber: "(084) 291-0482",
                profilePictureURL:
                  "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                surname: "Walker-Campbell",
                type: "COACH"
              },
              paymentDefaults: {
                maxOvertimeHours: 3,
                overtimeHourlyRate: 100,
                standardHourlyRate: 150,
                type: "HOURLY"
              },
              preferredSports: {
                "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
              },
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  name: "U/12 A Athletics Mixed",
                  sport: "Athletics",
                  status: "ACTIVE"
                }
              }
            }
          },
          managers: {
            H4wegzYcs9RFot9wbJR4qOL4TZr2: {
              metadata: {
                email: "brett@sportomaticapp.com",
                name: "Brett",
                phoneNumber: "(073) 812-1122",
                profilePictureURL:
                  "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                surname: "Cook",
                type: "MANAGER"
              },
              preferredSports: {
                "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
              },
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  name: "U/12 A Athletics Mixed",
                  sport: "Athletics",
                  status: "ACTIVE"
                }
              }
            }
          },
          metadata: {
            ageGroup: "15",
            division: "C",
            gender: "FEMALE",
            name: "U/15 C Athletics Girls",
            sport: "Athletics"
          },
          status: "ACTIVE"
        }
      },
      options: {
        ageGroups: {
          "12": "U/12"
        },
        divisions: {
          A: "A"
        },
        sports: {
          "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
        },
        genderType: "MIXED"
      },
      coaches: {},
      managers: {},
      loadingStatus: {
        isAddTeamDialogLoading: false,
        isTeamsLoading: false
      }
    },
    wages: {
      uiConfig: {
        isLoading: false
      },
      coaches: {
        Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
          metadata: {
            email: "rowan@sportomaticapp.com",
            name: "Rowan",
            phoneNumber: "(084) 291-0482",
            profilePictureURL:
              "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
            surname: "Walker-Campbell",
            type: "COACH"
          },
          paymentDefaults: {
            maxOvertimeHours: 3,
            overtimeHourlyRate: 100,
            standardHourlyRate: 150,
            type: "HOURLY"
          },
          preferredSports: {
            "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
          },
          teams: {
            "-KxNumy5eXI3K_MEou4w": {
              name: "U/12 A Athletics Mixed",
              sport: "Athletics",
              status: "ACTIVE"
            },
            "-KxNxphNKRQtuecBiq3R": {
              name: "U/15 C Athletics Girls",
              sport: "Athletics",
              status: "ACTIVE"
            }
          }
        }
      },
      loadingStatus: {
        isStaffLoading: false,
        isWagesLoading: false
      },
      coachWages: {}
    }
  },
  manager: {
    coreInterface: {
      uiConfig: {
        appBarTitle: "Dashboard",
        bottomNavValue: "dashboard",
        isSideMenuOpen: false,
        isLoggedIn: false,
        activeInstitution: {
          emblemURL:
            "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/institution%2FVidVN3BJ6VTHmtC1kGGVDrRpPVf2%2Femblem.png?alt=media&token=4cc7fce3-6c25-4ec8-93dd-17417b224fef",
          id: "VidVN3BJ6VTHmtC1kGGVDrRpPVf2",
          name: "Sportomatic Academy"
        },
        type: "MANAGER",
        userID: "H4wegzYcs9RFot9wbJR4qOL4TZr2"
      },
      dialogs: {
        isSwitchInstitutionsDialogOpen: false,
        isSettingsAlertOpen: false,
        isLogOutModalOpen: false
      }
    },
    dashboard: {
      uiConfig: {
        appBarTitle: "Dashboard",
        bottomNavValue: "dashboard",
        isSideMenuOpen: false
      }
    },
    hours: {
      uiConfig: {
        isLoading: false,
        currentTab: "IN_PROGRESS"
      },
      loadingStatus: {
        isEventsLoading: false
      },
      events: {}
    },
    results: {
      uiConfig: {
        currentTab: "IN_PROGRESS"
      },
      teams: {
        "-KxNumy5eXI3K_MEou4w": {
          coaches: {
            Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
              metadata: {
                email: "rowan@sportomaticapp.com",
                name: "Rowan",
                phoneNumber: "(084) 291-0482",
                profilePictureURL:
                  "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                surname: "Walker-Campbell",
                type: "COACH"
              },
              paymentDefaults: {
                maxOvertimeHours: 3,
                overtimeHourlyRate: 100,
                standardHourlyRate: 150,
                type: "HOURLY"
              },
              preferredSports: {
                "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
              }
            }
          },
          managers: {
            H4wegzYcs9RFot9wbJR4qOL4TZr2: {
              metadata: {
                email: "brett@sportomaticapp.com",
                name: "Brett",
                phoneNumber: "(073) 812-1122",
                profilePictureURL:
                  "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                surname: "Cook",
                type: "MANAGER"
              },
              preferredSports: {
                "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
              }
            }
          },
          metadata: {
            ageGroup: "12",
            division: "A",
            gender: "MIXED",
            name: "U/12 A Athletics Mixed",
            sport: "Athletics"
          },
          status: "ACTIVE"
        },
        "-KxNxphNKRQtuecBiq3R": {
          coaches: {
            Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
              metadata: {
                email: "rowan@sportomaticapp.com",
                name: "Rowan",
                phoneNumber: "(084) 291-0482",
                profilePictureURL:
                  "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                surname: "Walker-Campbell",
                type: "COACH"
              },
              paymentDefaults: {
                maxOvertimeHours: 3,
                overtimeHourlyRate: 100,
                standardHourlyRate: 150,
                type: "HOURLY"
              },
              preferredSports: {
                "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
              },
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  name: "U/12 A Athletics Mixed",
                  sport: "Athletics",
                  status: "ACTIVE"
                }
              }
            }
          },
          managers: {
            H4wegzYcs9RFot9wbJR4qOL4TZr2: {
              metadata: {
                email: "brett@sportomaticapp.com",
                name: "Brett",
                phoneNumber: "(073) 812-1122",
                profilePictureURL:
                  "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                surname: "Cook",
                type: "MANAGER"
              },
              preferredSports: {
                "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
              },
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  name: "U/12 A Athletics Mixed",
                  sport: "Athletics",
                  status: "ACTIVE"
                }
              }
            }
          },
          metadata: {
            ageGroup: "15",
            division: "C",
            gender: "FEMALE",
            name: "U/15 C Athletics Girls",
            sport: "Athletics"
          },
          status: "ACTIVE"
        }
      },
      loadingStatus: {
        isTeamsLoading: false,
        isEventsLoading: false
      },
      events: {
        "2017": {
          "10": {
            "-KxNuraI0AULS_49kAP4": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    signInTime: "14:42",
                    signInTimeDelta: 42,
                    signOutTime: "16:43",
                    signOutTimeDelta: -17,
                    standardHourlyRate: 150,
                    status: "APPROVED",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "HOME",
                  notes: "",
                  opponents: "To be specified",
                  venue: "To be specified"
                },
                date: "2017-10-26",
                endTime: "17:00",
                isCompetitive: true,
                startTime: "14:00",
                title: "U/12 A Athletics Mixed Match",
                type: "Match"
              },
              recurrencePattern: {
                frequency: "ONCE",
                instances: [
                  {
                    date: "2017-10-26",
                    id: "-KxNuraI0AULS_49kAP4"
                  }
                ],
                numberOfEvents: "1"
              },
              status: "ACTIVE",
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "12",
                    division: "A",
                    gender: "MIXED",
                    name: "U/12 A Athletics Mixed",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxNxtqKeIksEJvFz2ek": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    signInTime: "12:00",
                    signInTimeDelta: 0,
                    signOutTime: "15:00",
                    signOutTimeDelta: 0,
                    standardHourlyRate: 150,
                    status: "APPROVED",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "To be specified"
                },
                date: "2017-10-26",
                endTime: "15:00",
                isCompetitive: false,
                startTime: "12:00",
                title: "U/15 C Athletics Girls Practice",
                type: "Practice"
              },
              recurrencePattern: {
                frequency: "ONCE",
                instances: [
                  {
                    date: "2017-10-26",
                    id: "-KxNxtqKeIksEJvFz2ek"
                  }
                ],
                numberOfEvents: "1"
              },
              status: "ACTIVE",
              teams: {
                "-KxNxphNKRQtuecBiq3R": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "15",
                    division: "C",
                    gender: "FEMALE",
                    name: "U/15 C Athletics Girls",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxRbx8gK3rd_yg-jsM1": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    signInTime: "12:03",
                    signInTimeDelta: 3,
                    signOutTime: "14:38",
                    signOutTimeDelta: -22,
                    standardHourlyRate: 150,
                    status: "APPROVED",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "AWAY",
                  notes: "",
                  opponents: "Parktown",
                  venue: "Sportomatic Grounds"
                },
                date: "2017-10-27",
                endTime: "15:00",
                isCompetitive: true,
                startTime: "12:00",
                title: "U/12 A Athletics Mixed Match",
                type: "Match"
              },
              recurrencePattern: {
                frequency: "ONCE",
                instances: [
                  {
                    date: "2017-10-27",
                    id: "-KxRbx8gK3rd_yg-jsM1"
                  }
                ],
                numberOfEvents: "1"
              },
              status: "ACTIVE",
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "12",
                    division: "A",
                    gender: "MIXED",
                    name: "U/12 A Athletics Mixed",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxRnX_g6ZrSLj64AMu5": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    signInTime: "09:53",
                    signInTimeDelta: -7,
                    signOutTime: "11:00",
                    signOutTimeDelta: 0,
                    standardHourlyRate: 150,
                    status: "APPROVED",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "Grace Trinity"
                },
                date: "2017-10-27",
                endTime: "11:00",
                isCompetitive: false,
                startTime: "10:00",
                title: "U/15 C Athletics Girls Practice",
                type: "Practice"
              },
              recurrencePattern: {
                frequency: "ONCE",
                instances: [
                  {
                    date: "2017-10-27",
                    id: "-KxRnX_g6ZrSLj64AMu5"
                  }
                ],
                numberOfEvents: "1"
              },
              status: "ACTIVE",
              teams: {
                "-KxNxphNKRQtuecBiq3R": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "15",
                    division: "C",
                    gender: "FEMALE",
                    name: "U/15 C Athletics Girls",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxS5PK5G3DKhJCzVmV7": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    signInTime: "13:44",
                    signInTimeDelta: 44,
                    signOutTime: "14:21",
                    signOutTimeDelta: -39,
                    standardHourlyRate: 150,
                    status: "APPROVED",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "Grace Trinity"
                },
                date: "2017-10-28",
                endTime: "15:00",
                isCompetitive: false,
                startTime: "13:00",
                title: "U/12 A Athletics Mixed Practice",
                type: "Practice"
              },
              recurrencePattern: {
                frequency: "WEEKLY",
                instances: [
                  {
                    date: "2017-10-28",
                    id: "-KxS5PK5G3DKhJCzVmV7"
                  },
                  {
                    date: "2017-11-04",
                    id: "-KxS5PK9nfPH_JHrBUhx"
                  },
                  {
                    date: "2017-11-11",
                    id: "-KxS5PK9nfPH_JHrBUhy"
                  }
                ],
                numberOfEvents: "3"
              },
              status: "ACTIVE",
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "12",
                    division: "A",
                    gender: "MIXED",
                    name: "U/12 A Athletics Mixed",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxgPnHKq2l9irLE7HNg": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    signInTime: "12:10",
                    signInTimeDelta: 10,
                    signOutTime: "14:22",
                    signOutTimeDelta: -38,
                    standardHourlyRate: 150,
                    status: "APPROVED",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "To be specified"
                },
                date: "2017-10-30",
                endTime: "15:00",
                isCompetitive: true,
                startTime: "12:00",
                title: "U/15 C Athletics Girls Match",
                type: "Match"
              },
              recurrencePattern: {
                frequency: "WEEKLY",
                instances: [
                  {
                    date: "2017-10-30",
                    id: "-KxgPnHKq2l9irLE7HNg"
                  },
                  {
                    date: "2017-11-06",
                    id: "-KxgPnHKq2l9irLE7HNh"
                  },
                  {
                    date: "2017-11-13",
                    id: "-KxgPnHOQrMRIjZilRty"
                  }
                ],
                numberOfEvents: "3"
              },
              status: "ACTIVE",
              teams: {
                "-KxNxphNKRQtuecBiq3R": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "15",
                    division: "C",
                    gender: "FEMALE",
                    name: "U/15 C Athletics Girls",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            }
          },
          "11": {
            "-KxS5PK9nfPH_JHrBUhx": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    standardHourlyRate: 150,
                    status: "AWAITING_SIGN_IN",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "Grace Trinity"
                },
                date: "2017-11-04",
                endTime: "15:00",
                isCompetitive: false,
                startTime: "13:00",
                title: "U/12 A Athletics Mixed Practice",
                type: "Practice"
              },
              recurrencePattern: {
                frequency: "WEEKLY",
                instances: [
                  {
                    date: "2017-10-28",
                    id: "-KxS5PK5G3DKhJCzVmV7"
                  },
                  {
                    date: "2017-11-04",
                    id: "-KxS5PK9nfPH_JHrBUhx"
                  },
                  {
                    date: "2017-11-11",
                    id: "-KxS5PK9nfPH_JHrBUhy"
                  }
                ],
                numberOfEvents: "3"
              },
              status: "ACTIVE",
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "12",
                    division: "A",
                    gender: "MIXED",
                    name: "U/12 A Athletics Mixed",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxS5PK9nfPH_JHrBUhy": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    standardHourlyRate: 150,
                    status: "AWAITING_SIGN_IN",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "Grace Trinity"
                },
                date: "2017-11-11",
                endTime: "15:00",
                isCompetitive: false,
                startTime: "13:00",
                title: "U/12 A Athletics Mixed Practice",
                type: "Practice"
              },
              recurrencePattern: {
                frequency: "WEEKLY",
                instances: [
                  {
                    date: "2017-10-28",
                    id: "-KxS5PK5G3DKhJCzVmV7"
                  },
                  {
                    date: "2017-11-04",
                    id: "-KxS5PK9nfPH_JHrBUhx"
                  },
                  {
                    date: "2017-11-11",
                    id: "-KxS5PK9nfPH_JHrBUhy"
                  }
                ],
                numberOfEvents: "3"
              },
              status: "ACTIVE",
              teams: {
                "-KxNumy5eXI3K_MEou4w": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "12",
                    division: "A",
                    gender: "MIXED",
                    name: "U/12 A Athletics Mixed",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxgPnHKq2l9irLE7HNh": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    standardHourlyRate: 150,
                    status: "AWAITING_SIGN_IN",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "To be specified"
                },
                date: "2017-11-06",
                endTime: "15:00",
                isCompetitive: true,
                startTime: "12:00",
                title: "U/15 C Athletics Girls Match",
                type: "Match"
              },
              recurrencePattern: {
                frequency: "WEEKLY",
                instances: [
                  {
                    date: "2017-10-30",
                    id: "-KxgPnHKq2l9irLE7HNg"
                  },
                  {
                    date: "2017-11-06",
                    id: "-KxgPnHKq2l9irLE7HNh"
                  },
                  {
                    date: "2017-11-13",
                    id: "-KxgPnHOQrMRIjZilRty"
                  }
                ],
                numberOfEvents: "3"
              },
              status: "ACTIVE",
              teams: {
                "-KxNxphNKRQtuecBiq3R": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "15",
                    division: "C",
                    gender: "FEMALE",
                    name: "U/15 C Athletics Girls",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            },
            "-KxgPnHOQrMRIjZilRty": {
              coaches: {
                Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                  hours: {
                    overtimeHourlyRate: 100,
                    standardHourlyRate: 150,
                    status: "AWAITING_SIGN_IN",
                    type: "HOURLY"
                  },
                  name: "Rowan",
                  phoneNumber: "(084) 291-0482",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                  surname: "Walker-Campbell"
                }
              },
              managers: {
                H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                  name: "Brett",
                  phoneNumber: "(073) 812-1122",
                  profilePictureURL:
                    "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                  surname: "Cook"
                }
              },
              metadata: {
                additionalInfo: {
                  homeAway: "UNKNOWN",
                  notes: "",
                  opponents: "To be specified",
                  venue: "To be specified"
                },
                date: "2017-11-13",
                endTime: "15:00",
                isCompetitive: true,
                startTime: "12:00",
                title: "U/15 C Athletics Girls Match",
                type: "Match"
              },
              recurrencePattern: {
                frequency: "WEEKLY",
                instances: [
                  {
                    date: "2017-10-30",
                    id: "-KxgPnHKq2l9irLE7HNg"
                  },
                  {
                    date: "2017-11-06",
                    id: "-KxgPnHKq2l9irLE7HNh"
                  },
                  {
                    date: "2017-11-13",
                    id: "-KxgPnHOQrMRIjZilRty"
                  }
                ],
                numberOfEvents: "3"
              },
              status: "ACTIVE",
              teams: {
                "-KxNxphNKRQtuecBiq3R": {
                  coaches: {
                    Bhmq7MvEEbawZJE6xnxqsXn4dWG2: {
                      metadata: {
                        email: "rowan@sportomaticapp.com",
                        name: "Rowan",
                        phoneNumber: "(084) 291-0482",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/coach%2FBhmq7MvEEbawZJE6xnxqsXn4dWG2%2Fprofile-picture.jpg?alt=media&token=88168b80-e085-4e52-b504-0357d0a0dcc7",
                        surname: "Walker-Campbell",
                        type: "COACH"
                      },
                      paymentDefaults: {
                        maxOvertimeHours: 3,
                        overtimeHourlyRate: 100,
                        standardHourlyRate: 150,
                        type: "HOURLY"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  managers: {
                    H4wegzYcs9RFot9wbJR4qOL4TZr2: {
                      metadata: {
                        email: "brett@sportomaticapp.com",
                        name: "Brett",
                        phoneNumber: "(073) 812-1122",
                        profilePictureURL:
                          "https://firebasestorage.googleapis.com/v0/b/sportomatic-beta.appspot.com/o/manager%2FH4wegzYcs9RFot9wbJR4qOL4TZr2%2Fprofile-picture.jpg?alt=media&token=10703eaa-f132-46e5-8f05-f479b4b98bbb",
                        surname: "Cook",
                        type: "MANAGER"
                      },
                      preferredSports: {
                        "-Kcb7s4Qhl4H4W0sTxA-": "Athletics"
                      },
                      teams: {
                        "-KxNumy5eXI3K_MEou4w": {
                          name: "U/12 A Athletics Mixed",
                          sport: "Athletics",
                          status: "ACTIVE"
                        }
                      }
                    }
                  },
                  metadata: {
                    ageGroup: "15",
                    division: "C",
                    gender: "FEMALE",
                    name: "U/15 C Athletics Girls",
                    sport: "Athletics"
                  },
                  status: "ACTIVE"
                }
              }
            }
          }
        }
      }
    },
    people: {
      staff: {},
      loadingStatus: {
        isStaffLoading: false
      }
    },
    schedule: {
      uiConfig: {
        currentView: "SCHEDULE",
        errorType: "NONE",
        selectedEventInfo: {
          institutionID: "",
          eventID: "",
          managerIDs: [],
          coachIDs: [],
          year: "",
          month: ""
        }
      },
      dialogs: {
        isEditEventDialogOpen: false,
        isCancelEventAlertOpen: false,
        isUncancelEventAlertOpen: false,
        isEventErrorAlertOpen: false
      },
      events: {},
      loadingStatus: {
        isEditEventDialogLoading: false,
        isEventsLoading: false
      },
      teams: {},
      coaches: {},
      managers: {}
    },
    settings: {
      uiConfig: {
        appBarTitle: "Dashboard",
        bottomNavValue: "dashboard",
        isSideMenuOpen: false
      },
      accountInfo: {
        name: "Brett",
        surname: "Cook",
        email: "brett@sportomaticapp.com",
        phoneNumber: "(082) 746 - 8382",
        profilePictureURL: "/static/media/brett.36335d70.jpg",
        sports: [
          {
            name: "Cricket",
            numberOfTeams: 0
          },
          {
            name: "Rugby",
            numberOfTeams: 2
          },
          {
            name: "Swimming",
            numberOfTeams: 0
          }
        ]
      }
    },
    teams: {
      dialogs: {
        isEditTeamAlertOpen: false
      },
      teamsList: {},
      coaches: {},
      managers: {},
      loadingStatus: {
        isTeamsLoading: false
      }
    }
  }
};
