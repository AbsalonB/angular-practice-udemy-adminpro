import { Hospital } from './hospital.model';
interface _doctorUser {
    _id:string;
    name:string;
    img:string;
}

export class Doctor{
    constructor(
        public name:string,
        public _id:string,
        public img?:string,
        public user?:_doctorUser,
        public hospital?: Hospital
    ){}
}