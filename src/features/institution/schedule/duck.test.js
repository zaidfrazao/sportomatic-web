import * as imports from "./duck.js";
import { sampleStore } from "../../../models/sampleStore";

const initialState = {
  uiConfig: imports.uiConfigInitialState,
  loadingStatus: imports.loadingStatusInitialState,
  teams: {},
  events: {}
};

describe("Reducers", () => {
  const { scheduleReducer } = imports;
  describe("scheduleReducer", () => {
    describe("uiConfigReducer", () => {
      describe("UPDATE_CURRENT_VIEW", () => {
        const { UPDATE_CURRENT_VIEW } = imports;
        test("Updates current view", () => {
          const action = {
            type: UPDATE_CURRENT_VIEW,
            payload: {
              newView: "Schedule"
            }
          };
          const newState = new scheduleReducer(initialState, action);
          expect(newState.uiConfig.currentView).toEqual(action.payload.newView);
        });
      });

      describe("OPEN_EVENT_ERROR_ALERT", () => {
        const { OPEN_EVENT_ERROR_ALERT } = imports;
        test("Shows event error alert", () => {
          const action = {
            type: OPEN_EVENT_ERROR_ALERT,
            payload: {
              newView: "Schedule"
            }
          };
          const newState = scheduleReducer(initialState, action);
          expect(newState.uiConfig.errorType).toEqual(action.payload.errorType);
        });
      });

      describe("ERROR_ADDING_EVENT", () => {
        const { ERROR_ADDING_EVENT } = imports;
        test("Shows error adding event  alert", () => {
          const action = {
            type: ERROR_ADDING_EVENT
          };
          const newState = scheduleReducer(initialState, action);
          expect(newState.uiConfig.errorType).toEqual("LOADING");
        });
      });

      describe("OPEN_CANCEL_EVENT_ALERT", () => {
        const { OPEN_CANCEL_EVENT_ALERT } = imports;
        test("Shows cancel event alert", () => {
          const action = {
            type: OPEN_CANCEL_EVENT_ALERT,
            payload: { showCancelEvent: true }
          };
          const newState = scheduleReducer(initialState, action);
          expect(newState.uiConfig.selectedEventInfo).toEqual(action.payload);
        });
      });
    });
    describe("dialogsReducer", () => {
      describe("OPEN_ADD_EVENT_DIALOG", () => {
        const { OPEN_ADD_EVENT_DIALOG } = imports;
        test("Opens add event dialog", () => {
          const action = { type: OPEN_ADD_EVENT_DIALOG };
          const newState = scheduleReducer(initialState, action);
          expect(newState.dialogs.isAddEventDialogOpen).toBe(true);
        });
      });

      describe("RECEIVE_ADD_EVENT", () => {
        const { RECEIVE_ADD_EVENT } = imports;
        test("Closes add event dialog", () => {
          const action = { type: RECEIVE_ADD_EVENT };
          const newState = scheduleReducer(initialState, action);
          expect(newState.dialogs.isAddEventDialogOpen).toBe(false);
        });
      });

      describe("CLOSE_ADD_EVENT_DIALOG", () => {
        const { CLOSE_ADD_EVENT_DIALOG } = imports;
        test("Closes add event dialog", () => {
          const action = { type: CLOSE_ADD_EVENT_DIALOG };
          const newState = scheduleReducer(initialState, action);
          expect(newState.dialogs.isAddEventDialogOpen).toBe(false);
        });
      });

      describe("ERROR_ADDING_EVENT", () => {
        const { ERROR_ADDING_EVENT } = imports;
        test("Closes add event dialog", () => {
          const action = { type: ERROR_ADDING_EVENT };
          const newState = scheduleReducer(initialState, action);
          expect(newState.dialogs.isAddEventDialogOpen).toBe(false);
        });
        test("Shows error dialog", () => {
          const action = { type: ERROR_ADDING_EVENT };
          const newState = scheduleReducer(initialState, action);
          expect(newState.dialogs.isEventErrorAlertOpen).toBe(true);
        });
      });

      describe("OPEN_EDIT_EVENT_DIALOG", () => {
        const { OPEN_EDIT_EVENT_DIALOG } = imports;
        test("Opens edit event dialog", () => {
          const action = { type: OPEN_EDIT_EVENT_DIALOG };
          const newState = scheduleReducer(initialState, action);
          expect(newState.dialogs.isEditEventDialogOpen).toBe(true);
        });
      });

      describe("RECEIVE_EDIT_EVENT", () => {
        const { RECEIVE_EDIT_EVENT } = imports;
        test("Closes edit event dialog", () => {
          const action = { type: RECEIVE_EDIT_EVENT };
          const newState = scheduleReducer(initialState, action);
          expect(newState.dialogs.isEditEventDialogOpen).toBe(false);
        });
      });

      describe("CLOSE_EDIT_EVENT_DIALOG", () => {
        const { CLOSE_EDIT_EVENT_DIALOG } = imports;
        test("Closes edit event dialog", () => {
          const action = { type: CLOSE_EDIT_EVENT_DIALOG };
          const newState = scheduleReducer(initialState, action);
          expect(newState.dialogs.isEditEventDialogOpen).toBe(false);
        });
      });

      describe("OPEN_CANCEL_EVENT_ALERT", () => {
        const { OPEN_CANCEL_EVENT_ALERT } = imports;
        test("Closes edit event dialog", () => {
          const action = { type: OPEN_CANCEL_EVENT_ALERT };
          const newState = scheduleReducer(initialState, action);
          expect(newState.dialogs.isCancelEventAlertOpen).toBe(true);
        });
      });

      describe("CLOSE_CANCEL_EVENT_ALERT", () => {
        const { CLOSE_CANCEL_EVENT_ALERT } = imports;
        test("Closes cancel event dialog", () => {
          const action = { type: CLOSE_CANCEL_EVENT_ALERT };
          const newState = scheduleReducer(initialState, action);
          expect(newState.dialogs.isCancelEventAlertOpen).toBe(false);
        });
      });

      describe("OPEN_UNCANCEL_EVENT_ALERT", () => {
        const { OPEN_UNCANCEL_EVENT_ALERT } = imports;
        test("Opens uncancel event dialog", () => {
          const action = { type: OPEN_UNCANCEL_EVENT_ALERT };
          const newState = scheduleReducer(initialState, action);
          expect(newState.dialogs.isUncancelEventAlertOpen).toBe(true);
        });
      });

      describe("CLOSE_UNCANCEL_EVENT_ALERT", () => {
        const { CLOSE_UNCANCEL_EVENT_ALERT } = imports;
        test("Closes uncancel event dialog", () => {
          const action = { type: CLOSE_UNCANCEL_EVENT_ALERT };
          const newState = scheduleReducer(initialState, action);
          expect(newState.dialogs.isUncancelEventAlertOpen).toBe(false);
        });
      });

      describe("OPEN_EVENT_ERROR_ALERT", () => {
        const { OPEN_EVENT_ERROR_ALERT } = imports;
        test("Shows event error dialog", () => {
          const action = {
            type: OPEN_EVENT_ERROR_ALERT,
            payload: {
              errorType: "LOAD_ERR"
            }
          };
          const newState = scheduleReducer(initialState, action);
          expect(newState.dialogs.isEventErrorAlertOpen).toBe(true);
        });
      });

      describe("CLOSE_EVENT_ERROR_ALERT", () => {
        const { CLOSE_EVENT_ERROR_ALERT } = imports;
        test("Closes edit event dialog", () => {
          const action = { type: CLOSE_EVENT_ERROR_ALERT };
          const newState = scheduleReducer(initialState, action);
          expect(newState.dialogs.isEventErrorAlertOpen).toBe(false);
        });
      });
    });

    describe("loadingStatusReducer", () => {
      const { scheduleReducer } = imports;
      describe("REQUEST_STAFF", () => {
        const { REQUEST_STAFF } = imports;
        test("Shows loading dialog", () => {
          const action = {
            type: REQUEST_STAFF
          };
          const newState = scheduleReducer(initialState, action);
          expect(newState.loadingStatus.isAddEventDialogLoading).toBe(true);
          expect(newState.loadingStatus.isEditEventDialogLoading).toBe(true);
        });
      });
    });

    describe("REQUEST_TEAMS", () => {
      const { REQUEST_TEAMS } = imports;
      test("Shows loading dialog", () => {
        const action = {
          type: REQUEST_TEAMS
        };
        const newState = scheduleReducer(initialState, action);
        expect(newState.loadingStatus.isAddEventDialogLoading).toBe(true);
        expect(newState.loadingStatus.isEditEventDialogLoading).toBe(true);
      });
    });

    describe("RECEIVE_TEAMS", () => {
      const { RECEIVE_TEAMS } = imports;
      test("Dismisses loading dialog", () => {
        const action = {
          type: RECEIVE_TEAMS,
          payload: {
            teams: {}
          }
        };
        const newState = scheduleReducer(initialState, action);
        expect(newState.loadingStatus.isAddEventDialogLoading).toBe(false);
        expect(newState.loadingStatus.isEditEventDialogLoading).toBe(false);
      });
    });

    describe("ERROR_LOADING_STAFF", () => {
      const { ERROR_LOADING_STAFF } = imports;
      test("Dismisses loading dialog", () => {
        const action = {
          type: ERROR_LOADING_STAFF
        };
        const newState = scheduleReducer(initialState, action);
        expect(newState.loadingStatus.isAddEventDialogLoading).toBe(false);
        expect(newState.loadingStatus.isEditEventDialogLoading).toBe(false);
      });
    });

    describe("RECEIVE_STAFF", () => {
      const { RECEIVE_STAFF } = imports;
      test("Dismisses loading dialog", () => {
        const action = {
          type: RECEIVE_STAFF,
          payload: {
            coaches: {},
            managers: {}
          }
        };
        const newState = scheduleReducer(initialState, action);
        expect(newState.loadingStatus.isAddEventDialogLoading).toBe(false);
        expect(newState.loadingStatus.isEditEventDialogLoading).toBe(false);
      });
    });

    describe("REQUEST_ADD_EVENT", () => {
      const { REQUEST_ADD_EVENT } = imports;
      test("Shows loading dialog", () => {
        const action = {
          type: REQUEST_ADD_EVENT
        };
        const newState = scheduleReducer(initialState, action);
        expect(newState.loadingStatus.isAddEventDialogLoading).toBe(true);
      });
    });

    describe("ERROR_ADDING_EVENT", () => {
      const { ERROR_ADDING_EVENT } = imports;
      test("Shows loading dialog", () => {
        const action = {
          type: ERROR_ADDING_EVENT
        };
        const newState = scheduleReducer(initialState, action);
        expect(newState.loadingStatus.isAddEventDialogLoading).toBe(false);
      });
    });

    describe("RECEIVE_ADD_EVENT", () => {
      const { RECEIVE_ADD_EVENT } = imports;
      test("Shows loading dialog", () => {
        const action = {
          type: RECEIVE_ADD_EVENT
        };
        const newState = scheduleReducer(initialState, action);
        expect(newState.loadingStatus.isAddEventDialogLoading).toBe(false);
      });
    });

    describe("REQUEST_EDIT_EVENT", () => {
      const { REQUEST_EDIT_EVENT } = imports;
      test("Shows loading dialog", () => {
        const action = {
          type: REQUEST_EDIT_EVENT
        };
        const newState = scheduleReducer(initialState, action);
        expect(newState.loadingStatus.isEditEventDialogLoading).toBe(true);
      });
    });

    describe("ERROR_EDITING_EVENT", () => {
      const { ERROR_EDITING_EVENT } = imports;
      test("Dismisses loading dialog", () => {
        const action = {
          type: ERROR_EDITING_EVENT
        };
        const newState = scheduleReducer(initialState, action);
        expect(newState.loadingStatus.isEditEventDialogLoading).toBe(false);
      });
    });

    describe("RECEIVE_EDIT_EVENT", () => {
      const { RECEIVE_EDIT_EVENT } = imports;
      test("Dismisses edit event loading dialog", () => {
        const action = {
          type: RECEIVE_EDIT_EVENT
        };
        const newState = scheduleReducer(initialState, action);
        expect(newState.loadingStatus.isEditEventDialogLoading).toBe(false);
      });
    });

    describe("REQUEST_EVENTS", () => {
      const { REQUEST_EVENTS } = imports;
      test("Show events loading dialog", () => {
        const action = {
          type: REQUEST_EVENTS
        };
        const newState = scheduleReducer(initialState, action);
        expect(newState.loadingStatus.isEventsLoading).toBe(true);
      });
    });

    describe("ERROR_LOADING_EVENTS", () => {
      const { ERROR_LOADING_EVENTS } = imports;
      test("Dismisses events loading dialog", () => {
        const action = {
          type: ERROR_LOADING_EVENTS
        };
        const newState = scheduleReducer(initialState, action);
        expect(newState.loadingStatus.isEventsLoading).toBe(false);
      });
    });

    describe("RECEIVE_EVENTS", () => {
      const { RECEIVE_EVENTS } = imports;
      test("Dismisses events loading dialog", () => {
        const action = {
          type: RECEIVE_EVENTS,
          payload: {
            events: {}
          }
        };
        const newState = scheduleReducer(initialState, action);
        expect(newState.loadingStatus.isEventsLoading).toBe(false);
      });
    });
  });

  describe("eventsReducer", () => {
    describe("RECEIVE_EVENTS", () => {
      const { RECEIVE_EVENTS } = imports;
      test("Dismisses events loading dialog", () => {
        const action = {
          type: RECEIVE_EVENTS,
          payload: {
            events: {}
          }
        };
        const newState = scheduleReducer(initialState, action);
        expect(newState.events).toBe(action.payload.events);
      });
    });
  });

  describe("coachesReducer", () => {
    describe("RECEIVE_STAFF", () => {
      const { RECEIVE_STAFF } = imports;
      test("Dismisses events loading dialog", () => {
        const action = {
          type: RECEIVE_STAFF,
          payload: {
            coaches: {},
            managers: {}
          }
        };
        const newState = scheduleReducer(initialState, action);
        expect(newState.coaches).toBe(action.payload.coaches);
      });
    });
  });

  describe("managersReducer", () => {
    describe("RECEIVE_STAFF", () => {
      const { RECEIVE_STAFF } = imports;
      test("Dismisses events loading dialog", () => {
        const action = {
          type: RECEIVE_STAFF,
          payload: {
            coaches: {},
            managers: {}
          }
        };
        const newState = scheduleReducer(initialState, action);
        expect(newState.managers).toBe(action.payload.managers);
      });
    });
  });
});

//Action creator tests
describe("Action Creators", () => {
  describe("Synchronous functions", () => {
    describe("updateView", () => {
      const { updateView, UPDATE_CURRENT_VIEW } = imports;
      test("Returns the correct action", () => {
        let newView = "ADD_EVENT";
        const createdAction = updateView(newView);
        const expectedAction = {
          type: UPDATE_CURRENT_VIEW,
          payload: { newView }
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });

    describe("openEventErrorAlert", () => {
      const { openEventErrorAlert, OPEN_EVENT_ERROR_ALERT } = imports;
      test("Returns the correct action", () => {
        let errorType = "LOAD_ERROR";
        const createdAction = openEventErrorAlert(errorType);
        const expectedAction = {
          type: OPEN_EVENT_ERROR_ALERT,
          payload: { errorType }
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });

    describe("closeEventErrorAlert", () => {
      const { closeEventErrorAlert, CLOSE_EVENT_ERROR_ALERT } = imports;
      test("Returns the correct action", () => {
        const createdAction = closeEventErrorAlert();
        const expectedAction = {
          type: CLOSE_EVENT_ERROR_ALERT
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });

    describe("openEditEventDialog", () => {
      const { openEditEventDialog, OPEN_EDIT_EVENT_DIALOG } = imports;
      test("Returns the correct action", () => {
        const createdAction = openEditEventDialog();
        const expectedAction = {
          type: OPEN_EDIT_EVENT_DIALOG
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });
    describe("closeEditEventDialog", () => {
      const { closeEditEventDialog, CLOSE_EDIT_EVENT_DIALOG } = imports;
      test("Returns the correct action", () => {
        const createdAction = closeEditEventDialog();
        const expectedAction = {
          type: CLOSE_EDIT_EVENT_DIALOG
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });
    describe("closeCancelEventAlert", () => {
      const { closeCancelEventAlert, CLOSE_CANCEL_EVENT_ALERT } = imports;
      test("Returns the correct action", () => {
        const createdAction = closeCancelEventAlert();
        const expectedAction = {
          type: CLOSE_CANCEL_EVENT_ALERT
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });

    describe("closeUncancelEventAlert", () => {
      const { closeUncancelEventAlert, CLOSE_UNCANCEL_EVENT_ALERT } = imports;
      test("Returns the correct action", () => {
        const createdAction = closeUncancelEventAlert();
        const expectedAction = {
          type: CLOSE_UNCANCEL_EVENT_ALERT
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });

    describe("openAddEventDialog", () => {
      const { openAddEventDialog, OPEN_ADD_EVENT_DIALOG } = imports;
      test("Returns the correct action", () => {
        const createdAction = openAddEventDialog();
        const expectedAction = {
          type: OPEN_ADD_EVENT_DIALOG
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });

    describe("closeAddEventDialog", () => {
      const { closeAddEventDialog, CLOSE_ADD_EVENT_DIALOG } = imports;
      test("Returns the correct action", () => {
        const createdAction = closeAddEventDialog();
        const expectedAction = {
          type: CLOSE_ADD_EVENT_DIALOG
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });

    describe("requestEvents", () => {
      const { requestEvents, REQUEST_EVENTS } = imports;
      test("Returns the correct action", () => {
        const createdAction = requestEvents();
        const expectedAction = {
          type: REQUEST_EVENTS
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });

    describe("receiveEvents", () => {
      const { receiveEvents, RECEIVE_EVENTS } = imports;
      test("Returns the correct action", () => {
        let events = [{ id: "ed43r", title: "Test event" }];
        const createdAction = receiveEvents(events);
        const expectedAction = {
          type: RECEIVE_EVENTS,
          payload: { events }
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });

    describe("errorLoadingEvents", () => {
      const { errorLoadingEvents, ERROR_LOADING_EVENTS } = imports;
      test("Returns the correct action", () => {
        let error = { code: "LOAD_FAILED", message: "Failed to load events" };
        const createdAction = errorLoadingEvents(error);
        const expectedAction = {
          type: ERROR_LOADING_EVENTS,
          payload: { error }
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });

    describe("requestAddEvent", () => {
      const { requestAddEvent, REQUEST_ADD_EVENT } = imports;
      test("Returns the correct action", () => {
        const createdAction = requestAddEvent();
        const expectedAction = {
          type: REQUEST_ADD_EVENT
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });

    describe("receiveAddEvent", () => {
      const { receiveAddEvent, RECEIVE_ADD_EVENT } = imports;
      test("Returns the correct action", () => {
        const createdAction = receiveAddEvent();
        const expectedAction = {
          type: RECEIVE_ADD_EVENT
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });

    describe("errorAddingEvent", () => {
      const { errorAddingEvent, ERROR_ADDING_EVENT } = imports;
      test("Returns the correct action", () => {
        let error = { code: "ADD_EVENT_ERROR", message: "Failed to add event" };
        const createdAction = errorAddingEvent(error);
        const expectedAction = {
          type: ERROR_ADDING_EVENT,
          payload: { error }
        };
        expect(createdAction).toEqual(expectedAction);
      });
    });
  });
});
