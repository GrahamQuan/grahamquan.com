import { Projects } from '@/lib/constants';
import ProjectCard from '@/components/project-card';

export default function Page() {
  return (
    <div className='mdx:grid-cols-2 grid grid-cols-1 gap-12 p-12'>
      {Projects.map((project) => (
        <ProjectCard key={project.title} {...project} />
      ))}
    </div>
  );
}
