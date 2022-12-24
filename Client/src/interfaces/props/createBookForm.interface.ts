import { ICreateFormProps } from './createForm.props.interface';
import { ILabelIdI } from '../labelId.interface';

export interface ICreateBookForm extends ICreateFormProps {
    authors: ILabelIdI[],
}
