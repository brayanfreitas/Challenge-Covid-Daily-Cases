import { Cases } from '../../cases.entity';

export const getSplitMock: Cases[] = [
  {
    id: '82c8e7e3-f646-4efc-9103-bc93ae4c2ada',
    variant: 'Alpha',
    location: 'Canada',
    numSequences: 1,
    numSequencesTotal: 2,
    date: '2020-07-06',
    percSequences: 2
  },
  {
    id: '4eaed2cb-2403-499b-8aaa-98763bb7730c',
    variant: 'Zeta',
    location: 'USA',
    numSequences: 1,
    numSequencesTotal: 2,
    date: '2020-07-06',
    percSequences: 2
  },
  {
    id: '8cbc86e4-e1b0-4ce5-83b5-d11509c68476',
    variant: 'B.1.221',
    location: 'brazil',
    numSequences: 1,
    numSequencesTotal: 2,
    date: '2020-07-06',
    percSequences: 2
  }
];

export const getCumulative = [
  { variant: 'Zeta', location: 'Brazil', total: 20 },
  { variant: 'Alpha', location: 'USA', total: 20 },
  { variant: 'B.1.221', location: 'France', total: 20 },
  { variant: 'Mu', location: 'Angola', total: 20 }
];
