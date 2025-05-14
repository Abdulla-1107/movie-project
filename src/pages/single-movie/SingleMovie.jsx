import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "@/hooks/useFetch";
import MovieView from "@/components/movie-view/MovieView";

const url = import.meta.env.VITE_IMAGE_URL;


const Singlemovie = () => {
  const { id } = useParams();
  const { data, error, loading } = useFetch(`/movie/${id}`);

  const {data: images} = useFetch(`/movie/${id}/images`);
  const {data: similar} = useFetch(`/movie/${id}/similar`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='container mx-auto'>
        <div className=''>
            <img src={url + data?.backdrop_path} alt="" />
        </div>
        <div>
            <h1 className='text-4xl'>{data?.title}</h1>
            <p>{data?.overview}</p>
            <p>{data?.vote_average}</p>
            <strong>{data?.budget?.toLocaleString()} USD</strong>
        </div>
        <div className="grid grid-cols-5">
            {
                images?.backdrops?.slice(0,10)?.map((image) => (
                    <img key={image.file_path} src={url + image.file_path} alt="kjladf"/>
                ))
            }
        </div>
        <div>
            <h3 className="text-2xl font-bold">Similar</h3>
            <MovieView movies={similar?.results?.slice(0, 4)}/>
        </div>
    </div>
  );
}




export default Singlemovie;
