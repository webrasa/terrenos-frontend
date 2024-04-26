import Image from 'next/image';
import { Button } from '@/button/Button';

const Section = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row w-full h-auto my-8">
    <div className="text-center md:text-left md:w-1/2 md:justify-center md:pl-9 md:pr-20">
<h1 className="font-semibold text-4xl text-black font-sans pt-6 md:pt-20 pb-4">This could be yours</h1>
<p className="text-black font-sans px-11 md:px-1 pb-4 md:text-sm md:pb-9">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
<Button btn-xl>For sale near me</Button>
    </div>
    <div className="md:w-1/2 flex justify-center md:pr-9">
    <Image
      src="/assets/images/section.png"
      width={711}
      height={410}
      alt="Section"
      className="rounded"
    />
    </div>
    </div>
  )
}

export default Section;