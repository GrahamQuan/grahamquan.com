import { ProjectList } from '@/lib/constants';
import ProjectCard from '@/components/project-card';

export default function Page() {
  const isOddNum = ProjectList.length % 2 === 1;

  return (
    <div className='flex flex-col gap-12 p-24'>
      <h1>Projects</h1>
      <div className='grid grid-cols-2 gap-px bg-black/15 dark:bg-white/5'>
        {ProjectList.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
        {isOddNum && <div className='bg-(--color-background)' />}
      </div>
    </div>
  );
}
