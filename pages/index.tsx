import type { NextPage } from 'next'
import { SignIn } from '../components/signin'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <SignIn />
    </div>
  )
}

export default Home
