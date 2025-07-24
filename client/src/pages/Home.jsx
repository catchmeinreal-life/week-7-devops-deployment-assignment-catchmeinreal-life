import { Link } from "react-router-dom"
import { HandCoins, Bitcoin } from 'lucide-react';
import Navbar from '../components/NavBar';

import '../App.css';

export default function Home() {


    return (
        <>
          <Navbar />
          <div className='container icons'>
            <Link to='/'>
                <HandCoins />
            </Link>
            <Link to='/'>
                <Bitcoin />
            </Link>
          </div>
        </>
      )
}