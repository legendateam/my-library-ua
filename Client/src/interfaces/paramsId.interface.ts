import { Params } from 'react-router-dom';

export interface IParamsId extends Readonly<Params<string>>{
    id: string,
}
