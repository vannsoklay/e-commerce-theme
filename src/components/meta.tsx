import { Component } from "solid-js";
import { Title } from "solid-start";
import { read } from "~/utils/theme";

export const MeteTag: Component<{ name: string }> = (props) => {
  const globals = read("globals");
  return <Title>{`${globals()?.name}-${props.name}`}</Title>;
};
