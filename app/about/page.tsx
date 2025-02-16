import { TechStack } from '@/lib/constants';

export default function Page() {
  return (
    <div className='mx-auto flex max-w-4xl flex-col gap-12 p-12'>
      <h1 className='text-2xl font-bold'>About</h1>
      <div className='flex flex-col gap-4'>
        {TechStack.map((stack) => (
          <div key={stack.title}>
            <h2 className='text-lg font-bold'>{stack.title}</h2>
            <ul className='list-disc pl-24'>
              {stack.items.map((item) => (
                <li key={item} className='opacity-60'>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
