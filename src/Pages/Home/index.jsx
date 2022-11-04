import React from 'react'
import financeImg from '../../assets/finance.svg'
import './home.sass'

function Home() {
  return (
    <main className='home'>
        <div className='content-home'>
          <h1>Controle os seus gastos</h1>
          <h2>Cuide do seu futuro!</h2>
          <img src={financeImg} alt="" />
        </div>
    </main>
  )
}

export default Home