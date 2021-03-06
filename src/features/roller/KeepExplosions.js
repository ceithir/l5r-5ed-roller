import React, { useState } from "react";
import DicesBox from "./DicesBox";
import { Button } from "antd";

const KeepExplosions = ({ dices, onFinish, compromised }) => {
  const [toKeep, setToKeep] = useState([]);
  const toggle = (index) => {
    if (toKeep.includes(index)) {
      return setToKeep(toKeep.filter((i) => i !== index));
    }
    return setToKeep([...toKeep, index]);
  };

  return (
    <DicesBox
      text={`Select which explosions you wish to keep (if any):`}
      dices={dices.map((dice, index) => {
        const available =
          dice.status === "pending" && (!compromised || !dice.value.strife);

        return {
          ...dice,
          selectable: available,
          selected: dice.status === "kept" || toKeep.includes(index),
          disabled: !available && dice.status !== "kept",
          toggle: () => toggle(index),
        };
      })}
      footer={
        <Button type="primary" onClick={() => onFinish(toKeep)}>
          Continue
        </Button>
      }
    />
  );
};

export default KeepExplosions;
