import { BaseImage } from '../components/BaseImage';
import { BorderFrame } from '../components/BorderFrame';
import { WithCaption } from '../components/WithCaption';

const IMG_URL = "https://picsum.photos/id/1025/300/200";

export const ComplexImage = () => {
  return (
    <WithCaption text="Fig. 3: Um pug muito sério (Composição Aninhada)">
      <BorderFrame color="#1890ff" width="3px" style="dashed">
        <BaseImage src={IMG_URL} alt="Pug" />
      </BorderFrame>
    </WithCaption>
  );
};
