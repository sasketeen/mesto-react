import logo from "../../images/logo.svg";

/**
 * Компонент хедера
 */
export default function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Логотип Место" className="logo" />
    </header>
  );
}
