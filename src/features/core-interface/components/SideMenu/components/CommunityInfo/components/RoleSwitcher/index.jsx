import React, { Component } from "react";
import Select from "../../../../../../../../components/Select";

type Props = {
  selected: string,
  handleChange: (newRole: string) => null
};

class RoleSwitcher extends Component<Props> {
  static defaultProps = {
    selected: "admin",
    handleChange: newRole => console.log(`User chose the ${newRole} role.`)
  };

  getLabel(role) {
    switch (role) {
      case "admin":
        return "Administrator";
      case "coach":
        return "Coach";
      case "manager":
        return "Manager";
      default:
        return "Administrator";
    }
  }

  render() {
    const { selected, handleChange, options } = this.props;

    const selectedLabel = this.getLabel(selected);

    return (
      <div>
        <Select
          items={options}
          selectedItem={{
            key: selected,
            label: selectedLabel
          }}
          handleChange={(newKey, newLabel) => handleChange(newKey)}
        />
      </div>
    );
  }
}

export default RoleSwitcher;
