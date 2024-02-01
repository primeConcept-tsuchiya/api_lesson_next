import React from 'react'
import UseQueryUser from '../hooks/useQueryUser'
import { Loader } from '@mantine/core';

const UserInfo = () => {
    const { data: user, status } = UseQueryUser();
    if (status === 'loading') return <Loader />
    return (
        <>
            <p>{user?.email}</p>
        </>
    )
}

export default UserInfo