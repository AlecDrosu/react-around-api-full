export default function Footer(props) {
  return !props.loggedIn ? null : (
    <footer className="footer">
      <p className="footer__copyright">© 2021 Around The U.S.</p>
    </footer>
  );
}
