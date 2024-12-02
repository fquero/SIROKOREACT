import isoLogo from "../assets/img/svg/siroko_iso.svg";
import fullLogo from "../assets/img/svg/siroko_logo.svg";
import reactLogo from "../assets/img/svg/react_logo.svg";

export default function Header() {
  return (
    <header className="header">
      <picture className="header__logo">
        <source srcSet={isoLogo} media="(max-width: 37.5em)" />
        <img src={fullLogo} alt="Siroko" />
      </picture>
      <img src={reactLogo} className="header__reactlogo" alt="Siroko" />
    </header>
  );
}
