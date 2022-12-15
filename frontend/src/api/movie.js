import { catchError, getToken } from '../utils/helper'
import client from './client'

export const uploadTrailer  = async (formData,onUploadProgress) => {
  const token = getToken();
  try {
    const { data } = await client.post('/movie/upload-trailer',formData,{
      headers: {
        authorization: 'Bearer ' + token,
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: ({loaded,total}) => {
        if(onUploadProgress) 
        onUploadProgress(Math.floor((loaded / total) * 100 ))
      }
    })
    return data;
  } catch (error) {
    return catchError(error)
  }
}

export const uploadMovie = async (formData) => {
  const token = getToken();
  try {
    const { data } = await client.post('/movie/create-movie', formData, {
      headers: {
        authorization: 'Bearer ' + token,
        'Content-Type': 'multipart/form-data'
      },
    })
    return data;
  } catch (error) {
    return catchError(error)
  }
}

export const getMovieForUpdate = async (id) => {
  const token = getToken();
  try {
    const { data } = await client.get('/movie/for-update/'+id, {
      headers: {
        authorization: 'Bearer ' + token,
      },
    })
    // console.log(data);
    return data;
  } catch (error) {
    return catchError(error)
  }
}

export const updateMovie = async (id,formData) => {
  const token = getToken();
  try {
    const { data } = await client.patch('/movie/update-movie/'+id,formData, {
      headers: {
        authorization: 'Bearer ' + token,
        'Content-Type': 'multipart/form-data'
      },
    })
    // console.log(data);
    return data;
  } catch (error) {
    return catchError(error)
  }
}

export const getMovies = async (pageNo,limit) => {
  const token = getToken();
  try {
    const { data } = await client.get(`movie/movies/?pageNo=${pageNo}&limit=${limit}`, {
      headers: {
        authorization: 'Bearer ' + token,
        'Content-Type': 'multipart/form-data'
      },
    })
    // console.log(data);
    return data;
  } catch (error) {
    return catchError(error)
  }
}

export const deleteMovie = async (id) => {
  const token = getToken();
  try {
    const { data } = await client.delete(`movie/delete-movie/${id}`, {
      headers: {
        authorization: 'Bearer ' + token,
      },
    })
    // console.log(data);
    return data;
  } catch (error) {
    return catchError(error)
  }
}
export const searchMovieForAdmin = async (title) => {
  const token = getToken();
  try {
    const { data } = await client.get(`movie/search-movies?title=${title}`, {
      headers: {
        authorization: 'Bearer ' + token,
      },
    })
    // console.log(data);
    return data;
  } catch (error) {
    return catchError(error)
  }
}
export const getTopRatedMovies = async (type) => {
  try {
    let endPoint = 'movie/top-rated-movies'
    if (type) endPoint = endPoint + '?type=' + type;
    const { data } = await client.get(endPoint)
    // console.log(data);
    return data;
  } catch (error) {
    return catchError(error)
  }
}
export const getLatestUploads  = async () => {
  try {
    
    const { data } = await client.get('/movie/latest-uploads')
    // console.log(data);
    return data;
  } catch (error) {
    return catchError(error)
  }
}
export const getSingleMovie  = async (id) => {
  try {
    
    const { data } = await client.get('/movie/single-movie/' + id)
    // console.log(data);
    return data;
  } catch (error) {
    return catchError(error)
  }
}
