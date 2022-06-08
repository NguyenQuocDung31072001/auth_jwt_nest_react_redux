import React from 'react';
import { useDispatch } from 'react-redux';
import {logout} from "../redux/authSlices"
function LogoutPages() {
    const dispatch=useDispatch()
    dispatch(logout())
    return (
        <div>
            You logout!
        </div>
    );
}

export default LogoutPages;