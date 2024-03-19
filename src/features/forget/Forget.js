import React, { useEffect } from 'react'
import Title from '../../widgets/Title'
import Divider from '../../widgets/Divider'
import { FormProvider, useForm } from 'react-hook-form'
import Input from '../../widgets/Input'
import Button from '../../widgets/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { triggerNotification } from '../notifications/api/notificationSlice'
import { resetPassword } from '../../shared/api/requests'

const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
})

export default function ForgetComponent() {
  const methods = useForm({ resolver: yupResolver(validationSchema) })
  const {  error } = useSelector(state => state.forget)
  const dispatch = useDispatch()
  const onSubmit = data => {
    data.redirect_url = 'http://localhost:3000/new-password'

    dispatch(resetPassword(data)).then(({payload})=>{
      if(payload?.error === 0){
        dispatch(
          triggerNotification({ type: 'success', message: 'Check your email' }),
        )
      }
      methods.reset({email:''})
    })
  }

  useEffect(() => {
    if (error) {
      dispatch(
        triggerNotification({ type: 'error', message: 'Email is invalid' }),
      )
    }
  }, [error,dispatch])
  return (
    <div>
      <Title text="Forgot Password?" />
      <div className="w-[400px]"></div>
      <div className="my-10" />
      <Divider />
      <div className="w-full">
        <FormProvider {...methods}>
          <form
            className="flex flex-col items-center justify-center"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Input name="email" type="email" label="Email" />
            <div className="my-7" />

            <div className='w-full sm:p-3'>
              <Button text="Send" />
              <div className="my-3" />

              <Button
                variant="out"
                type="button"
                text={<Link to="/">Cancel </Link>}
              />
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
