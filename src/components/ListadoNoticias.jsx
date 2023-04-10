import {React} from 'react'
import useNoticias from '../hooks/useNoticias'
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Noticias from './Noticias';

function ListadoNoticias() {

    const {noticias,setNoticias,totalNoticias,handleChangePagina,paginas}=useNoticias();
    const totalPaginas=Math.ceil(totalNoticias/20);

    

    return (
    <div>
      <Typography
      textAlign={'center'}
      marginY={5}
      variant='h3'
      component={'h2'}
      >
        Ultimas Noticias
      </Typography>
      <Grid container
      spacing={2}
      >
        {noticias.map(noticia=>(
          <Noticias
          key={noticia.url}
          noticia={noticia}
          />
        ))}
      </Grid>

      <Stack 
      sk={{
        marginY:5
      }}
      spacing={2}
      direction={'row'}
      justifyContent={'center'}
      alignItems={'center'}
      >
        <Pagination count={totalPaginas} color="primary" 
        page={paginas}
        onChange={(e,valor)=>handleChangePagina(e,valor)}
        />
      </Stack>
    </div>
  )
}

export default ListadoNoticias