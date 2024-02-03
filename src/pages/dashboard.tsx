import { useRouter } from "next/router"
import Layout from "../../components/Layout"
import axios from "axios";
import { LogoutIcon } from "@heroicons/react/solid";
import UserInfo from "../../components/UserInfo";
import { useQueryClient } from "@tanstack/react-query";
import { TaskForm } from "../../components/TaskForm";
import { TaskList } from "../../components/TaskList";

const Dashboard = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const logout = async () => {
        queryClient.removeQueries(['tasks']);
        queryClient.removeQueries(['user']);
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
        router.push('/');
    }
    return (
        <Layout title="Task Board">
            <LogoutIcon
                className="md-6 h-6 w-6 cursol-pointer text-blue-500"
                onClick={() => {
                    logout();
                }}
            >
            </LogoutIcon>
            <UserInfo />
            <TaskForm />
            <TaskList />
        </Layout>
    )
}

export default Dashboard