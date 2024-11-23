import YellowTree from './YellowTree';
import GreenTree from './GreenTree';
import PinkTree from './PinkTree';

export default function TreeSpawn() {

  return (
    <>
      <YellowTree position={[0, 0, 0]} scale={[9, 9, 9]}/>
      <GreenTree position={[0, 0, 0]} scale={[1.2, 1.2, 1.2]}/>
      <PinkTree position={[0, 0, 0]} scale={[0.02, 0.02, 0.02]}/>
    </>
  );
}