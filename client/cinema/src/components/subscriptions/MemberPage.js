import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'

const MemberPageComp = () => {

    const {id} = useParams()
    const [member, setMember] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            let resp = await axios.get('http://localhost:4000/api/members/' + id)
            setMember(resp.data)
        }   
        fetchData()
    }, [id])
    return (
        <div>
            <h2>Member Page</h2>
            <p>{member.name}</p>
            <p>{member.email}</p>
            <p>{member.city}</p>
        </div>
    )
}

export default MemberPageComp
