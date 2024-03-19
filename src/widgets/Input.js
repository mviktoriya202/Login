import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'

export default function Input({ name, type, label, ...rest }) {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev)
  }

  return (
    <div className="mx-2 mt-8 w-[400px] sm:w-[350px] sm370:w-[250px]">
      <TextField
        id={'outlined-basic' + Math.random()}
        fullWidth
        name={name}
        type={showPassword ? 'text' : type}
        variant="outlined"
        placeholder={label}
        helperText={errors[name]?.message}
        {...register(name)}
        {...rest}
        InputProps={{
          endAdornment: type === 'password' && (
            <InputAdornment onClick={togglePasswordVisibility} position="end">
              {showPassword ? (
                <VisibilityOffIcon style={{ backgroundColor: 'none' }} />
              ) : (
                <VisibilityIcon style={{ backgroundColor: 'none' }} />
              )}
            </InputAdornment>
          ),
        }}
      />
    </div>
  )
}
