import { Component } from "solid-js";
import { Title } from "solid-start";
import { read } from "~/utils/theme";

export const MeteTag: Component<{ name: string }> = (props) => {
  const username = read("username")
  return <Title>{`${username()}-${props.name}`}</Title>;
};
