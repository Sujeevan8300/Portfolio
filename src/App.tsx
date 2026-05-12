/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CinematicLayout } from './components/layout/CinematicLayout';
import { Origin } from './components/sections/Origin';
import { Builder } from './components/sections/TheBuilder';
import { TheSystem } from './components/sections/TheSystem';
import { RealWorld } from './components/sections/RealWorld';
import { Creations } from './components/sections/Creations';
import { Milestones } from './components/sections/Milestones';
import { FinalScene } from './components/sections/FinalScene';

export default function App() {
  return (
    <CinematicLayout>
      <Origin />
      <Builder />
      <TheSystem />
      <RealWorld />
      <Creations />
      <Milestones />
      <FinalScene />
    </CinematicLayout>
  );
}
