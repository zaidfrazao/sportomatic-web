import React, { Component } from "react";
import { grey } from "material-ui/colors";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  arrowDown: {
    position: "absolute",
    content: "",
    top: 20,
    right: 18,
    width: 0,
    height: 0,
    border: "6px solid transparent",
    borderColor: "#999 transparent transparent transparent"
  },
  arrowUp: {
    position: "absolute",
    content: "",
    top: 12,
    right: 18,
    width: 0,
    height: 0,
    border: "6px solid transparent",
    borderColor: "transparent transparent #999 transparent"
  },
  itemSelected: {
    color: grey[900],
    fontFamily: "Nunito, sans-serif",
    fontSize: 16,
    lineHeight: "23px"
  },
  menu: {
    position: "absolute",
    top: 60,
    width: "100%",
    backgroundColor: grey[100],
    border: `2px solid white`,
    zIndex: 1000,
    borderRadius: 4,
    boxShadow:
      "0 0px 0px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
  },
  menuItem: {
    padding: "12px 20px",
    border: `1px solid white`,
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
    border: "1px solid #ccc",
    borderRadius: 4,
    boxSizing: "border-box",
    backgroundColor: "white",
    position: "relative",
    cursor: "pointer"
  },
  selectText: {
    color: grey[900],
    fontFamily: "Nunito, sans-serif",
    fontSize: 16,
    lineHeight: "23px"
  },
  wrapper: {
    position: "relative"
  }
});

type Props = {
  actions: {
    handleClick: () => null
  },
  classes: {},
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

class Select extends Component<Props, State> {
  static defaultProps = {
    actions: {
      handleClick: () => console.log("A button was clicked")
    },
    placeholder: "Select an item",
    items: [],
    selectedItem: {
      key: "none",
      label: "N/A"
    }
  };

  state = {
    menuOpen: false
  };

  outsideClickListener(event) {
    if (!this.node.contains(event.target)) {
      this.toggleMenu();
    } else {
      this.toggleMenu();
    }
  }

  getArrow() {
    const { classes } = this.props;
    const { menuOpen } = this.state;

    if (menuOpen) {
      return <span className={classes.arrowUp} />;
    } else {
      return <span className={classes.arrowDown} />;
    }
  }

  toggleMenu() {
    const { menuOpen } = this.state;

    const isNowOpen = !menuOpen;

    // if (isNowOpen) {
    //   document.addEventListener("click", event =>
    //     this.outsideClickListener(event), false
    //   );
    // } else {
    //   document.removeEventListener("click", event =>
    //     this.outsideClickListener(event), false
    //   );
    // }

    this.setState({
      menuOpen: isNowOpen
    });
  }

  getMenuItems() {
    const { classes, items } = this.props;
    const { handleChange } = this.props.actions;

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
    const { classes } = this.props;
    const { menuOpen } = this.state;

    const arrow = this.getArrow();
    const menuItems = this.getMenuItems();
    const selectText = this.getSelectText();

    return (
      <div
        className={classes.wrapper}
        ref={node => {
          this.node = node;
        }}
      >
        <div className={classes.select} onClick={() => this.toggleMenu()}>
          {selectText}
          {arrow}
        </div>
        {menuOpen && <div className={classes.menu}>{menuItems}</div>}
      </div>
    );
  }
}

export default withStyles(styles)(Select);
