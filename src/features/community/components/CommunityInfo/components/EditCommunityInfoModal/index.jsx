/* eslint-disable array-callback-return */
import React, { Component } from "react";
import _ from "lodash";
import AvatarEditor from "react-avatar-editor";
import injectStyles from "react-jss";
import Button from "../../../../../../components/Button";
import { common, lightBlue } from "../../../../../../utils/colours";
import Dialog from "../../../../../../components/Dialog";
import { isValidEmail } from "../../../../../../utils/validation";
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
  emblemURL: "",
  imageScale: 1,
  image: "",
  isImageLoading: false,
  abbreviation: {
    value: "",
    validation: "default",
    message: ""
  },
  phoneNumber: {
    value: "",
    validation: "default",
    message: ""
  },
  physicalAddress: {
    value: "",
    validation: "default",
    message: ""
  },
  publicEmail: {
    value: "",
    validation: "default",
    message: ""
  },
  name: {
    value: "",
    validation: "default",
    message: ""
  }
};

class EditCommunityInfoModal extends Component {
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
        let file = new File([xhr.response], "emblem.jpeg", {
          type: "image/jpeg",
          lastModified: Date.now()
        });
        this.updateImage(file);
      };
      xhr.open("GET", initialInfo.emblemURL);
      xhr.send();

      this.setState({
        isImageLoading: true,
        image: initialInfo.emblemURL,
        abbreviation: {
          value: initialInfo.abbreviation,
          validation: "default",
          message: ""
        },
        phoneNumber: {
          value: initialInfo.phoneNumber,
          validation: "default",
          message: ""
        },
        physicalAddress: {
          value: initialInfo.physicalAddress,
          validation: "default",
          message: ""
        },
        publicEmail: {
          value: initialInfo.publicEmail,
          validation: "default",
          message: ""
        },
        name: {
          value: initialInfo.name,
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
    const {
      name,
      abbreviation,
      phoneNumber,
      physicalAddress,
      publicEmail
    } = this.state;

    if (isOpen && !isLoading && e.keyCode === 13) {
      const isValid = this.validateForm(
        name,
        abbreviation,
        phoneNumber,
        physicalAddress,
        publicEmail
      );

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

    if (input === "name") {
      update = {
        ...update,
        abbreviation: {
          ...this.state.abbreviation,
          value: this.getAbbreviation(newValue)
        }
      };
    }

    this.setState(update);
  }

  getAbbreviation(text) {
    const words = _.words(text);
    return words.reduce((abbrev, word) => abbrev + _.upperFirst(word)[0], "");
  }

  validateForm(name, abbreviation, phoneNumber, physicalAddress, publicEmail) {
    let isValid = true;
    let newState = {};

    if (name.value === "") {
      isValid = false;
      newState.name = {
        value: name.value,
        validation: "error",
        message: "Please give your community a name"
      };
    } else if (name.value.length > 64) {
      isValid = false;
      newState.name = {
        value: name.value,
        validation: "error",
        message: "Max. 64 characters allowed"
      };
    } else {
      newState.name = {
        value: name.value,
        validation: "default",
        message: ""
      };
    }

    if (abbreviation.value === "") {
      isValid = false;
      newState.abbreviation = {
        value: abbreviation.value,
        validation: "error",
        message: "Please provide an abbreviation for your community's name"
      };
    } else if (abbreviation.value.length > 8) {
      isValid = false;
      newState.abbreviation = {
        value: abbreviation.value,
        validation: "error",
        message: "Max. 8 characters allowed"
      };
    } else {
      newState.abbreviation = {
        value: abbreviation.value,
        validation: "default",
        message: ""
      };
    }

    if (phoneNumber.value === "") {
      isValid = false;
      newState.phoneNumber = {
        value: phoneNumber.value,
        validation: "error",
        message: "Please provide the community's contact number"
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

    if (physicalAddress.value === "") {
      isValid = false;
      newState.physicalAddress = {
        value: physicalAddress.value,
        validation: "error",
        message: "Please provide your community's physical address"
      };
    } else if (physicalAddress.value.length > 128) {
      isValid = false;
      newState.physicalAddress = {
        value: physicalAddress.value,
        validation: "error",
        message: "Max. 128 characters allowed"
      };
    } else {
      newState.physicalAddress = {
        value: physicalAddress.value,
        validation: "default",
        message: ""
      };
    }

    if (publicEmail.value === "") {
      isValid = false;
      newState.publicEmail = {
        value: publicEmail.value,
        validation: "error",
        message: "Please provide your community's physical address"
      };
    } else if (publicEmail.value.length > 64) {
      isValid = false;
      newState.publicEmail = {
        value: publicEmail.value,
        validation: "error",
        message: "Max. 64 characters allowed"
      };
    } else if (!isValidEmail(publicEmail.value)) {
      isValid = false;
      newState.publicEmail = {
        value: publicEmail.value,
        validation: "error",
        message: "This is not a valid email address"
      };
    } else {
      newState.publicEmail = {
        value: publicEmail.value,
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
    const { editCommunityInfo } = this.props.actions;
    const {
      name,
      abbreviation,
      phoneNumber,
      physicalAddress,
      publicEmail
    } = this.state;

    this.editor.getImageScaledToCanvas().toBlob(blob => {
      editCommunityInfo(
        blob,
        name.value,
        abbreviation.value,
        phoneNumber.value,
        physicalAddress.value,
        publicEmail.value
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
      name,
      abbreviation,
      phoneNumber,
      physicalAddress,
      publicEmail,
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
          const isValid = this.validateForm(
            name,
            abbreviation,
            phoneNumber,
            physicalAddress,
            publicEmail
          );
          isValid && this.handleSave();
        }}
      >
        Save
      </Button>
    ];

    return (
      <Dialog isOpen={isOpen} heading="Edit Community Info" actions={actions}>
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
            placeholder="Community name"
            value={name.value}
            validation={name.validation}
            helperText={name.message}
            handleChange={newValue => this.handleChange("name", newValue)}
          />
          <TextField
            type="text"
            placeholder="Abbreviation"
            value={abbreviation.value}
            validation={abbreviation.validation}
            helperText={abbreviation.message}
            handleChange={newValue =>
              this.handleChange("abbreviation", newValue)}
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
          <TextField
            type="text"
            placeholder="Physical address"
            value={physicalAddress.value}
            validation={physicalAddress.validation}
            helperText={physicalAddress.message}
            handleChange={newValue =>
              this.handleChange("physicalAddress", newValue)}
          />
          <TextField
            type="text"
            placeholder="Public email address"
            value={publicEmail.value}
            validation={publicEmail.validation}
            helperText={publicEmail.message}
            handleChange={newValue =>
              this.handleChange("publicEmail", newValue)}
          />
        </div>
      </Dialog>
    );
  }
}

export default injectStyles(styles)(EditCommunityInfoModal);
