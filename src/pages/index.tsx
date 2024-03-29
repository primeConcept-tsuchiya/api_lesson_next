import { Inter } from "next/font/google";
import type { NextPage } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import * as Yup from 'yup'
import { DatabaseIcon, ShieldCheckIcon } from '@heroicons/react/solid'
import { ExclamationCircleIcon } from '@heroicons/react/outline'
import {
  Anchor,
  TextInput,
  Button,
  Group,
  PasswordInput,
  Alert,
} from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { AuthForm } from "../../types";
import Layout from "../../components/Layout";

const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('No Email Provider'),
  password: Yup.string()
    .required('Np password provided')
    .min(5, 'Password should be min 5 chars'),
})

export default function Home() {
  // next.jsのrouting
  const router = useRouter();
  // login mode or logout mode
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const form = useForm<AuthForm>({
    validate: yupResolver(schema),
    initialValues: {
      email: '',
      password: ''
    }
  })
  const handleSubmit = async () => {
    try {
      if (isRegister) {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
          email: form.values.email,
          password: form.values.password,
        });
      }
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        email: form.values.email,
        password: form.values.password,
      });
      form.reset();
      router.push('/dashboard');
    } catch (e: any) {
      setError(e.response.data.message)
    }
  }
  return (
    <>
      <Layout title="Auth">
        <ShieldCheckIcon className="h-16 w-16 text-blue-500" />
        {
          error && (
            <Alert
              my="md"
              variant="filled"
              icon={<ExclamationCircleIcon />}
              title="Authorization Error"
              color="red"
              radius="md"
            >
              {error}
            </Alert>
          )}
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            mt="md"
            id="email"
            label="Email*"
            placeholder="example@gmail.com"
            {...form.getInputProps('email')}
          >
          </TextInput>
          <PasswordInput
            mt="md"
            id="password"
            placeholder="password"
            label="password*"
            description="Must be min 5 char"
            {...form.getInputProps('password')}
          >
          </PasswordInput>
          <Group mt="xl">
            <Anchor
              component="button"
              type="button"
              size="xs"
              className="text-gray-300"
              onClick={() => {
                setIsRegister(!isRegister)
                setError('');
              }}
            >
              {
                isRegister
                  ? 'Have an account? Login'
                  : 'Dont have an account/ Register'}
            </Anchor>
            <Button
              color="cyan"
              type="submit"
            >
              {isRegister ? 'Register' : 'Login'}
            </Button>
          </Group>
        </form>
      </Layout>
    </>
  );
}
