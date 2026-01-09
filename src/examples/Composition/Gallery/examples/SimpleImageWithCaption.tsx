import { BaseImage } from '../components/BaseImage';
import { WithCaption } from '../components/WithCaption';

const IMG_URL = "https://picsum.photos/id/1069/300/200";

export const SimpleCaptionImage = () => {
  return (
    <WithCaption text="Foto artística sem moldura (Apenas Legenda)">
      <BaseImage src={IMG_URL} alt="Água Viva" />
    </WithCaption>
  );
};
