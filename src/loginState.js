import { atom } from "recoil";

const globalAtom = {
  user: atom({ key: "user", default: { isLogin: false, nickname: "" } }),
};

export default globalAtom;
