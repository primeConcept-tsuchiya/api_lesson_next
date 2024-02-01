import { User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';

const UseQueryUser = () => {
    const router = useRouter();
    const getUser = async () => {
        const { data } = await axios.get<Omit<User, 'hashPasword' >>(
            `${process.env.NEXT_PUBLIC_API_URL}/user`
        )
        return data;
    }
    /**
     * react queryはRestAPIから取得したデータをブラウザにキャッシュすることができる
     */
    return useQuery<Omit<User, 'hashPasword' >, Error>({
        queryKey: ['user'],
        queryFn: getUser,
        onError: (err: any) => {
            if(err.response.status === 401 || err.response.status === 403) {
                router.push('/');
            } 
        }
    })
}

export default UseQueryUser