import { Link } from "react-router-dom"
export default function NotFound() {


    return (
        <div>
            <h1>This page is not availabe</h1>
            <Link to='/'>redirect to Home</Link>
        </div>
    )
}