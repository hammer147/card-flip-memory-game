import Image from 'next/image'
import styles from './single-card.module.css'
import { Card } from '../typings'

type Props = {
  card: Card
  handleChoice: (card: Card) => void
  flipped: boolean
  disabled: boolean
}

const SingleCard = ({ card, handleChoice, flipped, disabled }: Props) => {

  const handleClick = () => {
    if (!disabled) handleChoice(card)
  }

  return (
    <div className={styles.card}>
      <div className={`${flipped ? styles.flipped : ''}`}>
        <div className={`${styles.img} ${styles.back}`}>
          <Image src="/images/cover.png" alt="card back" width={200} height={200} onClick={handleClick} />
        </div>
        <div className={`${styles.img} ${styles.front}`}>
          <Image src={card.src} alt="card front" width={200} height={200} />
        </div>
      </div>
    </div>
  )
}

export default SingleCard
