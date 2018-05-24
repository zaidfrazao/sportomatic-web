import React, { Component } from "react";
import _ from "lodash";
import injectSheet from "react-jss";
import { common, grey, red } from "../../utils/colours";

type Props = {
  handleChange: (key: string, label: string) => null,
  helperText: string,
  placeholder: string,
  items: ArrayOf<{
    key: string,
    label: string
  }>,
  selectedItem: {
    key: string,
    label: string
  }
};

type State = {
  menuOpen: boolean
};

const mobileBreakpoint = 800;

const styles = theme => ({
  arrowDown: {
    position: "absolute",
    content: "",
    top: 20,
    right: 18,
    width: 0,
    height: 0,
    border: "6px solid transparent",
    borderColor: `${common["black"]} transparent transparent transparent`
  },
  arrowDownError: {
    position: "absolute",
    content: "",
    top: 20,
    right: 18,
    width: 0,
    height: 0,
    border: "6px solid transparent",
    borderColor: `${red[500]} transparent transparent transparent`
  },
  arrowUp: {
    position: "absolute",
    content: "",
    top: 12,
    right: 18,
    width: 0,
    height: 0,
    border: "6px solid transparent",
    borderColor: `transparent transparent ${common["black"]} transparent`
  },
  arrowUpError: {
    position: "absolute",
    content: "",
    top: 12,
    right: 18,
    width: 0,
    height: 0,
    border: "6px solid transparent",
    borderColor: `transparent transparent ${red[500]} transparent`
  },
  itemSelected: {
    color: grey[900],
    fontFamily: "Nunito, sans-serif",
    fontSize: 16,
    lineHeight: "23px",
    marginRight: 24
  },
  helperText: {
    width: "calc(100% - 16px)",
    textAlign: "center",
    fontSize: 14,
    lineHeight: "18px",
    backgroundColor: common["white"],
    borderRadius: 4,
    margin: 0,
    padding: 8,
    color: red[400]
  },
  helperTextArrowUp: {
    position: "absolute",
    content: "",
    top: -12,
    left: "calc(50% - 3px)",
    width: 0,
    height: 0,
    border: "6px solid transparent",
    borderColor: `transparent transparent ${common["white"]} transparent`
  },
  helperTextWrapper: {
    position: "relative"
  },
  menu: {
    position: "fixed",
    backgroundColor: grey[100],
    border: `2px solid ${common["white"]}`,
    zIndex: 1000,
    borderRadius: 4,
    maxHeight: 200,
    overflow: "auto",
    boxShadow:
      "0 0px 0px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    [`@media (max-width: ${mobileBreakpoint}px)`]: {
      top: "5%",
      left: "5%",
      width: "90%",
      maxHeight: "90%",
      height: "90%"
    }
  },
  menuItem: {
    padding: "12px 20px",
    border: `1px solid ${common["white"]}`,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.1)"
    }
  },
  menuItemText: {
    color: grey[900],
    fontFamily: "Nunito, sans-serif",
    fontSize: 16,
    lineHeight: "23px",
    fontWeight: "bold"
  },
  placeholder: {
    color: grey[600],
    fontFamily: "Nunito, sans-serif",
    fontSize: 16,
    lineHeight: "23px"
  },
  select: {
    width: "100%",
    padding: "12px 20px",
    margin: "8px 0",
    display: "inline-block",
    borderRadius: 4,
    boxSizing: "border-box",
    backgroundColor: common["white"],
    position: "relative",
    cursor: "pointer"
  },
  selectBasic: {
    border: `1px solid ${grey[400]}`
  },
  selectError: {
    border: `1px solid ${red[500]}`
  },
  wrapper: {
    position: "relative"
  }
});

class Select extends Component<Props, State> {
  static defaultProps = {
    handleChange: (key, label) =>
      console.log(`Item with key ${key} and label ${label} selected.`),
    helperText: "",
    placeholder: "Select an item",
    items: [],
    validation: "default",
    selectedItem: {
      key: "none",
      label: "N/A"
    }
  };

  state = {
    menuOpen: false
  };

  componentDidMount() {
    document.addEventListener(
      "click",
      event => this.outsideClickListener(event),
      false
    );
  }

  componentWillUnmount() {
    document.removeEventListener(
      "click",
      event => this.outsideClickListener(event),
      false
    );
  }

  outsideClickListener(event) {
    const { menuOpen } = this.state;

    if (menuOpen) {
      this.toggleMenu();
    } else {
      if (this.node && this.node.contains(event.target)) {
        this.toggleMenu();
      }
    }
  }

  getSelectStyle() {
    const { classes, validation } = this.props;

    let styles = [classes.select];
    if (validation === "error") {
      styles.push(classes.selectError);
    } else {
      styles.push(classes.selectBasic);
    }

    return _.join(styles, " ");
  }

  getArrow() {
    const { classes, helperText } = this.props;
    const { menuOpen } = this.state;

    if (menuOpen) {
      return (
        <span
          className={
            helperText.length > 0 ? classes.arrowUpError : classes.arrowUp
          }
        />
      );
    } else {
      return (
        <span
          className={
            helperText.length > 0 ? classes.arrowDownError : classes.arrowDown
          }
        />
      );
    }
  }

  toggleMenu() {
    const { menuOpen } = this.state;

    this.setState({
      menuOpen: !menuOpen
    });
  }

  getMenuItems() {
    const { classes, items, handleChange } = this.props;

    return items.map(item => {
      return (
        <div
          key={item.key}
          className={classes.menuItem}
          onClick={() => {
            this.toggleMenu();
            handleChange(item.key, item.label);
          }}
        >
          <span className={classes.menuItemText}>{item.label}</span>
        </div>
      );
    });
  }

  getSelectText() {
    const { classes, placeholder, selectedItem } = this.props;

    if (selectedItem.key === "none") {
      return <span className={classes.placeholder}>{placeholder}</span>;
    } else {
      return <span className={classes.itemSelected}>{selectedItem.label}</span>;
    }
  }

  render() {
    const { classes, helperText } = this.props;
    const { menuOpen } = this.state;

    const arrow = this.getArrow();
    const menuItems = this.getMenuItems();
    const selectText = this.getSelectText();
    const selectStyle = this.getSelectStyle();
    const showHelperText = helperText.length > 0;

    return (
      <div
        className={classes.wrapper}
        ref={node => {
          this.node = node;
        }}
      >
        <div className={selectStyle}>
          {selectText}
          {arrow}
        </div>
        {showHelperText && (
          <div className={classes.helperTextWrapper}>
            <span className={classes.helperTextArrowUp} />
            <p className={classes.helperText}>{helperText}</p>
          </div>
        )}
        {menuOpen && <div className={classes.menu}>{menuItems}</div>}
      </div>
    );
  }
}

export default injectSheet(styles)(Select);
