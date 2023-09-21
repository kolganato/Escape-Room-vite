import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { AppDispatch, State } from '../store';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
