import { useState } from 'react';
import { countries } from '../../data/db';
import styles from './Form.module.css';
import { SearchType } from '../../types';
import { Alert } from './Alert/Alert';

type FormProps = {
  fetchWeather: (search: SearchType) => Promise<void>;
};

export const Form = ({ fetchWeather }: FormProps) => {
  const [search, setSearch] = useState<SearchType>({
    city: '',
    country: '',
  });

  const [alert, setAlert] = useState('');

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setSearch({
      ...search,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(search).includes('')) {
      setAlert('Todos los campos son obligatorios');
    }

    fetchWeather(search);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {alert && <Alert>{alert}</Alert>}
      <div className={styles.field}>
        <label htmlFor='city'>Ciudad:</label>
        <input
          id='city'
          type='text'
          name='city'
          placeholder='Ciudad'
          value={search.city}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor='country'>Pais</label>
        <select
          id='country'
          value={search.country}
          name='country'
          onChange={(e) => handleChange(e)}
        >
          <option value=''>--Selecciona un pais-</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <input
        className={styles.submit}
        type='submit'
        value={'Consultar clima'}
      />
    </form>
  );
};
