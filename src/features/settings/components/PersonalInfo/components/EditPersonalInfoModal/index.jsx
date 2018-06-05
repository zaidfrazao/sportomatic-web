/* eslint-disable array-callback-return */
import React, { Component } from "react";
import AvatarEditor from "react-avatar-editor";
import injectStyles from "react-jss";
import Button from "../../../../../../components/Button";
import { common, lightBlue } from "../../../../../../utils/colours";
import Dialog from "../../../../../../components/Dialog";
import Slider from "../../../../../../components/Slider";
import TextField from "../../../../../../components/TextField";
import { toPhoneFormat } from "../../../../../../utils/format";

const styles = theme => ({
  contentWrapper: {
    minWidth: 280,
    maxWidth: 320,
    margin: "0 auto",
    overflow: "hidden"
  },
  emblem: {
    cursor: "grab",
    marginBottom: 12
  },
  emblemWrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12
  },
  input: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity: 0,
    cursor: "pointer"
  },
  inputWrapper: {
    position: "relative",
    cursor: "pointer"
  },
  sliderWrapper: {
    marginRight: 8,
    flexGrow: 1
  },
  uploadButton: {
    display: "block",
    borderRadius: 8,
    padding: 12,
    backgroundColor: lightBlue[500],
    color: common["white"],
    fontSize: 18,
    transition: "0.25s",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: lightBlue[400]
    }
  }
});

const initialState = {
  profilePictureURL: "",
  imageScale: 1,
  image: "",
  isImageLoading: false,
  firstName: {
    value: "",
    validation: "default",
    message: ""
  },
  lastName: {
    value: "",
    validation: "default",
    message: ""
  },
  phoneNumber: {
    value: "",
    validation: "default",
    message: ""
  }
};

class EditPersonalInfoModal extends Component {
  state = initialState;

  componentWillMount() {
    document.addEventListener("keydown", this.onKeyPressed.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    const { isOpen, initialInfo } = nextProps;

    if (isOpen !== this.props.isOpen && !isOpen) {
      this.resetState();
    }

    if (isOpen !== this.props.isOpen && isOpen) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onload = e => {
        let file = new File([xhr.response], "profile-picture.jpeg", {
          type: "image/jpeg",
          lastModified: Date.now()
        });
        this.updateImage(file);
      };
      xhr.open("GET", initialInfo.profilePictureURL);
      xhr.send();

      this.setState({
        isImageLoading: true,
        image: initialInfo.profilePictureURL,
        firstName: {
          value: initialInfo.firstName,
          validation: "default",
          message: ""
        },
        lastName: {
          value: initialInfo.lastName,
          validation: "default",
          message: ""
        },
        phoneNumber: {
          value: initialInfo.phoneNumber,
          validation: "default",
          message: ""
        }
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyPressed.bind(this));
  }

  updateImage(image) {
    this.setState({
      image
    });
    this.stopImageLoading();
  }

  stopImageLoading() {
    this.setState({
      isImageLoading: false
    });
  }

  onKeyPressed(e) {
    const { isOpen, isLoading } = this.props;
    const { firstName, lastName, phoneNumber } = this.state;

    if (isOpen && !isLoading && e.keyCode === 13) {
      const isValid = this.validateForm(firstName, lastName, phoneNumber);

      if (isValid) {
        this.handleSave();
      }
    }
  }

  resetState() {
    this.setState(initialState);
  }

  handleChange(input, newValue) {
    let update = {
      [input]: {
        ...this.state[input],
        value: newValue
      }
    };
    this.setState(update);
  }

  validateForm(firstName, lastName, phoneNumber) {
    let isValid = true;
    let newState = {};

    if (firstName.value === "") {
      isValid = false;
      newState.firstName = {
        value: firstName.value,
        validation: "error",
        message: "Please provide your first name"
      };
    } else if (firstName.value.length > 64) {
      isValid = false;
      newState.firstName = {
        value: firstName.value,
        validation: "error",
        message: "Max. 64 characters allowed"
      };
    } else {
      newState.firstName = {
        value: firstName.value,
        validation: "default",
        message: ""
      };
    }

    if (lastName.value === "") {
      isValid = false;
      newState.lastName = {
        value: lastName.value,
        validation: "error",
        message: "Please provide your last name"
      };
    } else if (lastName.value.length > 64) {
      isValid = false;
      newState.lastName = {
        value: lastName.value,
        validation: "error",
        message: "Max. 64 characters allowed"
      };
    } else {
      newState.lastName = {
        value: lastName.value,
        validation: "default",
        message: ""
      };
    }

    if (phoneNumber.value === "") {
      isValid = false;
      newState.phoneNumber = {
        value: phoneNumber.value,
        validation: "error",
        message: "Please provide your phone number"
      };
    } else if (phoneNumber.value.length !== 14) {
      isValid = false;
      newState.phoneNumber = {
        value: phoneNumber.value,
        validation: "error",
        message: "This is not a valid phone number"
      };
    } else {
      newState.phoneNumber = {
        value: phoneNumber.value,
        validation: "default",
        message: ""
      };
    }

    this.setState(newState);

    return isValid;
  }

  updateImageScale(newValue) {
    this.setState({
      imageScale: newValue
    });
  }

  handleSave = data => {
    const { editPersonalInfo } = this.props.actions;
    const { firstName, lastName, phoneNumber } = this.state;

    this.editor.getImageScaledToCanvas().toBlob(blob => {
      editPersonalInfo(
        blob,
        firstName.value,
        lastName.value,
        phoneNumber.value
      );
    }, "image/jpeg");
  };

  handleNewImage = e => {
    this.setState({ image: e.target.files[0] });
  };

  setEditorRef = editor => (this.editor = editor);

  render() {
    const { classes, isOpen, isLoading } = this.props;
    const { closeModal } = this.props.actions;
    const {
      firstName,
      lastName,
      phoneNumber,
      image,
      imageScale,
      isImageLoading
    } = this.state;

    const actions = [
      <Button
        colour="primary"
        slim
        disabled={isLoading}
        handleClick={() => {
          closeModal();
          this.resetState();
        }}
      >
        Cancel
      </Button>,
      <Button
        slim
        filled
        colour="primary"
        loading={isLoading || isImageLoading}
        handleClick={() => {
          const isValid = this.validateForm(firstName, lastName, phoneNumber);
          isValid && this.handleSave();
        }}
      >
        Save
      </Button>
    ];

    return (
      <Dialog isOpen={isOpen} heading="Edit Personal Info" actions={actions}>
        <div className={classes.contentWrapper}>
          <div className={classes.emblemWrapper}>
            <div className={classes.emblem}>
              <AvatarEditor
                ref={this.setEditorRef}
                onSave={this.handleSave}
                image={image}
                border={25}
                color={[0, 0, 0, 0.2]}
                scale={imageScale}
                rotate={0}
              />
            </div>
            <div className={classes.sliderWrapper}>
              <Slider
                min={1}
                max={2}
                value={imageScale}
                step={0.1}
                handleChange={newValue =>
                  this.updateImageScale(parseFloat(newValue))}
              />
            </div>
            <div className={classes.inputWrapper}>
              <label htmlFor="file" className={classes.uploadButton}>
                <i className={`fas fa-upload ${classes.uploadIcon}`} />
              </label>
              <input
                name="file"
                accept="image/*"
                className={classes.input}
                type="file"
                onChange={this.handleNewImage}
              />
            </div>
          </div>
          <TextField
            type="text"
            placeholder="First name"
            value={firstName.value}
            validation={firstName.validation}
            helperText={firstName.message}
            handleChange={newValue => this.handleChange("firstName", newValue)}
          />
          <TextField
            type="text"
            placeholder="Last name"
            value={lastName.value}
            validation={lastName.validation}
            helperText={lastName.message}
            handleChange={newValue => this.handleChange("lastName", newValue)}
          />
          <TextField
            type="text"
            placeholder="Phone number"
            value={phoneNumber.value}
            validation={phoneNumber.validation}
            helperText={phoneNumber.message}
            handleChange={newValue =>
              this.handleChange("phoneNumber", toPhoneFormat(newValue))}
          />
        </div>
      </Dialog>
    );
  }
}

export default injectStyles(styles)(EditPersonalInfoModal);
