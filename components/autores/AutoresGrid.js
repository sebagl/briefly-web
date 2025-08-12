import React from 'react';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import AutoresBox from './AutoresBox';

let text = [
  {
    question: 'Qué es Stream Readers para Autores',
    answer:
			'Somos una productora y distribuidora joven de audiolibros. Producimos contenido para Autores y Editoriales, acompañando su proceso de crecimiento de principio a fin con toda nuestro expertise, para que ellos sólo deban encargarse de escribir.',
  },
  {
    question: 'Por qué un Audiolibro y no un Libro',
    answer:
			'Cada vez hay menos tiempo de sentarse a leer. Un audiolibro le da la posibilidad al usuario de experimentar obras literarias sin pausar su rutina. El audiolibro requiere, además, una única inversión inicial del autor, haciendo rentable y duradero',
  },
  {
    question: 'En Stream Readers producen cualquier libro',
    answer:
			'Producimos todo libro que puedas llegar a imaginar, seas un autor independiente o una gran Editorial, sea una larga novela o un pequeño libro de poemas: no tenemos límites.',
  },
  {
    question: 'Qué beneficios tengo al producir mi libro con Stream Readers',
    answer:
			'En Stream Readers producimos la mejor calidad sonora en estudios de grabación profesionales, ofreciendo costos accesibles para todo tipo de autor. Además de la producción, nos encargamos de la logística: te facilitamos los accesos a las mejores plataformas de distribución, para que puedas potenciar su alcance y sus ventas.',
  },
  {
    question: 'Cómo puedo presupuestar mi Audiolibro',
    answer:
			'¡Es muy fácil! Contactanos aclarando la cantidad de palabras de tu texto y realizaremos un presupuesto a medida. Mas abajo encontraras un cotizador para calcular tu presupuesto aproximado.',
  },
  {
    question: 'Puedo producir mi libro desde cualquier parte del mundo',
    answer:
			'Del estudio de grabación a todo el Mundo; nuestro servicio es totalmente OnLine. ¡Sólo necesitamos el texto y que elijas la voz para poner el proyecto en marcha!',
  },
];

const useStyles = makeStyles(() => ({
  grey: {
    backgroundColor: '#E3ECF0',
    padding: '3em 8em',
    display: 'flex',
    alignItems: 'center',
    [useTheme().breakpoints.down('sm')]: {
      padding: '2em 5em',
    },
    [useTheme().breakpoints.down('xs')]: {
      padding: '1em 3em',
    },
  },
  white: {
    backgroundColor: '#FFF',
    padding: '3em 8em',
    display: 'flex',
    alignItems: 'center',
    [useTheme().breakpoints.down('sm')]: {
      padding: '2em 5em',
    },
    [useTheme().breakpoints.down('xs')]: {
      padding: '1em 3em',
    },
  },
}));

function AutoresGrid() {
  const classes = useStyles();

  return (
    <Grid container>
      {text.map((item, index) => (
        <Grid
          item
          lg={6}
          className={
            index === 0 || index === 3 || index === 4
              ? classes.grey
              : classes.white
          }
        >
          <AutoresBox question={item.question} answer={item.answer} />
        </Grid>
      ))}
    </Grid>
  );
}

export default AutoresGrid;
