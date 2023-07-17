import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form';
import './App.css'
import PrimaryKeyInput, { Person } from './PrimaryKeyInput'

interface IPersonaInfo {
  name: string | undefined;
  status: string
}



function App() {
  const [info, setInfo] = useState<Person[] | null>(null)
  const { control, handleSubmit, setValue, register, reset } = useForm<IPersonaInfo>();


  const onSubmit = (data: IPersonaInfo) => {
    // Procesar el envío del formulario si es necesario
    console.log(data);
    reset()
  };

  useEffect(() => {
    if (info && info.length > 0) {
      // Si hay datos encontrados, establecerlos en los campos del formulario
      setValue('name', info[0]?.name ?? '');
      setValue('status', info[0]?.status ?? '');
    } else {
      reset()
    }
  }, [info, setValue, reset]);



  console.log('info de app', info)
  return (
    <>
      <h1>Formulario</h1>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <PrimaryKeyInput url={'/api/personas/'} setInfo={setInfo} />

        <Controller
          name='name'
          control={control}
          defaultValue={info ? info[0]?.name ?? name : ''}
          rules={{ required: true }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="nombre"
              // value={info ? info[0]?.name ?? '' : ''}
              {...register('name', { required: true })}
              onChange={(e) => setValue('name', e.target.value)}
            />
          )}
        />
        <Controller
          name="status"
          control={control}
          defaultValue={info ? info[0]?.status ?? '' : ''}
          rules={{ required: true }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="status"
              // value={info ? info[0]?.status ?? '' : ''}
              // {...register('status', { required: true })}
              onChange={(e) => setValue('status', e.target.value)}
            />
          )}
        />
        <button type="submit">Enviar</button>
      </form>
    </>
  )
}

export default App
