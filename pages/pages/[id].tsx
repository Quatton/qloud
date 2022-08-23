import React from "react";
import Layout from "../../components/Layout";
import { useLocalStorage } from "../../utils/Storage";

type Props = {};

export default function Pages({}: Props) {
  const [getItem, setItem] = useLocalStorage(localStorage, "data");
  const sessions = getItem("sessions") ? getItem("sessions") : [];

  return <Layout></Layout>;
}
