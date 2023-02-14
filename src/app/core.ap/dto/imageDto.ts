import { CoreDto } from "./core/coreDto";

export class ImageDto extends CoreDto{
    key:string;
    imgUrl:string;
    img:Blob;
}