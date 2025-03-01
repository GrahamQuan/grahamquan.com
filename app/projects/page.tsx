import { ProjectList } from '@/lib/constants';
import ProjectCard from '@/components/project/project-card';

export default function Page() {
  const isOddNum = ProjectList.length % 2 === 1;

  return (
    <div className='flex flex-col gap-12 p-24'>
      <h1 className='text-2xl font-bold'>Projects I've doen</h1>
      <div className='mdx:grid-cols-2 grid grid-cols-1 gap-px bg-black/15 dark:bg-white/5'>
        {ProjectList.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
        {isOddNum && <div className='bg-(--color-background)' />}
      </div>
    </div>
  );
}
