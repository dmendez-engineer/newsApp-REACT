import axios from "axios";
import {useState,useEffect,createContext} from "react"

const NoticiasContext=createContext();

const NoticiasProvider=({children})=>{

    const [categoria,setCategoria]=useState('general');
    const [noticias,setNoticias]=useState([]);
    const [paginas,setPaginas]=useState(1);
    const [totalNoticias,setTotalNoticias]=useState(0);
    const handleChangeCategoria=(e)=>{
        setCategoria(e.target.value)
    }
    const handleChangePagina=(e,valor)=>{
        console.log(valor);
        setPaginas(valor);
    }

    useEffect(()=>{
        const consultarAPI=async ()=>{
            const url=`https://newsapi.org/v2/top-headlines?country=us&category=${categoria}&apiKey=${import.meta.env.VITE_API_KEY}`

            const {data}=await axios(url);
            setNoticias(data.articles);
            setTotalNoticias(data.totalResults);
            setPaginas(1);
        }
        consultarAPI();

    },[categoria]);

    useEffect(()=>{
        const consultarAPI=async ()=>{
            const url=`https://newsapi.org/v2/top-headlines?country=us&page=${paginas}&category=${categoria}&apiKey=${import.meta.env.VITE_API_KEY}`

            const {data}=await axios(url);
            console.log("PAGE: ",url,data);
            setNoticias(data.articles);
            setTotalNoticias(data.totalResults);
        }
        consultarAPI();

    },[paginas]);

    return(
        <NoticiasContext.Provider
        value={{
            categoria:categoria,
            handleChangeCategoria:handleChangeCategoria,
            setNoticias:setNoticias,
            noticias:noticias,
            totalNoticias:totalNoticias,
            handleChangePagina:handleChangePagina,
            paginas:paginas
        }}
        >
            {children}
        </NoticiasContext.Provider>
    )
}
export{
    NoticiasProvider
}
export default NoticiasContext