import { LogoIcon } from "./utils/Icons";
import style from "./loading.module.css";

export default function Loading() {
  return (
    <div className="bg-primary w-screen h-screen fixed top-0 left-0 z-50">
      <div
        className={`w-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-3/4 md:w-24 ${style.sh_logoAnimation}`}
      >
        <LogoIcon />
      </div>
    </div>
  );
}
