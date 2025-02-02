import { useEffect } from "react";

export const Head = ({ title, description }) => {
  useEffect(() => {
    document.title = title + " | Dogs";

    document
      .querySelector("meta[name='description']")
      .setAttribute("content", description || "");
  }, [title, description]);

  return <></>;
};
