import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

interface FormData {
    primaryKey: string;
    // Otros campos del formulario...
}

// interface RecordData {
//     primaryKey: string;
//     // Otros campos del registro...
// }

interface PrimaryKeyProps {
    url: string
    setInfo: React.Dispatch<React.SetStateAction<Person[] | null>>
}
export interface Person {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: Location;
    location: Location;
    image: string;
    url: string;
    created: Date;
    episodes: string[]
}

export interface Location {
    name: string;
    url: string;
}



const PrimaryKeyInput: React.FC<PrimaryKeyProps> = ({ url, setInfo }) => {
    const { control } = useForm<FormData>();
    const [_recordData, setRecordData] = useState<Person | null>(null);

    // const onSubmit = (data: FormData) => {
    //     // Procesar el envío del formulario si es necesario
    //     console.log(data);
    // };

    const fetchRecordData = async (url: string, primaryKey: string) => {
        // Simular búsqueda en la base de datos o en la fuente de datos
        // Aquí deberías reemplazar esta lógica por tu propia función de búsqueda
        try {
            console.log(url, primaryKey);
            const response = await axios.get<Person>(`https://rickandmortyapi.com/api/character/${primaryKey}`);
            const responseData = response.data;

            if (responseData) {
                // Si se encontró información válida, actualiza el estado con los datos del registro
                setRecordData(responseData);
                setInfo([responseData]);
            } else {
                // Si no se encontró información válida, reinicia el estado
                setRecordData(null);
                setInfo([]);
            }
        } catch (error) {
            console.error('Error al buscar el registro:', error);
            setRecordData(null);
            setInfo([]);
        }
    };

    const handlePrimaryKeyBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
        const primaryKey = event.target.value;
        if (primaryKey) {
            await fetchRecordData(url, primaryKey);
        } else {
            setRecordData(null);
            setInfo([]);
        }
    };

    return (
        <>
            <Controller
                name="primaryKey"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <input
                        {...field}
                        onBlur={handlePrimaryKeyBlur}
                        maxLength={10}
                        placeholder="Clave primaria"
                    />
                )}
            />
        </>
    );
};

export default PrimaryKeyInput;
