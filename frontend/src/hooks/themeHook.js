import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import { NotificationContext } from "../context/NotificationProvider";
import { AuthContext } from "../context/AuthProvider";
import { SearchContext } from "../context/SearchProvider";
import { MovieContext } from "../context/MoviesProvider"

const useTheme = () => useContext(ThemeContext)
const useNotification = () => useContext(NotificationContext)
const useAuth = () => useContext(AuthContext)
const useSearch = () => useContext(SearchContext)
const useMovies = () => useContext(MovieContext)

export { useTheme, useNotification, useAuth, useSearch, useMovies }