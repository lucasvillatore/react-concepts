import { BaseImage } from '../components/BaseImage';
import { BorderFrame } from '../components/BorderFrame';

const IMG_URL = "https://picsum.photos/id/237/300/200";

export const RedBorderImage = () => {
  return (
    <BorderFrame color="#ff4d4f" width="5px">
      <BaseImage src={IMG_URL} alt="Cachorrinho" />
    </BorderFrame>
  );
};
