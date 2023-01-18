import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { INewsItemType, IUser } from "./types";

export async function fetchPost(
  url: string,
  set:
    | Dispatch<SetStateAction<INewsItemType[]>>
    | React.Dispatch<React.SetStateAction<IUser | undefined>>
    | React.Dispatch<React.SetStateAction<INewsItemType | undefined>>,
  setError: Dispatch<SetStateAction<boolean>>,
  setErrorMessage:Dispatch<SetStateAction<string>>
) {
  await axios
    .get(url)
    .then((response) => {
      set(response.data);
    })
    .catch((error) => {
      setError(true);
      setErrorMessage(error.message);
    });
}
