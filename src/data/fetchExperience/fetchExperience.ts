import { Experience } from './types';

export const fetchExperience = async () => {
  const { default: experienceData } = await import('./experience.json');
  return experienceData as Experience[];
};
