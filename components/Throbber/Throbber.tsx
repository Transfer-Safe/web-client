import style from './Throbber.module.scss';

import Animation from '../Animation';

const Throbber: React.FC = () => (
  <Animation animation="loader" className={style.Throbber} />
);

export default Throbber;
